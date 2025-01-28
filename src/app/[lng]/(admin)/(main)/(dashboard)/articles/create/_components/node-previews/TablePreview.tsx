import { TableNode } from "../../_store/types";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TablePreviewProps {
  node: TableNode;
  language: "en" | "ne";
}

export const TablePreview = ({ node, language }: TablePreviewProps) => {
  const title = node.title?.content[language] || node.title?.fallbackContent;

  const renderCell = (cellContent: any) =>
    cellContent?.content[language] || cellContent?.fallbackContent || "";

  return (
    <div className="my-8">
      {title && <h4 className="mb-4 font-semibold">{title}</h4>}
      <div
        className={cn(
          "rounded-md border",
          node.layout.responsive && "overflow-x-auto",
        )}
      >
        <Table className={cn(node.layout.stripe && "table-striped")}>
          <TableHeader>
            <TableRow>
              {node.columns.map((col) => (
                <TableHead
                  key={col.id}
                  className={cn(
                    col.style?.alignment === "center" && "text-center",
                    col.style?.alignment === "right" && "text-right",
                  )}
                >
                  {renderCell(col.title)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {node.rows.map((row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell) => (
                  <TableCell
                    key={cell.columnId}
                    className={cn(
                      cell.style?.alignment === "center" && "text-center",
                      cell.style?.alignment === "right" && "text-right",
                    )}
                  >
                    {renderCell(cell.content)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
