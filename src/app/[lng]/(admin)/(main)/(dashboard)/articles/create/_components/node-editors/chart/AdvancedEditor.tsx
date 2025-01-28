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
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import {
  Settings2,
  Sliders,
  MousePointer,
  LineChart,
  ChevronsUpDown,
  Radar,
  Grid,
  LayoutGrid,
  Palette,
  BadgeAlert,
  Download,
  RefreshCcw,
  ArrowUpRight,
  Sparkles,
  GalleryVertical,
} from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

type ChartSetting = {
  type: string;
  label: string;
  path: [keyof ChartNode["options"], string];
  description?: string;
  icon?: any;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
};

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

  // Group settings for better organization
  const settingsGroups = [
    {
      id: "interaction",
      title: "Interaction Settings",
      icon: MousePointer,
      settings: [
        {
          type: "switch",
          label: "Enable Zoom",
          icon: ChevronsUpDown,
          path: ["interaction", "zoom"],
          description: "Allow users to zoom into the chart",
        },
        {
          type: "switch",
          label: "Enable Drag",
          icon: MousePointer,
          path: ["interaction", "drag"],
          description: "Allow users to drag the chart",
        },
        {
          type: "switch",
          label: "Enable Brush",
          icon: Sliders,
          path: ["interaction", "brush"],
          description: "Enable data selection by brushing",
        },
      ],
    },
    {
      id: "animation",
      title: "Animation Settings",
      icon: Sparkles,
      settings: [
        {
          type: "switch",
          label: "Enable Animation",
          path: ["animation", "enabled"],
          description: "Animate chart updates",
        },
        {
          type: "select",
          label: "Easing Function",
          path: ["animation", "easing"],
          options: [
            { value: "linear", label: "Linear" },
            { value: "ease", label: "Ease" },
            { value: "ease-in", label: "Ease In" },
            { value: "ease-out", label: "Ease Out" },
          ],
          description: "Control animation timing",
        },
      ],
    },
    // ...additional groups can be defined here
  ];

  // Additional settings groups
  const allSettingsGroups = [
    ...settingsGroups,
    {
      id: "tooltip",
      title: "Tooltip Configuration",
      icon: BadgeAlert,
      settings: [
        {
          type: "switch",
          label: "Show Tooltip",
          path: ["tooltip", "show"],
          description: "Display data tooltips on hover",
        },
        {
          type: "select",
          label: "Trigger Mode",
          path: ["tooltip", "trigger"],
          options: [
            { value: "item", label: "Single Item" },
            { value: "axis", label: "Axis" },
            { value: "none", label: "Disabled" },
          ],
          description: "How tooltips are triggered",
        },
        {
          type: "color",
          label: "Background",
          path: ["tooltip", "backgroundColor"],
          description: "Tooltip background color",
        },
      ],
    },
    {
      id: "grid",
      title: "Grid Settings",
      icon: Grid,
      settings: [
        {
          type: "switch",
          label: "Show Grid",
          path: ["grid", "show"],
          description: "Display background grid",
        },
        {
          type: "spacing",
          label: "Grid Margins",
          paths: {
            top: ["grid", "top"],
            right: ["grid", "right"],
            bottom: ["grid", "bottom"],
            left: ["grid", "left"],
          },
          description: "Adjust grid spacing",
        },
      ],
    },
    {
      id: "legend",
      title: "Legend Settings",
      icon: LayoutGrid,
      settings: [
        {
          type: "switch",
          label: "Show Legend",
          path: ["legend", "show"],
          description: "Display chart legend",
        },
        {
          type: "select",
          label: "Position",
          path: ["legend", "position"],
          options: [
            { value: "top", label: "Top" },
            { value: "bottom", label: "Bottom" },
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
          ],
          description: "Legend placement",
        },
      ],
    },
    {
      id: "axis",
      title: "Axis Configuration",
      icon: ChevronsUpDown,
      settings: [
        {
          type: "switch",
          label: "Show X Axis",
          path: ["xAxis", "show"],
          description: "Display horizontal axis",
        },
        {
          type: "switch",
          label: "Show Y Axis",
          path: ["yAxis", "show"],
          description: "Display vertical axis",
        },
        {
          type: "select",
          label: "X Axis Type",
          path: ["xAxis", "type"],
          options: [
            { value: "category", label: "Category" },
            { value: "value", label: "Value" },
            { value: "time", label: "Time" },
          ],
          description: "Data type for X axis",
        },
        {
          type: "select",
          label: "Y Axis Type",
          path: ["yAxis", "type"],
          options: [
            { value: "value", label: "Value" },
            { value: "log", label: "Logarithmic" },
          ],
          description: "Data type for Y axis",
        },
      ],
    },
    {
      id: "dataZoom",
      title: "Data Zoom Settings",
      icon: Sliders,
      settings: [
        {
          type: "switch",
          label: "Enable Data Zoom",
          path: ["dataZoom", "enabled"],
          description: "Allow zooming into data ranges",
        },
        {
          type: "select",
          label: "Zoom Mode",
          path: ["dataZoom", "type"],
          options: [
            { value: "inside", label: "Mouse Scroll" },
            { value: "slider", label: "Slider" },
            { value: "both", label: "Both" },
          ],
          description: "How users can zoom the data",
        },
      ],
    },
  ];

  const getChartSpecificSettings = () => {
    switch (node.chartType) {
      case "pie":
      case "donut":
        return {
          title: `${node.chartType === "pie" ? "Pie" : "Donut"} Chart Settings`,
          icon: Radar,
          settings: [
            {
              type: "slider",
              label: "Inner Radius",
              path: ["pieConfig", "innerRadius"],
              min: 0,
              max: 80,
              description: "Inner circle size (donut hole)",
            },
            {
              type: "switch",
              label: "Show Labels",
              path: ["pieConfig", "showLabels"],
              description: "Display value labels",
            },
            {
              type: "select",
              label: "Label Position",
              path: ["pieConfig", "labelPosition"],
              options: [
                { value: "outside", label: "Outside" },
                { value: "inside", label: "Inside" },
                { value: "center", label: "Center" },
              ],
              description: "Where to place labels",
            },
          ],
        };
      case "line":
      case "area":
        return {
          title: "Line Settings",
          icon: LineChart,
          settings: [
            {
              type: "switch",
              label: "Smooth Line",
              path: ["lineStyle", "smooth"],
              description: "Enable curve smoothing",
            },
            {
              type: "switch",
              label: "Show Area",
              path: ["lineStyle", "area"],
              description: "Fill area under line",
            },
            {
              type: "switch",
              label: "Show Points",
              path: ["lineStyle", "showSymbol"],
              description: "Display data points",
            },
          ],
        };
      // Add more chart-specific settings as needed
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative space-y-6 py-4"
    >
      {/* Editor Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-50 rounded-lg">
            <Settings2 className="w-5 h-5 text-cyan-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">
              Advanced Settings
            </h3>
            <p className="text-sm text-gray-500">
              Fine-tune your chart configuration
            </p>
          </div>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="grid grid-cols-2 gap-4">
        {allSettingsGroups.map((group) => (
          <Card key={group.id} className="border-cyan-100">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Group Header */}
                <div className="flex items-center gap-2 pb-2 border-b border-cyan-100">
                  <group.icon className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {group.title}
                  </span>
                </div>

                {/* Settings Grid */}
                <div className="grid gap-4">
                  {group.settings.map((setting, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between group hover:bg-cyan-50/50 p-2 rounded-lg transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <GalleryVertical className="w-4 h-4 text-cyan-500" />
                          <span className="text-sm font-medium">
                            {setting.label}
                          </span>
                        </div>
                        {setting.description && (
                          <p className="text-xs text-gray-500">
                            {setting.description}
                          </p>
                        )}
                      </div>
                      {setting.type === "select" && setting.path && (
                        <Select
                          value={String(
                            (
                              node.options?.[
                                setting.path[0] as keyof typeof node.options
                              ] as any
                            )?.[setting.path[1]] || "",
                          )}
                          onValueChange={(value) =>
                            updateOptions(setting.path, value)
                          }
                        />
                      )}
                      {setting.type === "select" &&
                        setting.path &&
                        "options" in setting &&
                        setting.options && (
                          <Select
                            value={String(
                              (
                                node.options?.[
                                  setting.path[0] as keyof typeof node.options
                                ] as any
                              )?.[setting.path[1]] ?? "",
                            )}
                            onValueChange={(value) =>
                              updateOptions(setting.path, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              {setting.options.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart-specific Settings */}
      {getChartSpecificSettings() && (
        <Card className="border-cyan-100 col-span-2">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-cyan-100">
                {React.createElement(getChartSpecificSettings()!.icon, {
                  className: "w-4 h-4 text-cyan-500",
                })}
                <span className="text-sm font-medium text-gray-700">
                  {getChartSpecificSettings()!.title}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {getChartSpecificSettings()!.settings.map((setting, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group hover:bg-cyan-50/50 p-2 rounded-lg transition-colors"
                  >
                    {/* ...existing setting content JSX... */}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Fine-tune your chart settings to create more engaging and
        interactive visualizations
      </div>
    </motion.div>
  );
};
