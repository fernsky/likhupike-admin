"use client";

import { useArticleStore } from "./_store/store";
import { NodeEditors } from "./_components/node-editors";
import { NodePreviewRenderers } from "./_components/node-previews";
import { NodeSelector } from "./_components/NodeSelector";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { ArticleSettings } from "./_components/ArticleSettings";
import { cn } from "@/lib/utils";

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
            <div className="space-y-8">
              {article.structure.order.map((nodeId) => {
                const node = article.structure.nodes.find(
                  (n) => n.id === nodeId,
                );
                if (!node) return null;

                const PreviewComponent = NodePreviewRenderers[node.type];
                const EditorComponent = NodeEditors[node.type];

                if (!PreviewComponent || !EditorComponent) return null;

                return (
                  <div
                    key={nodeId}
                    className={cn(
                      "border rounded-lg p-4",
                      activeNodeId === nodeId &&
                        !previewMode &&
                        "ring-2 ring-primary",
                    )}
                  >
                    {previewMode ? (
                      <PreviewComponent
                        node={node}
                        language={article.settings.defaultLanguage}
                      />
                    ) : (
                      <EditorComponent node={node} />
                    )}
                  </div>
                );
              })}
            </div>
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
