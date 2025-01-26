"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "react-responsive";
import { UserDropdown } from "./user-dropdown";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Phone,
  Mail,
  MapPin,
  User2,
  Globe,
  Shield,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";

const RoleBadge = ({ role }: { role: string }) => {
  const roleConfig = {
    admin: {
      icon: ShieldAlert,
      className: "bg-destructive/10 text-destructive hover:bg-destructive/20",
    },
    editor: {
      icon: ShieldCheck,
      className: "bg-warning/10 text-warning hover:bg-warning/20",
    },
    viewer: {
      icon: Shield,
      className: "bg-info/10 text-info hover:bg-info/20",
    },
  }[role] ?? {
    icon: Shield,
    className: "bg-muted text-muted-foreground",
  };

  const Icon = roleConfig.icon;

  return (
    <Badge variant="outline" className={`gap-1 ${roleConfig.className}`}>
      <Icon className="h-3 w-3" />
      <span className="capitalize">{role}</span>
    </Badge>
  );
};

export function UsersList() {
  const [users] = api.useQueries((t) => [t.userManagement.getAll()]);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const router = useRouter();

  if (users.isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!users.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <User2 className="h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 text-lg font-medium text-muted-foreground">
          No users found
        </p>
      </div>
    );
  }

  const handleClick = (id: string, e: React.MouseEvent) => {
    // Don't navigate if clicking on the dropdown
    if ((e.target as HTMLElement).closest(".dropdown-trigger")) {
      return;
    }
    router.push(`/users/${id}`);
  };

  return (
    <>
      {isMobile ? (
        <div className="space-y-4 px-2">
          {users.data.map((user) => (
            <Card
              key={user.id}
              className="overflow-hidden transition-all hover:shadow-md cursor-pointer bg-white"
              onClick={(e) => handleClick(user.id, e)}
            >
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <div className="mt-2">
                      <RoleBadge role={user.role ?? "viewer"} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ID: {user.id.slice(0, 8)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span className="capitalize">{user.scope}</span>
                  </div>
                  {user.scope === "ward" && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Ward {user.wardNumber}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{user.phoneNumber}</span>
                  </div>
                  {user.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end">
                  <div className="dropdown-trigger">
                    <UserDropdown userId={user.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Ward</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={(e) => handleClick(user.id, e)}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: {user.id.slice(0, 8)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={user.role ?? "viewer"} />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phoneNumber}</span>
                      </div>
                      {user.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{user.scope}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.scope === "ward" && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        Ward {user.wardNumber}
                      </div>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="dropdown-trigger">
                      <UserDropdown userId={user.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
