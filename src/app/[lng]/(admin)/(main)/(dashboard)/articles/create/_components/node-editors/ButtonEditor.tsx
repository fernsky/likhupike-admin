import { ButtonNode } from "../../_store/types";
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
  TrendingUp as ButtonIcon,
  Languages,
  MessageSquare,
  ArrowUpRight,
  Palette,
  Maximize,
  Link2,
  MousePointerClick,
  ArrowDown,
  ExternalLink,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ButtonEditorProps {
  node: ButtonNode;
}

export const ButtonEditor = ({ node }: ButtonEditorProps) => {
  const { updateNode } = useNode(node.id);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");

  const buttonVariants: Record<
    ButtonNode["variant"],
    { label: string; icon: LucideIcon }
  > = {
    primary: { label: "Primary", icon: ButtonIcon },
    secondary: { label: "Secondary", icon: ButtonIcon },
    outline: { label: "Outline", icon: ButtonIcon },
    ghost: { label: "Ghost", icon: ButtonIcon },
  };

  const buttonSizes = {
    sm: { label: "Small", className: "h-8 text-sm" },
    md: { label: "Medium", className: "h-10" },
    lg: { label: "Large", className: "h-12 text-lg" },
  };

  const actionTypes = {
    link: { label: "External Link", icon: ExternalLink },
    scroll: { label: "Scroll To", icon: ArrowDown },
    custom: { label: "Custom Action", icon: MousePointerClick },
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
            <div className="p-2 bg-rose-50 rounded-lg">
              <ButtonIcon className="w-5 h-5 text-rose-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Button Editor
              </h3>
              <p className="text-sm text-gray-500">
                Create interactive buttons with custom actions
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-rose-200"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            {buttonVariants[node.variant].label} Button
          </Badge>
        </div>

        {/* Button Style Controls */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50/50 rounded-lg border border-gray-100">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
              <Palette className="w-4 h-4 text-rose-500" />
              Style Variant
            </label>
            <Select
              value={node.variant}
              onValueChange={(value: ButtonNode["variant"]) =>
                updateNode({ variant: value } as Partial<ButtonNode>)
              }
            >
              <SelectTrigger className="w-full border-rose-100">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(buttonVariants).map(
                  ([key, { label, icon: Icon }]) => (
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
              <Maximize className="w-4 h-4 text-rose-500" />
              Button Size
            </label>
            <Select
              value={node.size}
              onValueChange={(value: string) =>
                updateNode({
                  size: value as ButtonNode["size"],
                } as Partial<ButtonNode>)
              }
            >
              <SelectTrigger className="w-full border-rose-100">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(buttonSizes).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-rose-600" />
          <div className="flex items-center gap-1 p-1 rounded-lg bg-rose-50/50">
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
                    ? "bg-white text-rose-700 shadow-sm border border-rose-100"
                    : "text-gray-600 hover:text-rose-600",
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

        {/* Button Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-2"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Button Label
              </label>
              <Input
                value={node.label.content[activeLanguage]}
                onChange={(e) =>
                  updateNode({
                    label: {
                      ...node.label,
                      content: {
                        ...node.label.content,
                        [activeLanguage]: e.target.value,
                      },
                    },
                  } as Partial<ButtonNode>)
                }
                placeholder={
                  activeLanguage === "en"
                    ? "Enter button text..."
                    : "बटन पाठ लेख्नुहोस्..."
                }
                className="border-rose-100 focus-visible:ring-rose-500"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Configuration */}
        <div className="space-y-4 border-t border-gray-100 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
              <Link2 className="w-4 h-4 text-rose-500" />
              Button Action
            </label>
            <Select
              value={node.action.type}
              onValueChange={(value: ButtonNode["action"]["type"]) =>
                updateNode({
                  action: { ...node.action, type: value },
                } as Partial<ButtonNode>)
              }
            >
              <SelectTrigger className="border-rose-100">
                <SelectValue placeholder="Select action type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(actionTypes).map(
                  ([key, { label, icon: Icon }]) => (
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Action Target
            </label>
            <Input
              value={node.action.target || ""}
              onChange={(e) =>
                updateNode({
                  action: { ...node.action, target: e.target.value },
                } as Partial<ButtonNode>)
              }
              placeholder={
                node.action.type === "link"
                  ? "Enter URL (e.g., https://example.com)"
                  : node.action.type === "scroll"
                    ? "Enter element ID (e.g., #section-1)"
                    : "Enter custom action name"
              }
              className="border-rose-100 focus-visible:ring-rose-500"
            />
          </div>
        </div>
      </div>

      {/* Button Preview */}
      <div className="border-t border-gray-100 pt-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Preview
        </label>
        <div
          className={cn(
            "p-4 bg-gray-50 rounded-lg flex items-center justify-center",
            "border border-dashed border-gray-200",
          )}
        >
          <motion.div
            className={cn(
              "px-4 py-2 rounded-md",
              node.variant === "primary" && "bg-rose-600 text-white",
              node.variant === "secondary" && "bg-rose-100 text-rose-700",
              node.variant === "outline" &&
                "border-2 border-rose-600 text-rose-700",
              node.variant === "ghost" && "text-rose-700 hover:bg-rose-50",
              buttonSizes[node.size || "md"].className,
            )}
          >
            {node.label.content[activeLanguage] || "Button Text"}
          </motion.div>
        </div>
      </div>

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Use clear and actionable button labels to improve user
        interaction
      </div>
    </motion.div>
  );
};
