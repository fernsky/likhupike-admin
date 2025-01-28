import { ChartNode } from "../../../_store/types";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ColorPicker } from "@/components/ui/color-picker";
import { Separator } from "@/components/ui/separator";

interface StyleEditorProps {
  node: ChartNode;
  updateNode: (updates: Partial<ChartNode>) => void;
}

export const StyleEditor = ({ node, updateNode }: StyleEditorProps) => {
  const updateStyle = (path: string, value: any) => {
    updateNode({
      style: { ...node.style, [path]: value },
    });
  };

  const updateOptions = (value: any) => {
    updateNode({
      options: { ...node.options, ...value },
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Appearance */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Basic Appearance</h3>
        <div className="space-y-4">
          {/* Theme */}
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={node.options?.theme || "light"}
              onValueChange={(value: "light" | "dark" | "custom") =>
                updateOptions({ theme: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Background */}
          <div className="space-y-2">
            <Label>Background Color</Label>
            <ColorPicker
              color={node.style?.background || "#ffffff"}
              onChange={(color) => updateStyle("background", color)}
            />
          </div>

          {/* Border Radius */}
          <div className="space-y-2">
            <Label>Border Radius</Label>
            <Slider
              value={[node.style?.borderRadius || 0]}
              min={0}
              max={20}
              step={1}
              onValueChange={([value]) => updateStyle("borderRadius", value)}
            />
          </div>

          {/* Padding */}
          <div className="space-y-2">
            <Label>Padding</Label>
            <Slider
              value={[node.style?.padding || 20]}
              min={0}
              max={50}
              step={5}
              onValueChange={([value]) => updateStyle("padding", value)}
            />
          </div>
        </div>
      </Card>

      {/* Dimensions */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Dimensions</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Height (px)</Label>
            <Slider
              value={[node.style?.height || 400]}
              min={200}
              max={800}
              step={10}
              onValueChange={([value]) => updateStyle("height", value)}
            />
          </div>
        </div>
      </Card>

      {/* Colors */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Colors</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {(node.options?.color || []).map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <ColorPicker
                  color={color}
                  onChange={(newColor) => {
                    const colors = [...(node.options?.color || [])];
                    colors[index] = newColor;
                    updateNode({
                      options: { ...node.options, color: colors },
                    });
                  }}
                />
                <Label>Series {index + 1}</Label>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Typography */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Typography</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select
              value={node.style?.fontFamily}
              onValueChange={(value) => updateStyle("fontFamily", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system-ui">System UI</SelectItem>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="helvetica">Helvetica</SelectItem>
                <SelectItem value="arial">Arial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Font Size</Label>
            <Slider
              value={[node.style?.fontSize || 12]}
              min={10}
              max={20}
              step={1}
              onValueChange={([value]) => updateStyle("fontSize", value)}
            />
          </div>
        </div>
      </Card>

      {/* Animation */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4">Animation</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable Animation</Label>
            <Switch
              checked={node.style?.animation?.enabled}
              onCheckedChange={(checked) =>
                updateStyle("animation", {
                  ...node.style?.animation,
                  enabled: checked,
                })
              }
            />
          </div>

          {node.style?.animation?.enabled && (
            <>
              <div className="space-y-2">
                <Label>Duration (ms)</Label>
                <Slider
                  value={[node.style?.animation?.duration || 1000]}
                  min={100}
                  max={2000}
                  step={100}
                  onValueChange={([value]) =>
                    updateStyle("animation", {
                      ...node.style?.animation,
                      duration: value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Easing</Label>
                <Select
                  value={node.style?.animation?.easing || "linear"}
                  onValueChange={(value) =>
                    updateStyle("animation", {
                      ...node.style?.animation,
                      easing: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select easing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="ease">Ease</SelectItem>
                    <SelectItem value="ease-in">Ease In</SelectItem>
                    <SelectItem value="ease-out">Ease Out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Chart-specific Styles */}
      {(node.chartType === "line" || node.chartType === "area") && (
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-4">Line Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Show Points</Label>
              <Switch
                checked={node.style?.showPoints}
                onCheckedChange={(checked) =>
                  updateStyle("showPoints", checked)
                }
              />
            </div>
          </div>
        </Card>
      )}

      {(node.chartType === "pie" || node.chartType === "donut") && (
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-4">Pie/Donut Settings</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Inner Radius %</Label>
              <Slider
                value={[node.style?.innerRadius || 0]}
                min={0}
                max={90}
                step={5}
                onValueChange={([value]) => updateStyle("innerRadius", value)}
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
                  updateStyle("outerRadius", `${e.target.value}%`)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Show Labels</Label>
              <Switch
                checked={node.style?.showLabels}
                onCheckedChange={(checked) =>
                  updateStyle("showLabels", checked)
                }
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
