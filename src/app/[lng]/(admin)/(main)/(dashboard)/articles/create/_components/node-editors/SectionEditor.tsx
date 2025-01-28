import { SectionNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NodeSelector } from "../NodeSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useArticleStore } from "../../_store/store";
import { useState } from "react";

interface SectionEditorProps {
  node: SectionNode;
}

export const SectionEditor = ({ node }: SectionEditorProps) => {
  const { updateNode } = useNode(node.id);
  const article = useArticleStore((state) => state.article);
  const [showNodeSelector, setShowNodeSelector] = useState(false);

  const removeNode = (nodeId: string) => {
    updateNode({
      nodes: node.nodes.filter((id) => id !== nodeId),
    } as Partial<SectionNode>);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Select
          value={node.layout}
          onValueChange={(value: "grid" | "columns") =>
            updateNode({ layout: value } as Partial<SectionNode>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="columns">Columns</SelectItem>
          </SelectContent>
        </Select>

        {node.layout === "grid" && (
          <Select
            value={node.style?.columns?.toString()}
            onValueChange={(value) =>
              updateNode({
                style: {
                  ...node.style,
                  columns: parseInt(value),
                },
              } as Partial<SectionNode>)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Number of columns" />
            </SelectTrigger>
            <SelectContent>
              {[2, 3, 4].map((cols) => (
                <SelectItem key={cols} value={cols.toString()}>
                  {cols} Columns
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <Tabs defaultValue="en">
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">नेपाली</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Section Title</label>
                <Input
                  value={node.title?.content[lang as "en" | "ne"] || ""}
                  onChange={(e) =>
                    updateNode({
                      title: {
                        ...(node.title || { fallbackContent: "", content: {} }),
                        content: {
                          ...(node.title?.content || {}),
                          [lang]: e.target.value,
                        },
                      },
                    } as Partial<SectionNode>)
                  }
                  placeholder="Enter section title"
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Section Content</h3>
          <Button size="sm" onClick={() => setShowNodeSelector(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
        </div>

        <div className="space-y-2">
          {node.nodes.map((nodeId) => {
            const childNode = article.structure.nodes.find(
              (n) => n.id === nodeId,
            );
            if (!childNode) return null;

            return (
              <div
                key={nodeId}
                className="flex items-center justify-between p-2 border rounded-lg"
              >
                <span className="text-sm capitalize">
                  {childNode.type} Node
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeNode(nodeId)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <NodeSelector
        open={showNodeSelector}
        onClose={() => setShowNodeSelector(false)}
        onSelect={(newNode: { id: string }) => {
          updateNode({
            nodes: [...node.nodes, newNode.id],
          } as Partial<SectionNode>);
          setShowNodeSelector(false);
        }}
      />
    </div>
  );
};
