import { CalloutNode } from "../../_store/types";
import { cn } from "@/lib/utils";
import {
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  BookMarked,
} from "lucide-react";

interface CalloutPreviewProps {
  node: CalloutNode;
  language: "en" | "ne";
}

export const CalloutPreview = ({ node, language }: CalloutPreviewProps) => {
  const title = node.title?.content[language] || node.title?.fallbackContent;
  const content =
    node.content.content[language] || node.content.fallbackContent;

  const variants = {
    info: { icon: Info, class: "border-l-blue-600 bg-blue-50/30" },
    warning: {
      icon: AlertTriangle,
      class: "border-l-amber-600 bg-amber-50/30",
    },
    error: { icon: AlertCircle, class: "border-l-red-600 bg-red-50/30" },
    success: { icon: CheckCircle2, class: "border-l-green-600 bg-green-50/30" },
    note: { icon: BookMarked, class: "border-l-purple-600 bg-purple-50/30" },
  };

  const Icon = variants[node.variant].icon;

  return (
    <aside
      className={cn("my-8 pl-6 py-4 border-l-4", variants[node.variant].class)}
    >
      <div className="flex gap-3 items-start">
        <Icon className="w-5 h-5 mt-1 text-current opacity-80" />
        <div className="space-y-1.5 min-w-0">
          {title && (
            <h4 className="text-[17px] font-[500] text-[#1a1a1a] tracking-[-0.5px]">
              {title}
            </h4>
          )}
          <div className="text-[15px] leading-relaxed text-[#343434] tracking-[-0.5px]">
            {content}
          </div>
        </div>
      </div>
    </aside>
  );
};
