import { BaseNode } from "../_store/types";
import { NodePreviewRenderers } from "./node-previews";

interface PreviewNodeRendererProps {
  node: BaseNode;
  language: "en" | "ne";
}

export const PreviewNodeRenderer = ({
  node,
  language,
}: PreviewNodeRendererProps) => {
  const PreviewComponent = NodePreviewRenderers[node.type];

  if (!PreviewComponent) return null;

  return <PreviewComponent node={node} language={language} />;
};
