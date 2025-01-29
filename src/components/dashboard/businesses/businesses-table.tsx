import { DataTable } from "@/components/shared/data-table/data-table";
import { Loader2 } from "lucide-react";

interface BusinessesTableProps {
  isLoading: boolean;
  isDesktop: boolean;
  data: any[];
  columns: any[];
}

export function BusinessesTable({
  isLoading,
  isDesktop,
  data,
  columns,
}: BusinessesTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return isDesktop ? (
    <div className="rounded-lg border">
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  ) : null;
}
