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
      className="relative space-y-4 py-4"
    >
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-orange-200"
        >
          <Type className="w-4 h-4 mr-1" />
          Heading Editor
        </Badge>
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-orange-200"
        >
          <MessageSquare className="w-3 h-3 mr-1" />H{node.level} Heading
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <Select
          value={node.level?.toString()}
          onValueChange={(value) =>
            updateNode({
              level: parseInt(value) as HeadingNode["level"],
            } as Partial<HeadingNode>)
          }
        >
          <SelectTrigger className="w-32 border-orange-100">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <SelectItem key={level} value={level.toString()}>
                <div className="flex items-center gap-2">
                  {headingIcons[level as keyof typeof headingIcons]}
                  <span>H{level}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 bg-orange-50/50 rounded-lg p-1">
          <Languages className="w-4 h-4 text-orange-600" />
          {[
            { code: "en", label: "EN" },
            { code: "ne", label: "नेपाली" },
          ].map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => setActiveLanguage(lang.code as "en" | "ne")}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "px-3 py-1 text-sm font-medium rounded-md transition-all",
                activeLanguage === lang.code
                  ? "bg-white text-orange-700 shadow-sm border border-orange-100"
                  : "text-gray-600 hover:text-orange-600",
              )}
            >
              {lang.label}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeLanguage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
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
              placeholder={activeLanguage === "en" ? "Heading text" : "शीर्षक"}
              className={cn(
                "border-orange-100 focus-visible:ring-orange-500",
                node.level === 1 && "text-2xl font-bold",
                node.level === 2 && "text-xl font-semibold",
                node.level === 3 && "text-lg font-medium",
                "transition-all duration-200",
              )}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {node.content.content[activeLanguage]?.length || 0} chars
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
