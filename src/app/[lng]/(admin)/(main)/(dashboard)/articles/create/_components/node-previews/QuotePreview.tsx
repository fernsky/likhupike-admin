import { QuoteNode } from "../../_store/types";
import { cn } from "@/lib/utils";

interface QuotePreviewProps {
  node: QuoteNode;
  language: "en" | "ne";
}

export const QuotePreview = ({ node, language }: QuotePreviewProps) => {
  const content =
    node.content.content[language] || node.content.fallbackContent;
  const author = node.author?.content[language] || node.author?.fallbackContent;
  const source = node.source?.content[language] || node.source?.fallbackContent;

  return (
    <figure className="my-8">
      <blockquote
        className={cn(
          "p-6 italic",
          node.style?.borderStyle === "left" && "border-l-4 border-green-600",
          node.style?.borderStyle === "right" && "border-r-4 border-green-600",
          node.style?.borderStyle === "both" && "border-x-4 border-green-600",
          node.style?.backgroundColor && "bg-opacity-10",
          node.className,
        )}
        style={{ backgroundColor: node.style?.backgroundColor }}
      >
        <p>{content}</p>
      </blockquote>
      {(author || source) && (
        <figcaption className="mt-4 text-sm">
          {author && <cite className="font-medium">{author}</cite>}
          {source && <span className="ml-2 text-gray-500">— {source}</span>}
        </figcaption>
      )}
    </figure>
  );
};
