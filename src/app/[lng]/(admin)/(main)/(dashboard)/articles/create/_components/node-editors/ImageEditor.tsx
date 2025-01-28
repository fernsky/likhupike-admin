import { ImageNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Upload, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ImageEditorProps {
  node: ImageNode;
}

export const ImageEditor = ({ node }: ImageEditorProps) => {
  const { updateNode } = useNode(node.id);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: Implement image upload logic
    // For now, just create an object URL
    const url = URL.createObjectURL(file);
    updateNode({ src: url } as Partial<ImageNode>);
  };

  return (
    <div className="space-y-6">
      {/* Image Upload/Preview */}
      <div className="flex flex-col items-center gap-4">
        {node.src ? (
          <div className="relative group">
            <img
              src={node.src}
              alt={node.alt?.fallbackContent || ""}
              className="max-w-full h-auto rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => updateNode({ src: "" } as Partial<ImageNode>)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <label className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-500">Click to upload image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        )}
      </div>

      {/* Image Settings */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Switch
            checked={node.responsive || false}
            onCheckedChange={(checked) =>
              updateNode({ responsive: checked } as Partial<ImageNode>)
            }
          />
          <span className="text-sm">Responsive</span>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={node.lazy || false}
            onCheckedChange={(checked) =>
              updateNode({ lazy: checked } as Partial<ImageNode>)
            }
          />
          <span className="text-sm">Lazy Loading</span>
        </div>
      </div>

      {/* Multilingual Content */}
      <Tabs defaultValue="en">
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">नेपाली</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Alt Text</label>
                <Input
                  value={node.alt?.content[lang as "en" | "ne"] || ""}
                  onChange={(e) =>
                    updateNode({
                      alt: {
                        ...(node.alt || { fallbackContent: "", content: {} }),
                        content: {
                          ...(node.alt?.content || {}),
                          [lang]: e.target.value,
                        },
                      },
                    } as Partial<ImageNode>)
                  }
                  placeholder="Image description"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Caption</label>
                <Input
                  value={node.caption?.content[lang as "en" | "ne"] || ""}
                  onChange={(e) =>
                    updateNode({
                      caption: {
                        ...(node.caption || {
                          fallbackContent: "",
                          content: {},
                        }),
                        content: {
                          ...(node.caption?.content || {}),
                          [lang]: e.target.value,
                        },
                      },
                    } as Partial<ImageNode>)
                  }
                  placeholder="Image caption"
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
