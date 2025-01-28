import { useArticleStore } from "../_store/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Type,
  Image,
  List,
  Quote,
  Table,
  PieChart,
  AlertCircle,
  MousePointer,
  LayoutGrid,
  FormInput,
} from "lucide-react";

interface NodeSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect?: (node: { id: string; type: string }) => void;
}

const nodeTypes = [
  {
    type: "heading",
    label: "Heading",
    icon: Type,
    defaultData: {
      level: 2,
      content: {
        fallbackContent: "",
        content: { en: "", ne: "" },
      },
    },
  },
  {
    type: "paragraph",
    label: "Paragraph",
    icon: Type,
    defaultData: {
      content: {
        fallbackContent: "",
        content: { en: "", ne: "" },
      },
    },
  },
  {
    type: "image",
    label: "Image",
    icon: Image,
    defaultData: {
      src: "",
      alt: {
        fallbackContent: "",
        content: { en: "", ne: "" },
      },
    },
  },
  {
    type: "list",
    label: "List",
    icon: List,
    defaultData: {
      listType: "unordered",
      items: [],
    },
  },
  {
    type: "quote",
    label: "Quote",
    icon: Quote,
    defaultData: {
      content: {
        fallbackContent: "",
        content: { en: "", ne: "" },
      },
    },
  },
  {
    type: "table",
    label: "Table",
    icon: Table,
    defaultData: {
      columns: [],
      rows: [],
      rowOrder: [],
      columnOrder: {},
      layout: {
        totalColumnSpan: 0,
        responsive: true,
        stripe: false,
        border: "all",
      },
    },
  },
  {
    type: "chart",
    label: "Chart",
    icon: PieChart,
    defaultData: {
      chartType: "bar",
      data: { series: [] },
    },
  },
  {
    type: "callout",
    label: "Callout",
    icon: AlertCircle,
    defaultData: {
      variant: "info",
      content: {
        fallbackContent: "",
        content: { en: "", ne: "" },
      },
    },
  },
  {
    type: "button",
    label: "Button",
    icon: MousePointer,
    defaultData: {
      variant: "primary",
      size: "md",
      label: {
        fallbackContent: "",
        content: { en: "", ne: "" },
      },
      action: { type: "link", target: "" },
    },
  },
  {
    type: "section",
    label: "Section",
    icon: LayoutGrid,
    defaultData: {
      layout: "grid",
      nodes: [],
    },
  },
  {
    type: "form",
    label: "Form",
    icon: FormInput,
    defaultData: {
      fields: [],
      submitButton: {
        label: {
          fallbackContent: "Submit",
          content: { en: "Submit", ne: "पेश गर्नुहोस्" },
        },
      },
    },
  },
];

export const NodeSelector = ({
  open,
  onClose,
  onSelect,
}: NodeSelectorProps) => {
  const addNode = useArticleStore((state) => state.addNode);

  const handleSelect = (nodeType: (typeof nodeTypes)[number]) => {
    const nodeId = addNode({
      type: nodeType.type,
      ...nodeType.defaultData,
    });
    onSelect?.({ id: nodeId, type: nodeType.type });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 p-4">
          {nodeTypes.map((nodeType) => {
            const Icon = nodeType.icon;
            return (
              <Button
                key={nodeType.type}
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
                onClick={() => handleSelect(nodeType)}
              >
                <Icon className="w-8 h-8" />
                <span>{nodeType.label}</span>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
