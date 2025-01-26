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
import { Phone, Mail, MapPin, User2, UserCheck } from "lucide-react";

export default function EnumeratorDetailsPage({
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

  return (
    <ContentLayout
      title="Enumerator Details"
      subtitle={`ID: ${params.id}`}
      actions={
        <div className="flex gap-2">
          <Button onClick={() => router.push("/users")}>Back to List</Button>
          <Button onClick={() => router.push(`/users/${params.id}/edit`)}>
            Edit User
          </Button>
        </div>
      }
    >
      <div className="space-y-6 px-2 lg:px-10">
        <FormCard
          title="Basic Information"
          description="Personal and contact details of the enumerator"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem icon={User2} label="Full Name" value={enumerator.name} />
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
        </FormCard>

        <FormCard
          title="Account Information"
          description="Account credentials and work assignment details"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              icon={UserCheck}
              label="Username"
              value={enumerator.userName}
            />
            <InfoItem
              icon={MapPin}
              label="Assigned Ward"
              value={`Ward ${enumerator.wardNumber}`}
            />
            <div className="flex items-start space-x-3">
              <div className="mt-0.5">
                <User2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
              </div>
            </div>
          </div>
        </FormCard>

        {/* Add more sections as needed */}
      </div>
    </ContentLayout>
  );
}
