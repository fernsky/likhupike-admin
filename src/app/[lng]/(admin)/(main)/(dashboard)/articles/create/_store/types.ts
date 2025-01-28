/**
 * Advanced Article Content Schema
 * A comprehensive schema for managing complex multilingual article content
 * with support for rich text, media, tables, charts, and interactive elements
 */

import { CSSProperties } from "react";

// Base Types and Utilities
export type Language = "en" | "ne";
export type ThemeColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export type DataType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "currency"
  | "percentage";
export type ChartType =
  | "pie"
  | "donut"
  | "line"
  | "area"
  | "bar"
  | "column"
  | "stacked-column"
  | "scatter";
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

// Rich Text Formatting
export interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  color?: ThemeColor | string;
  backgroundColor?: ThemeColor | string;
  fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  fontFamily?: string;
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider";
  lineHeight?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
}

// Common Interfaces
export interface Metadata {
  featured: boolean | undefined;
  visibility: string | undefined;
  coverImage: string | undefined;
  description: any;
  title: any;
  created: string;
  updated: string;
  author: {
    id: string;
    name: MultilingualContent;
    avatar?: string;
    role?: string;
  };
  version: number;
  tags?: string[];
  categories?: string[];
  status: "draft" | "review" | "published" | "archived";
  seo?: {
    title: MultilingualContent;
    description: MultilingualContent;
    keywords: string[];
    canonicalUrl?: string;
    ogImage?: string;
  };
  readingTime?: number; // in minutes
}

export interface MultilingualContent {
  fallbackContent: string;
  content: Record<Language, string>;
  style?: TextStyle;
}

export interface Visibility {
  isVisible: boolean;
  roles?: string[];
  dateRange?: {
    start?: string;
    end?: string;
  };
  geoRestrictions?: string[]; // Country codes
  conditions?: {
    field: string;
    operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
    value: any;
  }[];
}

// Base Node
export interface BaseNode {
  id: string;
  type: string;
  metadata?: Metadata;
  visibility?: Visibility;
  animation?: {
    type: "fade" | "slide" | "zoom";
    duration: number;
    delay?: number;
  };
  className?: string; // Custom CSS classes
  spacing?: {
    margin?: string;
    padding?: string;
  };
}

// Content Nodes
export interface HeadingNode extends BaseNode {
  type: "heading";
  level: HeadingLevel;
  content: MultilingualContent;
  anchor?: string; // For navigation/linking
  style?: TextStyle;
}

export interface ParagraphNode extends BaseNode {
  type: "paragraph";
  content: MultilingualContent;
  dropcap?: boolean;
  columns?: 1 | 2 | 3;
  style?: TextStyle;
}

export interface ListNode extends BaseNode {
  type: "list";
  listType: "ordered" | "unordered" | "checklist";
  items: {
    id: string;
    content: MultilingualContent;
    checked?: boolean;
    subItems?: string[]; // IDs of nested list items
  }[];
  style?: TextStyle;
}

export interface QuoteNode extends BaseNode {
  type: "quote";
  content: MultilingualContent;
  author?: MultilingualContent;
  source?: MultilingualContent;
  style?: TextStyle & {
    borderStyle?: "left" | "right" | "both" | "none";
    backgroundColor?: string;
  };
}

export interface ImageNode extends BaseNode {
  type: "image";
  src: string;
  alt: MultilingualContent;
  caption?: MultilingualContent;
  responsive?: boolean;
  lazy?: boolean;
  dimensions?: {
    width?: number;
    height?: number;
    aspectRatio?: number;
  };
  style?: {
    borderRadius?: string;
    shadow?: "none" | "sm" | "md" | "lg";
    filter?: string;
  };
}

export interface VideoNode extends BaseNode {
  type: "video";
  src: string;
  poster?: string;
  caption?: MultilingualContent;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  dimensions?: {
    width?: number;
    height?: number;
    aspectRatio?: number;
  };
}

// Table Types with Advanced Features
export interface TableColumn {
  id: string;
  level: number;
  columnSpan: number;
  parentColumn?: string;
  dataType: DataType;
  title: MultilingualContent;
  width?: number | "auto";
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  pinned?: "left" | "right";
  style?: TextStyle & {
    alignment?: "left" | "center" | "right";
  };
  formatter?: {
    type: "date" | "number" | "currency" | "custom";
    config?: Record<string, any>;
  };
  aggregation?: {
    type: "sum" | "average" | "count" | "min" | "max";
    format?: string;
  };
}

export interface TableCell {
  columnId: string;
  rowSpan?: number;
  colSpan?: number;
  content: MultilingualContent;
  style?: TextStyle & {
    alignment?: "left" | "center" | "right";
    verticalAlignment?: "top" | "middle" | "bottom";
  };
  metadata?: {
    isEditable?: boolean;
    isHighlighted?: boolean;
    comment?: MultilingualContent;
  };
}

export interface TableRow {
  id: string;
  rowSpan?: number;
  cells: TableCell[];
  style?: TextStyle;
  metadata?: {
    isExpandable?: boolean;
    expandedContent?: BaseNode;
    isSelectable?: boolean;
    isEditable?: boolean;
  };
}

export interface TableNode extends BaseNode {
  type: "table";
  title?: MultilingualContent;
  description?: MultilingualContent;
  layout: {
    totalColumnSpan: number;
    fixedHeader?: boolean;
    fixedFirstColumn?: boolean;
    responsive?: boolean;
    stripe?: boolean;
    border?: "none" | "horizontal" | "vertical" | "all";
    compact?: boolean;
    pagination?: {
      enabled: boolean;
      pageSize: number;
      pageSizeOptions: number[];
    };
  };
  columns: TableColumn[];
  columnOrder: Record<number, string[]>;
  rows: TableRow[];
  rowOrder: string[];
  footer?: {
    showTotalRow?: boolean;
    showAverageRow?: boolean;
    customRows?: {
      label: MultilingualContent;
      calculation: string; // JavaScript function as string
    }[];
  };
  export?: {
    formats: ("csv" | "excel" | "pdf")[];
    fileName?: string;
  };
}

// Chart Types with Enhanced Features
export interface ChartStyle {
  showPoints: boolean;
  innerRadius: number;
  outerRadius: string;
  showLabels: boolean;
  container: CSSProperties | undefined;
  height: number;
  theme?: "light" | "dark" | "custom";
  colors: string[];
  fontFamily?: string;
  fontSize?: number;
  background?: string;
  padding?: number;
  borderRadius?: number;
  animation?: {
    enabled: boolean;
    duration: number;
    easing?: "linear" | "ease" | "ease-in" | "ease-out";
  };
}

export interface ChartAxis {
  title: MultilingualContent;
  type: "category" | "linear" | "time" | "logarithmic";
  visible?: boolean;
  position?: "left" | "right" | "top" | "bottom";
  gridLines?: {
    show: boolean;
    color?: string;
    dashArray?: number[];
  };
  range?: {
    min?: number;
    max?: number;
    interval?: number;
  };
  labels?: {
    format?: string;
    rotation?: number;
    skip?: number;
  };
}

export interface ChartSeries {
  name: MultilingualContent;
  data: Array<number | { x: number | string; y: number; label?: string }>;
  type?: ChartType;
  stack?: string;
  color?: string;
  visible?: boolean;
  showLabels?: boolean;
  labelPosition?: "inside" | "outside" | "center";
  style?: {
    lineStyle?: "solid" | "dashed" | "dotted";
    lineWidth?: number;
    markerSize?: number;
    opacity?: number;
    gradient?: {
      enabled: boolean;
      colors: string[];
    };
  };
}

export interface ChartNode extends BaseNode {
  type: "chart";
  title?: MultilingualContent;
  description?: MultilingualContent;
  chartType: ChartType;
  data: {
    labels?: MultilingualContent[];
    series: ChartSeries[];
  };
  style: ChartStyle;
  axes?: {
    x?: ChartAxis;
    y?: ChartAxis;
    secondary?: ChartAxis;
  };
  legend?: {
    show: boolean;
    position: "top" | "right" | "bottom" | "left";
    layout: "horizontal" | "vertical";
    interactive?: boolean;
    title?: MultilingualContent;
  };
  tooltip?: {
    enabled: boolean;
    shared?: boolean;
    format?: string;
    custom?: string; // JavaScript function as string
  };
  annotations?: Array<{
    type: "line" | "box" | "text";
    content?: MultilingualContent;
    position: { x: number | string; y: number };
    style?: Record<string, any>;
  }>;
}

// Container/Layout Nodes
export interface SectionNode extends BaseNode {
  type: "section";
  title?: MultilingualContent;
  layout: "stack" | "grid" | "columns";
  nodes: string[]; // IDs of child nodes
  style?: {
    columns?: number;
    gap?: string;
    background?: string;
    maxWidth?: string;
  };
}

export interface CalloutNode extends BaseNode {
  type: "callout";
  variant: "info" | "warning" | "error" | "success" | "note";
  title?: MultilingualContent;
  content: MultilingualContent;
  icon?: string;
  dismissible?: boolean;
}

export interface TableOfContentsNode extends BaseNode {
  type: "toc";
  title?: MultilingualContent;
  maxDepth?: number;
  numbered?: boolean;
  includeTypes?: string[];
  style?: {
    position: "left" | "right";
    sticky?: boolean;
    collapsed?: boolean;
  };
}

// Interactive Elements
export interface ButtonNode extends BaseNode {
  type: "button";
  label: MultilingualContent;
  variant: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  action: {
    type: "link" | "scroll" | "custom";
    target: string;
  };
}

export interface FormNode extends BaseNode {
  type: "form";
  fields: Array<{
    id: string;
    type: "text" | "number" | "email" | "select" | "textarea";
    label: MultilingualContent;
    placeholder?: MultilingualContent;
    required?: boolean;
    validation?: Record<string, any>;
  }>;
  submitButton: {
    label: MultilingualContent;
    action: string;
  };
}

// Root Schema
export interface ArticleSchema {
  id: string;
  version: string;
  metadata: Metadata;
  settings: {
    defaultLanguage: Language;
    theme?: {
      colors: Record<ThemeColor, string>;
      fonts?: {
        heading: string;
        body: string;
      };
      spacing?: {
        unit: number;
        scale: number[];
      };
    };
    layout?: {
      maxWidth?: string;
      gap?: string;
    };
    features?: {
      enableComments?: boolean;
      enableSharing?: boolean;
      enablePrint?: boolean;
      enableDarkMode?: boolean;
    };
  };
  structure: {
    order: string[];
    nodes: Array<
      | HeadingNode
      | ParagraphNode
      | ListNode
      | QuoteNode
      | ImageNode
      | VideoNode
      | TableNode
      | ChartNode
      | SectionNode
      | CalloutNode
      | TableOfContentsNode
      | ButtonNode
      | FormNode
    >;
  };
}
