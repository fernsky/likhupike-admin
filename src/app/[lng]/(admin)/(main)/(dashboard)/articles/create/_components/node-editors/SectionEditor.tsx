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
      className="relative space-y-6 py-4"
    >
      {/* Editor Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Section className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Section Editor
              </h3>
              <p className="text-sm text-gray-500">
                Organize content with flexible layouts
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-indigo-200"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            {node.nodes.length} Elements
          </Badge>
        </div>

        {/* Layout Controls */}
        <Card className="border-indigo-100">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-indigo-100">
                <LayoutTemplate className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700">
                  Layout Configuration
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <Layout className="w-4 h-4 text-indigo-500" />
                    Layout Type
                  </label>
                  <Select
                    value={node.layout}
                    onValueChange={(value: "grid" | "columns") =>
                      updateNode({ layout: value } as Partial<SectionNode>)
                    }
                  >
                    <SelectTrigger className="border-indigo-100">
                      <SelectValue placeholder="Select layout type" />
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
                </div>

                {node.layout === "grid" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <Grid2x2 className="w-4 h-4 text-indigo-500" />
                      Grid Columns
                    </label>
                    <Select
                      value={node.style?.columns?.toString()}
                      onValueChange={(value) =>
                        updateNode({
                          style: { ...node.style, columns: parseInt(value) },
                        } as Partial<SectionNode>)
                      }
                    >
                      <SelectTrigger className="border-indigo-100">
                        <SelectValue placeholder="Select column count" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { value: "2", icon: Grid2x2, label: "Two Columns" },
                          { value: "3", icon: Grid3x3, label: "Three Columns" },
                          {
                            value: "4",
                            icon: LayoutGrid,
                            label: "Four Columns",
                          },
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
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-indigo-600" />
          <div className="flex items-center gap-1 p-1 rounded-lg bg-indigo-50/50">
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
                    ? "bg-white text-indigo-700 shadow-sm border border-indigo-100"
                    : "text-gray-600 hover:text-indigo-600",
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

        {/* Section Title */}
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
                } as Partial<SectionNode>)
              }
              placeholder={
                activeLanguage === "en"
                  ? "Enter section title..."
                  : "खण्ड शीर्षक लेख्नुहोस्..."
              }
              className="border-indigo-100 focus-visible:ring-indigo-500"
            />
          </motion.div>
        </AnimatePresence>

        {/* Content Blocks */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Grid2x2 className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium">Content Blocks</span>
              </div>
              <p className="text-xs text-gray-500">
                Add and organize section content
              </p>
            </div>
            <Button
              onClick={() => setShowNodeSelector(true)}
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Content Block
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
                    className="flex items-center justify-between p-3 bg-white border border-indigo-100 rounded-lg group hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-indigo-50 rounded text-indigo-600">
                        <LayoutTemplate className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium capitalize">
                        {childNode.type}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeNode(nodeId)}
                      className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Node Selector */}
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

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Use sections to group related content and create organized
        layouts
      </div>
    </motion.div>
  );
};
