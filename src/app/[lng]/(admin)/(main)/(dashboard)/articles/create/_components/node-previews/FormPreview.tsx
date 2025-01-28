import { FormNode } from "../../_store/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormPreviewProps {
  node: FormNode;
  language: "en" | "ne";
}

export const FormPreview = ({ node, language }: FormPreviewProps) => {
  const renderField = (field: FormNode["fields"][number]) => {
    const label = field.label.content[language] || field.label.fallbackContent;
    const placeholder =
      field.placeholder?.content[language] ||
      field.placeholder?.fallbackContent;

    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            key={field.id}
            placeholder={placeholder}
            required={field.required}
            disabled
          />
        );
      case "select":
        return (
          <Select key={field.id} disabled>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="placeholder">{placeholder}</SelectItem>
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            key={field.id}
            type={field.type}
            placeholder={placeholder}
            required={field.required}
            disabled
          />
        );
    }
  };

  return (
    <form className="space-y-4 my-8" onSubmit={(e) => e.preventDefault()}>
      {node.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="text-sm font-medium">
            {field.label.content[language] || field.label.fallbackContent}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}
      <Button type="submit" disabled>
        {node.submitButton.label.content[language] ||
          node.submitButton.label.fallbackContent}
      </Button>
    </form>
  );
};
