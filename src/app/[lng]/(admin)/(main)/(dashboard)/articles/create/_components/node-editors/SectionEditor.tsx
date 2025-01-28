import { SectionNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NodeSelector } from "../NodeSelector";
import {
  Section,
  LayoutGrid,
  Columns,
  Languages,
  MessageSquare,
  ArrowUpRight,
  Plus,
  Trash2,
  LayoutTemplate,
  Grid2x2,
  Grid3x3,
  Layout,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useArticleStore } from "../../_store/store";

interface SectionEditorProps {
  node: SectionNode;
}

export const SectionEditor = ({ node }: SectionEditorProps) => {
  const { updateNode } = useNode(node.id);
  const article = useArticleStore((state) => state.article);
  const [showNodeSelector, setShowNodeSelector] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");

  const layoutOptions = {
    grid: { icon: LayoutGrid, label: "Grid Layout" },
    columns: { icon: Columns, label: "Column Layout" },
  };

  const removeNode = (nodeId: string) => {
    updateNode({
      nodes: node.nodes.filter((id) => id !== nodeId),
    } as Partial<SectionNode>);
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
          className="bg-white/50 backdrop-blur-sm border-indigo-200"
        >
          <Section className="w-4 h-4 mr-1" />
          Section Editor
        </Badge>
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-indigo-200"
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          {node.nodes.length} Blocks
        </Badge>
      </div>

      <Card className="border-indigo-100">
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Select
                value={node.layout}
                onValueChange={(value: "grid" | "columns") =>
                  updateNode({ layout: value } as Partial<SectionNode>)
                }
              >
                <SelectTrigger className="border-indigo-100">
                  <SelectValue placeholder="Layout type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(layoutOptions).map(
                    ([key, { icon: Icon, label }]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {label}
                        </div>
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>

              {node.layout === "grid" && (
                <Select
                  value={node.style?.columns?.toString()}
                  onValueChange={(value) =>
                    updateNode({
                      style: { ...node.style, columns: parseInt(value) },
                    } as Partial<SectionNode>)
                  }
                >
                  <SelectTrigger className="border-indigo-100">
                    <SelectValue placeholder="Columns" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "2", icon: Grid2x2, label: "Two" },
                      { value: "3", icon: Grid3x3, label: "Three" },
                      { value: "4", icon: LayoutGrid, label: "Four" },
                    ].map(({ value, icon: Icon, label }) => (
                      <SelectItem key={value} value={value}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-1 p-1 rounded-lg bg-indigo-50/50">
        {["en", "ne"].map((lang) => (
          <motion.button
            key={lang}
            onClick={() => setActiveLanguage(lang as "en" | "ne")}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md transition-all",
              activeLanguage === lang
                ? "bg-white text-indigo-700 shadow-sm border border-indigo-100"
                : "text-gray-600",
            )}
          >
            {lang === "en" ? "EN" : "नेपाली"}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeLanguage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
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
              } as Partial<SectionNode>)
            }
            placeholder={
              activeLanguage === "en" ? "Section title" : "खण्ड शीर्षक"
            }
            className="border-indigo-100 focus-visible:ring-indigo-500"
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <Badge variant="outline" className="border-indigo-100">
          <Grid2x2 className="w-4 h-4 mr-1" />
          Content Blocks
        </Badge>
        <Button
          onClick={() => setShowNodeSelector(true)}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Block
        </Button>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {node.nodes.map((nodeId) => {
            const childNode = article.structure.nodes.find(
              (n) => n.id === nodeId,
            );
            if (!childNode) return null;

            return (
              <motion.div
                key={nodeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between p-2 bg-white border border-indigo-100 rounded-lg group hover:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-50 rounded text-indigo-600">
                    <LayoutTemplate className="w-4 h-4" />
                  </div>
                  <span className="text-sm capitalize">{childNode.type}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeNode(nodeId)}
                  className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <NodeSelector
        open={showNodeSelector}
        onClose={() => setShowNodeSelector(false)}
        onSelect={(newNode) => {
          updateNode({
            nodes: [...node.nodes, newNode.id],
          } as Partial<SectionNode>);
          setShowNodeSelector(false);
        }}
      />
    </motion.div>
  );
};
