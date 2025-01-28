import { ListNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nanoid } from "nanoid";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  List,
  ListOrdered,
  CheckSquare,
  Trash2,
  Plus,
  Languages,
  ArrowUpRight,
  GripVertical,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  const listTypeIcons = {
    unordered: <List className="w-4 h-4" />,
    ordered: <ListOrdered className="w-4 h-4" />,
    checklist: <CheckSquare className="w-4 h-4" />,
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
          className="bg-white/50 backdrop-blur-sm border-green-200"
        >
          {listTypeIcons[node.listType]}
          <span className="ml-1">List Editor</span>
        </Badge>
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-green-200"
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          {node.items.length} Items
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <Select
          value={node.listType}
          onValueChange={(value: "ordered" | "unordered" | "checklist") =>
            updateNode({ listType: value } as Partial<ListNode>)
          }
        >
          <SelectTrigger className="w-32 border-green-100">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {[
              {
                value: "unordered",
                icon: <List className="w-4 h-4" />,
                label: "Bullet",
              },
              {
                value: "ordered",
                icon: <ListOrdered className="w-4 h-4" />,
                label: "Numbered",
              },
              {
                value: "checklist",
                icon: <CheckSquare className="w-4 h-4" />,
                label: "Checklist",
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

        <Button
          onClick={addItem}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      <Tabs defaultValue="en">
        <TabsList className="bg-green-50/50 border border-green-100">
          {[
            { value: "en", label: "EN" },
            { value: "ne", label: "नेपाली" },
          ].map((lang) => (
            <TabsTrigger
              key={lang.value}
              value={lang.value}
              className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm"
            >
              {lang.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang} className="mt-3">
            <AnimatePresence mode="popLayout">
              {node.items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-3 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed border-gray-200"
                >
                  Click "Add Item" to start
                </motion.div>
              ) : (
                <div className="space-y-2">
                  {node.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 group"
                    >
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-400 text-sm">
                        {index + 1}
                      </div>

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
                          className="w-5 h-5 rounded-md border-2 border-green-200 text-green-600"
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
                        className="flex-1 border-green-100 focus-visible:ring-green-500"
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
};
