import { HeadingNode } from "../../_store/types";
import { cn } from "@/lib/utils";

interface HeadingPreviewProps {
  node: HeadingNode;
  language: "en" | "ne";
}

export const HeadingPreview = ({ node, language }: HeadingPreviewProps) => {
  const content =
    node.content.content[language] || node.content.fallbackContent;
  const Tag = `h${node.level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      //@ts-ignore
      id={node.anchor}
      className={cn(
        "text-[#1a1a1a] font-[500] tracking-[-0.7px]",
        node.level === 1 && "text-4xl mb-8 mt-16",
        node.level === 2 && "text-3xl mb-6 mt-12",
        node.level === 3 && "text-2xl mb-4 mt-10",
        node.level === 4 && "text-xl mb-3 mt-8",
        node.level === 5 && "text-lg mb-2 mt-6",
        node.level === 6 && "text-base mb-2 mt-6",
        node.className,
      )}
    >
      {content}
    </Tag>
  );
};
