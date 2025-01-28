import { CalloutNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  BookMarked,
  Languages,
  MessageSquare,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CalloutEditorProps {
  node: CalloutNode;
}

export const CalloutEditor = ({ node }: CalloutEditorProps) => {
  const { updateNode } = useNode(node.id);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");

  const calloutTypes: Record<
    CalloutNode["variant"],
    { icon: LucideIcon; label: string; color: string }
  > = {
    info: { icon: Info, label: "Information", color: "blue" },
    warning: { icon: AlertTriangle, label: "Warning", color: "yellow" },
    error: { icon: AlertCircle, label: "Error", color: "red" },
    success: { icon: CheckCircle2, label: "Success", color: "green" },
    note: { icon: BookMarked, label: "Note", color: "purple" },
  };

  const CurrentIcon = calloutTypes[node.variant].icon;
  const currentColor = calloutTypes[node.variant].color;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className={cn("bg-white", `border-${currentColor}-200`)}
        >
          <CurrentIcon className={`w-4 h-4 mr-1 text-${currentColor}-600`} />
          Callout
        </Badge>

        <div className="flex items-center gap-2">
          <Select
            value={node.variant}
            onValueChange={(value: CalloutNode["variant"]) =>
              updateNode({ variant: value } as Partial<CalloutNode>)
            }
          >
            <SelectTrigger className={`w-40 border-${currentColor}-100`}>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(calloutTypes).map(
                ([key, { icon: Icon, label }]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {label}
                    </div>
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>

          <div
            className={`flex items-center gap-1 p-1 rounded-lg bg-${currentColor}-50/50 border border-${currentColor}-100/50`}
          >
            <Languages className={`w-4 h-4 text-${currentColor}-600`} />
            {["en", "ne"].map((lang) => (
              <motion.button
                key={lang}
                onClick={() => setActiveLanguage(lang as "en" | "ne")}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-md transition-all",
                  activeLanguage === lang
                    ? `bg-white text-${currentColor}-700 shadow-sm`
                    : "text-gray-600",
                )}
              >
                {lang === "en" ? "EN" : "नेपाली"}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Input
          value={node.title?.content[activeLanguage] || ""}
          onChange={(e) =>
            updateNode({
              title: {
                fallbackContent: "",
                content: {
                  ...node.title?.content,
                  [activeLanguage]: e.target.value,
                },
              },
            } as Partial<CalloutNode>)
          }
          placeholder="Title..."
          className={`border-${currentColor}-100 focus-visible:ring-${currentColor}-500`}
        />

        <div className="relative">
          <Textarea
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
              } as Partial<CalloutNode>)
            }
            placeholder="Content..."
            className={`min-h-[120px] resize-none border-${currentColor}-100 focus-visible:ring-${currentColor}-500`}
          />
          <div className="absolute bottom-2 right-2 px-2 py-0.5 text-xs bg-white/90 rounded-md border border-${currentColor}-100">
            {node.content.content[activeLanguage]?.length || 0} chars
          </div>
        </div>
      </div>
    </motion.div>
  );
};
