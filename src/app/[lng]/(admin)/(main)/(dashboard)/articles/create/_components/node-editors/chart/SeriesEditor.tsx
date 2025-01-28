import {
  ChartNode,
  ChartSeries,
  ChartType,
  MultilingualContent,
} from "../../../_store/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash } from "lucide-react";
import { nanoid } from "nanoid";
import { SeriesDataEditor } from "./SeriesDataEditor";

interface SeriesEditorProps {
  node: ChartNode;
  updateNode: (updates: Partial<ChartNode>) => void;
}

export const SeriesEditor = ({ node, updateNode }: SeriesEditorProps) => {
  const addSeries = () => {
    const newSeries: ChartSeries = {
      name: {
        fallbackContent: `Series ${node.data.series.length + 1}`,
        content: {
          en: `Series ${node.data.series.length + 1}`,
          ne: `श्रृंखला ${node.data.series.length + 1}`,
        },
      },
      data: [],
      type: node.chartType,
    };

    updateNode({
      data: {
        ...node.data,
        series: [...node.data.series, newSeries],
      },
    });
  };

  const updateSeries = (index: number, updates: Partial<ChartSeries>) => {
    updateNode({
      data: {
        ...node.data,
        series: node.data.series.map((s, idx) =>
          idx === index ? { ...s, ...updates } : s,
        ),
      },
    });
  };

  const removeSeries = (index: number) => {
    updateNode({
      data: {
        ...node.data,
        series: node.data.series.filter((_, idx) => idx !== index),
      },
    });
  };

  return (
    <div className="space-y-4">
      {node.data.series.map((series, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <Input
              value={series.name.fallbackContent}
              onChange={(e) =>
                updateSeries(index, {
                  name: {
                    ...series.name,
                    fallbackContent: e.target.value,
                  },
                })
              }
              placeholder="Series name"
              className="max-w-[200px]"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSeries(index)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>

          <SeriesDataEditor
            series={series}
            onUpdate={(data) => updateSeries(index, { data })}
          />

          {/* Series Style Options */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Smooth Line</label>
              <Switch
                checked={series.smooth}
                onCheckedChange={(checked) =>
                  updateSeries(index, { smooth: checked })
                }
              />
            </div>
            {/* Add more series-specific style options */}
          </div>
        </div>
      ))}

      <Button onClick={addSeries}>
        <Plus className="h-4 w-4 mr-2" />
        Add Series
      </Button>
    </div>
  );
};
