"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";
import { DataTable } from "@/components/shared/data-table/data-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { Plus, Eye, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMediaQuery } from "react-responsive";
import { User } from "lucia";

export default function ListIndividuals({ user }: { user: User }) {
  const [search, setSearch] = useState("");
  const [wardNo, setWardNo] = useState<number | undefined>();
  const debouncedSearch = useDebounce(search, 500);

  const {
    data,
    isLoading,
    error: individualsError,
  } = api.individual.getAll.useQuery({
    limit: 100,
    cursor: 0,
    wardNo,
    search: debouncedSearch || undefined,
  });

  if (individualsError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>
          {individualsError?.message || "An error occurred"}
        </AlertDescription>
      </Alert>
    );
  }

  const StatCard = ({
    title,
    value,
  }: {
    title: string;
    value: string | number;
  }) => (
    <div className="rounded-lg border bg-card/50 p-4 shadow-sm transition-colors hover:bg-card">
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight">{value}</div>
    </div>
  );

  const individualColumns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "wardNo",
      header: "Ward No.",
    },
    {
      id: "actions",
      cell: ({ row }: { row: any }) => (
        <div className="flex gap-2">
          <Link href={`/individual/${row.original.id}`}>
            <Button size="sm" variant="outline">
              <Eye className="mr-2 h-4 w-4" /> View
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <ContentLayout
      title="Individuals"
      actions={
        <Link href="/individual/create">
          <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg transition-all hover:shadow-xl">
            <Plus className="mr-2 h-4 w-4" />
            Create New Individual
          </Button>
        </Link>
      }
    >
      <div className="mx-auto max-w-7xl space-y-6 p-4"></div>
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="border-b p-4">
          <h2 className="text-lg font-medium">Overview</h2>
          <p className="text-sm text-muted-foreground">
            Manage and monitor all individuals information
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total Individuals"
              value={data?.items.length || 0}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Input
              placeholder="Search..."
              className="w-full sm:w-[400px] h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="rounded-lg border">
              <DataTable
                columns={individualColumns}
                data={data?.items || []}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </ContentLayout>
  );
}
