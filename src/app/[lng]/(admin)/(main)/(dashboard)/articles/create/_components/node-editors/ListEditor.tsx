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
      className="relative space-y-6 py-4"
    >
      {/* Editor Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              {listTypeIcons[node.listType]}
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                List Editor
              </h3>
              <p className="text-sm text-gray-500">
                Create dynamic lists in multiple languages
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-green-200"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            {node.items.length} Items
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <Select
            value={node.listType}
            onValueChange={(value: "ordered" | "unordered" | "checklist") =>
              updateNode({ listType: value } as Partial<ListNode>)
            }
          >
            <SelectTrigger className="w-44 border-green-100">
              <SelectValue placeholder="Choose list type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unordered">
                <div className="flex items-center gap-2">
                  <List className="w-4 h-4" />
                  Bullet List
                </div>
              </SelectItem>
              <SelectItem value="ordered">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-4 h-4" />
                  Numbered List
                </div>
              </SelectItem>
              <SelectItem value="checklist">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  Checklist
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={addItem}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </div>

        <Tabs defaultValue="en" className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="w-4 h-4 text-green-600" />
            <TabsList className="bg-green-50/50 border border-green-100">
              {[
                { value: "en", label: "English" },
                { value: "ne", label: "नेपाली" },
              ].map((lang) => (
                <TabsTrigger
                  key={lang.value}
                  value={lang.value}
                  className={cn(
                    "data-[state=active]:bg-white data-[state=active]:text-green-700",
                    "data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-green-100",
                  )}
                >
                  {lang.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {["en", "ne"].map((lang) => (
            <TabsContent key={lang} value={lang} className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <AnimatePresence mode="popLayout">
                  {node.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 group"
                    >
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-gray-400">
                        <GripVertical className="w-4 h-4" />
                        <span className="text-sm">{index + 1}</span>
                      </div>

                      {node.listType === "checklist" && (
                        <div className="relative">
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
                            className="w-5 h-5 rounded-md border-2 border-green-200 text-green-600 focus:ring-green-500"
                          />
                        </div>
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
                        placeholder={`Enter your ${
                          lang === "en" ? "English" : "नेपाली"
                        } content here...`}
                        className="flex-1 border-green-100 focus-visible:ring-green-500"
                      />

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {node.items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500"
        >
          <p>No items yet. Click the "Add New Item" button to get started.</p>
        </motion.div>
      )}

      <div className="text-sm text-gray-500 italic">
        Pro tip: You can reorder items by dragging them using the handle on the
        left
      </div>
    </motion.div>
  );
};
