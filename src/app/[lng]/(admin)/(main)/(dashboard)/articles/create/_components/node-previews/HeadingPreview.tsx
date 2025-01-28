import { HeadingNode } from "../../_store/types";

interface HeadingPreviewProps {
  node: HeadingNode;
  language: "en" | "ne";
}

export const HeadingPreview = ({ node, language }: HeadingPreviewProps) => {
  const HeadingTag = `h${node.level}` as React.ElementType;
  const content =
    node.content.content[language] || node.content.fallbackContent;

  return (
    <HeadingTag
      {...(node.anchor ? { id: node.anchor } : {})}
      className="scroll-mt-20 font-bold tracking-tight"
    >
      {content}
    </HeadingTag>
  );
};
