import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Image,
  X,
  Upload,
  AlertCircle,
  FileImage,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  aspectRatio?: string;
  className?: string;
  maxSize?: number; // in MB
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const ImageUpload = ({
  value,
  onChange,
  aspectRatio = "1:1",
  className,
  maxSize = 5, // 5MB default
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>();
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string>();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return;
      }

      try {
        setIsUploading(true);
        setError(undefined);
        setProgress(0);

        // Create a preview URL
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // Simulated upload progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 95) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + 5;
          });
        }, 100);

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        onChange(data.url);
        toast.success("Image uploaded successfully!");
        setProgress(100);

        setTimeout(() => {
          clearInterval(progressInterval);
          URL.revokeObjectURL(objectUrl);
        }, 1000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
        toast.error("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    },
    [maxSize, onChange],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      },
      maxFiles: 1,
      multiple: false,
    });

  const [ratio, unit] = aspectRatio.split(":").map(Number);
  const paddingTop = `${(unit / ratio) * 100}%`;

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "relative w-full rounded-lg border-2 border-dashed transition-colors duration-200",
          isDragActive && !isDragReject && "border-primary bg-primary/5",
          isDragReject && "border-destructive bg-destructive/5",
          error && "border-destructive",
          !value &&
            !isDragActive &&
            "hover:border-primary/50 hover:bg-muted/25",
          value && "border-muted",
        )}
        style={{ paddingTop }}
      >
        {value ? (
          <div className="absolute inset-0">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative h-full group cursor-zoom-in">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={value}
                    alt="Uploaded image"
                    className="h-full w-full object-cover rounded-lg transition-opacity group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FileImage className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-auto rounded-lg"
                />
              </DialogContent>
            </Dialog>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <input {...getInputProps()} />
            {isUploading ? (
              <div className="flex flex-col items-center gap-4 p-4 w-full">
                <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                <Progress value={progress} className="w-[60%]" />
                <p className="text-sm text-muted-foreground">
                  Uploading... {progress}%
                </p>
                {previewUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-32 rounded-lg opacity-50"
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 p-4">
                <div className="rounded-full bg-muted p-2">
                  <Image className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    Drop your image here, or{" "}
                    <span className="text-primary">browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum file size: {maxSize}MB
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: PNG, JPG, GIF, WEBP
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
