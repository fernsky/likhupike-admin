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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="bg-white border-rose-200">
          <ButtonIcon className="w-4 h-4 mr-1" />
          Button
        </Badge>

        <div className="flex items-center gap-2 bg-rose-50/50 rounded-lg border border-rose-100/50 p-1">
          <Languages className="w-4 h-4 text-rose-600" />
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
                  ? "bg-white text-rose-700 shadow-sm"
                  : "text-gray-600 hover:text-rose-600",
              )}
            >
              {lang.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Select
            value={node.variant}
            onValueChange={(value: ButtonNode["variant"]) =>
              updateNode({ variant: value } as Partial<ButtonNode>)
            }
          >
            <SelectTrigger className="w-full border-rose-100">
              <SelectValue placeholder="Style variant" />
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

          <Select
            value={node.size}
            onValueChange={(value: string) =>
              updateNode({
                size: value as ButtonNode["size"],
              } as Partial<ButtonNode>)
            }
          >
            <SelectTrigger className="w-full border-rose-100">
              <SelectValue placeholder="Size" />
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

        <div className="space-y-2">
          <Select
            value={node.action.type}
            onValueChange={(value: ButtonNode["action"]["type"]) =>
              updateNode({
                action: { ...node.action, type: value },
              } as Partial<ButtonNode>)
            }
          >
            <SelectTrigger className="border-rose-100">
              <SelectValue placeholder="Action type" />
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

          <Input
            value={node.action.target || ""}
            onChange={(e) =>
              updateNode({
                action: { ...node.action, target: e.target.value },
              } as Partial<ButtonNode>)
            }
            placeholder={
              node.action.type === "link"
                ? "Enter URL..."
                : node.action.type === "scroll"
                  ? "Enter element ID..."
                  : "Enter action name..."
            }
            className="border-rose-100"
          />
        </div>
      </div>

      <Input
        value={node.label.content[activeLanguage] || ""}
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
        placeholder={`Button text in ${activeLanguage === "en" ? "English" : "नेपाली"}...`}
        className="border-rose-100"
      />

      <div className="p-4 bg-gray-50/50 rounded-lg border border-rose-100/50 flex justify-center">
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
    </motion.div>
  );
};
