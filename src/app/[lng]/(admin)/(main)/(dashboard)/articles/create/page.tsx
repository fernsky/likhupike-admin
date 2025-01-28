"use client";

import { useArticleStore } from "./_store/store";
import { NodeSelector } from "./_components/NodeSelector";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { ArticleSettings } from "./_components/ArticleSettings";
import { ArticleEditor } from "./_components/ArticleEditor";
import { ArticlePreview } from "./_components/ArticlePreview";

export default function CreateArticlePage() {
  const {
    article,
    activeNodeId,
    previewMode,
    initializeArticle,
    togglePreviewMode,
  } = useArticleStore();
  const [showNodeSelector, setShowNodeSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    initializeArticle();
  }, [initializeArticle]);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Article Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Toolbar */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button onClick={() => setShowNodeSelector(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Content
                </Button>
                <Button variant="outline" onClick={() => setShowSettings(true)}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
              <Button variant="outline" onClick={togglePreviewMode}>
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? "Edit Mode" : "Preview"}
              </Button>
            </div>

            {/* Article Structure */}
            {previewMode ? (
              <ArticlePreview article={article} />
            ) : (
              <ArticleEditor article={article} activeNodeId={activeNodeId} />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <NodeSelector
        open={showNodeSelector}
        onClose={() => setShowNodeSelector(false)}
      />

      <ArticleSettings
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
