import { VideoNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  Languages,
  MessageSquare,
  ArrowUpRight,
  Volume2,
  Repeat,
  Image as ImageIcon,
  Youtube,
  Settings,
  EyeOff,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface VideoEditorProps {
  node: VideoNode;
}

export const VideoEditor = ({ node }: VideoEditorProps) => {
  const { updateNode } = useNode(node.id);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative space-y-6 py-4"
    >
      {/* Editor Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Play className="w-5 h-5 text-amber-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Video Editor
              </h3>
              <p className="text-sm text-gray-500">
                Configure video content and its settings
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-amber-200"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Video Settings
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-6">
          {/* Video Source Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                <Youtube className="w-4 h-4 text-amber-500" />
                Video URL
              </label>
              <Input
                value={node.src}
                onChange={(e) =>
                  updateNode({ src: e.target.value } as Partial<VideoNode>)
                }
                placeholder="Enter YouTube or video URL"
                className="border-amber-100 focus-visible:ring-amber-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                <ImageIcon className="w-4 h-4 text-amber-500" />
                Thumbnail Image
              </label>
              <div className="border border-amber-100 rounded-lg p-4 bg-amber-50/20">
                <ImageUpload
                  value={node.poster}
                  onChange={(url) =>
                    updateNode({ poster: url } as Partial<VideoNode>)
                  }
                  aspectRatio="16:9"
                  className="border-amber-200 hover:bg-amber-50"
                />
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <Card className="border-amber-100">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-4 border-b border-amber-100">
                  <Settings className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Playback Settings
                  </span>
                </div>

                {[
                  {
                    label: "Show Controls",
                    icon: Settings,
                    value: node.controls ?? true,
                    onChange: (checked: boolean) =>
                      updateNode({ controls: checked } as Partial<VideoNode>),
                    description: "Display video player controls",
                  },
                  {
                    label: "Autoplay",
                    icon: Play,
                    value: node.autoplay,
                    onChange: (checked: boolean) =>
                      updateNode({ autoplay: checked } as Partial<VideoNode>),
                    description: "Start playing automatically",
                  },
                  {
                    label: "Loop Video",
                    icon: Repeat,
                    value: node.loop,
                    onChange: (checked: boolean) =>
                      updateNode({ loop: checked } as Partial<VideoNode>),
                    description: "Replay when finished",
                  },
                  {
                    label: "Start Muted",
                    icon: Volume2,
                    value: node.muted,
                    onChange: (checked: boolean) =>
                      updateNode({ muted: checked } as Partial<VideoNode>),
                    description: "Begin playback without sound",
                  },
                ].map((setting, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <setting.icon className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-medium">
                          {setting.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      checked={setting.value}
                      onCheckedChange={setting.onChange}
                      className="data-[state=checked]:bg-amber-600"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
          <Languages className="w-4 h-4 text-amber-600" />
          <div className="flex items-center gap-1 p-1 rounded-lg bg-amber-50/50">
            {[
              { code: "en", label: "EN" },
              { code: "ne", label: "नेपाली" },
            ].map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => setActiveLanguage(lang.code as "en" | "ne")}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1",
                  activeLanguage === lang.code
                    ? "bg-white text-amber-700 shadow-sm border border-amber-100"
                    : "text-gray-600 hover:text-amber-600",
                )}
              >
                {lang.label}
                {activeLanguage === lang.code && (
                  <ArrowUpRight className="w-3 h-3" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Caption Input */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium text-gray-700">
              Video Caption
            </label>
            <Input
              value={node.caption?.content[activeLanguage] || ""}
              onChange={(e) =>
                updateNode({
                  caption: {
                    ...(node.caption || { fallbackContent: "", content: {} }),
                    content: {
                      ...(node.caption?.content || {}),
                      [activeLanguage]: e.target.value,
                    },
                  },
                } as Partial<VideoNode>)
              }
              placeholder={
                activeLanguage === "en"
                  ? "Enter video caption..."
                  : "भिडियो क्याप्शन लेख्नुहोस्..."
              }
              className="border-amber-100 focus-visible:ring-amber-500"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Add descriptive captions and thumbnails to improve video
        accessibility and engagement
      </div>
    </motion.div>
  );
};
