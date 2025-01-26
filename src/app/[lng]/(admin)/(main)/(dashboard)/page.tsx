import { ContentLayout } from "@/components/admin-panel/content-layout";
import { UsersList } from "./users/_components/users-list";

export default function UsersPage() {
  return (
    <ContentLayout title="Users">
      <div className="container px-0">
        <UsersList />
      </div>
    </ContentLayout>
  );
}
