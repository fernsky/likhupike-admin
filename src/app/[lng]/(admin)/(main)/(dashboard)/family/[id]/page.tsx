"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit, ArrowLeft, Home, MapPin, Users, Banknote } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Phone,
  ImageIcon,
  Droplets,
  Trash2,
  Zap,
  Building2,
  CreditCard,
  Heart,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function FamilyDetails({ params }: { params: { id: string } }) {
  const decodedId = decodeURIComponent(params.id);
  const {
    data: family,
    isLoading,
    error,
  } = api.family.getById.useQuery({ id: decodedId });

  if (error) {
    return (
      <ContentLayout title="Error">
        <Alert variant="destructive" className="m-4">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </ContentLayout>
    );
  }

  if (isLoading) {
    return (
      <ContentLayout title="Family Details">
        <div className="space-y-6 p-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout
      title="Family Profile"
      actions={
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/family">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
            </Button>
          </Link>
          <Link href={`/family/edit/${params.id}`}>
            <Button size="sm" className="w-full sm:w-auto">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-6 p-4 md:p-6">
        {/* Enhanced Header Card */}
        <Card className="overflow-hidden border-2">
          <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-primary to-primary/80 p-3">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {family?.headName || "Unnamed Family"}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>ID: {family?.id}</span>
                    {family?.headPhone && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {family.headPhone}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-2 px-4 py-1">
                  Ward {family?.wardNo}
                </Badge>
                <Badge variant="secondary" className="px-4 py-1">
                  Area: {family?.areaCode || "N/A"}
                </Badge>
                {family?.familySymbolNo && (
                  <Badge variant="default" className="px-4 py-1">
                    Symbol: {family.familySymbolNo}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Enhanced Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Total Members</p>
              </div>
              <p className="mt-2 text-3xl font-bold">
                {family?.totalMembers || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-green-500" />
                <p className="text-sm font-medium">House Status</p>
              </div>
              <p className="mt-2 text-lg font-semibold">
                {family?.houseOwnership || "N/A"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Banknote className="h-4 w-4 text-blue-500" />
                <p className="text-sm font-medium">Financial Status</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {family?.hasBank && (
                  <Badge variant="default">Bank Account</Badge>
                )}
                {family?.hasInsurance && (
                  <Badge variant="default">Insurance</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/5 to-amber-500/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-amber-500" />
                <p className="text-sm font-medium">Remittance</p>
              </div>
              <Badge
                variant={family?.hasRemittance ? "default" : "secondary"}
                className="mt-2"
              >
                {family?.hasRemittance
                  ? "Receives Remittance"
                  : "No Remittance"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Media Section */}
        {(family?.familyImage ||
          family?.enumeratorSelfie ||
          family?.surveyAudioRecording) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Media
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {family?.familyImage && (
                <div className="relative aspect-video overflow-hidden rounded-lg border-2">
                  <Image
                    src={family.familyImage}
                    alt="Family Photo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-black/50 p-2">
                    <p className="text-center text-sm text-white">
                      Family Photo
                    </p>
                  </div>
                </div>
              )}
              {/* Similar image components for enumeratorSelfie */}
              {family?.surveyAudioRecording && (
                <div className="flex items-center gap-2 rounded-lg border-2 p-4">
                  <audio controls className="w-full">
                    <source
                      src={family.surveyAudioRecording}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Location Details */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle>Location & Identification</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            <div>
              <h4 className="mb-3 font-medium">Address Details</h4>
              <div className="space-y-2">
                <DetailItem label="Ward No" value={family?.wardNo} />
                <DetailItem label="Area Code" value={family?.areaCode} />
                <DetailItem label="Locality" value={family?.locality} />
                <DetailItem label="Development Org" value={family?.devOrg} />
                <DetailItem label="Location" value={family?.location} />
              </div>
            </div>
            <div>
              <h4 className="mb-3 font-medium">Identification</h4>
              <div className="space-y-2">
                <DetailItem
                  label="House Token"
                  value={family?.houseTokenNumber}
                />
                <DetailItem
                  label="Family Symbol"
                  value={family?.familySymbolNo}
                />
              </div>
            </div>
            <div>
              <h4 className="mb-3 font-medium">GPS Information</h4>
              <div className="space-y-2">
                <DetailItem
                  label="Coordinates"
                  value={family?.gps?.coordinates?.join(", ")}
                />
                <DetailItem
                  label="Altitude"
                  value={family?.altitude}
                  suffix="m"
                />
                <DetailItem
                  label="GPS Accuracy"
                  value={family?.gpsAccuracy}
                  suffix="m"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* House Details with Enhanced UI */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                <CardTitle>House Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="mb-3 font-medium">Basic Details</h4>
                <div className="space-y-2">
                  <DetailItem
                    label="Ownership"
                    value={family?.houseOwnership}
                  />
                  {family?.houseOwnershipOther && (
                    <DetailItem
                      label="Other Ownership"
                      value={family?.houseOwnershipOther}
                    />
                  )}
                  <DetailItem
                    label="Safety Status"
                    value={family?.feels_safe}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-3 font-medium">Water & Sanitation</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Water Sources
                    </label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {family?.waterSource?.map((source, i) => (
                        <Badge key={i} variant="outline">
                          {source}
                        </Badge>
                      )) || "No sources listed"}
                    </div>
                  </div>
                  <DetailItem
                    label="Water Purification"
                    value={family?.waterPurificationMethods?.join(", ")}
                  />
                  <DetailItem label="Toilet Type" value={family?.toiletType} />
                  <DetailItem label="Solid Waste" value={family?.solidWaste} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle>Energy & Facilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="mb-3 font-medium">Energy Sources</h4>
                <div className="space-y-2">
                  <DetailItem
                    label="Cooking Fuel"
                    value={family?.primaryCookingFuel}
                  />
                  <DetailItem
                    label="Energy Source"
                    value={family?.primaryEnergySource}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-3 font-medium">Available Facilities</h4>
                <div className="flex flex-wrap gap-1">
                  {family?.facilities?.map((facility, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-primary/20"
                    >
                      {facility}
                    </Badge>
                  )) || "No facilities listed"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Economic Status with Enhanced UI */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-primary" />
              <CardTitle>Economic Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-medium">Financial Status</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <DetailItem
                    label="Bank Account"
                    value={family?.hasBank}
                    badge
                  />
                  <DetailItem
                    label="Insurance"
                    value={family?.hasInsurance}
                    badge
                  />
                  <DetailItem
                    label="Female Properties"
                    value={family?.femaleProperties}
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground">
                    Loans From Organizations
                  </label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {family?.loanedOrganizations?.map((org, i) => (
                      <Badge key={i} variant="outline">
                        {org}
                      </Badge>
                    )) || "No loans"}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-medium">Income & Remittance</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    Income Sources
                  </label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {family?.incomeSources?.map((source, i) => (
                      <Badge key={i} variant="outline">
                        {source}
                      </Badge>
                    )) || "No sources listed"}
                  </div>
                </div>

                {family?.hasRemittance && (
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Remittance Expenses
                    </label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {family?.remittanceExpenses?.map((expense, i) => (
                        <Badge key={i} variant="outline">
                          {expense}
                        </Badge>
                      )) || "No expenses listed"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}

// Helper component for consistent detail display
function DetailItem({
  label,
  value,
  suffix,
  badge,
}: {
  label: string;
  value?: string | number | null;
  suffix?: string;
  badge?: boolean;
}) {
  if (!value) return null;

  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>
        {badge ? (
          <Badge variant="default">{value}</Badge>
        ) : (
          <>
            {value} {suffix}
          </>
        )}
      </span>
    </div>
  );
}
