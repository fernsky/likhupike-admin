import { HeadingNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeadingEditorProps {
  node: HeadingNode;
}

export const HeadingEditor = ({ node }: HeadingEditorProps) => {
  const { updateNode } = useNode(node.id);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select
          defaultValue={node.level?.toString()}
          onValueChange={(value) =>
            updateNode({
              level: parseInt(value) as HeadingNode["level"],
            } as Partial<HeadingNode>)
          }
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <SelectItem key={level} value={level.toString()}>
                H{level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="English heading"
          value={node.content.content.en}
          onChange={(e) =>
            updateNode({
              content: {
                ...node.content,
                content: { ...node.content.content, en: e.target.value },
              },
            } as Partial<HeadingNode>)
          }
        />

        <Input
          placeholder="नेपाली शीर्षक"
          value={node.content.content.ne}
          onChange={(e) =>
            updateNode({
              content: {
                ...node.content,
                content: { ...node.content.content, ne: e.target.value },
              },
            } as Partial<HeadingNode>)
          }
        />
      </div>
    </div>
  );
};
