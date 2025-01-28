import { QuoteNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Quote,
  Languages,
  User,
  Link,
  AlignLeft,
  AlignRight,
  AlignCenter,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface QuoteEditorProps {
  node: QuoteNode;
}

export const QuoteEditor = ({ node }: QuoteEditorProps) => {
  const { updateNode } = useNode(node.id);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");

  const borderStyleIcons = {
    left: <AlignLeft className="w-4 h-4" />,
    right: <AlignRight className="w-4 h-4" />,
    both: <AlignCenter className="w-4 h-4" />,
    none: <Quote className="w-4 h-4" />,
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
          className="bg-white/50 backdrop-blur-sm border-purple-200"
        >
          <Quote className="w-4 h-4 mr-1" />
          Quote Editor
        </Badge>
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-purple-200"
        >
          <Languages className="w-3 h-3 mr-1" />
          {activeLanguage === "en" ? "EN" : "नेपाली"}
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <Select
          value={node.style?.borderStyle || "left"}
          onValueChange={(value: "left" | "right" | "both" | "none") =>
            updateNode({
              style: { ...node.style, borderStyle: value },
            } as Partial<QuoteNode>)
          }
        >
          <SelectTrigger className="w-32 border-purple-100">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            {[
              {
                value: "left",
                icon: <AlignLeft className="w-4 h-4" />,
                label: "Left",
              },
              {
                value: "right",
                icon: <AlignRight className="w-4 h-4" />,
                label: "Right",
              },
              {
                value: "both",
                icon: <AlignCenter className="w-4 h-4" />,
                label: "Both",
              },
              {
                value: "none",
                icon: <Quote className="w-4 h-4" />,
                label: "None",
              },
            ].map(({ value, icon, label }) => (
              <SelectItem key={value} value={value}>
                <div className="flex items-center gap-2">
                  {icon}
                  {label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-purple-50/50">
          {["en", "ne"].map((lang) => (
            <motion.button
              key={lang}
              onClick={() => setActiveLanguage(lang as "en" | "ne")}
              className={cn(
                "px-3 py-1 text-sm font-medium rounded-md transition-all",
                activeLanguage === lang
                  ? "bg-white text-purple-700 shadow-sm border border-purple-100"
                  : "text-gray-600",
              )}
            >
              {lang === "en" ? "EN" : "नेपाली"}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeLanguage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-3"
        >
          <div className="relative">
            <Textarea
              value={node.content.content[activeLanguage]}
              onChange={(e) =>
                updateNode({
                  content: {
                    ...node.content,
                    content: {
                      ...node.content.content,
                      [activeLanguage]: e.target.value,
                    },
                  },
                } as Partial<QuoteNode>)
              }
              placeholder={
                activeLanguage === "en" ? "Quote text" : "उद्धरण पाठ"
              }
              className="min-h-[120px] text-lg leading-relaxed focus-visible:ring-purple-500 border-purple-100 resize-none"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {node.content.content[activeLanguage]?.length || 0} chars
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              value={node.author?.content[activeLanguage] || ""}
              onChange={(e) =>
                updateNode({
                  author: {
                    ...(node.author || { fallbackContent: "", content: {} }),
                    content: {
                      ...(node.author?.content || {}),
                      [activeLanguage]: e.target.value,
                    },
                  },
                } as Partial<QuoteNode>)
              }
              placeholder={activeLanguage === "en" ? "Author" : "लेखक"}
              className="border-purple-100 focus-visible:ring-purple-500"
            />

            <Input
              value={node.source?.content[activeLanguage] || ""}
              onChange={(e) =>
                updateNode({
                  source: {
                    ...(node.source || { fallbackContent: "", content: {} }),
                    content: {
                      ...(node.source?.content || {}),
                      [activeLanguage]: e.target.value,
                    },
                  },
                } as Partial<QuoteNode>)
              }
              placeholder={activeLanguage === "en" ? "Source" : "स्रोत"}
              className="border-purple-100 focus-visible:ring-purple-500"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
