import { useNode } from "../../_store/hooks";
import {
  TableNode,
  TableColumn,
  TableRow,
  TableCell,
} from "../../_store/types";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash, ArrowUp, ArrowDown, Settings } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell as UITableCell,
  TableHead,
  TableHeader,
  TableRow as UITableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TableEditorProps {
  node: TableNode;
}

export const TableEditor = ({ node }: TableEditorProps) => {
  const { updateNode } = useNode(node.id);

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

    updateNode({
      columns: [...node.columns, newColumn],
      columnOrder: {
        ...node.columnOrder,
        1: [...(node.columnOrder[1] || []), columnId],
      },
    } as Partial<TableNode>);
  };

  const addRow = () => {
    const rowId = nanoid(15);
    const newRow: TableRow = {
      id: rowId,
      cells: node.columns.map((col) => ({
        columnId: col.id,
        content: {
          fallbackContent: "",
          content: { en: "", ne: "" },
        },
      })),
    };

    updateNode({
      rows: [...node.rows, newRow],
      rowOrder: [...node.rowOrder, rowId],
    } as Partial<TableNode>);
  };

  const updateColumnTitle = (
    columnId: string,
    lang: "en" | "ne",
    value: string,
  ) => {
    updateNode({
      columns: node.columns.map((col) =>
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
      rows: node.rows.map((row) =>
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

  return (
    <div className="space-y-6">
      {/* Table Settings */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="font-medium">Table Settings</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={node.layout.responsive || false}
                onCheckedChange={(checked) =>
                  updateNode({
                    layout: { ...node.layout, responsive: checked },
                  } as Partial<TableNode>)
                }
              />
              <span className="text-sm">Responsive</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={node.layout.stripe || false}
                onCheckedChange={(checked) =>
                  updateNode({
                    layout: { ...node.layout, stripe: checked },
                  } as Partial<TableNode>)
                }
              />
              <span className="text-sm">Striped Rows</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={addColumn}>
            <Plus className="w-4 h-4 mr-2" />
            Add Column
          </Button>
          <Button size="sm" onClick={addRow}>
            <Plus className="w-4 h-4 mr-2" />
            Add Row
          </Button>
        </div>
      </div>

      {/* Table Editor */}
      <Tabs defaultValue="en">
        <TabsList>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ne">नेपाली</TabsTrigger>
        </TabsList>

        {["en", "ne"].map((lang) => (
          <TabsContent key={lang} value={lang}>
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <UITableRow>
                    {node.columns.map((column, index) => (
                      <TableHead key={column.id}>
                        <Input
                          value={column.title.content[lang as "en" | "ne"]}
                          onChange={(e) =>
                            updateColumnTitle(
                              column.id,
                              lang as "en" | "ne",
                              e.target.value,
                            )
                          }
                          className="w-full"
                          placeholder={`Column ${index + 1}`}
                        />
                      </TableHead>
                    ))}
                  </UITableRow>
                </TableHeader>
                <TableBody>
                  {node.rows.map((row) => (
                    <UITableRow key={row.id}>
                      {row.cells.map((cell) => (
                        <UITableCell key={cell.columnId}>
                          <Input
                            value={cell.content.content[lang as "en" | "ne"]}
                            onChange={(e) =>
                              updateCellContent(
                                row.id,
                                cell.columnId,
                                lang as "en" | "ne",
                                e.target.value,
                              )
                            }
                            className="w-full"
                            placeholder="Enter cell content"
                          />
                        </UITableCell>
                      ))}
                    </UITableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
