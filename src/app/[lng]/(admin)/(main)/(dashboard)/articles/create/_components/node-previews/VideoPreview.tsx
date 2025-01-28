import { VideoNode } from "../../_store/types";

interface VideoPreviewProps {
  node: VideoNode;
  language: "en" | "ne";
}

export const VideoPreview = ({ node, language }: VideoPreviewProps) => {
  const caption =
    node.caption?.content[language] || node.caption?.fallbackContent;

  return (
    <figure className="my-8">
      <div className="relative aspect-video">
        <video
          src={node.src}
          poster={node.poster}
          controls={node.controls ?? true}
          autoPlay={node.autoplay}
          loop={node.loop}
          muted={node.muted}
          className="w-full h-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
