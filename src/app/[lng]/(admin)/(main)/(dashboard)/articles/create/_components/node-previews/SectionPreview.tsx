import { SectionNode } from "../../_store/types";
import { cn } from "@/lib/utils";
import { useArticleStore } from "../../_store/store";
import { NodePreviewRenderers } from ".";

interface SectionPreviewProps {
  node: SectionNode;
  language: "en" | "ne";
}

export const SectionPreview = ({ node, language }: SectionPreviewProps) => {
  const article = useArticleStore((state) => state.article);
  const title = node.title?.content[language] || node.title?.fallbackContent;

  return (
    <section
      className={cn(
        "my-8",
        node.layout === "grid" && "grid gap-4",
        node.layout === "columns" && "flex gap-4",
        node.className,
      )}
      style={{
        gridTemplateColumns: node.style?.columns
          ? `repeat(${node.style.columns}, 1fr)`
          : undefined,
        gap: node.style?.gap,
        backgroundColor: node.style?.background,
        maxWidth: node.style?.maxWidth,
      }}
    >
      {title && <h3 className="mb-4 font-semibold">{title}</h3>}
      {node.nodes.map((nodeId) => {
        const childNode = article.structure.nodes.find((n) => n.id === nodeId);
        if (!childNode) return null;

        const PreviewComponent = NodePreviewRenderers[childNode.type];
        return PreviewComponent ? (
          <PreviewComponent key={nodeId} node={childNode} language={language} />
        ) : null;
      })}
    </section>
  );
};
