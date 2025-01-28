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
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  BarChart4,
  Table as TableIcon,
  Upload,
  Download,
  Clipboard,
  Filter,
  SortAsc,
  SortDesc,
  Edit3,
  Copy,
  Sparkles,
  LayoutGrid,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SeriesDataEditorProps {
  series: ChartSeries;
  onUpdate: (data: ChartDataPoint[]) => void;
}

const TableRowMotion = motion(TableRow);

export const SeriesDataEditor = ({
  series,
  onUpdate,
}: SeriesDataEditorProps) => {
  const [editingCell, setEditingCell] = useState<{
    row: number;
    field: keyof ChartDataPoint;
  } | null>(null);
  const [view, setView] = useState<"table" | "grid">("table");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ChartDataPoint;
    direction: "asc" | "desc";
  } | null>(null);

  const addRow = () => {
    const newData = [...series.data];
    newData.push({
      category: "",
      label: "",
      value: 0,
      tooltip: "",
    });
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

  const updateCell = (
    rowIndex: number,
    field: keyof ChartDataPoint,
    value: string,
  ) => {
    const newData = series.data.map((point, idx) => {
      if (idx === rowIndex) {
        return {
          ...point,
          [field]: field === "value" ? parseFloat(value) || 0 : value,
        };
      }
      return point;
    });

    if (field === "value" && isNaN(parseFloat(value))) {
      toast.error("Please enter a valid number");
      return;
    }

    onUpdate(newData);
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const rows = text.split("\n").filter(Boolean);
      const newData: ChartDataPoint[] = rows.map((row) => {
        const [category, label, value] = row.split("\t");
        return {
          category: category || "",
          label: label || "",
          value: parseFloat(value) || 0,
          tooltip: "",
        };
      });
      onUpdate([...series.data, ...newData]);
      toast.success(`Added ${newData.length} rows from clipboard`);
    } catch (err) {
      toast.error("Failed to paste data");
    }
  };

  const sortData = (key: keyof ChartDataPoint) => {
    const direction =
      sortConfig?.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ key, direction });

    const sortedData = [...series.data].sort((a, b) => {
      if (key === "value") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
      return direction === "asc"
        ? String(a[key]).localeCompare(String(b[key]))
        : String(b[key]).localeCompare(String(a[key]));
    });

    onUpdate(sortedData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-50 rounded-lg">
            <Database className="w-5 h-5 text-cyan-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">Series Data</h3>
            <p className="text-sm text-gray-500">
              Manage data points for your chart series
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-cyan-200"
        >
          <BarChart4 className="w-3 h-3 mr-1" />
          {series.data.length} Points
        </Badge>
      </div>

      {/* Quick Actions */}
      <Card className="border-cyan-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-cyan-50 hover:text-cyan-600"
                      onClick={() =>
                        setView(view === "table" ? "grid" : "table")
                      }
                    >
                      {view === "table" ? (
                        <TableIcon className="w-4 h-4" />
                      ) : (
                        <LayoutGrid className="w-4 h-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-cyan-50 hover:text-cyan-600"
                onClick={pasteFromClipboard}
              >
                <Clipboard className="w-4 h-4 mr-2" />
                Paste
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-cyan-50 hover:text-cyan-600"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-cyan-50 hover:text-cyan-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <Button
              onClick={addRow}
              className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Row
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <div className="border rounded-lg overflow-hidden border-cyan-100">
        <Table>
          <TableHeader>
            <TableRow className="bg-cyan-50/50">
              <TableHead className="w-[50px]">#</TableHead>
              {["category", "label", "value", "tooltip"].map((field) => (
                <TableHead
                  key={field}
                  className="cursor-pointer hover:bg-cyan-100/50 transition-colors"
                  onClick={() => sortData(field as keyof ChartDataPoint)}
                >
                  <div className="flex items-center gap-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    {sortConfig?.key === field &&
                      (sortConfig.direction === "asc" ? (
                        <SortAsc className="w-4 h-4" />
                      ) : (
                        <SortDesc className="w-4 h-4" />
                      ))}
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {series.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="text-center py-8">
                      <Sparkles className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-500 mb-2">No data points yet</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addRow}
                        className="border-cyan-200 hover:bg-cyan-50"
                      >
                        Add your first data point
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                series.data.map((point, index) => (
                  <TableRowMotion
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    <TableCell>{index + 1}</TableCell>
                    {["category", "label", "value", "tooltip"].map((field) => (
                      <TableCell key={field}>
                        {editingCell?.row === index &&
                        editingCell?.field === field ? (
                          <Input
                            type={field === "value" ? "number" : "text"}
                            value={point[field as keyof ChartDataPoint]}
                            onChange={(e) =>
                              updateCell(
                                index,
                                field as keyof ChartDataPoint,
                                e.target.value,
                              )
                            }
                            onBlur={() => setEditingCell(null)}
                            autoFocus
                          />
                        ) : (
                          <div
                            className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                            onClick={() =>
                              setEditingCell({
                                row: index,
                                field: field as keyof ChartDataPoint,
                              })
                            }
                          >
                            {point[field as keyof ChartDataPoint]}
                          </div>
                        )}
                      </TableCell>
                    ))}
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
                  </TableRowMotion>
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Points", value: series.data.length },
          {
            label: "Total Value",
            value: series.data
              .reduce((sum, point) => sum + point.value, 0)
              .toFixed(2),
          },
          {
            label: "Average",
            value: (
              series.data.reduce((sum, point) => sum + point.value, 0) /
                series.data.length || 0
            ).toFixed(2),
          },
          {
            label: "Categories",
            value: new Set(series.data.map((point) => point.category)).size,
          },
        ].map((stat, index) => (
          <Card key={index} className="border-cyan-100">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500">
                {stat.label}
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};
