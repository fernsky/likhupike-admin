"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateFamilySchema } from "@/server/api/routers/family/family.schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function EditFamily({ params }: { params: { id: string } }) {
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id);

  const { data: family, isLoading } = api.family.getById.useQuery({
    id: decodedId,
  });

  const updateMutation = api.family.updateFamily.useMutation({
    onSuccess: () => {
      toast.success("Family updated successfully");
      router.push(`/family/${decodedId}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      await updateMutation.mutateAsync(values);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to update family");
    }
  };

  const form = useForm({
    resolver: zodResolver(updateFamilySchema),
    defaultValues: {
      id: decodedId,
      wardNo: family?.wardNo,
      areaCode: family?.areaCode ?? "",
      houseTokenNumber: family?.houseTokenNumber ?? "",
      familySymbolNo: family?.familySymbolNo ?? "",
      locality: family?.locality ?? "",
      devOrg: family?.devOrg ?? "",
      location: family?.location ?? "",
      altitude: family?.altitude ? Number(family.altitude) : undefined,
      gpsAccuracy: family?.gpsAccuracy ? Number(family.gpsAccuracy) : undefined,
      headName: family?.headName ?? "",
      headPhone: family?.headPhone ?? "",
      totalMembers: family?.totalMembers ?? undefined,
      isSanitized: family?.isSanitized ?? false,
      houseOwnership: family?.houseOwnership ?? "",
      feels_safe: family?.feels_safe ?? "",
      waterSource: family?.waterSource ?? [],
      toiletType: family?.toiletType ?? "",
      solidWaste: family?.solidWaste ?? "",
      primaryCookingFuel: family?.primaryCookingFuel ?? "",
      primaryEnergySource: family?.primaryEnergySource ?? "",
      facilities: family?.facilities ?? [],
      femaleProperties: family?.femaleProperties ?? "",
      loanedOrganizations: family?.loanedOrganizations ?? [],
      hasBank: family?.hasBank ?? "",
      hasInsurance: family?.hasInsurance ?? "",
      healthOrg: family?.healthOrg ?? "",
      incomeSources: family?.incomeSources ?? [],
      hasRemittance: family?.hasRemittance ?? false,
      remittanceExpenses: family?.remittanceExpenses ?? [],
    },
  });

  if (isLoading) {
    return (
      <ContentLayout title="Edit Family">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[200px] rounded-lg" />
          ))}
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout
      title="Edit Family"
      subtitle={`ID: ${decodedId}`}
      actions={
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="hover:border-destructive hover:text-destructive"
          >
            Cancel
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="family-form"
          //@ts-ignore
          onSubmit={form.handleSubmit((data) => updateMutation.mutate(data))}
          className="space-y-6"
        >
          <Tabs defaultValue="location" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="house">House Details</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="economic">Economic</TabsTrigger>
            </TabsList>

            <TabsContent value="location">
              <Card>
                <CardHeader>
                  <CardTitle>Location Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="wardNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ward Number</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10) || "")
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="areaCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="locality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Locality</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="headName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Head Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="headPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Head Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalMembers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Members</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10) || "")
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isSanitized"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Is Sanitized</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                          defaultValue={field.value ? "true" : "false"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="house">
              <Card>
                <CardHeader>
                  <CardTitle>House Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="houseOwnership"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>House Ownership</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="feels_safe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feels Safe</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="toiletType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Toilet Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="solidWaste"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Solid Waste</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facilities">
              <Card>
                <CardHeader>
                  <CardTitle>Facilities Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="primaryCookingFuel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Cooking Fuel</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primaryEnergySource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Energy Source</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="economic">
              <Card>
                <CardHeader>
                  <CardTitle>Economic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="femaleProperties"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Female Properties</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasBank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Has Bank Account</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasInsurance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Has Insurance</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasRemittance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Has Remittance</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                          defaultValue={field.value ? "true" : "false"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Button
            type="submit"
            form="family-form"
            className="bg-primary hover:bg-primary/90"
            disabled={updateMutation.isLoading}
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            {updateMutation.isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </ContentLayout>
  );
}
