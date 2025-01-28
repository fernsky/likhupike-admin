import { ChartNode } from "../../../_store/types";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ColorPicker } from "@/components/ui/color-picker";
import {
  Palette,
  Sun,
  Moon,
  Settings,
  Maximize,
  Type,
  Sparkles,
  BoxSelect,
  Circle,
  Brush,
  MessageSquare,
  ArrowUpRight,
  GalleryVertical,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StyleEditorProps {
  node: ChartNode;
  updateNode: (updates: Partial<ChartNode>) => void;
}

type StyleSetting = {
  type: string;
  label: string;
  value: any;
  onChange: (value: any) => void;
  icon?: LucideIcon;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
};

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

  const styleGroups = [
    {
      id: "appearance",
      title: "Basic Appearance",
      icon: Palette,
      settings: [
        {
          type: "theme",
          label: "Theme Mode",
          icon: node.options?.theme === "dark" ? Moon : Sun,
          value: node.options?.theme || "light",
          onChange: (value: "light" | "dark" | "custom") =>
            updateOptions({ theme: value }),
          options: [
            { value: "light", label: "Light Theme" },
            { value: "dark", label: "Dark Theme" },
            { value: "custom", label: "Custom Theme" },
          ],
        },
        {
          type: "color",
          label: "Background",
          icon: BoxSelect,
          value: node.style?.background || "#ffffff",
          onChange: (color: string) => updateStyle("background", color),
        },
        {
          type: "slider",
          label: "Border Radius",
          icon: Circle,
          value: node.style?.borderRadius || 0,
          onChange: (value: number) => updateStyle("borderRadius", value),
          min: 0,
          max: 20,
          step: 1,
        },
        // ...add more appearance settings
      ],
    },
    {
      id: "typography",
      title: "Typography",
      icon: Type,
      settings: [
        {
          type: "select",
          label: "Font Family",
          value: node.style?.fontFamily,
          onChange: (value: string) => updateStyle("fontFamily", value),
          options: [
            { value: "system-ui", label: "System UI" },
            { value: "inter", label: "Inter" },
            { value: "helvetica", label: "Helvetica" },
            { value: "arial", label: "Arial" },
          ],
        },
        // ...add more typography settings
      ],
    },
    // ...additional groups
  ];

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
          <div className="p-2 bg-fuchsia-50 rounded-lg">
            <Brush className="w-5 h-5 text-fuchsia-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">
              Style Editor
            </h3>
            <p className="text-sm text-gray-500">
              Customize the visual appearance of your chart
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-fuchsia-200"
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          {node.chartType} Chart
        </Badge>
      </div>

      {/* Style Groups */}
      <div className="grid grid-cols-2 gap-4">
        {styleGroups.map((group) => (
          <Card key={group.id} className="border-fuchsia-100">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-fuchsia-100">
                  <group.icon className="w-4 h-4 text-fuchsia-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {group.title}
                  </span>
                </div>

                <div className="space-y-4">
                  {group.settings.map((setting, index) => (
                    <div
                      key={index}
                      className="group hover:bg-fuchsia-50/50 p-2 rounded-lg transition-colors"
                    >
                      {/* Render different control types based on setting.type */}
                      {setting.type === "theme" && (
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <GalleryVertical className="w-4 h-4 text-fuchsia-500" />
                              <span className="text-sm font-medium">
                                {setting.label}
                              </span>
                            </div>
                          </div>
                          <Select
                            value={String(setting.value)}
                            onValueChange={(value) => {
                              if (
                                setting.type === "theme" &&
                                (value === "light" ||
                                  value === "dark" ||
                                  value === "custom")
                              ) {
                                (
                                  setting.onChange as (
                                    value: "light" | "dark" | "custom",
                                  ) => void
                                )(value);
                              }
                            }}
                          >
                            <SelectTrigger className="w-[140px] border-fuchsia-100">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {setting.options?.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Add other control type renderers... */}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart-specific Style Settings */}
      {(node.chartType === "line" || node.chartType === "area") && (
        <Card className="border-fuchsia-100">
          <CardContent className="p-4">
            {/* ...line/area specific settings... */}
          </CardContent>
        </Card>
      )}

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Use consistent styling across your charts to maintain visual
        harmony
      </div>
    </motion.div>
  );
};
