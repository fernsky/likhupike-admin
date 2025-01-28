import { ChartNode } from "../../_store/types";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface ChartPreviewProps {
  node: ChartNode;
  language: "en" | "ne";
}

export const ChartPreview = ({ node, language }: ChartPreviewProps) => {
  const title = node.title?.content[language] || node.title?.fallbackContent;
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F"];

  const chartData = useMemo(() => {
    try {
      // Ensure we have valid data
      if (!node.data?.series?.[0]?.data) return [];

      // For pie charts, use first series only
      if (node.chartType === "pie") {
        return node.data.series[0].data.map((point) => ({
          name: typeof point === "object" ? point.x : point,
          value: typeof point === "object" ? point.y : point,
        }));
      }

      // For other charts, merge all series data by x value
      const xValues = new Set(
        node.data.series.flatMap((s) =>
          s.data.map((d) => (typeof d === "object" ? d.x : d)),
        ),
      );

      return Array.from(xValues).map((x) => ({
        x,
        ...Object.fromEntries(
          node.data.series.map((s) => [
            s.name,
            (
              s.data.find((d) => typeof d === "object" && d.x === x) as
                | { y: number }
                | undefined
            )?.y ?? 0,
          ]),
        ),
      }));
    } catch (error) {
      console.error("Error processing chart data:", error);
      return [];
    }
  }, [node.data]);

  const getChartComponent = () => {
    if (chartData.length === 0) return null;

    try {
      switch (node.chartType) {
        case "line":
          return (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              {node.data.series.map((series, index) => (
                <Line
                  key={
                    typeof series.name === "string"
                      ? series.name
                      : index.toString()
                  }
                  type="monotone"
                  dataKey={
                    typeof series.name === "string"
                      ? series.name
                      : `series_${index}`
                  }
                  name={
                    typeof series.name === "string"
                      ? series.name
                      : `Series ${index + 1}`
                  }
                  stroke={colors[index % colors.length]}
                  dot={node.style?.showPoints ?? true}
                />
              ))}
            </LineChart>
          );

        case "bar":
          return (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              {node.data.series.map((series, index) => (
                <Bar
                  key={
                    typeof series.name === "string"
                      ? series.name
                      : index.toString()
                  }
                  dataKey={
                    typeof series.name === "string"
                      ? series.name
                      : `series_${index}`
                  }
                  name={
                    typeof series.name === "string"
                      ? series.name
                      : `Series ${index + 1}`
                  }
                  fill={colors[index % colors.length]}
                />
              ))}
            </BarChart>
          );

        case "pie":
          return (
            <PieChart>
              <Pie
                data={chartData}
                nameKey="name"
                dataKey="value"
                innerRadius={node.style?.innerRadius ?? 0}
                outerRadius={node.style?.outerRadius ?? "80%"}
                label={node.style?.showLabels ?? true}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          );

        case "area":
          return (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              {node.data.series.map((series, index) => (
                <Area
                  key={
                    typeof series.name === "string"
                      ? series.name
                      : index.toString()
                  }
                  type="monotone"
                  dataKey={
                    typeof series.name === "string"
                      ? series.name
                      : `series_${index}`
                  }
                  name={
                    typeof series.name === "string"
                      ? series.name
                      : `Series ${index + 1}`
                  }
                  fill={colors[index % colors.length]}
                  fillOpacity={0.3}
                  stroke={colors[index % colors.length]}
                />
              ))}
            </AreaChart>
          );

        default:
          return null;
      }
    } catch (error) {
      console.error("Error rendering chart:", error);
      return null;
    }
  };

  return (
    <div
      className={cn("my-8", node.className)}
      style={{
        ...node.style?.container,
        minHeight: "200px",
      }}
    >
      {title && <h4 className="mb-4 font-semibold">{title}</h4>}
      <div className="w-full" style={{ height: node.style?.height ?? 400 }}>
        <ResponsiveContainer>
          {getChartComponent() || (
            <div className="flex items-center justify-center h-full text-gray-400">
              No data to display
            </div>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
