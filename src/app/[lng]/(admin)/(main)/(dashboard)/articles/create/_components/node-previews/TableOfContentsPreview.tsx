import { TableOfContentsNode, HeadingNode } from "../../_store/types";
import { cn } from "@/lib/utils";
import { useArticleStore } from "../../_store/store";

interface TableOfContentsPreviewProps {
  node: TableOfContentsNode;
  language: "en" | "ne";
}

export const TableOfContentsPreview = ({
  node,
  language,
}: TableOfContentsPreviewProps) => {
  const article = useArticleStore((state) => state.article);
  const title = node.title?.content[language] || node.title?.fallbackContent;

  const getHeadings = () => {
    return article.structure.nodes
      .filter((n): n is HeadingNode => {
        return (
          n.type === "heading" &&
          (!node.maxDepth || n.level <= node.maxDepth) &&
          (!node.includeTypes || node.includeTypes.includes(n.type))
        );
      })
      .map((heading) => ({
        id: heading.anchor || heading.id,
        level: heading.level,
        content:
          heading.content.content[language] || heading.content.fallbackContent,
      }));
  };

  const headings = getHeadings();

  return (
    <nav
      className={cn(
        "my-8 p-4 border rounded-lg",
        node.style?.position === "left" && "float-left mr-8",
        node.style?.position === "right" && "float-right ml-8",
        node.style?.sticky && "sticky top-4",
        node.className,
      )}
    >
      {title && <h3 className="font-semibold mb-4">{title}</h3>}
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={heading.id}
            className={cn(
              "hover:text-green-600",
              heading.level === 2 && "ml-4",
              heading.level === 3 && "ml-8",
              heading.level > 3 && "ml-12",
            )}
          >
            <a href={`#${heading.id}`} className="block">
              {node.numbered && `${index + 1}. `}
              {heading.content}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
