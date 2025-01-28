import { ParagraphNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ParagraphEditorProps {
  node: ParagraphNode;
}

export const ParagraphEditor = ({ node }: ParagraphEditorProps) => {
  const { updateNode } = useNode(node.id);

  return (
    <Tabs defaultValue="en">
      <TabsList className="mb-4">
        <TabsTrigger value="en">English</TabsTrigger>
        <TabsTrigger value="ne">नेपाली</TabsTrigger>
      </TabsList>

      <TabsContent value="en">
        <Textarea
          placeholder="Enter English text..."
          value={node.content.content.en}
          onChange={(e) =>
            updateNode({
              content: {
                ...node.content,
                content: { ...node.content.content, en: e.target.value },
              },
            } as Partial<ParagraphNode>)
          }
          rows={6}
        />
      </TabsContent>

      <TabsContent value="ne">
        <Textarea
          placeholder="नेपाली पाठ लेख्नुहोस्..."
          value={node.content.content.ne}
          onChange={(e) =>
            updateNode({
              content: {
                ...node.content,
                content: { ...node.content.content, ne: e.target.value },
              },
            } as Partial<ParagraphNode>)
          }
          rows={6}
        />
      </TabsContent>
    </Tabs>
  );
};
