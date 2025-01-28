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
    en: node.content.content.en?.length || 0,
    ne: node.content.content.ne?.length || 0,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="bg-white border-green-200">
          <PenLine className="w-4 h-4 mr-1" />
          Paragraph
        </Badge>

        <div className="flex items-center gap-2 bg-green-50/50 rounded-lg border border-green-100/50 p-1">
          <Languages className="w-4 h-4 text-green-600" />
          {[
            { code: "en", label: "EN" },
            { code: "ne", label: "नेपाली" },
          ].map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => setActiveLanguage(lang.code as "en" | "ne")}
              className={cn(
                "relative px-3 py-1 text-sm font-medium rounded-md transition-all",
                activeLanguage === lang.code
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-600 hover:text-green-600",
              )}
            >
              {lang.label}
              {charCount[lang.code as "en" | "ne"] > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 h-4 min-w-[1rem] px-1 text-xs bg-green-100"
                >
                  {charCount[lang.code as "en" | "ne"]}
                </Badge>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        key={activeLanguage}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-lg overflow-hidden shadow-sm"
      >
        <Textarea
          value={node.content.content[activeLanguage]}
          onChange={(e) => {
            const value = e.target.value;
            setCharCount((prev) => ({
              ...prev,
              [activeLanguage]: value.length,
            }));
            updateNode({
              content: {
                ...node.content,
                content: { ...node.content.content, [activeLanguage]: value },
              },
            } as Partial<ParagraphNode>);
          }}
          placeholder={`Write in ${activeLanguage === "en" ? "English" : "नेपाली"}...`}
          className="min-h-[200px] text-base leading-relaxed border-green-100 focus-visible:ring-green-500 resize-none"
        />
        <div className="absolute bottom-2 right-2 px-2 py-0.5 text-xs bg-white/90 rounded-md border border-green-100">
          {charCount[activeLanguage]} chars
        </div>
      </motion.div>
    </motion.div>
  );
};
