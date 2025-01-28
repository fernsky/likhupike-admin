import { QuoteNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Quote,
  Languages,
  User,
  Link,
  AlignLeft,
  AlignRight,
  AlignCenter,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface QuoteEditorProps {
  node: QuoteNode;
}

export const QuoteEditor = ({ node }: QuoteEditorProps) => {
  const { updateNode } = useNode(node.id);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");

  const borderStyleIcons = {
    left: <AlignLeft className="w-4 h-4" />,
    right: <AlignRight className="w-4 h-4" />,
    both: <AlignCenter className="w-4 h-4" />,
    none: <Quote className="w-4 h-4" />,
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
            <div className="p-2 bg-purple-50 rounded-lg">
              <Quote className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Quote Editor
              </h3>
              <p className="text-sm text-gray-500">
                Add impactful quotes with proper attribution
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-purple-200"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            {activeLanguage === "en" ? "English" : "नेपाली"} Quote
          </Badge>
        </div>

        {/* Style Controls */}
        <div className="flex items-center gap-4">
          <Select
            value={node.style?.borderStyle || "left"}
            onValueChange={(value: "left" | "right" | "both" | "none") =>
              updateNode({
                style: { ...node.style, borderStyle: value },
              } as Partial<QuoteNode>)
            }
          >
            <SelectTrigger className="w-44 border-purple-100">
              <SelectValue placeholder="Choose border style" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries({
                left: "Left Border",
                right: "Right Border",
                both: "Both Sides",
                none: "No Border",
              }).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    {borderStyleIcons[value as keyof typeof borderStyleIcons]}
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2 mt-2">
          <Languages className="w-4 h-4 text-purple-600" />
          <div className="flex items-center gap-1 p-1 rounded-lg bg-purple-50/50">
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
                    ? "bg-white text-purple-700 shadow-sm border border-purple-100"
                    : "text-gray-600 hover:text-purple-600",
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

        {/* Content Editor */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-2"
          >
            <div className="relative">
              <Textarea
                placeholder={
                  activeLanguage === "en"
                    ? "Enter your inspiring quote here..."
                    : "यहाँ आफ्नो प्रेरणादायक उद्धरण लेख्नुहोस्..."
                }
                value={node.content.content[activeLanguage]}
                onChange={(e) =>
                  updateNode({
                    content: {
                      ...node.content,
                      content: {
                        ...node.content.content,
                        [activeLanguage]: e.target.value,
                      },
                    },
                  } as Partial<QuoteNode>)
                }
                className="min-h-[120px] text-lg leading-relaxed focus-visible:ring-purple-500 border-purple-100 resize-none"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {node.content.content[activeLanguage]?.length || 0} characters
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Author
                </label>
                <Input
                  placeholder={
                    activeLanguage === "en"
                      ? "Who said this?"
                      : "कसले भन्नुभयो?"
                  }
                  value={node.author?.content[activeLanguage] || ""}
                  onChange={(e) =>
                    updateNode({
                      author: {
                        ...(node.author || {
                          fallbackContent: "",
                          content: {},
                        }),
                        content: {
                          ...(node.author?.content || {}),
                          [activeLanguage]: e.target.value,
                        },
                      },
                    } as Partial<QuoteNode>)
                  }
                  className="border-purple-100 focus-visible:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  Source
                </label>
                <Input
                  placeholder={
                    activeLanguage === "en"
                      ? "Where is this from?"
                      : "यो कहाँबाट हो?"
                  }
                  value={node.source?.content[activeLanguage] || ""}
                  onChange={(e) =>
                    updateNode({
                      source: {
                        ...(node.source || {
                          fallbackContent: "",
                          content: {},
                        }),
                        content: {
                          ...(node.source?.content || {}),
                          [activeLanguage]: e.target.value,
                        },
                      },
                    } as Partial<QuoteNode>)
                  }
                  className="border-purple-100 focus-visible:ring-purple-500"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Adding source and author details increases the credibility of
        your quotes
      </div>
    </motion.div>
  );
};
