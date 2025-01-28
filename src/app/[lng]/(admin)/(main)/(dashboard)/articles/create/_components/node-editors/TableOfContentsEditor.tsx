import { TableOfContentsNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  List,
  Languages,
  MessageSquare,
  ArrowUpRight,
  Layers,
  AlignLeft,
  AlignRight,
  Pin,
  ListOrdered,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TableOfContentsEditorProps {
  node: TableOfContentsNode;
}

export const TableOfContentsEditor = ({ node }: TableOfContentsEditorProps) => {
  const { updateNode } = useNode(node.id);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");

  const depthOptions = [1, 2, 3, 4, 5, 6].map((depth) => ({
    value: depth.toString(),
    label: `Heading ${depth} (H${depth})`,
  }));

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
            <div className="p-2 bg-violet-50 rounded-lg">
              <List className="w-5 h-5 text-violet-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Table of Contents
              </h3>
              <p className="text-sm text-gray-500">
                Configure your content navigation
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-violet-200"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Max Depth: H{node.maxDepth}
          </Badge>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-violet-600" />
          <div className="flex items-center gap-1 p-1 rounded-lg bg-violet-50/50">
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
                    ? "bg-white text-violet-700 shadow-sm border border-violet-100"
                    : "text-gray-600 hover:text-violet-600",
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

        {/* Title Input */}
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
              Section Title
            </label>
            <Input
              value={node.title?.content[activeLanguage] || ""}
              onChange={(e) =>
                updateNode({
                  title: {
                    ...(node.title || { fallbackContent: "", content: {} }),
                    content: {
                      ...(node.title?.content || {}),
                      [activeLanguage]: e.target.value,
                    },
                  },
                } as Partial<TableOfContentsNode>)
              }
              placeholder={
                activeLanguage === "en"
                  ? "Enter section title..."
                  : "खण्ड शीर्षक लेख्नुहोस्..."
              }
              className="border-violet-100 focus-visible:ring-violet-500"
            />
          </motion.div>
        </AnimatePresence>

        {/* Settings Card */}
        <Card className="border-violet-100">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-violet-100">
                <Settings2 className="w-4 h-4 text-violet-500" />
                <span className="text-sm font-medium text-gray-700">
                  TOC Configuration
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <Layers className="w-4 h-4 text-violet-500" />
                    Maximum Depth
                  </label>
                  <Select
                    value={node.maxDepth?.toString()}
                    onValueChange={(value) =>
                      updateNode({
                        maxDepth: parseInt(value),
                      } as Partial<TableOfContentsNode>)
                    }
                  >
                    <SelectTrigger className="border-violet-100">
                      <SelectValue placeholder="Select max depth" />
                    </SelectTrigger>
                    <SelectContent>
                      {depthOptions.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    {node.style?.position === "left" ? (
                      <AlignLeft className="w-4 h-4 text-violet-500" />
                    ) : (
                      <AlignRight className="w-4 h-4 text-violet-500" />
                    )}
                    Position
                  </label>
                  <Select
                    value={node.style?.position}
                    onValueChange={(value: "left" | "right") =>
                      updateNode({
                        style: { ...node.style, position: value },
                      } as Partial<TableOfContentsNode>)
                    }
                  >
                    <SelectTrigger className="border-violet-100">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">
                        <div className="flex items-center gap-2">
                          <AlignLeft className="w-4 h-4" /> Left Side
                        </div>
                      </SelectItem>
                      <SelectItem value="right">
                        <div className="flex items-center gap-2">
                          <AlignRight className="w-4 h-4" /> Right Side
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between group hover:bg-violet-50/50 p-2 rounded-lg transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ListOrdered className="w-4 h-4 text-violet-500" />
                      <span className="text-sm font-medium">Numbered List</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Display numbered navigation items
                    </p>
                  </div>
                  <Switch
                    checked={node.numbered}
                    onCheckedChange={(checked) =>
                      updateNode({
                        numbered: checked,
                      } as Partial<TableOfContentsNode>)
                    }
                    className="data-[state=checked]:bg-violet-600"
                  />
                </div>

                <div className="flex items-center justify-between group hover:bg-violet-50/50 p-2 rounded-lg transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Pin className="w-4 h-4 text-violet-500" />
                      <span className="text-sm font-medium">
                        Sticky Position
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Keep TOC visible while scrolling
                    </p>
                  </div>
                  <Switch
                    checked={node.style?.sticky}
                    onCheckedChange={(checked) =>
                      updateNode({
                        style: { ...node.style, sticky: checked },
                      } as Partial<TableOfContentsNode>)
                    }
                    className="data-[state=checked]:bg-violet-600"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Use sticky positioning for longer content to maintain easy
        navigation
      </div>
    </motion.div>
  );
};
