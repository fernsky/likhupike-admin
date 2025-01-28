import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useArticleStore } from "../_store/store";
import {
  Type,
  Table,
  BarChart,
  Image,
  Video,
  List,
  Quote,
  Layout,
  Bell,
  ListOrdered,
  Square as ButtonIcon,
} from "lucide-react";

interface NodeTypeSelectorProps {
  open: boolean;
  onClose: () => void;
}

const nodeTypes = [
  {
    type: "heading",
    icon: Type,
    label: "Heading",
    description: "Section title or subtitle",
  },
  {
    type: "paragraph",
    icon: Type,
    label: "Paragraph",
    description: "Regular text content",
  },
  {
    type: "table",
    icon: Table,
    label: "Table",
    description: "Tabular data with advanced features",
  },
  {
    type: "chart",
    icon: BarChart,
    label: "Chart",
    description: "Visual data representation",
  },
  {
    type: "image",
    icon: Image,
    label: "Image",
    description: "Single image with caption",
  },
  {
    type: "video",
    icon: Video,
    label: "Video",
    description: "Embedded video content",
  },
  {
    type: "list",
    icon: List,
    label: "List",
    description: "Bulleted or numbered list",
  },
  {
    type: "quote",
    icon: Quote,
    label: "Quote",
    description: "Highlighted quotation",
  },
  {
    type: "section",
    icon: Layout,
    label: "Section",
    description: "Content container with layout options",
  },
  {
    type: "callout",
    icon: Bell,
    label: "Callout",
    description: "Highlighted information box",
  },
  {
    type: "toc",
    icon: ListOrdered,
    label: "Table of Contents",
    description: "Auto-generated content index",
  },
  {
    type: "button",
    icon: ButtonIcon,
    label: "Button",
    description: "Interactive button element",
  },
];

export const NodeTypeSelector = ({ open, onClose }: NodeTypeSelectorProps) => {
  const addNode = useArticleStore((state) => state.addNode);

  const handleSelect = (type: string) => {
    const baseNode = {
      type,
      content: {
        fallbackContent: "",
        content: {
          en: "",
          ne: "",
        },
      },
    };
    addNode(baseNode);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Content Block</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {nodeTypes.map((nodeType) => (
            <button
              key={nodeType.type}
              onClick={() => handleSelect(nodeType.type)}
              className="flex flex-col items-center p-4 rounded-lg border hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <nodeType.icon className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">{nodeType.label}</h3>
              <p className="text-sm text-gray-500 text-center">
                {nodeType.description}
              </p>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
