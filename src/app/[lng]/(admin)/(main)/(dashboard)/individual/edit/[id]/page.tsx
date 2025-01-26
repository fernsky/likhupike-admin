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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateIndividualSchema } from "@/server/api/routers/individual/individual.schema";

export default function EditIndividual({ params }: { params: { id: string } }) {
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id);

  const { data: individual, isLoading } = api.individual.getById.useQuery({
    id: decodedId,
  });

  const updateMutation = api.individual.updateIndividual.useMutation({
    onSuccess: () => {
      router.push(`/individual/${decodedId}`);
    },
  });

  const form = useForm({
    resolver: zodResolver(updateIndividualSchema),
    defaultValues: {
      id: decodedId,
      name: individual?.name ?? "",
      parentId: individual?.parentId ?? "",
      wardNo: individual?.wardNo?.toString() ?? "",
      gender: individual?.gender ?? "",
      age: individual?.age?.toString() ?? "",
      familyRole: individual?.familyRole ?? "",
      citizenOf: individual?.citizenOf ?? "",
      citizenOfOther: individual?.citizenOfOther ?? "",
      caste: individual?.caste ?? "",
      casteOther: individual?.casteOther ?? "",
      ancestorLanguage: individual?.ancestorLanguage ?? "",
      ancestorLanguageOther: individual?.ancestorLanguageOther ?? "",
      primaryMotherTongue: individual?.primaryMotherTongue ?? "",
      primaryMotherTongueOther: individual?.primaryMotherTongueOther ?? "",
      religion: individual?.religion ?? "",
      religionOther: individual?.religionOther ?? "",
      maritalStatus: individual?.maritalStatus ?? "",
      marriedAge: individual?.marriedAge?.toString() ?? "",
      hasChronicDisease: individual?.hasChronicDisease ?? "no",
      primaryChronicDisease: individual?.primaryChronicDisease ?? "",
      isDisabled: individual?.isDisabled ?? "no",
      literacyStatus: individual?.literacyStatus ?? "",
    },
  });

  if (isLoading) {
    return (
      <ContentLayout title="Edit Individual">
        <div className="space-y-6">
          <Skeleton className="h-[600px] rounded-lg" />
        </div>
      </ContentLayout>
    );
  }

  const onSubmit = (data: any) => {
    updateMutation.mutate({
      id: decodedId,
      ...data,
    });
  };

  return (
    <ContentLayout
      title="Edit Individual"
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
          <Button
            type="submit"
            form="individual-form"
            className="bg-primary hover:bg-primary/90"
            disabled={updateMutation.isLoading}
          >
            {updateMutation.isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="individual-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="familyRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="head">Head</SelectItem>
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

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle>Location Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="wardNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ward Number</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Add more location fields */}
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="citizenOf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Citizenship</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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

              {/* Add more personal information fields */}
            </CardContent>
          </Card>

          {/* Identity Card */}
          <Card>
            <CardHeader>
              <CardTitle>Identity & Culture</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="caste"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caste</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select caste" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Add your caste options */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Show casteOther input if caste is "other" */}
              {form.watch("caste") === "other" && (
                <FormField
                  control={form.control}
                  name="casteOther"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Caste</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Similar pattern for language fields */}
            </CardContent>
          </Card>

          {/* Health Information */}
          <Card>
            <CardHeader>
              <CardTitle>Health Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="hasChronicDisease"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Has Chronic Disease</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
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

              {/* Show if hasChronicDisease is "yes" */}
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

              {/* Disability fields */}
              <FormField
                control={form.control}
                name="isDisabled"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Disabled</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
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
            </CardContent>
          </Card>

          {/* Education Information */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="literacyStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Literacy Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="literate">Literate</SelectItem>
                        <SelectItem value="illiterate">Illiterate</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Add other education fields */}
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card>
            <CardHeader>
              <CardTitle>Employment & Skills</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {/* Add Primary Occupation field after adding it to the schema */}

              {/* Add other employment fields */}
            </CardContent>
          </Card>

          {/* Absence Information (if applicable) */}
          <Card>
            <CardHeader>
              <CardTitle>Absence Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {/* Add absence-related fields */}
            </CardContent>
          </Card>

          {/* Birth & Children Information (if applicable based on gender/age) */}
          {form.watch("gender") === "female" &&
            parseInt(form.watch("age")) >= 15 && (
              <Card>
                <CardHeader>
                  <CardTitle>Birth & Children Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {/* Add birth and children related fields */}
                </CardContent>
              </Card>
            )}
        </form>
      </Form>
    </ContentLayout>
  );
}
