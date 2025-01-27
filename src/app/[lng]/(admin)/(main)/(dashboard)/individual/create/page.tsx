"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIndividualSchema } from "@/server/api/routers/individual/individual.schema";
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
import type { z } from "zod";
import { toast } from "sonner";

type FormData = z.infer<typeof createIndividualSchema>;

export default function CreateIndividual() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(createIndividualSchema),
    defaultValues: {
      name: "",
      parentId: "",
      wardNo: undefined,
      gender: undefined,
      // ... other fields with default values
    },
  });

  const createMutation = api.individual.createNewIndividual.useMutation({
    onSuccess: () => {
      toast.success("Individual created successfully");
      router.push("/individual");
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
      toast.error("Failed to create individual");
    }
  };

  return (
    <ContentLayout
      title="Create New Individual"
      actions={
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/individual")}
            className="hover:border-destructive hover:text-destructive"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-individual-form"
            onClick={async () => {
              await onSubmit(form.getValues());
            }}
            disabled={createMutation.isLoading}
          >
            {createMutation.isLoading ? "Creating..." : "Create Individual"}
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="create-individual-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="migration">Migration</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {/* Required Fields */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent ID *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                    name="deviceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device ID</FormLabel>
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

            {/* Personal Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
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

                  {/* Add other personal information fields */}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Health Tab */}
            <TabsContent value="health">
              <Card>
                <CardHeader>
                  <CardTitle>Health Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="hasChronicDisease"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Has Chronic Disease</FormLabel>
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

                  {form.watch("hasChronicDisease") === "yes" && (
                    <FormField
                      control={form.control}
                      name="primaryChronicDisease"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Chronic Disease</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="isDisabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Is Disabled</FormLabel>
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

                  {form.watch("isDisabled") === "yes" && (
                    <>
                      <FormField
                        control={form.control}
                        name="disabilityType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Disability Type</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="disabilityCause"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Disability Cause</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {form.watch("gender") === "female" && (
                    <>
                      <FormField
                        control={form.control}
                        name="gaveLiveBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Has Given Live Birth</FormLabel>
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

                      {form.watch("gaveLiveBirth") === "yes" && (
                        <>
                          <FormField
                            control={form.control}
                            name="aliveSons"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Alive Sons</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value, 10),
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
                            name="aliveDaughters"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Alive Daughters</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value, 10),
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle>Education Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="literacyStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Literacy Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="literate">Literate</SelectItem>
                            <SelectItem value="illiterate">
                              Illiterate
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="educationalLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Educational Level</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasTraining"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Has Training</FormLabel>
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

                  {form.watch("hasTraining") === "yes" && (
                    <>
                      <FormField
                        control={form.control}
                        name="training"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Training Details</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="monthsTrained"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Months Trained</FormLabel>
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
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Family Tab */}
            <TabsContent value="family">
              <Card>
                <CardHeader>
                  <CardTitle>Family Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("maritalStatus") === "married" && (
                    <FormField
                      control={form.control}
                      name="marriedAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age at Marriage</FormLabel>
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
                  )}

                  <FormField
                    control={form.control}
                    name="familyRole"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role in Family</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="head">Head of Family</SelectItem>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="child">Child</SelectItem>
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

            {/* Migration Tab */}
            <TabsContent value="migration">
              <Card>
                <CardHeader>
                  <CardTitle>Migration Status</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="isPresent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currently Present</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
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

                  {form.watch("isPresent") === "no" && (
                    <>
                      <FormField
                        control={form.control}
                        name="absenceReason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason for Absence</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select reason" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="education">
                                  Education
                                </SelectItem>
                                <SelectItem value="employment">
                                  Employment
                                </SelectItem>
                                <SelectItem value="marriage">
                                  Marriage
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="absenteeAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age When Left</FormLabel>
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
                        name="absenteeLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Location</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="absenteeHasSentCash"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sends Money Home</FormLabel>
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

                      {form.watch("absenteeHasSentCash") === "yes" && (
                        <FormField
                          control={form.control}
                          name="absenteeCashAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount Sent (NPR)</FormLabel>
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
                      )}
                    </>
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
