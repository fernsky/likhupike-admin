import { VideoNode } from "../../_store/types";
import { useNode } from "../../_store/hooks";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { Card, CardContent } from "@/components/ui/card";

interface VideoEditorProps {
  node: VideoNode;
}

export const VideoEditor = ({ node }: VideoEditorProps) => {
  const { updateNode } = useNode(node.id);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Video URL</Label>
          <Input
            value={node.src}
            onChange={(e) =>
              updateNode({ src: e.target.value } as Partial<VideoNode>)
            }
            placeholder="Enter video URL"
          />
        </div>

        <div>
          <Label>Poster Image</Label>
          <ImageUpload
            value={node.poster}
            onChange={(url) =>
              updateNode({ poster: url } as Partial<VideoNode>)
            }
            aspectRatio="16:9"
          />
        </div>
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
                <Label>Caption</Label>
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
                    } as Partial<VideoNode>)
                  }
                  placeholder="Video caption"
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Show Controls</Label>
              <Switch
                checked={node.controls ?? true}
                onCheckedChange={(checked) =>
                  updateNode({ controls: checked } as Partial<VideoNode>)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Autoplay</Label>
              <Switch
                checked={node.autoplay}
                onCheckedChange={(checked) =>
                  updateNode({ autoplay: checked } as Partial<VideoNode>)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Loop</Label>
              <Switch
                checked={node.loop}
                onCheckedChange={(checked) =>
                  updateNode({ loop: checked } as Partial<VideoNode>)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Muted</Label>
              <Switch
                checked={node.muted}
                onCheckedChange={(checked) =>
                  updateNode({ muted: checked } as Partial<VideoNode>)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
