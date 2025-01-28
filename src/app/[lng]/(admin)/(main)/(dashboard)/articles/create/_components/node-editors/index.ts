import { HeadingEditor } from "./HeadingEditor";
import { ParagraphEditor } from "./ParagraphEditor";
import { TableEditor } from "./TableEditor";
import { ImageEditor } from "./ImageEditor";
import { ListEditor } from "./ListEditor";
import { QuoteEditor } from "./QuoteEditor";
import { ChartEditor } from "./ChartEditor";
import { CalloutEditor } from "./CalloutEditor";
import { ButtonEditor } from "./ButtonEditor";
import { SectionEditor } from "./SectionEditor";
import { TableOfContentsEditor } from "./TableOfContentsEditor";
import { VideoEditor } from "./VideoEditor";

export const NodeEditors: Record<string, React.ComponentType<any>> = {
  heading: HeadingEditor,
  paragraph: ParagraphEditor,
  table: TableEditor,
  image: ImageEditor,
  list: ListEditor,
  quote: QuoteEditor,
  chart: ChartEditor,
  callout: CalloutEditor,
  button: ButtonEditor,
  section: SectionEditor,
  toc: TableOfContentsEditor,
  video: VideoEditor,
};
