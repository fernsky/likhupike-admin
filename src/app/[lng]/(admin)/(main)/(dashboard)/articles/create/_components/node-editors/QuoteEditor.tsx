import { QuoteNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuoteEditorProps {
  node: QuoteNode;
}

export const QuoteEditor = ({ node }: QuoteEditorProps) => {
  const { updateNode } = useNode(node.id);

  return (
    <div className="space-y-4">
      <Select
        value={node.style?.borderStyle || "left"}
        onValueChange={(value: "left" | "right" | "both" | "none") =>
          updateNode({
            style: { ...node.style, borderStyle: value },
          } as Partial<QuoteNode>)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Border Style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="left">Left Border</SelectItem>
          <SelectItem value="right">Right Border</SelectItem>
          <SelectItem value="both">Both Sides</SelectItem>
          <SelectItem value="none">No Border</SelectItem>
        </SelectContent>
      </Select>

      <Tabs defaultValue="en">
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">नेपाली</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang} className="space-y-4">
            <Textarea
              placeholder="Quote text"
              value={node.content.content[lang as "en" | "ne"]}
              onChange={(e) =>
                updateNode({
                  content: {
                    ...node.content,
                    content: {
                      ...node.content.content,
                      [lang]: e.target.value,
                    },
                  },
                } as Partial<QuoteNode>)
              }
              rows={4}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Author"
                value={node.author?.content[lang as "en" | "ne"] || ""}
                onChange={(e) =>
                  updateNode({
                    author: {
                      ...(node.author || { fallbackContent: "", content: {} }),
                      content: {
                        ...(node.author?.content || {}),
                        [lang]: e.target.value,
                      },
                    },
                  } as Partial<QuoteNode>)
                }
              />

              <Input
                placeholder="Source"
                value={node.source?.content[lang as "en" | "ne"] || ""}
                onChange={(e) =>
                  updateNode({
                    source: {
                      ...(node.source || { fallbackContent: "", content: {} }),
                      content: {
                        ...(node.source?.content || {}),
                        [lang]: e.target.value,
                      },
                    },
                  } as Partial<QuoteNode>)
                }
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
