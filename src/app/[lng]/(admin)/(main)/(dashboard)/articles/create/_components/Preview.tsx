import { ArticleSchema } from "../_store/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NodePreviewRenderers } from "./node-previews";
import { cn } from "@/lib/utils";

interface PreviewProps {
  article: ArticleSchema;
}

export const Preview = ({ article }: PreviewProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {article.metadata.seo?.title?.content[
            article.settings.defaultLanguage
          ] || "Untitled Article"}
        </h1>
        {article.metadata.author && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>
              By{" "}
              {
                article.metadata.author.name.content[
                  article.settings.defaultLanguage
                ]
              }
            </span>
            <span>•</span>
            <span>
              {new Date(article.metadata.updated).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <Tabs defaultValue={article.settings.defaultLanguage}>
        <TabsList className="mb-8">
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">नेपाली</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent
            key={lang}
            value={lang}
            className={cn(
              "prose max-w-none",
              "prose-headings:scroll-mt-20",
              "prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline",
              "prose-img:rounded-lg",
              "prose-blockquote:border-l-green-600",
              "prose-table:text-sm",
            )}
          >
            {article.structure.order.map((nodeId) => {
              const node = article.structure.nodes.find((n) => n.id === nodeId);
              if (!node) return null;

              const PreviewComponent = NodePreviewRenderers[node.type];
              return PreviewComponent ? (
                <PreviewComponent
                  key={node.id}
                  node={node}
                  language={lang as "en" | "ne"}
                />
              ) : null;
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
