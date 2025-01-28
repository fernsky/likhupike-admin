import { useCallback, useEffect, useState } from "react";
import {
  ChartNode,
  ChartType,
  ChartDataPoint,
  ChartSeries,
} from "../../_store/types";
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
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  LineChart,
  PieChart,
  AreaChart,
  ScatterChart,
  MessageSquare,
  Settings2,
  Eye,
  Database,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
            content: {
              en: "",
              ne: "",
            },
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

  const chartTypeIcons: Record<ChartType, JSX.Element> = {
    bar: <BarChart3 className="w-4 h-4" />,
    line: <LineChart className="w-4 h-4" />,
    pie: <PieChart className="w-4 h-4" />,
    area: <AreaChart className="w-4 h-4" />,
    scatter: <ScatterChart className="w-4 h-4" />,
    donut: <PieChart className="w-4 h-4" />,
    column: <BarChart3 className="w-4 h-4 rotate-90" />,
    "stacked-column": <BarChart3 className="w-4 h-4 rotate-90" />,
    radar: <BarChart3 className="w-4 h-4" />,
    funnel: <BarChart3 className="w-4 h-4" />,
    gauge: <BarChart3 className="w-4 h-4" />,
    boxplot: <BarChart3 className="w-4 h-4" />,
    candlestick: <BarChart3 className="w-4 h-4" />,
    heatmap: <BarChart3 className="w-4 h-4" />,
    tree: <BarChart3 className="w-4 h-4" />,
    treemap: <BarChart3 className="w-4 h-4" />,
    sunburst: <BarChart3 className="w-4 h-4" />,
    sankey: <BarChart3 className="w-4 h-4" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative space-y-6 py-4"
    >
      {/* Editor Header */}
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-cyan-200"
        >
          <BarChart3 className="w-4 h-4 mr-1" />
          Chart Editor
        </Badge>
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-cyan-200"
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          {node.data.series.length} Series
        </Badge>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <TabsList className="bg-cyan-50/50 border border-cyan-100">
            {[
              {
                value: "data",
                label: "Data",
                icon: <Database className="w-4 h-4" />,
              },
              {
                value: "style",
                label: "Style",
                icon: <Settings2 className="w-4 h-4" />,
              },
              {
                value: "advanced",
                label: "Advanced",
                icon: <RefreshCw className="w-4 h-4" />,
              },
              {
                value: "preview",
                label: "Preview",
                icon: <Eye className="w-4 h-4" />,
              },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "data-[state=active]:bg-white data-[state=active]:text-cyan-700",
                  "data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-cyan-100",
                  "flex items-center gap-2",
                )}
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="data" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        value={node.chartType}
                        onValueChange={(value: ChartType) =>
                          updateNode({ chartType: value } as Partial<ChartNode>)
                        }
                      >
                        <SelectTrigger className="w-full border-cyan-100">
                          <SelectValue placeholder="Select chart type" />
                        </SelectTrigger>
                        <SelectContent>
                          {chartTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                {chartTypeIcons[type.value]}
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() =>
                            document.getElementById("csv-upload")?.click()
                          }
                          className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-700"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload CSV
                        </Button>
                        <Button
                          variant="outline"
                          className="border-cyan-200 hover:bg-cyan-50"
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
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleDataUpload}
                    />

                    <SeriesEditor node={node} updateNode={updateNode} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="style">
              <Card>
                <CardContent className="pt-6">
                  <StyleEditor node={node} updateNode={updateNode} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced">
              <Card>
                <CardContent className="pt-6">
                  <AdvancedEditor node={node} updateNode={updateNode} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <Card>
                <CardContent className="pt-6">
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
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};
