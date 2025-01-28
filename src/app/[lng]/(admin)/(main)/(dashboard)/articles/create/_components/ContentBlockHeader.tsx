import { motion } from "framer-motion";
import { NodeTypeColors } from "./node-colors";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  BookOpen,
  Languages,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";

interface ContentBlockHeaderProps {
  type: keyof typeof NodeTypeColors;
  index: number;
  charCount?: { en: number; ne: number };
}

export const ContentBlockHeader = ({
  type,
  index,
  charCount,
}: ContentBlockHeaderProps) => {
  const colors = NodeTypeColors[type];

  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 ${colors.bg} rounded-xl`}>{colors.icon}</div>
          <div>
            <h3 className={`font-semibold capitalize ${colors.text}`}>
              {type}
            </h3>
            <p className="text-sm text-muted-foreground">Block {index + 1}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`${colors.bgLight} border-0 gap-1.5`}
          >
            <Languages className="w-3.5 h-3.5" />2 Languages
          </Badge>
          {charCount && (
            <Badge variant="outline" className="gap-1.5 border-0 bg-white">
              <BookOpen className="w-3.5 h-3.5" />
              {Math.max(charCount.en, charCount.ne)} chars
            </Badge>
          )}
        </div>
      </div>
      {/* Quick Tips */}
      <div className="flex items-center gap-2 text-sm">
        <AlertCircle className="w-4 h-4 text-amber-500" />
        <span className="text-muted-foreground">
          Click to edit {type.toLowerCase()} content in multiple languages
        </span>
      </div>
    </div>
  );
};
