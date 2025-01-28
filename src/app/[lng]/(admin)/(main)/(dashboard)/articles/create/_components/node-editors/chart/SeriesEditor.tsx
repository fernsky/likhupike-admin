import { ChartNode, ChartSeries, ChartDataPoint } from "../../../_store/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { Plus, Trash } from "lucide-react";

interface SeriesEditorProps {
  node: ChartNode;
  updateNode: (updates: Partial<ChartNode>) => void;
}

export const SeriesEditor = ({ node, updateNode }: SeriesEditorProps) => {
  const addSeries = () => {
    const newSeries: ChartSeries = {
      name: {
        fallbackContent: "New Series",
        content: {
          en: "",
          ne: "",
        },
      },
      data: [],
    };
    updateNode({
      data: {
        ...node.data,
        series: [...(node.data.series || []), newSeries],
      },
    });
  };

  const addDataPoint = (seriesIndex: number) => {
    const series = [...node.data.series];
    series[seriesIndex].data.push({
      label: "",
      value: 0,
      category: "",
    });
    updateNode({
      data: { ...node.data, series },
    });
  };

  const updateDataPoint = (
    seriesIndex: number,
    pointIndex: number,
    updates: Partial<ChartDataPoint>,
  ) => {
    const series = [...node.data.series];
    series[seriesIndex].data[pointIndex] = {
      ...series[seriesIndex].data[pointIndex],
      ...updates,
    };
    updateNode({
      data: { ...node.data, series },
    });
  };

  return (
    <div className="space-y-4">
      {node.data.series.map((series, seriesIndex) => (
        <div key={seriesIndex} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <Input
              value={series.name.fallbackContent}
              onChange={(e) => {
                const updatedSeries = [...node.data.series];
                updatedSeries[seriesIndex].name.fallbackContent =
                  e.target.value;
                updateNode({
                  data: { ...node.data, series: updatedSeries },
                });
              }}
              placeholder="Series name"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => addDataPoint(seriesIndex)}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Point
            </Button>
          </div>

          <Table>
            <thead>
              <tr>
                <th>Label</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {series.data.map((point, pointIndex) => (
                <tr key={pointIndex}>
                  <td>
                    <Input
                      value={point.label}
                      onChange={(e) =>
                        updateDataPoint(seriesIndex, pointIndex, {
                          label: e.target.value,
                        })
                      }
                      placeholder="Label"
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={point.value}
                      onChange={(e) =>
                        updateDataPoint(seriesIndex, pointIndex, {
                          value: parseFloat(e.target.value),
                        })
                      }
                      placeholder="Value"
                    />
                  </td>
                  <td>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const updatedSeries = [...node.data.series];
                        updatedSeries[seriesIndex].data.splice(pointIndex, 1);
                        updateNode({
                          data: { ...node.data, series: updatedSeries },
                        });
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

      <Button onClick={addSeries}>
        <Plus className="w-4 h-4 mr-2" /> Add Series
      </Button>
    </div>
  );
};
