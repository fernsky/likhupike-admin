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
      className="relative space-y-6 py-4"
    >
      {/* Editor Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Image Editor
              </h3>
              <p className="text-sm text-gray-500">
                Upload and configure your image content
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-blue-200"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            {activeLanguage === "en" ? "English" : "नेपाली"} Metadata
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
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8"
                    onClick={() =>
                      updateNode({ src: "" } as Partial<ImageNode>)
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <label className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 transition-colors">
                <ImageOff className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-500 text-center px-4">
                  Click to upload image
                </span>
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
          <div className="flex-1 space-y-4">
            {/* Image Options */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50/50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <Switch
                  checked={node.responsive || false}
                  onCheckedChange={(checked) =>
                    updateNode({ responsive: checked } as Partial<ImageNode>)
                  }
                />
                <div className="space-y-0.5">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <MonitorSmartphone className="w-3 h-3" />
                    Responsive
                  </div>
                  <p className="text-xs text-gray-500">Adapt to screen sizes</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={node.lazy || false}
                  onCheckedChange={(checked) =>
                    updateNode({ lazy: checked } as Partial<ImageNode>)
                  }
                />
                <div className="space-y-0.5">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <Loader2 className="w-3 h-3" />
                    Lazy Load
                  </div>
                  <p className="text-xs text-gray-500">Load on demand</p>
                </div>
              </div>
            </div>

            {/* Language Controls */}
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-blue-600" />
              <div className="flex items-center gap-1 p-1 rounded-lg bg-blue-50/50">
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
                        ? "bg-white text-blue-700 shadow-sm border border-blue-100"
                        : "text-gray-600 hover:text-blue-600",
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
          </div>
        </div>

        {/* Metadata Fields */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-2"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Alt Text
                </label>
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
                  placeholder={
                    activeLanguage === "en"
                      ? "Describe the image for accessibility..."
                      : "पहुँचयोग्यताको लागि छविको वर्णन गर्नुहोस्..."
                  }
                  className="border-blue-100 focus-visible:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Caption
                </label>
                <Input
                  value={node.caption?.content[activeLanguage] || ""}
                  onChange={(e) =>
                    updateNode({
                      caption: {
                        ...(node.caption || {
                          fallbackContent: "",
                          content: {},
                        }),
                        content: {
                          ...(node.caption?.content || {}),
                          [activeLanguage]: e.target.value,
                        },
                      },
                    } as Partial<ImageNode>)
                  }
                  placeholder={
                    activeLanguage === "en"
                      ? "Add a caption to describe the image..."
                      : "छविको व्याख्या गर्न क्याप्शन थप्नुहोस्..."
                  }
                  className="border-blue-100 focus-visible:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Always provide descriptive alt text to make your content
        accessible to everyone
      </div>
    </motion.div>
  );
};
