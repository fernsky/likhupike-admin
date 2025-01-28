import { useArticleStore } from "../_store/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export const MetadataEditor = () => {
  const { article, updateMetadata } = useArticleStore((state) => ({
    article: state.article,
    updateMetadata: state.updateMetadata,
  }));

  const handleChange = (
    field: keyof typeof article.metadata,
    value: any,
    language?: "en" | "ne",
  ) => {
    if (language) {
      const fieldValue = article.metadata[field];
      if (
        typeof fieldValue === "object" &&
        fieldValue !== null &&
        "content" in fieldValue
      ) {
        updateMetadata({
          ...article.metadata,
          [field]: {
            ...fieldValue,
            content: {
              ...(fieldValue.content || {}),
              [language]: value,
            },
          },
        });
      }
    } else {
      updateMetadata({
        ...article.metadata,
        [field]: value,
      });
    }
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="en" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">Nepali</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang} className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={article.metadata.title.content[lang] || ""}
                  onChange={(e) =>
                    handleChange("title", e.target.value, lang as "en" | "ne")
                  }
                  placeholder={`Article title in ${lang === "en" ? "English" : "Nepali"}`}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={article.metadata.description.content[lang] || ""}
                  onChange={(e) =>
                    handleChange(
                      "description",
                      e.target.value,
                      lang as "en" | "ne",
                    )
                  }
                  placeholder={`Article description in ${lang === "en" ? "English" : "Nepali"}`}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <ImageUpload
                value={article.metadata.coverImage}
                onChange={(url) => handleChange("coverImage", url)}
                aspectRatio="16:9"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={article.metadata.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Visibility</Label>
                <Select
                  value={article.metadata.visibility}
                  onValueChange={(value) => handleChange("visibility", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="password">Password Protected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Featured Article</Label>
              <Switch
                checked={article.metadata.featured}
                onCheckedChange={(checked) => handleChange("featured", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>SEO Keywords</Label>
              <Input
                value={article.metadata.seo?.keywords || ""}
                onChange={(e) =>
                  handleChange("seo", {
                    ...article.metadata.seo,
                    keywords: e.target.value,
                  })
                }
                placeholder="Enter SEO keywords separated by commas"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
