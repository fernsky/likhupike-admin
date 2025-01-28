import { BaseNode } from "../_store/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Type,
  Image as ImageIcon,
  Table,
  Quote,
  List,
  Video,
  ArrowUpRight,
  GripVertical,
  MessageSquare,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const nodeTypeIcons: Record<string, React.ReactNode> = {
  paragraph: <Type className="w-4 h-4" />,
  image: <ImageIcon className="w-4 h-4" />,
  table: <Table className="w-4 h-4" />,
  quote: <Quote className="w-4 h-4" />,
  list: <List className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
};

const nodeTypeColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  paragraph: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-100",
  },
  image: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100",
  },
  table: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-100",
  },
  quote: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
  list: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-100",
  },
  video: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-100" },
};

export interface NodeReferenceUIProps {
  node: BaseNode;
  index: number;
  isExpanded?: boolean;
  dragHandleProps?: any;
}

export const NodeReferenceUI: React.FC<NodeReferenceUIProps> = ({
  node,
  index,
  isExpanded,
}) => {
  const colors = nodeTypeColors[node.type] || {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-100",
  };

  return (
    <div
      className={`flex items-center gap-3 p-2 border-l-2 ${colors.border} rounded-r-lg group/ref hover:bg-muted/50 transition-colors`}
    >
      <div className={`flex items-center gap-2 flex-1`}>
        <div
          className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}
        >
          {nodeTypeIcons[node.type] || (
            <Type className={`w-4 h-4 ${colors.text}`} />
          )}
        </div>
        <div className="flex items-center gap-2 overflow-hidden">
          <span className={`font-medium capitalize ${colors.text} truncate`}>
            {node.type}
          </span>
          <Badge variant="outline" className={`${colors.bg} border-0 shrink-0`}>
            Block {index + 1}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="gap-1 bg-white shrink-0">
          <MessageSquare className="w-3 h-3" />2
        </Badge>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform",
            isExpanded && "transform rotate-180",
          )}
        />
      </div>
    </div>
  );
};
