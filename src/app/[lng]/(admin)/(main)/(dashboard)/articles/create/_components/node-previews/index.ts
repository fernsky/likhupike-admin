import { BaseNode } from "../../_store/types";
import { HeadingPreview } from "./HeadingPreview";
import { ListPreview } from "./ListPreview";
import { ParagraphPreview } from "./ParagraphPreview";
import { QuotePreview } from "./QuotePreview";
import { ImagePreview } from "./ImagePreview";
import { VideoPreview } from "./VideoPreview";
import { TablePreview } from "./TablePreview";
import { ChartPreview } from "./ChartPreview";
import { CalloutPreview } from "./CalloutPreview";
import { ButtonPreview } from "./ButtonPreview";
import { FormPreview } from "./FormPreview";
import { SectionPreview } from "./SectionPreview";
import { TableOfContentsPreview } from "./TableOfContentsPreview";

interface PreviewProps<T extends BaseNode = BaseNode> {
  node: T;
  language: "en" | "ne";
}

type PreviewComponent<T extends BaseNode = BaseNode> = React.ComponentType<
  PreviewProps<T>
>;

export const NodePreviewRenderers: Record<string, PreviewComponent<any>> = {
  heading: HeadingPreview,
  paragraph: ParagraphPreview,
  list: ListPreview,
  quote: QuotePreview,
  image: ImagePreview,
  video: VideoPreview,
  table: TablePreview,
  chart: ChartPreview,
  section: SectionPreview,
  callout: CalloutPreview,
  toc: TableOfContentsPreview,
  button: ButtonPreview,
  form: FormPreview,
};

export {
  HeadingPreview,
  ListPreview,
  ParagraphPreview,
  QuotePreview,
  ImagePreview,
  VideoPreview,
  TablePreview,
  ChartPreview,
  SectionPreview,
  CalloutPreview,
  TableOfContentsPreview,
  ButtonPreview,
  FormPreview,
};
