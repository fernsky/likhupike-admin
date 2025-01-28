import {
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  NotepadText,
} from "lucide-react";
import { CalloutNode } from "../../_store/types";
import { cn } from "@/lib/utils";

interface CalloutPreviewProps {
  node: CalloutNode;
  language: "en" | "ne";
}

export const CalloutPreview = ({ node, language }: CalloutPreviewProps) => {
  const title = node.title?.content[language] || node.title?.fallbackContent;
  const content =
    node.content.content[language] || node.content.fallbackContent;

  const variants = {
    info: {
      icon: Info,
      className: "bg-blue-50 border-blue-200 text-blue-800",
    },
    warning: {
      icon: AlertTriangle,
      className: "bg-yellow-50 border-yellow-200 text-yellow-800",
    },
    error: {
      icon: AlertCircle,
      className: "bg-red-50 border-red-200 text-red-800",
    },
    success: {
      icon: CheckCircle,
      className: "bg-green-50 border-green-200 text-green-800",
    },
    note: {
      icon: NotepadText,
      className: "bg-gray-50 border-gray-200 text-gray-800",
    },
  };

  const { icon: Icon, className } = variants[node.variant];

  return (
    <div
      className={cn(
        "my-6 p-4 border rounded-lg flex gap-4",
        className,
        node.className,
      )}
    >
      <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
      <div className="space-y-2">
        {title && <h4 className="font-medium">{title}</h4>}
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
};
