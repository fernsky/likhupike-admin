import { useArticleStore } from "../_store/store";
import { NodeRenderer } from "./NodeRenderer";
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

export const NodeList = () => {
  const { nodes, order, reorderNodes } = useArticleStore((state) => ({
    nodes: state.article.structure.nodes,
    order: state.article.structure.order,
    reorderNodes: state.reorderNodes,
  }));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = order.indexOf(active.id);
      const newIndex = order.indexOf(over.id);
      const newOrder = [...order];
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
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {order.map((nodeId) => (
            <NodeRenderer
              key={nodeId}
              node={nodes.find((n) => n.id === nodeId)!}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
