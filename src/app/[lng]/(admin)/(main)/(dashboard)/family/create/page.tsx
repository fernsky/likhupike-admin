"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFamilySchema } from "@/server/api/routers/family/family.schema";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { z } from "zod";
import { toast } from "sonner";

type FormData = z.infer<typeof createFamilySchema>;

export default function CreateFamily() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(createFamilySchema),
    defaultValues: {
      wardNo: undefined,
      areaCode: "",
      houseTokenNumber: "",
      headName: "",
      totalMembers: undefined,
      waterSource: [],
      facilities: [],
      loanedOrganizations: [],
      remittanceExpenses: [],
    },
  });

  const createMutation = api.family.createNewFamily.useMutation({
    onSuccess: () => {
      toast.success("Family created successfully");
      router.push("/family");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      await createMutation.mutateAsync(values);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to create family");
    }
  };

  return (
    <ContentLayout
      title="Create New Family"
      actions={
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/family")}
            className="hover:border-destructive hover:text-destructive"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-family-form"
            disabled={createMutation.isLoading}
          >
            {createMutation.isLoading ? "Creating..." : "Create Family"}
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="create-family-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <Tabs defaultValue="location" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="house">House Details</TabsTrigger>
              <TabsTrigger value="economic">Economic</TabsTrigger>
            </TabsList>

            {/* Location Tab */}
            <TabsContent value="location">
              <Card>
                <CardHeader>
                  <CardTitle>Location Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="wardNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ward Number *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
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

                  <FormField
                    control={form.control}
                    name="devOrg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Development Organization</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* GPS Fields */}
                  <FormField
                    control={form.control}
                    name="altitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Altitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.000001"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : null,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gpsAccuracy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPS Accuracy</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.000001"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : null,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="houseTokenNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>House Token Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="familySymbolNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Family Symbol Number</FormLabel>
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

            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="headName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Head of Family Name</FormLabel>
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
                        <FormLabel>Head's Phone Number</FormLabel>
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
                        <FormLabel>Total Family Members</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
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
                          value={field.value?.toString()}
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

            {/* House Details Tab */}
            <TabsContent value="house">
              <Card>
                <CardHeader>
                  <CardTitle>House Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="houseOwnership"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>House Ownership</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ownership type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="owned">Owned</SelectItem>
                            <SelectItem value="rented">Rented</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Water Sources Multi-Select */}
                  <FormField
                    control={form.control}
                    name="waterSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Water Sources</FormLabel>
                        <div className="space-y-2">
                          {["tap", "well", "river", "other"].map((source) => (
                            <div key={source} className="flex items-center">
                              <Checkbox
                                checked={field.value?.includes(source)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  const updated = checked
                                    ? [...current, source]
                                    : current.filter((val) => val !== source);
                                  field.onChange(updated);
                                }}
                              />
                              <label className="ml-2 capitalize">
                                {source}
                              </label>
                            </div>
                          ))}
                        </div>
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select toilet type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="flush">Flush Toilet</SelectItem>
                            <SelectItem value="pit">Pit Latrine</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primaryCookingFuel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Cooking Fuel</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="lpg">LPG</SelectItem>
                            <SelectItem value="wood">Wood</SelectItem>
                            <SelectItem value="electricity">
                              Electricity
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Economic Tab */}
            <TabsContent value="economic">
              <Card>
                <CardHeader>
                  <CardTitle>Economic Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="hasBank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Has Bank Account</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasRemittance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receives Remittance</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                          value={field.value?.toString()}
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

                  {/* Income Sources Multi-Select */}
                  <FormField
                    control={form.control}
                    name="incomeSources"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Income Sources</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "agriculture",
                            "business",
                            "job",
                            "remittance",
                            "pension",
                            "other",
                          ].map((source) => (
                            <div key={source} className="flex items-center">
                              <Checkbox
                                checked={field.value?.includes(source)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  const updated = checked
                                    ? [...current, source]
                                    : current.filter((val) => val !== source);
                                  field.onChange(updated);
                                }}
                              />
                              <label className="ml-2 capitalize">
                                {source}
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loanedOrganizations"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Loans From Organizations</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "bank",
                            "cooperative",
                            "microfinance",
                            "informal",
                            "none",
                          ].map((org) => (
                            <div key={org} className="flex items-center">
                              <Checkbox
                                checked={field.value?.includes(org)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  const updated = checked
                                    ? [...current, org]
                                    : current.filter((val) => val !== org);
                                  field.onChange(updated);
                                }}
                              />
                              <label className="ml-2 capitalize">{org}</label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loanUse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Usage Purpose</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("hasRemittance") && (
                    <FormField
                      control={form.control}
                      name="remittanceExpenses"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Remittance Expenses</FormLabel>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              "education",
                              "health",
                              "food",
                              "business",
                              "savings",
                              "other",
                            ].map((expense) => (
                              <div key={expense} className="flex items-center">
                                <Checkbox
                                  checked={field.value?.includes(expense)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    const updated = checked
                                      ? [...current, expense]
                                      : current.filter(
                                          (val) => val !== expense,
                                        );
                                    field.onChange(updated);
                                  }}
                                />
                                <label className="ml-2 capitalize">
                                  {expense}
                                </label>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </ContentLayout>
  );
}
