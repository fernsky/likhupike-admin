import { create } from "zustand";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { ArticleSchema, BaseNode } from "./types";

interface ArticleStore {
  article: ArticleSchema;
  previewMode: boolean;
  activeNodeId: string | null;

  // Article Actions
  initializeArticle: () => void;
  updateMetadata: (metadata: Partial<ArticleSchema["metadata"]>) => void;
  updateSettings: (settings: Partial<ArticleSchema["settings"]>) => void;

  // Node Actions
  addNode: <T extends BaseNode>(node: Omit<T, "id">) => string;
  updateNode: <T extends BaseNode>(nodeId: string, updates: Partial<T>) => void;
  removeNode: (nodeId: string) => void;
  reorderNodes: (newOrder: string[]) => void;

  // UI Actions
  togglePreviewMode: () => void;
  setActiveNode: (nodeId: string | null) => void;
}

const defaultArticle: ArticleSchema = {
  id: nanoid(15),
  version: "1.0.0",
  metadata: {
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    author: {
      id: "system",
      name: {
        fallbackContent: "System",
        content: {
          en: "System",
          ne: "सिस्टम",
        },
      },
    },
    version: 1,
    status: "draft",
    featured: undefined,
    visibility: undefined,
    coverImage: undefined,
    description: undefined,
    title: undefined,
  },
  settings: {
    defaultLanguage: "en",
    theme: {
      colors: {
        primary: "#10B981",
        secondary: "#6B7280",
        error: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
        success: "#10B981",
      },
      fonts: {
        heading: "Inter",
        body: "Inter",
      },
    },
    features: {
      enableComments: true,
      enableSharing: true,
      enablePrint: true,
      enableDarkMode: true,
    },
  },
  structure: {
    order: [],
    nodes: [],
  },
};

export const useArticleStore = create<ArticleStore>((set) => ({
  article: { ...defaultArticle },
  previewMode: false,
  activeNodeId: null,

  initializeArticle: () =>
    set(
      produce((state) => {
        state.article = { ...defaultArticle, id: nanoid(15) };
      }),
    ),

  updateMetadata: (metadata) =>
    set(
      produce((state) => {
        Object.assign(state.article.metadata, {
          ...metadata,
          updated: new Date().toISOString(),
        });
      }),
    ),

  updateSettings: (settings) =>
    set(
      produce((state) => {
        Object.assign(state.article.settings, settings);
      }),
    ),

  addNode: <T extends BaseNode>(node: Omit<T, "id">) => {
    const nodeId = nanoid(15);
    set(
      produce((state) => {
        state.article.structure.order.push(nodeId);
        state.article.structure.nodes.push({ ...node, id: nodeId } as BaseNode);
      }),
    );
    return nodeId;
  },

  updateNode: <T extends BaseNode>(nodeId: string, updates: Partial<T>) =>
    set(
      produce((state) => {
        const nodeIndex = state.article.structure.nodes.findIndex(
          (node: { id: string }) => node.id === nodeId,
        );
        if (nodeIndex !== -1) {
          // Deep merge the updates instead of using Object.assign
          state.article.structure.nodes[nodeIndex] = {
            ...state.article.structure.nodes[nodeIndex],
            ...updates,
            // Handle nested data updates specially
            ...(updates.data && {
              data: {
                ...state.article.structure.nodes[nodeIndex].data,
                ...updates.data,
              },
            }),
          };
        }
      }),
    ),

  removeNode: (nodeId) =>
    set(
      produce((state) => {
        state.article.structure.order = state.article.structure.order.filter(
          (id: string) => id !== nodeId,
        );
        state.article.structure.nodes = state.article.structure.nodes.filter(
          (node: { id: string }) => node.id !== nodeId,
        );
      }),
    ),

  reorderNodes: (newOrder) =>
    set(
      produce((state) => {
        state.article.structure.order = newOrder;
      }),
    ),

  togglePreviewMode: () =>
    set(
      produce((state) => {
        state.previewMode = !state.previewMode;
      }),
    ),

  setActiveNode: (nodeId) =>
    set(
      produce((state) => {
        state.activeNodeId = nodeId;
      }),
    ),
}));
