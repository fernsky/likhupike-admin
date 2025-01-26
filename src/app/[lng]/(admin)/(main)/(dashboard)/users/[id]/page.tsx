"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  User2,
  UserCheck,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Building,
  Clock,
} from "lucide-react";

export default function UserDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data: enumerator, isLoading } = api.userManagement.getById.useQuery(
    params.id,
  );

  if (isLoading) {
    return (
      <ContentLayout title="Enumerator Details">
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-[200px] rounded-lg" />
          ))}
        </div>
      </ContentLayout>
    );
  }

  if (!enumerator) {
    return (
      <ContentLayout title="Enumerator Not Found">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <User2 className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              The requested enumerator could not be found
            </p>
          </CardContent>
        </Card>
      </ContentLayout>
    );
  }

  const FormCard = ({
    title,
    description,
    children,
  }: {
    title: string;
    description: string;
    children: React.ReactNode;
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

  const InfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string | number | null;
  }) => (
    <div className="flex items-start space-x-3">
      <div className="mt-0.5">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 font-medium">{value || "-"}</p>
      </div>
    </div>
  );

  const RoleBadge = ({ role }: { role: string }) => {
    const roleConfig = {
      admin: {
        icon: ShieldAlert,
        className: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        label: "Administrator",
        description: "Full system access with user management capabilities",
      },
      editor: {
        icon: ShieldCheck,
        className: "bg-warning/10 text-warning hover:bg-warning/20",
        label: "Editor",
        description: "Can edit and manage survey data",
      },
      viewer: {
        icon: Shield,
        className: "bg-info/10 text-info hover:bg-info/20",
        label: "Viewer",
        description: "Read-only access to view survey data",
      },
    }[role] ?? {
      icon: Shield,
      className: "bg-muted text-muted-foreground",
      label: role,
      description: "Unknown role type",
    };

    const Icon = roleConfig.icon;

    return (
      <div className="flex flex-col space-y-2">
        <Badge
          variant="outline"
          className={`gap-2 ${roleConfig.className} text-base py-2 px-4`}
        >
          <Icon className="h-4 w-4" />
          <span className="font-medium">{roleConfig.label}</span>
        </Badge>
        <p className="text-sm text-muted-foreground pl-1">
          {roleConfig.description}
        </p>
      </div>
    );
  };

  const ScopeBadge = ({
    scope,
    wardNumber,
  }: {
    scope: string;
    wardNumber?: number | null;
  }) => {
    const scopeConfig = {
      municipality: {
        icon: Building,
        className: "bg-primary/10 text-primary hover:bg-primary/20",
        label: "Municipality Level",
        description: "Access to data across all wards",
      },
      ward: {
        icon: MapPin,
        className: "bg-success/10 text-success hover:bg-success/20",
        label: `Ward ${wardNumber}`,
        description: "Access limited to specific ward data",
      },
    }[scope] ?? {
      icon: Globe,
      className: "bg-muted text-muted-foreground",
      label: scope,
      description: "Unknown scope type",
    };

    const Icon = scopeConfig.icon;

    return (
      <div className="flex flex-col space-y-2">
        <Badge
          variant="outline"
          className={`gap-2 ${scopeConfig.className} text-base py-2 px-4`}
        >
          <Icon className="h-4 w-4" />
          <span className="font-medium">{scopeConfig.label}</span>
        </Badge>
        <p className="text-sm text-muted-foreground pl-1">
          {scopeConfig.description}
        </p>
      </div>
    );
  };

  return (
    <ContentLayout
      title="User Details"
      subtitle={`ID: ${params.id}`}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/users")}>
            Back to List
          </Button>
          <Button onClick={() => router.push(`/users/${params.id}/edit`)}>
            Edit User
          </Button>
        </div>
      }
    >
      <div className="space-y-6 px-2 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          <FormCard
            title="Personal Information"
            description="Contact and identification details"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User2 className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{enumerator.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    User since {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <InfoItem
                  icon={UserCheck}
                  label="Username"
                  value={enumerator.userName}
                />
                <InfoItem
                  icon={Phone}
                  label="Phone Number"
                  value={enumerator.phoneNumber}
                />
                <InfoItem
                  icon={Mail}
                  label="Email Address"
                  value={enumerator.email}
                />
              </div>
            </div>
          </FormCard>

          <FormCard
            title="Access Control"
            description="Role and permissions configuration"
          >
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Role & Permissions
                </h4>
                <RoleBadge role={enumerator.role ?? "viewer"} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Access Scope
                </h4>
                <ScopeBadge
                  scope={enumerator.scope ?? "ward"}
                  wardNumber={enumerator.wardNumber}
                />
              </div>
            </div>
          </FormCard>
        </div>

        <FormCard
          title="Activity & Status"
          description="User activity information and current status"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Last Active
                  </p>
                  <p className="text-lg font-semibold">2 hours ago</p>
                </div>
              </div>
            </div>
            {/* Add more activity stats as needed */}
          </div>
        </FormCard>
      </div>
    </ContentLayout>
  );
}
