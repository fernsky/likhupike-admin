import { useEffect } from "react";
import { useArticleStore } from "../_store/store";
import { NodeList } from "./NodeList";
import { Toolbar } from "./Toolbar";
import { Preview } from "./Preview";
import { MetadataEditor } from "./MetadataEditor";

export const ArticleEditor = () => {
  const initializeArticle = useArticleStore((state) => state.initializeArticle);
  const previewMode = useArticleStore((state) => state.previewMode);
  const article = useArticleStore((state) => state.article);

  useEffect(() => {
    initializeArticle();
  }, [initializeArticle]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toolbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {!previewMode ? (
            <div className="space-y-8">
              <MetadataEditor />
              <NodeList />
            </div>
          ) : (
            <Preview article={article} />
          )}
        </div>
      </div>
    </div>
  );
};
