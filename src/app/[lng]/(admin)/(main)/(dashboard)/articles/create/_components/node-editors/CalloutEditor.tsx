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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative space-y-6 py-4"
    >
      {/* Editor Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg", `bg-${currentColor}-50`)}>
              <CurrentIcon
                className={cn("w-5 h-5", `text-${currentColor}-600`)}
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Callout Editor
              </h3>
              <p className="text-sm text-gray-500">
                Create attention-grabbing callouts for important information
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "bg-white/50 backdrop-blur-sm",
              `border-${currentColor}-200`,
            )}
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            {calloutTypes[node.variant].label}
          </Badge>
        </div>

        {/* Style Controls */}
        <div className="flex items-center gap-4">
          <Select
            value={node.variant}
            onValueChange={(value: CalloutNode["variant"]) =>
              updateNode({ variant: value } as Partial<CalloutNode>)
            }
          >
            <SelectTrigger className={cn("w-44", `border-${currentColor}-100`)}>
              <SelectValue placeholder="Select callout type" />
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

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <Languages className={cn(`text-${currentColor}-600 w-4 h-4`)} />
            <div
              className={cn(
                "flex items-center gap-1 p-1 rounded-lg",
                `bg-${currentColor}-50/50`,
              )}
            >
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
                      ? cn(
                          "bg-white shadow-sm border",
                          `text-${currentColor}-700 border-${currentColor}-100`,
                        )
                      : "text-gray-600",
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
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <div className="relative">
                  <Input
                    value={node.title?.content[activeLanguage] || ""}
                    onChange={(e) =>
                      updateNode({
                        title: {
                          ...(node.title || {
                            fallbackContent: "",
                            content: {},
                          }),
                          content: {
                            ...(node.title?.content || {}),
                            [activeLanguage]: e.target.value,
                          },
                        },
                      } as Partial<CalloutNode>)
                    }
                    placeholder={
                      activeLanguage === "en"
                        ? "Enter callout title..."
                        : "कलआउट शीर्षक लेख्नुहोस्..."
                    }
                    className={cn(
                      "text-lg font-medium",
                      `border-${currentColor}-100 focus-visible:ring-${currentColor}-500`,
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Content
                </label>
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
                    placeholder={
                      activeLanguage === "en"
                        ? "Enter callout content..."
                        : "कलआउट सामग्री लेख्नुहोस्..."
                    }
                    className={cn(
                      "min-h-[120px] resize-none",
                      `border-${currentColor}-100 focus-visible:ring-${currentColor}-500`,
                    )}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {node.content.content[activeLanguage]?.length || 0}{" "}
                    characters
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Use callouts to highlight important information and make it
        stand out from the regular content
      </div>
    </motion.div>
  );
};
