import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BaseNode } from "../_store/types";
import { GripVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNode } from "../_store/hooks";
import { NodeEditors } from "./node-editors";

interface NodeRendererProps {
  node: BaseNode;
}

export const NodeRenderer = ({ node }: NodeRendererProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: node.id,
    resizeObserverConfig: {
      disabled: true,
    },
  });

  const { removeNode } = useNode(node.id);
  const Editor = NodeEditors[node.type];

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!Editor) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative border rounded-lg p-4 bg-white",
        isDragging && "opacity-50 border-dashed",
      )}
    >
      <div
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>

      <button
        onClick={removeNode}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="pl-6 pr-6">
        <Editor node={node} />
      </div>
    </div>
  );
};
