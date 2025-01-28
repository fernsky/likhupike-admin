import { ListNode } from "../../_store/types";
import { cn } from "@/lib/utils";

interface ListPreviewProps {
  node: ListNode;
  language: "en" | "ne";
}

export const ListPreview = ({ node, language }: ListPreviewProps) => {
  const getContent = (content: any) =>
    content?.content[language] || content?.fallbackContent || "";

  if (node.listType === "checklist") {
    return (
      <div className="space-y-2 my-4">
        {node.items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.checked}
              readOnly
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className={cn(item.checked && "line-through text-gray-500")}>
              {getContent(item.content)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const ListComponent = node.listType === "ordered" ? "ol" : "ul";
  return (
    <ListComponent
      className={cn(
        "my-4 space-y-2",
        node.listType === "ordered" ? "list-decimal pl-6" : "list-disc pl-6",
      )}
    >
      {node.items.map((item) => (
        <li key={item.id}>{getContent(item.content)}</li>
      ))}
    </ListComponent>
  );
};
