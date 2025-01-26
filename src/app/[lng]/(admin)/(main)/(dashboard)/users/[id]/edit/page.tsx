"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EditUser } from "./_components/edit-user";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <ContentLayout
      title="Edit User"
      subtitle={`ID: ${params.id}`}
      actions={
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/users/${params.id}`)}
          >
            Cancel
          </Button>
          <Button type="submit" form="user-form">
            Save Changes
          </Button>
        </div>
      }
    >
      <EditUser userId={params.id} />
    </ContentLayout>
  );
}
