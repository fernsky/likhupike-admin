import { ArticleSchema } from "../_store/types";
import { NodePreviewRenderers } from "./node-previews";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, Share2, Bookmark, Languages } from "lucide-react";
import { useState } from "react";

interface PreviewProps {
  article: ArticleSchema;
}

export const Preview = ({ article }: PreviewProps) => {
  const [language, setLanguage] = useState<"en" | "ne">(
    article.settings.defaultLanguage,
  );

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto py-12 antialiased"
    >
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-1.5 rounded-full border shadow-sm">
          <Languages className="w-4 h-4 text-gray-400" />
          {["en", "ne"].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang as "en" | "ne")}
              className={cn(
                "text-sm font-medium px-2.5 py-1 rounded-full transition-all",
                language === lang
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              {lang === "en" ? "EN" : "नेपाली"}
            </button>
          ))}
        </div>
      </div>

      {/* Article Meta */}
      <header className="mb-16">
        {/* Category & Reading Time */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
          {article.metadata.categories?.[0] && (
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {article.metadata.categories[0]}
            </span>
          )}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{article.metadata.readingTime} min read</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-6">
          <h1 className="text-4xl/snug md:text-5xl/snug font-serif font-bold tracking-tight text-gray-900">
            {article.metadata.title?.content[language]}
          </h1>
          {article.metadata.description?.content[language] && (
            <p className="text-xl text-gray-600 font-serif">
              {article.metadata.description.content[language]}
            </p>
          )}
        </div>

        {/* Author & Actions */}
        <div className="mt-8 flex items-center justify-between py-6 border-y">
          {article.metadata.author && (
            <div className="flex items-center gap-4">
              {article.metadata.author.avatar && (
                <img
                  src={article.metadata.author.avatar}
                  alt={article.metadata.author.name.fallbackContent}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <div className="font-medium text-gray-900">
                  {article.metadata.author.name.content[language]}
                </div>
                <time className="text-sm text-gray-600">
                  {new Date(article.metadata.updated).toLocaleDateString()}
                </time>
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {article.metadata.coverImage && (
        <div className="relative h-[60vh] -mx-4 mb-16 rounded-lg overflow-hidden">
          <img
            src={article.metadata.coverImage}
            alt={article.metadata.title?.content[language] || ""}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <div
        className={cn(
          "prose prose-lg max-w-none",
          "prose-headings:scroll-mt-20 prose-headings:font-serif",
          "prose-p:text-gray-600",
          "prose-a:text-gray-900 prose-a:underline-offset-4",
          "prose-img:rounded-lg",
          "prose-blockquote:font-serif prose-blockquote:text-gray-900 prose-blockquote:border-l-gray-900",
          "prose-strong:text-gray-900",
          "prose-table:text-sm",
          "prose-pre:bg-gray-900",
          "prose-code:text-gray-900",
        )}
      >
        {article.structure.order.map((nodeId) => {
          const node = article.structure.nodes.find((n) => n.id === nodeId);
          if (!node) return null;

          const PreviewComponent = NodePreviewRenderers[node.type];
          return PreviewComponent ? (
            <PreviewComponent key={node.id} node={node} language={language} />
          ) : null;
        })}
      </div>

      {/* Article Footer */}
      {article.metadata.tags && article.metadata.tags.length > 0 && (
        <footer className="mt-16 pt-8 border-t">
          <div className="flex items-center gap-2">
            {article.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </motion.article>
  );
};
