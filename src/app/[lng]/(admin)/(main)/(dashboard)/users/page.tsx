import React from "react";
import { UsersList } from "./_components/users-list";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const UsersPage: React.FC = () => {
  return (
    <ContentLayout
      title="Users"
      actions={
        <Link href="/users/create">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      }
    >
      <div className="container px-0">
        <UsersList />
      </div>
    </ContentLayout>
  );
};

export default UsersPage;
