import { Eye, EyeOff, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useArticleStore } from "../_store/store";
import { NodeTypeSelector } from "./NodeTypeSelector";
import { useState } from "react";

export const Toolbar = () => {
  const [showNodeSelector, setShowNodeSelector] = useState(false);
  const { previewMode, togglePreviewMode, article } = useArticleStore(
    (state) => ({
      previewMode: state.previewMode,
      togglePreviewMode: state.togglePreviewMode,
      article: state.article,
    }),
  );

  const handleSave = () => {
    console.log("Article Schema:", article);
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNodeSelector(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
            <NodeTypeSelector
              open={showNodeSelector}
              onClose={() => setShowNodeSelector(false)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={togglePreviewMode}>
              {previewMode ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Exit Preview
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
