import { ChartDataPoint, ChartSeries } from "../../../_store/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SeriesDataEditorProps {
  series: ChartSeries;
  onUpdate: (data: ChartDataPoint[]) => void;
}

export const SeriesDataEditor = ({
  series,
  onUpdate,
}: SeriesDataEditorProps) => {
  const [editingCell, setEditingCell] = useState<{
    row: number;
    col: string;
  } | null>(null);

  const addRow = () => {
    const newData = [...series.data];
    newData.push({ x: "", y: 0 });
    onUpdate(newData);
  };

  const removeRow = (index: number) => {
    const newData = series.data.filter((_, idx) => idx !== index);
    onUpdate(newData);
  };

  const moveRow = (index: number, direction: "up" | "down") => {
    const newData = [...series.data];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newData.length) {
      [newData[index], newData[newIndex]] = [newData[newIndex], newData[index]];
      onUpdate(newData);
    }
  };

  const updateCell = (rowIndex: number, field: "x" | "y", value: string) => {
    const newData = series.data.map((point, idx) => {
      if (idx === rowIndex) {
        return {
          ...point,
          [field]: field === "y" ? parseFloat(value) : value,
        };
      }
      return point;
    });

    if (field === "y" && isNaN(parseFloat(value))) {
      toast.error("Please enter a valid number");
      return;
    }

    onUpdate(newData);
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>X Value</TableHead>
              <TableHead>Y Value</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {series.data.map((point, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {editingCell?.row === index && editingCell?.col === "x" ? (
                    <Input
                      value={point.x}
                      onChange={(e) => updateCell(index, "x", e.target.value)}
                      onBlur={() => setEditingCell(null)}
                      autoFocus
                    />
                  ) : (
                    <div
                      className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                      onClick={() => setEditingCell({ row: index, col: "x" })}
                    >
                      {point.x}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingCell?.row === index && editingCell?.col === "y" ? (
                    <Input
                      type="number"
                      value={point.y}
                      onChange={(e) => updateCell(index, "y", e.target.value)}
                      onBlur={() => setEditingCell(null)}
                      autoFocus
                    />
                  ) : (
                    <div
                      className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                      onClick={() => setEditingCell({ row: index, col: "y" })}
                    >
                      {point.y}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveRow(index, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveRow(index, "down")}
                      disabled={index === series.data.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRow(index)}
                      className="text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button onClick={addRow} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Row
      </Button>
    </div>
  );
};
