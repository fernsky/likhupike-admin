import { TableOfContentsNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface TableOfContentsEditorProps {
  node: TableOfContentsNode;
}

export const TableOfContentsEditor = ({ node }: TableOfContentsEditorProps) => {
  const { updateNode } = useNode(node.id);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="en">
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">नेपाली</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang}>
            <div className="space-y-4">
              <div>
                <Label>TOC Title</Label>
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
                    } as Partial<TableOfContentsNode>)
                  }
                  placeholder="Table of Contents title"
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Max Depth</Label>
            <Select
              value={node.maxDepth?.toString()}
              onValueChange={(value) =>
                updateNode({
                  maxDepth: parseInt(value),
                } as Partial<TableOfContentsNode>)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select max depth" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((depth) => (
                  <SelectItem key={depth} value={depth.toString()}>
                    H{depth}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Position</Label>
            <Select
              value={node.style?.position}
              onValueChange={(value: "left" | "right") =>
                updateNode({
                  style: { ...node.style, position: value },
                } as Partial<TableOfContentsNode>)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Numbered List</Label>
          <Switch
            checked={node.numbered}
            onCheckedChange={(checked) =>
              updateNode({ numbered: checked } as Partial<TableOfContentsNode>)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Sticky Position</Label>
          <Switch
            checked={node.style?.sticky}
            onCheckedChange={(checked) =>
              updateNode({
                style: { ...node.style, sticky: checked },
              } as Partial<TableOfContentsNode>)
            }
          />
        </div>
      </div>
    </div>
  );
};
