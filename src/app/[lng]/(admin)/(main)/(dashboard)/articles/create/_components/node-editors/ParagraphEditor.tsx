import { ParagraphNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Languages, PenLine, MessageSquare, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ParagraphEditorProps {
  node: ParagraphNode;
}

export const ParagraphEditor = ({ node }: ParagraphEditorProps) => {
  const { updateNode } = useNode(node.id);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");
  const [charCount, setCharCount] = useState({
    en: node.content.content.en.length,
    ne: node.content.content.ne.length,
  });

  const handleChange = (lang: "en" | "ne", value: string) => {
    updateNode({
      content: {
        ...node.content,
        content: { ...node.content.content, [lang]: value },
      },
    } as Partial<ParagraphNode>);
    setCharCount((prev) => ({ ...prev, [lang]: value.length }));
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
              <PenLine className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Paragraph Editor
              </h3>
              <p className="text-sm text-gray-500">
                Write your content in multiple languages
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-green-200"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            {activeLanguage === "en" ? "English" : "नेपाली"} Content
          </Badge>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-green-50/50">
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
                    ? "bg-white text-green-700 shadow-sm border border-green-100"
                    : "text-gray-600 hover:text-green-600",
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

      {/* Text Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <Textarea
          placeholder={
            activeLanguage === "en"
              ? "Start writing your English content here..."
              : "यहाँ नेपाली सामग्री लेख्न सुरु गर्नुहोस्..."
          }
          value={node.content.content[activeLanguage]}
          onChange={(e) => handleChange(activeLanguage, e.target.value)}
          className="min-h-[250px] text-base leading-relaxed focus-visible:ring-green-500 border-green-100 resize-none"
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
          {charCount[activeLanguage]} characters
        </div>
      </motion.div>

      {/* Writing Tips */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Use clear and concise language to better convey your message
      </div>
    </motion.div>
  );
};
