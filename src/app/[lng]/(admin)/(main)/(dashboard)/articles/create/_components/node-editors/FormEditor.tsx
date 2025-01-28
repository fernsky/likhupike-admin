import { FormNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormInput,
  Languages,
  Plus,
  Trash2,
  ArrowUpRight,
  MessageSquare,
  GripVertical,
  Type,
  Hash,
  Mail,
  List,
  AlignLeft,
} from "lucide-react";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface FormEditorProps {
  node: FormNode;
}

export const FormEditor = ({ node }: FormEditorProps) => {
  const { updateNode } = useNode(node.id);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");

  const fieldTypeIcons = {
    text: <Type className="w-4 h-4" />,
    number: <Hash className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
    select: <List className="w-4 h-4" />,
    textarea: <AlignLeft className="w-4 h-4" />,
  };

  const addField = () => {
    const fieldId = nanoid(15);
    updateNode({
      fields: [
        ...node.fields,
        {
          id: fieldId,
          type: "text",
          label: {
            fallbackContent: "New Field",
            content: { en: "New Field", ne: "नयाँ फिल्ड" },
          },
          required: false,
        },
      ],
    } as Partial<FormNode>);
  };

  const removeField = (fieldId: string) => {
    updateNode({
      fields: node.fields.filter((field) => field.id !== fieldId),
    } as Partial<FormNode>);
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
              <FormInput className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Form Editor
              </h3>
              <p className="text-sm text-gray-500">
                Create interactive forms with multiple field types
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-indigo-200"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            {node.fields.length} Fields
          </Badge>
        </div>

        <div className="flex items-center justify-between">
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

          <Button
            onClick={addField}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Field
          </Button>
        </div>

        {/* Form Fields */}
        <AnimatePresence mode="popLayout">
          {node.fields.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed border-gray-200"
            >
              <p>No fields yet. Click the "Add Field" button to get started.</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {node.fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="group p-4 bg-white rounded-lg border border-indigo-100 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-gray-400">
                      <GripVertical className="w-4 h-4" />
                      <span className="text-sm">{index + 1}</span>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-4">
                        <Input
                          value={field.label.content[activeLanguage]}
                          onChange={(e) =>
                            updateNode({
                              fields: node.fields.map((f) =>
                                f.id === field.id
                                  ? {
                                      ...f,
                                      label: {
                                        ...f.label,
                                        content: {
                                          ...f.label.content,
                                          [activeLanguage]: e.target.value,
                                        },
                                      },
                                    }
                                  : f,
                              ),
                            } as Partial<FormNode>)
                          }
                          placeholder={
                            activeLanguage === "en"
                              ? "Enter field label..."
                              : "फिल्ड लेबल लेख्नुहोस्..."
                          }
                          className="border-indigo-100 focus-visible:ring-indigo-500"
                        />

                        <Select
                          value={field.type}
                          onValueChange={(
                            value:
                              | "text"
                              | "number"
                              | "email"
                              | "select"
                              | "textarea",
                          ) =>
                            updateNode({
                              fields: node.fields.map((f) =>
                                f.id === field.id ? { ...f, type: value } : f,
                              ),
                            } as Partial<FormNode>)
                          }
                        >
                          <SelectTrigger className="w-40 border-indigo-100">
                            <SelectValue placeholder="Field type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries({
                              text: "Text Input",
                              number: "Number",
                              email: "Email",
                              select: "Dropdown",
                              textarea: "Text Area",
                            }).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                <div className="flex items-center gap-2">
                                  {
                                    fieldTypeIcons[
                                      value as keyof typeof fieldTypeIcons
                                    ]
                                  }
                                  {label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="flex items-center gap-2">
                          <Switch
                            checked={field.required || false}
                            onCheckedChange={(checked) =>
                              updateNode({
                                fields: node.fields.map((f) =>
                                  f.id === field.id
                                    ? { ...f, required: checked }
                                    : f,
                                ),
                              } as Partial<FormNode>)
                            }
                          />
                          <span className="text-sm text-gray-500">
                            Required
                          </span>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeField(field.id)}
                          className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Use clear and concise labels to make your form more
        user-friendly
      </div>
    </motion.div>
  );
};
