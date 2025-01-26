"use client";

import { CreateUser } from "./_components/create-user";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function CreateUserPage() {
  return (
    <ContentLayout title="Create User">
      <CreateUser />
    </ContentLayout>
  );
}
