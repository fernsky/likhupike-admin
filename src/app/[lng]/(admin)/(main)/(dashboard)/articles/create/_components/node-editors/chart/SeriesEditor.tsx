import { ChartNode, ChartSeries, ChartDataPoint } from "../../../_store/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  BarChart,
} from "lucide-react";

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
    // Create a new array for the data property
    series[seriesIndex] = {
      ...series[seriesIndex],
      data: [
        ...series[seriesIndex].data,
        {
          label: "",
          value: 0,
          category: "",
        },
      ],
    };
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
    series[seriesIndex] = {
      ...series[seriesIndex],
      data: series[seriesIndex].data.map((point, idx) =>
        idx === pointIndex ? { ...point, ...updates } : point,
      ),
    };
    updateNode({
      data: { ...node.data, series },
    });
  };

  const removeDataPoint = (seriesIndex: number, pointIndex: number) => {
    const updatedSeries = node.data.series.map((series, idx) => {
      if (idx === seriesIndex) {
        return {
          ...series,
          data: series.data.filter((_, i) => i !== pointIndex),
        };
      }
      return series;
    });

    updateNode({
      data: {
        ...node.data,
        series: updatedSeries,
      },
    });
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {node.data.series.map((series, seriesIndex) => (
          <motion.div
            key={seriesIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="group border border-cyan-100 rounded-lg p-4 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-gray-400">
                <GripVertical className="w-4 h-4" />
                <span className="text-sm">Series {seriesIndex + 1}</span>
              </div>

              <Input
                value={series.name.fallbackContent}
                onChange={(e) => {
                  const newSeries = node.data.series.map((s, idx) =>
                    idx === seriesIndex
                      ? {
                          ...s,
                          name: {
                            ...s.name,
                            fallbackContent: e.target.value,
                          },
                        }
                      : s,
                  );
                  updateNode({
                    data: {
                      ...node.data,
                      series: newSeries,
                    },
                  });
                }}
                placeholder="Series name"
                className="flex-1 border-cyan-100 focus-visible:ring-cyan-500"
              />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => addDataPoint(seriesIndex)}
                className="hover:bg-cyan-50 hover:text-cyan-600"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Point
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                onClick={() => {
                  const updatedSeries = [...node.data.series];
                  updatedSeries.splice(seriesIndex, 1);
                  updateNode({
                    data: { ...node.data, series: updatedSeries },
                  });
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <AnimatePresence>
              {series.data.length > 0 ? (
                <Table className="border rounded-lg overflow-hidden border-cyan-100">
                  <thead>
                    <tr className="bg-cyan-50/50">
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">
                        #
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">
                        Label
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">
                        Value
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600 w-[120px]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {series.data.map((point, pointIndex) => (
                      <motion.tr
                        key={pointIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="group hover:bg-gray-50"
                      >
                        <td className="px-4 py-2 text-gray-500">
                          {pointIndex + 1}
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            value={point.label}
                            onChange={(e) =>
                              updateDataPoint(seriesIndex, pointIndex, {
                                label: e.target.value,
                              })
                            }
                            placeholder="Enter label"
                            className="border-cyan-100 focus-visible:ring-cyan-500 transition-all"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            value={point.value}
                            onChange={(e) =>
                              updateDataPoint(seriesIndex, pointIndex, {
                                value: parseFloat(e.target.value),
                              })
                            }
                            placeholder="Enter value"
                            className="border-cyan-100 focus-visible:ring-cyan-500 transition-all"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeDataPoint(seriesIndex, pointIndex)
                              }
                              className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed border-gray-200"
                >
                  <BarChart className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                  <p>No data points added yet</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        onClick={addSeries}
        variant="outline"
        className="w-full border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
      >
        <Plus className="w-4 h-4 mr-2" /> Add New Series
      </Button>
    </div>
  );
};
