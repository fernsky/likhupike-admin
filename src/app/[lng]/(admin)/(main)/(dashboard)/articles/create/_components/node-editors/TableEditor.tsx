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
      className="relative space-y-6 py-4"
    >
      {/* Editor Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <TableIcon className="w-5 h-5 text-teal-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">
                Table Editor
              </h3>
              <p className="text-sm text-gray-500">
                Create structured data layouts with multilingual support
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-white/50 backdrop-blur-sm border-teal-200"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            {node.columns?.length || 0} × {node.rows?.length || 0} Table
          </Badge>
        </div>

        {/* Table Controls */}
        <Card className="border-teal-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 group hover:bg-teal-50/50 p-2 rounded-lg transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <LayoutGrid className="w-4 h-4 text-teal-500" />
                        <span className="text-sm font-medium">
                          Responsive Layout
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Adapt to screen sizes
                      </p>
                    </div>
                    <Switch
                      checked={node.layout?.responsive || false}
                      onCheckedChange={(checked) =>
                        updateNode({
                          layout: {
                            ...(node.layout || {}),
                            responsive: checked,
                          },
                        } as Partial<TableNode>)
                      }
                      className="data-[state=checked]:bg-teal-600"
                    />
                  </div>

                  <div className="flex items-center gap-2 group hover:bg-teal-50/50 p-2 rounded-lg transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Rows className="w-4 h-4 text-teal-500" />
                        <span className="text-sm font-medium">
                          Striped Rows
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Alternate row colors
                      </p>
                    </div>
                    <Switch
                      checked={node.layout?.stripe || false}
                      onCheckedChange={(checked) =>
                        updateNode({
                          layout: { ...(node.layout || {}), stripe: checked },
                        } as Partial<TableNode>)
                      }
                      className="data-[state=checked]:bg-teal-600"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={addColumn}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:shadow-lg transition-all duration-300"
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

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-teal-600" />
          <div className="flex items-center gap-1 p-1 rounded-lg bg-teal-50/50">
            {[
              { code: "en", label: "EN" },
              { code: "ne", label: "नेपाली" },
            ].map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => setActiveLanguage(lang.code as "en" | "ne")}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1",
                  activeLanguage === lang.code
                    ? "bg-white text-teal-700 shadow-sm border border-teal-100"
                    : "text-gray-600 hover:text-teal-600",
                )}
              >
                {lang.label}
                {activeLanguage === lang.code && (
                  <ArrowUpRight className="w-3 h-3" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Table Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border rounded-lg overflow-x-auto border-teal-100">
              <Table>
                <TableHeader className="bg-teal-50/50">
                  <UITableRow>
                    {(node.columns || []).map((column, index) => (
                      <TableHead key={column.id} className="group">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                            placeholder={`Column ${index + 1}`}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeColumn(column.id)}
                            className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
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
      </div>

      {/* Helper Text */}
      <div className="text-sm text-gray-500 italic">
        Pro tip: Use the grip handles to drag and reorder columns, and hover
        over rows to access additional actions
      </div>
    </motion.div>
  );
};
