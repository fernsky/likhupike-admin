"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit, ArrowLeft, Building, MapPin } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  User,
  Briefcase,
  FileText,
  Users,
  Fish,
  Wallet,
  Radio,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Add this new component for loading state
const LoadingState = () => (
  <div className="space-y-6 p-4 md:p-6">
    <Card>
      <CardHeader className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>
    </Card>
    {[1, 2, 3].map((i) => (
      <Card key={i}>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </CardContent>
      </Card>
    ))}
  </div>
);

// Add this new component for quick stats
const QuickStatsCard = ({ business }: { business: any }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {[
      {
        icon: Building2,
        label: "Business Type",
        value: business?.businessType || "N/A",
      },
      {
        icon: MapPin,
        label: "Location",
        value: `Ward ${business?.wardNo || "N/A"}`,
      },
      {
        icon: Users,
        label: "Total Employees",
        value:
          (business?.totalPermanentEmployees || 0) +
          (business?.totalTemporaryEmployees || 0),
      },
      {
        icon: Wallet,
        label: "Annual Income",
        value: `NPR ${business?.annualIncome?.toLocaleString() || "0"}`,
      },
    ].map((stat, idx) => (
      <Card key={idx} className="transition-all hover:shadow-md">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <stat.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-semibold">{stat.value}</p>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function BusinessDetails({
  params,
}: {
  params: { id: string };
}) {
  const decodedId = decodeURIComponent(params.id);
  const {
    data: business,
    isLoading,
    error,
  } = api.business.getById.useQuery({ id: decodedId });

  if (error) {
    return (
      <ContentLayout title="Error">
        <Alert variant="destructive" className="m-4">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout
      title="Business Profile"
      actions={
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/businesses">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
            </Button>
          </Link>
          <Link href={`/businesses/edit/${params.id}`}>
            <Button size="sm" className="w-full sm:w-auto">
              <Edit className="mr-2 h-4 w-4" /> Edit Business
            </Button>
          </Link>
        </div>
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : (
        <div className="space-y-6 p-4 md:p-6">
          {/* Header Card with enhanced styling */}
          <Card className="overflow-hidden border-2">
            <CardHeader className="border-b bg-muted/50 pb-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-primary/10 p-4">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {business?.businessName}
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm">
                      Business ID: {business?.id}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="px-4 py-1.5 text-sm">
                    <MapPin className="mr-1 h-3 w-3" /> Ward {business?.wardNo}
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-1.5 text-sm">
                    <Briefcase className="mr-1 h-3 w-3" />{" "}
                    {business?.businessType}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Quick Stats */}
          <QuickStatsCard business={business} />

          {/* Rest of the sections with enhanced styling */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Location Details */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Ward No
                  </div>
                  <div>{business?.wardNo}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Area Code
                  </div>
                  <div>{business?.areaCode}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Locality
                  </div>
                  <div>{business?.locality}</div>
                </div>
              </CardContent>
            </Card>

            {/* Operator Details */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Operator Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Name
                  </div>
                  <div>{business?.operatorName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Phone
                  </div>
                  <div>{business?.operatorPhone}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Age
                  </div>
                  <div>{business?.operatorAge}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Gender
                  </div>
                  <div>{business?.operatorGender}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Education
                  </div>
                  <div>{business?.operatorEducation}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Full width sections */}
          <div className="space-y-6">
            {/* Business Classification */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Business Classification</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Nature
                  </div>
                  <div>{business?.businessNature}</div>
                  {business?.businessNatureOther && (
                    <div className="text-sm text-muted-foreground">
                      Other: {business.businessNatureOther}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Type
                  </div>
                  <div>{business?.businessType}</div>
                  {business?.businessTypeOther && (
                    <div className="text-sm text-muted-foreground">
                      Other: {business.businessTypeOther}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Registration Information */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Registration & Legal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Registration Status
                  </div>
                  <div>{business?.registrationStatus}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Statutory Status
                  </div>
                  <div>{business?.statutoryStatus}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    PAN Status
                  </div>
                  <div>{business?.panStatus}</div>
                  {business?.panNumber && (
                    <div className="text-sm text-muted-foreground">
                      PAN: {business.panNumber}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Employee Information with better organization */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Employee Statistics</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Partners */}
                <div className="space-y-2">
                  <div className="font-medium">Partners</div>
                  <div className="text-sm text-muted-foreground">
                    Total: {business?.totalPartners || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Nepali: M({business?.nepaliMalePartners || 0}) F(
                    {business?.nepaliFemalePartners || 0})
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Foreign: M({business?.foreignMalePartners || 0}) F(
                    {business?.foreignFemalePartners || 0})
                  </div>
                </div>

                {/* Permanent Employees */}
                <div className="space-y-2">
                  <div className="font-medium">Permanent Employees</div>
                  <div className="text-sm text-muted-foreground">
                    Total: {business?.totalPermanentEmployees || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Nepali: M({business?.nepaliMalePermanentEmployees || 0}) F(
                    {business?.nepaliFemalePermanentEmployees || 0})
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Foreign: M({business?.foreignMalePermanentEmployees || 0})
                    F(
                    {business?.foreignFemalePermanentEmployees || 0})
                  </div>
                </div>

                {/* Temporary Employees */}
                <div className="space-y-2">
                  <div className="font-medium">Temporary Employees</div>
                  <div className="text-sm text-muted-foreground">
                    Total: {business?.totalTemporaryEmployees || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Nepali: M({business?.nepaliMaleTemporaryEmployees || 0}) F(
                    {business?.nepaliFemaleTemporaryEmployees || 0})
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Foreign: M({business?.foreignMaleTemporaryEmployees || 0})
                    F(
                    {business?.foreignFemaleTemporaryEmployees || 0})
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialized Business Information */}
            {(business?.hasApiculture === "yes" || business?.pondCount) && (
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Specialized Business Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">
                  {/* Aquaculture Information */}
                  {business?.pondCount && (
                    <div className="space-y-4">
                      <div className="font-medium">Aquaculture Details</div>
                      <div className="grid gap-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Pond Count:
                          </span>{" "}
                          {business.pondCount}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Pond Area:
                          </span>{" "}
                          {business.pondArea} sq.m
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Fish Production:
                          </span>{" "}
                          {business.fishProduction} kg
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Fingerling Count:
                          </span>{" "}
                          {business.fingerlingNumber}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Apiculture Information */}
                  {business?.hasApiculture === "yes" && (
                    <div className="space-y-4">
                      <div className="font-medium">Apiculture Details</div>
                      <div className="grid gap-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Hive Count:
                          </span>{" "}
                          {business.hiveCount}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Honey Production:
                          </span>{" "}
                          {business.honeyProduction} kg
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Financial Information */}
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Investment Amount
                  </div>
                  <div>NPR {business?.investmentAmount?.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Annual Income
                  </div>
                  <div>NPR {business?.annualIncome?.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Location Ownership
                  </div>
                  <div>{business?.businessLocationOwnership}</div>
                  {business?.businessLocationOwnershipOther && (
                    <div className="text-sm text-muted-foreground">
                      Other: {business.businessLocationOwnershipOther}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </ContentLayout>
  );
}
