import { ChartNode } from "../../../_store/types";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

interface AdvancedEditorProps {
  node: ChartNode;
  updateNode: (updates: Partial<ChartNode>) => void;
}

export const AdvancedEditor = ({ node, updateNode }: AdvancedEditorProps) => {
  const updateOptions = (path: string[], value: any) => {
    // Initialize options if undefined
    const newOptions = { ...(node.options || {}) };
    let current: Record<string, any> = newOptions;

    // Create nested objects if they don't exist
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;

    updateNode({ options: newOptions });
  };

  // Initialize default options if needed
  useEffect(() => {
    if (!node.options) {
      updateNode({
        options: {
          tooltip: { show: true, trigger: "axis" },
          animation: { enabled: true, duration: 1000 },
          legend: { show: true, position: "bottom" },
        },
      });
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Tooltip Configuration */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Tooltip Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Show Tooltip</Label>
            <Switch
              checked={node.options?.tooltip?.show ?? true}
              onCheckedChange={(checked) =>
                updateOptions(["tooltip", "show"], checked)
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Trigger Mode</Label>
              <Select
                value={node.options?.tooltip?.trigger}
                onValueChange={(value) =>
                  updateOptions(["tooltip", "trigger"], value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="item">Item</SelectItem>
                  <SelectItem value="axis">Axis</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Background Color</Label>
              <Input
                type="color"
                value={node.options?.tooltip?.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  updateOptions(["tooltip", "backgroundColor"], e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Interaction Settings */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Interaction Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <Label>Enable Zoom</Label>
            <Switch
              checked={node.options?.interaction?.zoom}
              onCheckedChange={(checked) =>
                updateOptions(["interaction", "zoom"], checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Drag</Label>
            <Switch
              checked={node.options?.interaction?.drag}
              onCheckedChange={(checked) =>
                updateOptions(["interaction", "drag"], checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Brush</Label>
            <Switch
              checked={node.options?.interaction?.brush}
              onCheckedChange={(checked) =>
                updateOptions(["interaction", "brush"], checked)
              }
            />
          </div>
        </div>
      </Card>

      {/* Animation Settings */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Animation Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable Animation</Label>
            <Switch
              checked={node.options?.animation?.enabled}
              onCheckedChange={(checked) =>
                updateOptions(["animation", "enabled"], checked)
              }
            />
          </div>

          {node.options?.animation?.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration (ms)</Label>
                <Input
                  type="number"
                  value={node.options?.animation?.duration || 1000}
                  onChange={(e) =>
                    updateOptions(
                      ["animation", "duration"],
                      parseInt(e.target.value),
                    )
                  }
                  min={0}
                  max={5000}
                />
              </div>
              <div className="space-y-2">
                <Label>Easing</Label>
                <Select
                  value={node.options?.animation?.easing || "linear"}
                  onValueChange={(value) =>
                    updateOptions(["animation", "easing"], value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="ease">Ease</SelectItem>
                    <SelectItem value="ease-in">Ease In</SelectItem>
                    <SelectItem value="ease-out">Ease Out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Data Zoom Settings */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Data Zoom Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable Data Zoom</Label>
            <Switch
              checked={node.options?.dataZoom?.show}
              onCheckedChange={(checked) =>
                updateOptions(["dataZoom", "show"], checked)
              }
            />
          </div>

          {node.options?.dataZoom?.show && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Zoom Type</Label>
                <Select
                  value={node.options?.dataZoom?.type || "slider"}
                  onValueChange={(value) =>
                    updateOptions(["dataZoom", "type"], value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slider">Slider</SelectItem>
                    <SelectItem value="inside">Inside</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Toolbox Features */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Toolbox Features</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Show Toolbox</Label>
            <Switch
              checked={node.options?.toolbox?.show}
              onCheckedChange={(checked) =>
                updateOptions(["toolbox", "show"], checked)
              }
            />
          </div>

          {node.options?.toolbox?.show && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label>Save Image</Label>
                <Switch
                  checked={node.options?.toolbox?.features?.saveAsImage}
                  onCheckedChange={(checked) =>
                    updateOptions(
                      ["toolbox", "features", "saveAsImage"],
                      checked,
                    )
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Data View</Label>
                <Switch
                  checked={node.options?.toolbox?.features?.dataView}
                  onCheckedChange={(checked) =>
                    updateOptions(["toolbox", "features", "dataView"], checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Restore</Label>
                <Switch
                  checked={node.options?.toolbox?.features?.restore}
                  onCheckedChange={(checked) =>
                    updateOptions(["toolbox", "features", "restore"], checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Data Zoom</Label>
                <Switch
                  checked={node.options?.toolbox?.features?.dataZoom}
                  onCheckedChange={(checked) =>
                    updateOptions(["toolbox", "features", "dataZoom"], checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Magic Type</Label>
                <Switch
                  checked={node.options?.toolbox?.features?.magicType}
                  onCheckedChange={(checked) =>
                    updateOptions(["toolbox", "features", "magicType"], checked)
                  }
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Grid Settings */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Grid Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Show Grid</Label>
            <Switch
              checked={node.options?.grid?.show}
              onCheckedChange={(checked) =>
                updateOptions(["grid", "show"], checked)
              }
            />
          </div>

          {node.options?.grid?.show && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Top Margin</Label>
                <Input
                  value={node.options?.grid?.top || "10%"}
                  onChange={(e) =>
                    updateOptions(["grid", "top"], e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Right Margin</Label>
                <Input
                  value={node.options?.grid?.right || "10%"}
                  onChange={(e) =>
                    updateOptions(["grid", "right"], e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Bottom Margin</Label>
                <Input
                  value={node.options?.grid?.bottom || "10%"}
                  onChange={(e) =>
                    updateOptions(["grid", "bottom"], e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Left Margin</Label>
                <Input
                  value={node.options?.grid?.left || "10%"}
                  onChange={(e) =>
                    updateOptions(["grid", "left"], e.target.value)
                  }
                />
              </div>
              <div className="flex items-center justify-between col-span-2">
                <Label>Contain Label</Label>
                <Switch
                  checked={node.options?.grid?.containLabel}
                  onCheckedChange={(checked) =>
                    updateOptions(["grid", "containLabel"], checked)
                  }
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Axis Settings */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Axis Settings</h3>
        <div className="space-y-6">
          {/* X Axis */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">X Axis</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={node.options?.xAxis?.type || "category"}
                  onValueChange={(value) =>
                    updateOptions(["xAxis", "type"], value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="value">Value</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="time">Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Name Location</Label>
                <Select
                  value={node.options?.xAxis?.nameLocation || "middle"}
                  onValueChange={(value) =>
                    updateOptions(["xAxis", "nameLocation"], value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">Start</SelectItem>
                    <SelectItem value="middle">Middle</SelectItem>
                    <SelectItem value="end">End</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Y Axis */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Y Axis</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={node.options?.yAxis?.type || "value"}
                  onValueChange={(value) =>
                    updateOptions(["yAxis", "type"], value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="value">Value</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="time">Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Name Location</Label>
                <Select
                  value={node.options?.yAxis?.nameLocation || "middle"}
                  onValueChange={(value) =>
                    updateOptions(["yAxis", "nameLocation"], value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">Start</SelectItem>
                    <SelectItem value="middle">Middle</SelectItem>
                    <SelectItem value="end">End</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Legend Settings */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Legend Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Show Legend</Label>
            <Switch
              checked={node.options?.legend?.show}
              onCheckedChange={(checked) =>
                updateOptions(["legend", "show"], checked)
              }
            />
          </div>

          {node.options?.legend?.show && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={node.options?.legend?.type || "plain"}
                  onValueChange={(value) =>
                    updateOptions(["legend", "type"], value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plain">Plain</SelectItem>
                    <SelectItem value="scroll">Scroll</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Orient</Label>
                <Select
                  value={node.options?.legend?.orient || "horizontal"}
                  onValueChange={(value) =>
                    updateOptions(["legend", "orient"], value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="horizontal">Horizontal</SelectItem>
                    <SelectItem value="vertical">Vertical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Select
                  value={node.options?.legend?.position || "bottom"}
                  onValueChange={(value) =>
                    updateOptions(["legend", "position"], value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Mark Settings */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Mark Settings</h3>
        <div className="space-y-4">
          {/* Mark Point */}
          <div className="space-y-2">
            <Label>Mark Points</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={node.data.series[0]?.markPoint?.data?.some(
                    (d) => d.type === "max",
                  )}
                  onCheckedChange={(checked) => {
                    const series = [...node.data.series];
                    series[0] = {
                      ...series[0],
                      markPoint: {
                        data: checked ? [{ type: "max", name: "Maximum" }] : [],
                      },
                    };
                    updateNode({ data: { ...node.data, series } });
                  }}
                />
                <Label>Show Max Point</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={node.data.series[0]?.markPoint?.data?.some(
                    (d) => d.type === "min",
                  )}
                  onCheckedChange={(checked) => {
                    const series = [...node.data.series];
                    series[0] = {
                      ...series[0],
                      markPoint: {
                        data: checked ? [{ type: "min", name: "Minimum" }] : [],
                      },
                    };
                    updateNode({ data: { ...node.data, series } });
                  }}
                />
                <Label>Show Min Point</Label>
              </div>
            </div>
          </div>

          {/* Mark Line */}
          <div className="space-y-2">
            <Label>Mark Lines</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={node.data.series[0]?.markLine?.data?.some(
                    (d) => d.type === "average",
                  )}
                  onCheckedChange={(checked) => {
                    const series = [...node.data.series];
                    series[0] = {
                      ...series[0],
                      markLine: {
                        data: checked
                          ? [{ type: "average", name: "Average" }]
                          : [],
                      },
                    };
                    updateNode({ data: { ...node.data, series } });
                  }}
                />
                <Label>Show Average Line</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={node.data.series[0]?.markLine?.data?.some(
                    (d) => d.type === "median",
                  )}
                  onCheckedChange={(checked) => {
                    const series = [...node.data.series];
                    series[0] = {
                      ...series[0],
                      markLine: {
                        data: checked
                          ? [{ type: "median", name: "Median" }]
                          : [],
                      },
                    };
                    updateNode({ data: { ...node.data, series } });
                  }}
                />
                <Label>Show Median Line</Label>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Chart-specific Settings */}
      {node.chartType === "pie" && (
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-4">Pie Chart Settings</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Inner Radius %</Label>
                <Slider
                  value={[node.style?.innerRadius || 0]}
                  min={0}
                  max={90}
                  step={5}
                  onValueChange={([value]) =>
                    updateNode({
                      style: { ...node.style, innerRadius: value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Outer Radius %</Label>
                <Input
                  value={node.style?.outerRadius?.replace("%", "") || "100"}
                  type="number"
                  min={50}
                  max={100}
                  onChange={(e) =>
                    updateNode({
                      style: {
                        ...node.style,
                        outerRadius: `${e.target.value}%`,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
