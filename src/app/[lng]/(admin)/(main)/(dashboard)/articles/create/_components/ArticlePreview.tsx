import { ArticleSchema as Article } from "../_store/types";
import { PreviewNodeRenderer } from "./PreviewNodeRenderer";

interface ArticlePreviewProps {
  article: Article;
}

export const ArticlePreview = ({ article }: ArticlePreviewProps) => {
  return (
    <article className="prose prose-lg max-w-none">
      {article.structure.order.map((nodeId) => {
        const node = article.structure.nodes.find((n) => n.id === nodeId);
        if (!node) return null;

        return (
          <PreviewNodeRenderer
            key={nodeId}
            node={node}
            language={article.settings.defaultLanguage}
          />
        );
      })}
    </article>
  );
};
