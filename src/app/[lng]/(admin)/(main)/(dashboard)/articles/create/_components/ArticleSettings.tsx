import { useArticleStore } from "../_store/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/shared/ImageUpload";

interface ArticleSettingsProps {
  open: boolean;
  onClose: () => void;
}

export const ArticleSettings = ({ open, onClose }: ArticleSettingsProps) => {
  const { article, updateMetadata, updateSettings } = useArticleStore();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Article Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="metadata">
          <TabsList>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="metadata" className="space-y-4">
            <ImageUpload
              value={article.metadata.coverImage}
              onChange={(url) => updateMetadata({ coverImage: url })}
              aspectRatio="16:9"
            />

            <div className="grid grid-cols-2 gap-4">
              {["en", "ne"].map((lang) => (
                <div key={lang} className="space-y-2">
                  <Label>Title ({lang.toUpperCase()})</Label>
                  <Input
                    value={
                      article.metadata.title?.content[lang as "en" | "ne"] || ""
                    }
                    onChange={(e) =>
                      updateMetadata({
                        title: {
                          ...(article.metadata.title || {
                            fallbackContent: "",
                            content: {},
                          }),
                          content: {
                            ...(article.metadata.title?.content || {}),
                            [lang]: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["en", "ne"].map((lang) => (
                <div key={lang} className="space-y-2">
                  <Label>Description ({lang.toUpperCase()})</Label>
                  <Input
                    value={
                      article.metadata.description?.content[
                        lang as "en" | "ne"
                      ] || ""
                    }
                    onChange={(e) =>
                      updateMetadata({
                        description: {
                          ...(article.metadata.description || {
                            fallbackContent: "",
                            content: {},
                          }),
                          content: {
                            ...(article.metadata.description?.content || {}),
                            [lang]: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <div className="space-y-4">
              {Object.entries(article.settings.features || {}).map(
                ([feature, enabled]) => (
                  <div
                    key={feature}
                    className="flex items-center justify-between"
                  >
                    <Label className="capitalize">
                      {feature.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        updateSettings({
                          features: {
                            ...article.settings.features,
                            [feature]: checked,
                          },
                        })
                      }
                    />
                  </div>
                ),
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
