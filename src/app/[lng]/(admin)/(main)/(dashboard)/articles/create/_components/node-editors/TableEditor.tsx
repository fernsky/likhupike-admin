import { useNode } from "../../_store/hooks";
import { TableNode, TableColumn, TableRow } from "../../_store/types";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell as UITableCell,
  TableHead,
  TableHeader,
  TableRow as UITableRow,
} from "@/components/ui/table";
import {
  TableIcon,
  Languages,
  MessageSquare,
  ArrowUpRight,
  Plus,
  Trash2,
  LayoutGrid,
  SplitSquareVertical,
  Rows,
  TableProperties,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TableEditorProps {
  node: TableNode;
}

export const TableEditor = ({ node }: TableEditorProps) => {
  const { updateNode } = useNode(node.id);
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ne">("en");

  // Initialize table if needed
  const initializeTableIfNeeded = () => {
    if (!node.columns || !node.rows || !node.rowOrder || !node.columnOrder) {
      updateNode({
        columns: [],
        rows: [],
        rowOrder: [],
        columnOrder: {},
        layout: {
          ...node.layout,
          totalColumnSpan: 0,
          responsive: true,
          stripe: false,
          border: "all",
        },
      } as Partial<TableNode>);
    }
  };

  // Call initialize on mount
  useEffect(() => {
    initializeTableIfNeeded();
  }, []);

  const addColumn = () => {
    const columnId = nanoid(15);
    const newColumn: TableColumn = {
      id: columnId,
      level: 1,
      columnSpan: 1,
      dataType: "text",
      title: {
        fallbackContent: "New Column",
        content: { en: "New Column", ne: "नयाँ स्तम्भ" },
      },
    };

    // Add empty cells for this column to all existing rows
    const updatedRows = (node.rows || []).map((row) => ({
      ...row,
      cells: [
        ...row.cells,
        {
          columnId,
          content: {
            fallbackContent: "",
            content: { en: "", ne: "" },
          },
        },
      ],
    }));

    updateNode({
      columns: [...(node.columns || []), newColumn],
      rows: updatedRows,
      columnOrder: {
        ...(node.columnOrder || {}),
        1: [...((node.columnOrder || {})[1] || []), columnId],
      },
      layout: {
        ...(node.layout || {}),
        totalColumnSpan: (node.layout?.totalColumnSpan || 0) + 1,
      },
    } as Partial<TableNode>);
  };

  const addRow = () => {
    const rowId = nanoid(15);
    const newRow: TableRow = {
      id: rowId,
      cells: (node.columns || []).map((col) => ({
        columnId: col.id,
        content: {
          fallbackContent: "",
          content: { en: "", ne: "" },
        },
      })),
    };

    updateNode({
      rows: [...(node.rows || []), newRow],
      rowOrder: [...(node.rowOrder || []), rowId],
    } as Partial<TableNode>);
  };

  const updateColumnTitle = (
    columnId: string,
    lang: "en" | "ne",
    value: string,
  ) => {
    updateNode({
      columns: (node.columns || []).map((col) =>
        col.id === columnId
          ? {
              ...col,
              title: {
                ...col.title,
                content: { ...col.title.content, [lang]: value },
              },
            }
          : col,
      ),
    } as Partial<TableNode>);
  };

  const updateCellContent = (
    rowId: string,
    columnId: string,
    lang: "en" | "ne",
    value: string,
  ) => {
    updateNode({
      rows: (node.rows || []).map((row) =>
        row.id === rowId
          ? {
              ...row,
              cells: row.cells.map((cell) =>
                cell.columnId === columnId
                  ? {
                      ...cell,
                      content: {
                        ...cell.content,
                        content: { ...cell.content.content, [lang]: value },
                      },
                    }
                  : cell,
              ),
            }
          : row,
      ),
    } as Partial<TableNode>);
  };

  const removeColumn = (columnId: string) => {
    updateNode({
      columns: (node.columns || []).filter((col) => col.id !== columnId),
      rows: (node.rows || []).map((row) => ({
        ...row,
        cells: row.cells.filter((cell) => cell.columnId !== columnId),
      })),
      columnOrder: {
        ...(node.columnOrder || {}),
        1: ((node.columnOrder || {})[1] || []).filter((id) => id !== columnId),
      },
      layout: {
        ...(node.layout || {}),
        totalColumnSpan: (node.layout?.totalColumnSpan || 0) - 1,
      },
    } as Partial<TableNode>);
  };

  const removeRow = (rowId: string) => {
    updateNode({
      rows: (node.rows || []).filter((row) => row.id !== rowId),
      rowOrder: (node.rowOrder || []).filter((id) => id !== rowId),
    } as Partial<TableNode>);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative space-y-4 py-4"
    >
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-teal-200"
        >
          <TableIcon className="w-4 h-4 mr-1" />
          Table Editor
        </Badge>
        <Badge
          variant="outline"
          className="bg-white/50 backdrop-blur-sm border-teal-200"
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          {node.columns?.length || 0} × {node.rows?.length || 0}
        </Badge>
      </div>

      <Card className="border-teal-100">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch
                checked={node.layout?.responsive || false}
                onCheckedChange={(checked) =>
                  updateNode({
                    layout: { ...(node.layout || {}), responsive: checked },
                  } as Partial<TableNode>)
                }
                className="data-[state=checked]:bg-teal-600"
              />
              <LayoutGrid className="w-4 h-4 text-teal-500" />

              <Switch
                checked={node.layout?.stripe || false}
                onCheckedChange={(checked) =>
                  updateNode({
                    layout: { ...(node.layout || {}), stripe: checked },
                  } as Partial<TableNode>)
                }
                className="data-[state=checked]:bg-teal-600"
              />
              <Rows className="w-4 h-4 text-teal-500" />
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={addColumn}
                className="bg-gradient-to-r from-teal-600 to-teal-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Column
              </Button>
              <Button
                onClick={addRow}
                variant="outline"
                className="border-teal-200 hover:bg-teal-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Row
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-1 p-1 rounded-lg bg-teal-50/50">
        {["en", "ne"].map((lang) => (
          <motion.button
            key={lang}
            onClick={() => setActiveLanguage(lang as "en" | "ne")}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md transition-all",
              activeLanguage === lang
                ? "bg-white text-teal-700 shadow-sm border border-teal-100"
                : "text-gray-600",
            )}
          >
            {lang === "en" ? "EN" : "नेपाली"}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeLanguage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="border rounded-lg overflow-x-auto border-teal-100">
            <Table>
              <TableHeader className="bg-teal-50/50">
                <UITableRow>
                  {(node.columns || []).map((column, index) => (
                    <TableHead key={column.id} className="group">
                      <div className="flex items-center gap-2">
                        <Input
                          value={column.title.content[activeLanguage]}
                          onChange={(e) =>
                            updateColumnTitle(
                              column.id,
                              activeLanguage,
                              e.target.value,
                            )
                          }
                          className="border-teal-100 focus-visible:ring-teal-500"
                          placeholder={`Col ${index + 1}`}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeColumn(column.id)}
                          className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableHead>
                  ))}
                </UITableRow>
              </TableHeader>
              <TableBody>
                {(node.rows || []).map((row, rowIndex) => (
                  <UITableRow key={row.id} className="group">
                    {row.cells.map((cell) => (
                      <UITableCell key={cell.columnId}>
                        <Input
                          value={cell.content.content[activeLanguage]}
                          onChange={(e) =>
                            updateCellContent(
                              row.id,
                              cell.columnId,
                              activeLanguage,
                              e.target.value,
                            )
                          }
                          className="w-full border-teal-100 focus-visible:ring-teal-500"
                          placeholder={
                            activeLanguage === "en"
                              ? "Enter content..."
                              : "सामग्री लेख्नुहोस्..."
                          }
                        />
                      </UITableCell>
                    ))}
                    <UITableCell className="w-10">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRow(row.id)}
                        className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </UITableCell>
                  </UITableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
