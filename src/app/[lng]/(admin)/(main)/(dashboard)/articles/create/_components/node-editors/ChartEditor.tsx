import { ChartNode, ChartSeries, ChartType } from "../../_store/types";
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
import { Plus, Trash } from "lucide-react";
import { nanoid } from "nanoid";

interface ChartEditorProps {
  node: ChartNode;
}

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

export const ChartEditor = ({ node }: ChartEditorProps) => {
  const { updateNode } = useNode(node.id);

  const addSeries = () => {
    const newSeries: ChartSeries = {
      name: {
        fallbackContent: "New Series",
        content: { en: "New Series", ne: "नयाँ श्रृंखला" },
      },
      data: [],
      visible: true,
      showLabels: true,
    };

    updateNode({
      data: {
        ...node.data,
        series: [...node.data.series, newSeries],
      },
    } as Partial<ChartNode>);
  };

  const updateSeriesData = (seriesIndex: number, newData: string) => {
    try {
      const parsedData = newData.split(",").map(Number);
      updateNode({
        data: {
          ...node.data,
          series: node.data.series.map((s, idx) =>
            idx === seriesIndex ? { ...s, data: parsedData } : s,
          ),
        },
      } as Partial<ChartNode>);
    } catch (error) {
      console.error("Invalid data format");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Select
          value={node.chartType}
          onValueChange={(value: ChartType) =>
            updateNode({ chartType: value } as Partial<ChartNode>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            {chartTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={addSeries}>
          <Plus className="w-4 h-4 mr-2" />
          Add Series
        </Button>
      </div>

      <Tabs defaultValue="en">
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">नेपाली</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang}>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium">Chart Title</label>
                <Input
                  value={node.title?.content[lang as "en" | "ne"] || ""}
                  onChange={(e) =>
                    updateNode({
                      title: {
                        ...(node.title || { fallbackContent: "", content: {} }),
                        content: {
                          ...(node.title?.content || {}),
                          [lang]: e.target.value,
                        },
                      },
                    } as Partial<ChartNode>)
                  }
                  placeholder="Chart title"
                />
              </div>

              {node.data.series.map((series, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Input
                      value={series.name.content[lang as "en" | "ne"]}
                      onChange={(e) =>
                        updateNode({
                          data: {
                            ...node.data,
                            series: node.data.series.map((s, idx) =>
                              idx === index
                                ? {
                                    ...s,
                                    name: {
                                      ...s.name,
                                      content: {
                                        ...s.name.content,
                                        [lang]: e.target.value,
                                      },
                                    },
                                  }
                                : s,
                            ),
                          },
                        } as Partial<ChartNode>)
                      }
                      placeholder="Series name"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        updateNode({
                          data: {
                            ...node.data,
                            series: node.data.series.filter(
                              (_, idx) => idx !== index,
                            ),
                          },
                        } as Partial<ChartNode>)
                      }
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    value={series.data.join(", ")}
                    onChange={(e) => updateSeriesData(index, e.target.value)}
                    placeholder="Enter data values (comma-separated)"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
