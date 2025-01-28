import { ButtonNode } from "../../_store/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonPreviewProps {
  node: ButtonNode;
  language: "en" | "ne";
}

export const ButtonPreview = ({ node, language }: ButtonPreviewProps) => {
  const label = node.label.content[language] || node.label.fallbackContent;

  const handleClick = () => {
    if (node.action.type === "scroll" && node.action.target) {
      const element = document.getElementById(node.action.target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (node.action.type === "link" && node.action.target) {
      window.location.href = node.action.target;
    } else if (node.action.type === "custom" && node.action.target) {
      // Custom action logic here
      console.log("Custom action:", node.action.target);
    }
  };

  return (
    <Button
      className={cn(
        node.variant === "primary" && "btn-primary",
        node.variant === "secondary" && "btn-secondary",
        node.variant === "outline" && "btn-outline",
        node.variant === "ghost" && "btn-ghost",
        node.size === "sm" && "btn-sm",
        node.size === "md" && "btn-md",
        node.size === "lg" && "btn-lg",
        node.className,
      )}
      onClick={handleClick}
    >
      {node.icon && <i className={cn("icon", node.icon)} />}
      {label}
    </Button>
  );
};
