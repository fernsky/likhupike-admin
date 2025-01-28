import { useCallback, useEffect, useState } from "react";
import { ChartNode, ChartType, ChartDataPoint } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash, Upload, Download } from "lucide-react";
import ReactECharts from "echarts-for-react";
import { format } from "date-fns";
import numeral from "numeral";
import { SeriesEditor } from "./chart/SeriesEditor";
import { StyleEditor } from "./chart/StyleEditor";
import { AdvancedEditor } from "./chart/AdvancedEditor";

const chartTypes: { value: ChartType; label: string }[] = [
  { value: "bar", label: "Bar Chart" },
  { value: "line", label: "Line Chart" },
  { value: "pie", label: "Pie Chart" },
  { value: "donut", label: "Donut Chart" },
  { value: "area", label: "Area Chart" },
  { value: "column", label: "Column Chart" },
  { value: "scatter", label: "Scatter Plot" },
  { value: "stacked-column", label: "Stacked Column" },
];

export const ChartEditor = ({ node }: { node: ChartNode }) => {
  const { updateNode } = useNode(node.id);
  const [activeTab, setActiveTab] = useState("data");

  const handleDataUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await file.text();
      try {
        const rows = text.split("\n").map((row) => row.split(","));
        const headers = rows[0];

        // Create a new series with the CSV data
        const newSeries: ChartSeries = {
          name: {
            fallbackContent: headers[0],
            content: {},
          },
          data: rows.slice(1).map((row) => ({
            label: row[0],
            value: parseFloat(row[1]),
            category: row[2] || row[0], // Use label as category if not provided
          })),
        };

        updateNode({
          data: {
            ...node.data,
            series: [newSeries],
          },
        } as Partial<ChartNode>);
      } catch (error) {
        console.error("Error parsing CSV:", error);
      }
    }
  };

  const getEChartsOption = useCallback(() => {
    const series = node.data.series.map((s) => {
      // Transform data for the chart
      const chartData = s.data.map((point) => {
        if (["pie", "donut"].includes(node.chartType)) {
          return {
            name: point.label,
            value: point.value,
          };
        }
        return {
          name: point.label,
          value: point.value,
          category: point.category,
        };
      });

      return {
        name: s.name.fallbackContent,
        type: s.type || node.chartType,
        data: chartData,
        smooth: s.smooth,
        symbolSize: s.symbolSize,
        areaStyle: s.areaStyle,
        lineStyle: s.lineStyle,
        emphasis: s.emphasis,
        markPoint: s.markPoint,
        markLine: s.markLine,
      };
    });

    // Get unique categories for x-axis
    const categories = Array.from(
      new Set(
        node.data.series
          .flatMap((s) => s.data)
          .map((point) => point.category || point.label),
      ),
    );

    return {
      title: {
        text: node.title?.fallbackContent,
        subtext: node.subtitle?.fallbackContent,
      },
      tooltip: {
        show: node.options?.tooltip?.show ?? true,
        trigger: node.options?.tooltip?.trigger || "axis",
        formatter: (params: any) => {
          if (Array.isArray(params)) {
            return `${params[0].name}<br/>${params
              .map((p) => `${p.seriesName}: ${p.value}`)
              .join("<br/>")}`;
          }
          return `${params.name}: ${params.value}`;
        },
      },
      xAxis: !["pie", "donut"].includes(node.chartType)
        ? {
            type: "category",
            data: categories,
            boundaryGap: ["bar", "column", "stacked-column"].includes(
              node.chartType,
            ),
          }
        : undefined,
      yAxis: !["pie", "donut"].includes(node.chartType)
        ? {
            type: "value",
          }
        : undefined,
      series,
      // ...existing options for animation, dataZoom, legend, etc...
    };
  }, [node]);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Chart Data</CardTitle>
              <CardDescription>
                Configure your chart data and series
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Chart Type Selector */}
                <Select
                  value={node.chartType}
                  onValueChange={(value: ChartType) =>
                    updateNode({ chartType: value } as Partial<ChartNode>)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    {chartTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* CSV Upload */}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() =>
                      document.getElementById("csv-upload")?.click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload CSV
                  </Button>
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleDataUpload}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Generate sample CSV based on chart type
                      const header = "Label,Value,Category\n";
                      const sampleData =
                        "Sample A,100,Category 1\nSample B,200,Category 2";
                      const blob = new Blob([header + sampleData], {
                        type: "text/csv",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "chart-template.csv";
                      a.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </div>

                {/* Series Editor */}
                <SeriesEditor node={node} updateNode={updateNode} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="style">
          <Card>
            <CardHeader>
              <CardTitle>Chart Style</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleEditor node={node} updateNode={updateNode} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
            </CardHeader>
            <CardContent>
              <AdvancedEditor node={node} updateNode={updateNode} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Chart Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[400px]">
                <ReactECharts
                  option={getEChartsOption()}
                  style={{ height: "100%", width: "100%" }}
                  theme={node.options?.theme || "light"}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
