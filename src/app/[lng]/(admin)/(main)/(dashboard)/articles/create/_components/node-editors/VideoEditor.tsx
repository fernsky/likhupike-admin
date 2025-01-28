import { VideoNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  Languages,
  Settings,
  Volume2,
  Repeat,
  Youtube,
  ImageIcon,
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <Badge variant="outline" className="bg-white border-amber-200">
        <Play className="w-4 h-4 mr-1" />
        Video Editor
      </Badge>

      {/* Main Controls */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            value={node.src}
            onChange={(e) =>
              updateNode({ src: e.target.value } as Partial<VideoNode>)
            }
            placeholder="Enter video URL"
            className="border-amber-100"
          />
          <ImageUpload
            value={node.poster}
            onChange={(url) =>
              updateNode({ poster: url } as Partial<VideoNode>)
            }
            aspectRatio="16:9"
            className="border-amber-200"
          />
        </div>

        <Card className="border-amber-100">
          <CardContent className="space-y-4 pt-6">
            {[
              {
                label: "Controls",
                icon: Settings,
                value: node.controls ?? true,
              },
              { label: "Autoplay", icon: Play, value: node.autoplay },
              { label: "Loop", icon: Repeat, value: node.loop },
              { label: "Muted", icon: Volume2, value: node.muted },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <setting.icon className="w-4 h-4 text-amber-500" />
                  {setting.label}
                </div>
                <Switch
                  checked={setting.value}
                  onCheckedChange={(checked) =>
                    updateNode({
                      [setting.label.toLowerCase()]: checked,
                    } as Partial<VideoNode>)
                  }
                  className="data-[state=checked]:bg-amber-600"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Language Selection */}
      <div className="flex gap-2">
        {["en", "ne"].map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLanguage(lang as "en" | "ne")}
            className={cn(
              "px-4 py-2 rounded-md transition-all",
              activeLanguage === lang
                ? "bg-amber-50 text-amber-700 border border-amber-100"
                : "text-gray-600",
            )}
          >
            {lang === "en" ? "EN" : "नेपाली"}
          </button>
        ))}
      </div>

      {/* Caption Input */}
      <Input
        value={node.caption?.content[activeLanguage] || ""}
        onChange={(e) =>
          updateNode({
            caption: {
              fallbackContent: "",
              content: {
                ...node.caption?.content,
                [activeLanguage]: e.target.value,
              },
            },
          } as Partial<VideoNode>)
        }
        className="border-amber-100"
        placeholder="Video caption..."
      />
    </motion.div>
  );
};
