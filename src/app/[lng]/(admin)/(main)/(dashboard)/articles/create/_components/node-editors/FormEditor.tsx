import { FormNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash } from "lucide-react";
import { nanoid } from "nanoid";

interface FormEditorProps {
  node: FormNode;
}

export const FormEditor = ({ node }: FormEditorProps) => {
  const { updateNode } = useNode(node.id);

  const addField = () => {
    const fieldId = nanoid(15);
    updateNode({
      fields: [
        ...node.fields,
        {
          id: fieldId,
          type: "text",
          label: {
            fallbackContent: "New Field",
            content: { en: "New Field", ne: "नयाँ फिल्ड" },
          },
          required: false,
        },
      ],
    } as Partial<FormNode>);
  };

  const removeField = (fieldId: string) => {
    updateNode({
      fields: node.fields.filter((field) => field.id !== fieldId),
    } as Partial<FormNode>);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Form Fields</h3>
        <Button onClick={addField}>
          <Plus className="w-4 h-4 mr-2" />
          Add Field
        </Button>
      </div>

      <Tabs defaultValue="en">
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">नेपाली</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang}>
            <div className="space-y-4">
              {node.fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <Input
                        value={field.label.content[lang as "en" | "ne"]}
                        onChange={(e) =>
                          updateNode({
                            fields: node.fields.map((f) =>
                              f.id === field.id
                                ? {
                                    ...f,
                                    label: {
                                      ...f.label,
                                      content: {
                                        ...f.label.content,
                                        [lang]: e.target.value,
                                      },
                                    },
                                  }
                                : f,
                            ),
                          } as Partial<FormNode>)
                        }
                        placeholder="Field label"
                      />
                    </div>
                    <Select
                      value={field.type}
                      onValueChange={(
                        value:
                          | "text"
                          | "number"
                          | "email"
                          | "select"
                          | "textarea",
                      ) =>
                        updateNode({
                          fields: node.fields.map((f) =>
                            f.id === field.id ? { ...f, type: value } : f,
                          ),
                        } as Partial<FormNode>)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Field type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                        <SelectItem value="textarea">Textarea</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(field.id)}
                      className="ml-2"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
