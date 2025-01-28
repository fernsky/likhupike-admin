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
    <p
      className={cn(
        "my-4",
        node.dropcap &&
          "first-letter:text-4xl first-letter:font-bold first-letter:mr-1",
        node.columns === 2 && "columns-2 gap-8",
        node.columns === 3 && "columns-3 gap-8",
        node.className,
      )}
    >
      {content}
    </p>
  );
};
