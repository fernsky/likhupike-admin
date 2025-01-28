import { ButtonNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ButtonEditorProps {
  node: ButtonNode;
}

export const ButtonEditor = ({ node }: ButtonEditorProps) => {
  const { updateNode } = useNode(node.id);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Select
          value={node.variant}
          onValueChange={(value: ButtonNode["variant"]) =>
            updateNode({ variant: value } as Partial<ButtonNode>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="ghost">Ghost</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={node.size}
          onValueChange={(value: string) =>
            updateNode({
              size: value as ButtonNode["size"],
            } as Partial<ButtonNode>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="en">
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">नेपाली</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Button Label</label>
                <Input
                  value={node.label.content[lang as "en" | "ne"]}
                  onChange={(e) =>
                    updateNode({
                      label: {
                        ...node.label,
                        content: {
                          ...node.label.content,
                          [lang]: e.target.value,
                        },
                      },
                    } as Partial<ButtonNode>)
                  }
                  placeholder="Enter button label"
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Action Type</label>
          <Select
            value={node.action.type}
            onValueChange={(value: ButtonNode["action"]["type"]) =>
              updateNode({
                action: { ...node.action, type: value },
              } as Partial<ButtonNode>)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select action type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="link">Link</SelectItem>
              <SelectItem value="scroll">Scroll</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Action Target</label>
          <Input
            value={node.action.target || ""}
            onChange={(e) =>
              updateNode({
                action: { ...node.action, target: e.target.value },
              } as Partial<ButtonNode>)
            }
            placeholder={
              node.action.type === "link"
                ? "Enter URL"
                : node.action.type === "scroll"
                  ? "Enter element ID"
                  : "Enter custom action"
            }
          />
        </div>
      </div>
    </div>
  );
};
