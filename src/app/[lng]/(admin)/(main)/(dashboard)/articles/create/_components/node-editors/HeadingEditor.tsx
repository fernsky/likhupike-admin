import { HeadingNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
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
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Languages,
  Type,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface HeadingEditorProps {
  node: HeadingNode;
}

export const HeadingEditor = ({ node }: HeadingEditorProps) => {
  const { updateNode } = useNode(node.id);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");

  const headingIcons = {
    1: <Heading1 className="w-4 h-4" />,
    2: <Heading2 className="w-4 h-4" />,
    3: <Heading3 className="w-4 h-4" />,
    4: <Heading4 className="w-4 h-4" />,
    5: <Type className="w-4 h-4" />,
    6: <Type className="w-4 h-4" />,
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
            <div className="p-2 bg-orange-50 rounded-lg">
              <Type className="w-5 h-5 text-orange-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Heading Editor
              </h3>
              <p className="text-sm text-gray-500">
                Create multilingual headings with proper hierarchy
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-orange-200"
          >
            <MessageSquare className="w-3 h-3 mr-1" />H{node.level} Heading
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <Select
            value={node.level?.toString()}
            onValueChange={(value) =>
              updateNode({
                level: parseInt(value) as HeadingNode["level"],
              } as Partial<HeadingNode>)
            }
          >
            <SelectTrigger className="w-44 border-orange-100">
              <SelectValue placeholder="Select heading level" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <SelectItem key={level} value={level.toString()}>
                  <div className="flex items-center gap-2">
                    {headingIcons[level as keyof typeof headingIcons]}
                    <span>Heading {level}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-orange-600" />
            <div className="flex items-center gap-1 p-1 rounded-lg bg-orange-50/50">
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
                      ? "bg-white text-orange-700 shadow-sm border border-orange-100"
                      : "text-gray-600 hover:text-orange-600",
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
        </div>

        {/* Heading Input */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="pt-2"
          >
            <div className="relative">
              <Input
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
                  } as Partial<HeadingNode>)
                }
                placeholder={
                  activeLanguage === "en"
                    ? "Enter your heading text..."
                    : "शीर्षक पाठ लेख्नुहोस्..."
                }
                className={cn(
                  "border-orange-100 focus-visible:ring-orange-500",
                  node.level === 1 && "text-2xl font-bold",
                  node.level === 2 && "text-xl font-semibold",
                  node.level === 3 && "text-lg font-medium",
                  "transition-all duration-200",
                )}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {node.content.content[activeLanguage]?.length || 0} characters
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Use heading levels consistently for better document structure
        and SEO
      </div>
    </motion.div>
  );
};
