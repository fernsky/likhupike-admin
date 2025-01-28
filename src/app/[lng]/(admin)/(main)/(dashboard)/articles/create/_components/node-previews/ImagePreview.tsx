import Image from "next/image";
import { ImageNode } from "../../_store/types";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  node: ImageNode;
  language: "en" | "ne";
}

export const ImagePreview = ({ node, language }: ImagePreviewProps) => {
  const alt = node.alt.content[language] || node.alt.fallbackContent;
  const caption =
    node.caption?.content[language] || node.caption?.fallbackContent;

  return (
    <figure className="my-8">
      <div
        className={cn(
          "overflow-hidden",
          node.style?.shadow === "sm" && "shadow-sm",
          node.style?.shadow === "md" && "shadow-md",
          node.style?.shadow === "lg" && "shadow-lg",
          node.className,
        )}
        style={{ borderRadius: node.style?.borderRadius }}
      >
        {node.dimensions ? (
          <Image
            src={node.src}
            alt={alt}
            width={node.dimensions.width}
            height={node.dimensions.height}
            className={cn("w-full h-auto", node.style?.filter)}
            loading={node.lazy ? "lazy" : "eager"}
          />
        ) : (
          // Fallback for images without dimensions
          <img
            src={node.src}
            alt={alt}
            className={cn("w-full h-auto", node.style?.filter)}
            loading={node.lazy ? "lazy" : "eager"}
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
