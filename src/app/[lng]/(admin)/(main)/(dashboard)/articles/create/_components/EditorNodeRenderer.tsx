import { BaseNode } from "../_store/types";
import { NodeEditors } from "./node-editors";
import { motion } from "framer-motion";

interface EditorNodeRendererProps {
  node: BaseNode;
  isActive?: boolean;
}

export const EditorNodeRenderer = ({
  node,
  isActive,
}: EditorNodeRendererProps) => {
  const EditorComponent = NodeEditors[node.type];

  if (!EditorComponent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
    >
      <EditorComponent node={node} />
    </motion.div>
  );
};
