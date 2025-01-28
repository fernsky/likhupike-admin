import { ParagraphNode } from "../../_store/types";
import { cn } from "@/lib/utils";

interface ParagraphPreviewProps {
  node: ParagraphNode;
  language: "en" | "ne";
}

export const ParagraphPreview = ({ node, language }: ParagraphPreviewProps) => {
  const content =
    node.content.content[language] || node.content.fallbackContent;

  return (
    <span
      className={cn(
        "block text-[16px] text-[#343434] tracking-[-0.7px] font-[420] leading-relaxed",
        node.dropcap &&
          "first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1",
        node.columns === 2 && "columns-2 gap-x-16",
        node.columns === 3 && "columns-3 gap-x-16",
        node.className,
      )}
    >
      {content}
    </span>
  );
};
