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
          className="bg-white/50 backdrop-blur-sm border-violet-200"
        >
          <List className="w-4 h-4 mr-1" />
          Table of Contents
        </Badge>
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-violet-200"
        >
          <Layers className="w-3 h-3 mr-1" />H{node.maxDepth}
        </Badge>
      </div>

      <div className="flex items-center gap-1 p-1 rounded-lg bg-violet-50/50">
        {["en", "ne"].map((lang) => (
          <motion.button
            key={lang}
            onClick={() => setActiveLanguage(lang as "en" | "ne")}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md transition-all",
              activeLanguage === lang
                ? "bg-white text-violet-700 shadow-sm border border-violet-100"
                : "text-gray-600",
            )}
          >
            {lang === "en" ? "EN" : "नेपाली"}
          </motion.button>
        ))}
      </div>

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
        placeholder={activeLanguage === "en" ? "Title" : "शीर्षक"}
        className="border-violet-100 focus-visible:ring-violet-500"
      />

      <Card className="border-violet-100">
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-3">
            <Select
              value={node.maxDepth?.toString()}
              onValueChange={(value) =>
                updateNode({
                  maxDepth: parseInt(value),
                } as Partial<TableOfContentsNode>)
              }
            >
              <SelectTrigger className="border-violet-100">
                <SelectValue placeholder="Max depth" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((depth) => (
                  <SelectItem key={depth} value={depth.toString()}>
                    H{depth}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={node.style?.position}
              onValueChange={(value: "left" | "right") =>
                updateNode({
                  style: { ...node.style, position: value },
                } as Partial<TableOfContentsNode>)
              }
            >
              <SelectTrigger className="border-violet-100">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">
                  <div className="flex items-center gap-2">
                    <AlignLeft className="w-4 h-4" /> Left
                  </div>
                </SelectItem>
                <SelectItem value="right">
                  <div className="flex items-center gap-2">
                    <AlignRight className="w-4 h-4" /> Right
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-3 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Switch
                checked={node.numbered}
                onCheckedChange={(checked) =>
                  updateNode({
                    numbered: checked,
                  } as Partial<TableOfContentsNode>)
                }
                className="data-[state=checked]:bg-violet-600"
              />
              <ListOrdered className="w-4 h-4 text-violet-500" />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={node.style?.sticky}
                onCheckedChange={(checked) =>
                  updateNode({
                    style: { ...node.style, sticky: checked },
                  } as Partial<TableOfContentsNode>)
                }
                className="data-[state=checked]:bg-violet-600"
              />
              <Pin className="w-4 h-4 text-violet-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
