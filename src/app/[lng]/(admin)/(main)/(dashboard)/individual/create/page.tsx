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
import {
  User,
  UserCircle,
  Heart,
  GraduationCap,
  Users,
  Plane,
  Plus,
  X,
  Loader2,
} from "lucide-react";

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
      age: undefined,
      deviceId: undefined,
      familyRole: undefined,
      citizenOf: undefined,
      citizenOfOther: undefined,
      caste: undefined,
      casteOther: undefined,
      ancestorLanguage: undefined,
      ancestorLanguageOther: undefined,
      primaryMotherTongue: undefined,
      primaryMotherTongueOther: undefined,
      religion: undefined,
      religionOther: undefined,
      maritalStatus: undefined,
      marriedAge: undefined,
      hasChronicDisease: undefined,
      primaryChronicDisease: undefined,
      isSanitized: undefined,
      isDisabled: undefined,
      disabilityType: undefined,
      disabilityTypeOther: undefined,
      disabilityCause: undefined,
      hasBirthCertificate: undefined,
      gaveLiveBirth: undefined,
      aliveSons: undefined,
      aliveDaughters: undefined,
      totalBornChildren: undefined,
      hasDeadChildren: undefined,
      deadSons: undefined,
      deadDaughters: undefined,
      totalDeadChildren: undefined,
      gaveRecentLiveBirth: undefined,
      recentBornSons: undefined,
      recentBornDaughters: undefined,
      totalRecentChildren: undefined,
      recentDeliveryLocation: undefined,
      prenatalCheckups: undefined,
      firstDeliveryAge: undefined,
      isPresent: undefined,
      absenteeAge: undefined,
      absenteeEducationalLevel: undefined,
      absenceReason: undefined,
      absenteeLocation: undefined,
      absenteeProvince: undefined,
      absenteeDistrict: undefined,
      absenteeCountry: undefined,
      absenteeHasSentCash: undefined,
      absenteeCashAmount: undefined,
      literacyStatus: undefined,
      schoolPresenceStatus: undefined,
      educationalLevel: undefined,
      primarySubject: undefined,
      goesSchool: undefined,
      schoolBarrier: undefined,
      hasTraining: undefined,
      training: undefined,
      monthsTrained: undefined,
      primarySkill: undefined,
      hasInternetAccess: undefined,
      financialWorkDuration: undefined,
      primaryOccupation: undefined,
      workBarrier: undefined,
      workAvailability: undefined,
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
      // Ensure required fields are present
      if (
        !values.name ||
        !values.parentId ||
        !values.wardNo ||
        !values.gender
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Convert numeric values to strings
      const formattedValues = {
        ...values,
        wardNo: values.wardNo?.toString() ?? "",
        age: values.age?.toString() ?? "",
        marriedAge: values.marriedAge?.toString() ?? "",
        aliveSons: values.aliveSons?.toString() ?? "",
        aliveDaughters: values.aliveDaughters?.toString() ?? "",
        totalBornChildren: values.totalBornChildren?.toString() ?? "",
        deadSons: values.deadSons?.toString() ?? "",
        deadDaughters: values.deadDaughters?.toString() ?? "",
        totalDeadChildren: values.totalDeadChildren?.toString() ?? "",
        absenteeAge: values.absenteeAge?.toString() ?? "",
        absenteeCashAmount: values.absenteeCashAmount?.toString() ?? "",
      };

      await createMutation.mutateAsync(formattedValues);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to create individual");
    }
  };

  return (
    <ContentLayout
      title="Create New Individual"
      description="Add a new individual with their personal, health, education, and other details."
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.push("/individual")}
            className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-individual-form"
            disabled={createMutation.isLoading}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            {createMutation.isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Create Individual
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="mx-auto max-w-5xl">
        <Form {...form}>
          <form
            id="create-individual-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">Basic Info</span>
                </TabsTrigger>
                <TabsTrigger
                  value="demographics"
                  className="flex items-center gap-2"
                >
                  <UserCircle className="h-4 w-4" />
                  <span className="hidden lg:inline">Demographics</span>
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="flex items-center gap-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden lg:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="health" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span className="hidden lg:inline">Health</span>
                </TabsTrigger>
                <TabsTrigger value="family" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden lg:inline">Family Details</span>
                </TabsTrigger>
                <TabsTrigger
                  value="migration"
                  className="flex items-center gap-2"
                >
                  <Plane className="h-4 w-4" />
                  <span className="hidden lg:inline">Migration</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-6">
                <Card className="border-none shadow-md">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold">
                      Basic Information
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Enter the essential details of the individual.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Full Name
                              <span className="ml-1 text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter full name"
                                className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="parentId"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Parent ID
                              <span className="ml-1 text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter parent ID"
                                className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="wardNo"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Ward Number
                              <span className="ml-1 text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Enter ward number"
                                className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Gender
                              <span className="ml-1 text-destructive">*</span>
                            </FormLabel>
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
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="familyRole"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Role in Family
                            </FormLabel>
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
                                <SelectItem value="head">
                                  Head of Family
                                </SelectItem>
                                <SelectItem value="spouse">Spouse</SelectItem>
                                <SelectItem value="child">Child</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="deviceId"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Device ID
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter device ID"
                                className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="demographics" className="mt-6">
                <Card className="border-none shadow-md">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold">
                      Demographics & Culture
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Enter the demographic and cultural details of the
                      individual.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="caste"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Caste
                            </FormLabel>
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
                                <SelectItem value="brahmin">Brahmin</SelectItem>
                                <SelectItem value="chhetri">Chhetri</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      {form.watch("caste") === "other" && (
                        <FormField
                          control={form.control}
                          name="casteOther"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-semibold">
                                Specify Caste
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter caste"
                                  className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      )}
                      <FormField
                        control={form.control}
                        name="citizenOf"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Citizenship
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || undefined}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select citizenship" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="nepal">Nepal</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="health" className="mt-6">
                <Card className="border-none shadow-md">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold">
                      Health Information
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Enter the health details of the individual.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="hasChronicDisease"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Chronic Disease Status
                            </FormLabel>
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
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      {form.watch("hasChronicDisease") === "yes" && (
                        <FormField
                          control={form.control}
                          name="primaryChronicDisease"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-semibold">
                                Primary Chronic Disease
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter disease"
                                  className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    {form.watch("gender") === "female" && (
                      <div className="space-y-4">
                        <h3 className="font-medium">Maternal Health</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Add fields for:
                              - gaveLiveBirth
                              - aliveSons/aliveDaughters/totalBornChildren
                              - hasDeadChildren/deadSons/deadDaughters
                              - gaveRecentLiveBirth and related fields
                              - prenatalCheckups
                              - firstDeliveryAge */}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <Card className="border-none shadow-md">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold">
                      Education Information
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Enter the education details of the individual.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="literacyStatus"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Literacy Status
                            </FormLabel>
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
                                <SelectItem value="literate">
                                  Literate
                                </SelectItem>
                                <SelectItem value="illiterate">
                                  Illiterate
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="educationalLevel"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Education Level
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter education level"
                                className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="migration" className="mt-6">
                <Card className="border-none shadow-md">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold">
                      Migration Status
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Enter the migration details of the individual.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="isPresent"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Currently Present
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || undefined}
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
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      {form.watch("isPresent") === "no" && (
                        <>
                          <FormField
                            control={form.control}
                            name="absenteeAge"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold">
                                  Age When Left
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="Enter age"
                                    className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="absenceReason"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold">
                                  Reason for Absence
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value || undefined}
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
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="absenteeLocation"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold">
                                  Current Location
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter location"
                                    className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="absenteeProvince"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold">
                                  Province
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter province"
                                    className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="absenteeDistrict"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold">
                                  District
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter district"
                                    className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="absenteeCountry"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold">
                                  Country
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter country"
                                    className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="absenteeHasSentCash"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold">
                                  Sends Money Home
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value || undefined}
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
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                          {form.watch("absenteeHasSentCash") === "yes" && (
                            <FormField
                              control={form.control}
                              name="absenteeCashAmount"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel className="text-sm font-semibold">
                                    Amount Sent (NPR)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      placeholder="Enter amount"
                                      className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          )}
                          <FormField
                            control={form.control}
                            name="absenteeEducationalLevel"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold">
                                  Education Level When Left
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter education level"
                                    className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="work" className="mt-6">
                <Card className="border-none shadow-md">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold">
                      Work & Skills
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Enter the work and skills details of the individual.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Add fields for:
                          - primarySkill
                          - hasInternetAccess
                          - financialWorkDuration
                          - primaryOccupation
                          - workBarrier
                          - workAvailability */}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="family" className="mt-6">
                <Card className="border-none shadow-md">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold">
                      Family Details
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Enter the family details of the individual.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="maritalStatus"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Marital Status
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || undefined}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="married">Married</SelectItem>
                                <SelectItem value="divorced">
                                  Divorced
                                </SelectItem>
                                <SelectItem value="widowed">Widowed</SelectItem>
                                <SelectItem value="separated">
                                  Separated
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      {form.watch("maritalStatus") === "married" && (
                        <FormField
                          control={form.control}
                          name="marriedAge"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-semibold">
                                Age at Marriage
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="Enter age"
                                  className="w-full rounded-md border-border/50 bg-background shadow-sm transition-colors focus:border-primary"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      )}
                      <FormField
                        control={form.control}
                        name="hasBirthCertificate"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-semibold">
                              Birth Certificate
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || undefined}
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
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </ContentLayout>
  );
}
