import { useArticleStore } from "./store";
import { BaseNode } from "./types";

export const useNode = (nodeId: string) => {
  const node = useArticleStore((state) =>
    state.article.structure.nodes.find((n) => n.id === nodeId),
  );
  const updateNode = useArticleStore((state) => state.updateNode);
  const removeNode = useArticleStore((state) => state.removeNode);

  return {
    node,
    updateNode: (updates: Partial<BaseNode>) => updateNode(nodeId, updates),
    removeNode: () => removeNode(nodeId),
  };
};

export const useActiveNode = () => {
  const activeNodeId = useArticleStore((state) => state.activeNodeId);
  const setActiveNode = useArticleStore((state) => state.setActiveNode);
  const node = activeNodeId ? useNode(activeNodeId) : null;

  return {
    activeNodeId,
    setActiveNode,
    activeNode: node,
  };
};

export const useArticlePreview = () => {
  const previewMode = useArticleStore((state) => state.previewMode);
  const togglePreview = useArticleStore((state) => state.togglePreviewMode);
  const article = useArticleStore((state) => state.article);

  return {
    previewMode,
    togglePreview,
    article,
  };
};
