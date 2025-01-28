import { CalloutNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CalloutEditorProps {
  node: CalloutNode;
}

export const CalloutEditor = ({ node }: CalloutEditorProps) => {
  const { updateNode } = useNode(node.id);

  return (
    <div className="space-y-4">
      <Select
        value={node.variant}
        onValueChange={(value: CalloutNode["variant"]) =>
          updateNode({ variant: value } as Partial<CalloutNode>)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select variant" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="info">Info</SelectItem>
          <SelectItem value="warning">Warning</SelectItem>
          <SelectItem value="error">Error</SelectItem>
          <SelectItem value="success">Success</SelectItem>
          <SelectItem value="note">Note</SelectItem>
        </SelectContent>
      </Select>

      <Tabs defaultValue="en">
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">नेपाली</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
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
                    } as Partial<CalloutNode>)
                  }
                  placeholder="Callout title"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
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
                    } as Partial<CalloutNode>)
                  }
                  placeholder="Callout content"
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
