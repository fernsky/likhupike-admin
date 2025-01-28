import { ImageNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Languages,
  ArrowUpRight,
  MessageSquare,
  MonitorSmartphone,
  Loader2,
  ImageOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ImageEditorProps {
  node: ImageNode;
}

export const ImageEditor = ({ node }: ImageEditorProps) => {
  const { updateNode } = useNode(node.id);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // TODO: Implement image upload logic
    // Simulating upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const url = URL.createObjectURL(file);
    updateNode({ src: url } as Partial<ImageNode>);
    setIsUploading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative space-y-4 py-4"
    >
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-blue-200"
        >
          <ImageIcon className="w-4 h-4 mr-1" />
          Image Editor
        </Badge>
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-blue-200"
        >
          <Languages className="w-3 h-3 mr-1" />
          {activeLanguage === "en" ? "EN" : "नेपाली"}
        </Badge>
      </div>

      {/* Image Upload/Preview Section */}
      <div className="flex items-start gap-4">
        <div className="w-48 h-48 rounded-lg overflow-hidden border border-blue-100 flex-shrink-0">
          {isUploading ? (
            <div className="w-full h-full flex items-center justify-center bg-blue-50">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          ) : node.src ? (
            <div className="relative group">
              <img
                src={node.src}
                alt={node.alt?.fallbackContent || ""}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={() => updateNode({ src: "" } as Partial<ImageNode>)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <label className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 transition-colors">
              <Upload className="w-8 h-8 text-gray-400" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        {/* Settings */}
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50/50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <Switch
                checked={node.responsive || false}
                onCheckedChange={(checked) =>
                  updateNode({ responsive: checked } as Partial<ImageNode>)
                }
              />
              <MonitorSmartphone className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={node.lazy || false}
                onCheckedChange={(checked) =>
                  updateNode({ lazy: checked } as Partial<ImageNode>)
                }
              />
              <Loader2 className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-blue-50/50">
            {["en", "ne"].map((lang) => (
              <motion.button
                key={lang}
                onClick={() => setActiveLanguage(lang as "en" | "ne")}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-md transition-all",
                  activeLanguage === lang
                    ? "bg-white text-blue-700 shadow-sm border border-blue-100"
                    : "text-gray-600",
                )}
              >
                {lang === "en" ? "EN" : "नेपाली"}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Metadata Fields */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLanguage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3"
        >
          <Input
            value={node.alt?.content[activeLanguage] || ""}
            onChange={(e) =>
              updateNode({
                alt: {
                  ...(node.alt || { fallbackContent: "", content: {} }),
                  content: {
                    ...(node.alt?.content || {}),
                    [activeLanguage]: e.target.value,
                  },
                },
              } as Partial<ImageNode>)
            }
            placeholder={activeLanguage === "en" ? "Alt text" : "वैकल्पिक पाठ"}
            className="border-blue-100 focus-visible:ring-blue-500"
          />

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
              } as Partial<ImageNode>)
            }
            placeholder={activeLanguage === "en" ? "Caption" : "क्याप्शन"}
            className="border-blue-100 focus-visible:ring-blue-500"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
