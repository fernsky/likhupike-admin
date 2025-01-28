import { ListNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nanoid } from "nanoid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash } from "lucide-react";

interface ListEditorProps {
  node: ListNode;
}

export const ListEditor = ({ node }: ListEditorProps) => {
  const { updateNode } = useNode(node.id);

  const addItem = () => {
    const itemId = nanoid(15);
    updateNode({
      items: [
        ...node.items,
        {
          id: itemId,
          content: {
            fallbackContent: "",
            content: { en: "", ne: "" },
          },
          checked: false,
        },
      ],
    } as Partial<ListNode>);
  };

  const removeItem = (itemId: string) => {
    updateNode({
      items: node.items.filter((item) => item.id !== itemId),
    } as Partial<ListNode>);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select
          value={node.listType}
          onValueChange={(value: "ordered" | "unordered" | "checklist") =>
            updateNode({ listType: value } as Partial<ListNode>)
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="List Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unordered">Bullet List</SelectItem>
            <SelectItem value="ordered">Numbered List</SelectItem>
            <SelectItem value="checklist">Checklist</SelectItem>
          </SelectContent>
        </Select>

        <Button size="sm" onClick={addItem}>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      <Tabs defaultValue="en">
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">नेपाली</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang}>
            <div className="space-y-2">
              {node.items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  {node.listType === "checklist" && (
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) =>
                        updateNode({
                          items: node.items.map((i) =>
                            i.id === item.id
                              ? { ...i, checked: e.target.checked }
                              : i,
                          ),
                        } as Partial<ListNode>)
                      }
                    />
                  )}
                  <Input
                    value={item.content.content[lang as "en" | "ne"]}
                    onChange={(e) =>
                      updateNode({
                        items: node.items.map((i) =>
                          i.id === item.id
                            ? {
                                ...i,
                                content: {
                                  ...i.content,
                                  content: {
                                    ...i.content.content,
                                    [lang]: e.target.value,
                                  },
                                },
                              }
                            : i,
                        ),
                      } as Partial<ListNode>)
                    }
                    placeholder={`Item ${index + 1}`}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
