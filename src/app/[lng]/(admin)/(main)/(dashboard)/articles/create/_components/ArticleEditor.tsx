import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { Badge } from "@/components/ui/badge";
import { ArticleSchema as Article, BaseNode } from "../_store/types";
import { EditorNodeRenderer } from "./EditorNodeRenderer";
import { useArticleStore } from "../_store/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScrollText,
  Type,
  Image as ImageIcon,
  Table,
  Quote,
  List,
  Video,
  Sparkles,
  GripVertical,
} from "lucide-react";
import { type NodeReferenceUIProps, NodeReferenceUI } from "./NodeReferenceUI";
import { cn } from "@/lib/utils";
import { ContentBlockHeader } from "./ContentBlockHeader";
import { NodeTypeColors } from "./node-colors";

// Node type to icon mapping
const nodeTypeIcons: Record<string, React.ReactNode> = {
  paragraph: <Type className="w-4 h-4" />,
  image: <ImageIcon className="w-4 h-4" />,
  table: <Table className="w-4 h-4" />,
  quote: <Quote className="w-4 h-4" />,
  list: <List className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
};

interface ArticleEditorProps {
  article: Article;
  activeNodeId: string | null;
}

interface SortableAccordionItemProps {
  nodeId: string;
  node: BaseNode & { type: keyof typeof NodeTypeColors };
  index: number;
  activeId: string | null;
  activeNodeId: string | null;
  openSections: string[];
  onOpenChange: (id: string) => void;
}

const SortableAccordionItem: React.FC<SortableAccordionItemProps> = ({
  nodeId,
  node,
  index,
  activeNodeId,
  openSections,
  onOpenChange,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: nodeId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isOpen = openSections.includes(nodeId);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-xl transition-all duration-200",
        "bg-gradient-to-b from-white to-gray-50/50",
        isDragging && "opacity-50 cursor-grabbing shadow-2xl scale-[1.02]",
        !isDragging && "hover:shadow-lg border hover:border-primary/20",
      )}
    >
      <div className="flex items-stretch">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="px-3 py-4 flex items-center border-r cursor-grab active:cursor-grabbing group/handle"
        >
          <div className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
            <GripVertical className="w-4 h-4 text-primary group-hover/handle:text-primary/70" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Clickable Header */}
          <div
            onClick={() => onOpenChange(nodeId)}
            className={cn(
              "cursor-pointer transition-colors",
              isOpen ? "bg-muted/50" : "hover:bg-muted/30",
            )}
          >
            <ContentBlockHeader
              type={node.type}
              index={index}
              charCount={
                node.type === "paragraph"
                  ? {
                      en: node?.content?.en?.length || 0,
                      ne: node?.content?.ne?.length || 0,
                    }
                  : undefined
              }
            />
          </div>

          {/* Content Area */}
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? "auto" : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{
              height: { duration: 0.3 },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "px-4 py-4 border-t transition-colors",
                isOpen && "bg-white",
              )}
            >
              <EditorNodeRenderer
                node={node}
                isActive={activeNodeId === nodeId}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const ArticleEditor = ({
  article,
  activeNodeId,
}: ArticleEditorProps) => {
  const reorderNodes = useArticleStore((state) => state.reorderNodes);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = article.structure.order.indexOf(active.id as string);
      const newIndex = article.structure.order.indexOf(over.id as string);
      const newOrder = arrayMove(article.structure.order, oldIndex, newIndex);
      reorderNodes(newOrder);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-primary/5 to-primary/10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <ScrollText className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Content Structure</h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Organize and manage your article content blocks. Drag and drop
                to reorder.
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="gap-2 text-sm px-3 py-1.5 bg-white"
          >
            <Sparkles className="w-4 h-4" />
            {article.structure.order.length} Content Blocks
          </Badge>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={article.structure.order}
          strategy={verticalListSortingStrategy}
        >
          <Accordion type="multiple" value={openSections} className="space-y-4">
            <AnimatePresence>
              {article.structure.order.map((nodeId, index) => {
                const node = article.structure.nodes.find(
                  (n) => n.id === nodeId,
                );
                if (!node) return null;

                return (
                  <SortableAccordionItem
                    key={nodeId}
                    nodeId={nodeId}
                    node={node}
                    index={index}
                    activeId={activeId}
                    activeNodeId={activeNodeId}
                    openSections={openSections}
                    onOpenChange={(id: string) => {
                      setOpenSections((current) =>
                        current.includes(id)
                          ? current.filter((sId) => sId !== id)
                          : [...current, id],
                      );
                    }}
                  />
                );
              })}
            </AnimatePresence>
          </Accordion>
        </SortableContext>

        <DragOverlay>
          {activeId && (
            <div className="rounded-xl border bg-white/90 backdrop-blur-sm shadow-lg">
              <NodeReferenceUI
                node={article.structure.nodes.find((n) => n.id === activeId)!}
                index={article.structure.order.indexOf(activeId)}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </motion.div>
  );
};
