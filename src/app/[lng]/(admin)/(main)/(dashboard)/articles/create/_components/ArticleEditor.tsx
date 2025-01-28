import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ArticleSchema as Article } from "../_store/types";
import { EditorNodeRenderer } from "./EditorNodeRenderer";
import { useArticleStore } from "../_store/store";
import { Key } from "react";

interface ArticleEditorProps {
  article: Article;
  activeNodeId: string | null;
}

export const ArticleEditor = ({
  article,
  activeNodeId,
}: ArticleEditorProps) => {
  const reorderNodes = useArticleStore((state) => state.reorderNodes);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = article.structure.order.indexOf(active.id);
      const newIndex = article.structure.order.indexOf(over.id);
      const newOrder = [...article.structure.order];
      newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, active.id);
      reorderNodes(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={article.structure.order}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {article.structure.order.map((nodeId: Key | null | undefined) => {
            const node = article.structure.nodes.find(
              (n: { id: Key | null | undefined }) => n.id === nodeId,
            );
            if (!node) return null;

            return (
              <EditorNodeRenderer
                key={nodeId}
                node={node}
                isActive={activeNodeId === nodeId}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};
