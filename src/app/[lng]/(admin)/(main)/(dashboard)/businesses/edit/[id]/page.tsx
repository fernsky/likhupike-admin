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
import { Building2, MapPin, User, Briefcase, FileText } from "lucide-react";

export default function EditBusiness({ params }: { params: { id: string } }) {
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id);

  const { data: business, isLoading } = api.business.getById.useQuery({
    id: decodedId,
  });

  const updateMutation = api.business.updateBusiness.useMutation({
    onSuccess: () => {
      toast.success("Business updated successfully");
      router.push(`/businesses/${decodedId}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      id: decodedId,
      // Basic Info
      businessName: business?.businessName ?? "",
      wardNo: business?.wardNo ?? undefined,
      areaCode: business?.areaCode ?? undefined,
      businessNo: business?.businessNo ?? "",
      locality: business?.locality ?? "",
      enumeratorName: business?.enumeratorName ?? "",
      phone: business?.phone ?? "",

      // Operator Details
      operatorName: business?.operatorName ?? "",
      operatorPhone: business?.operatorPhone ?? "",
      operatorAge: business?.operatorAge ?? undefined,
      operatorGender: business?.operatorGender ?? "",
      operatorEducation: business?.operatorEducation ?? "",

      // Business Classification
      businessNature: business?.businessNature ?? "",
      businessNatureOther: business?.businessNatureOther ?? "",
      businessType: business?.businessType ?? "",
      businessTypeOther: business?.businessTypeOther ?? "",

      // Registration
      registrationStatus: business?.registrationStatus ?? "",
      registeredBodies: business?.registeredBodies ?? [],
      registeredBodiesOther: business?.registeredBodiesOther ?? "",
      statutoryStatus: business?.statutoryStatus ?? "",
      statutoryStatusOther: business?.statutoryStatusOther ?? "",
      panStatus: business?.panStatus ?? "",
      panNumber: business?.panNumber ?? "",

      // Employees
      hasPartners: business?.hasPartners ?? "",
      totalPartners: business?.totalPartners ?? undefined,
      nepaliMalePartners: business?.nepaliMalePartners ?? undefined,
      nepaliFemalePartners: business?.nepaliFemalePartners ?? undefined,
      hasForeignPartners: business?.hasForeignPartners ?? "",
      foreignMalePartners: business?.foreignMalePartners ?? undefined,
      foreignFemalePartners: business?.foreignFemalePartners ?? undefined,
      hasInvolvedFamily: business?.hasInvolvedFamily ?? "",
      totalInvolvedFamily: business?.totalInvolvedFamily ?? undefined,
      maleInvolvedFamily: business?.maleInvolvedFamily ?? undefined,
      femaleInvolvedFamily: business?.femaleInvolvedFamily ?? undefined,

      // Permanent Employees
      hasPermanentEmployees: business?.hasPermanentEmployees ?? "",
      totalPermanentEmployees: business?.totalPermanentEmployees ?? undefined,
      nepaliMalePermanentEmployees:
        business?.nepaliMalePermanentEmployees ?? undefined,
      nepaliFemalePermanentEmployees:
        business?.nepaliFemalePermanentEmployees ?? undefined,
      hasForeignPermanentEmployees:
        business?.hasForeignPermanentEmployees ?? "",
      foreignMalePermanentEmployees:
        business?.foreignMalePermanentEmployees ?? undefined,
      foreignFemalePermanentEmployees:
        business?.foreignFemalePermanentEmployees ?? undefined,

      // Temporary Employees
      hasTemporaryEmployees: business?.hasTemporaryEmployees ?? "",
      totalTemporaryEmployees: business?.totalTemporaryEmployees ?? undefined,
      nepaliMaleTemporaryEmployees:
        business?.nepaliMaleTemporaryEmployees ?? undefined,
      nepaliFemaleTemporaryEmployees:
        business?.nepaliFemaleTemporaryEmployees ?? undefined,
      hasForeignTemporaryEmployees:
        business?.hasForeignTemporaryEmployees ?? "",
      foreignMaleTemporaryEmployees:
        business?.foreignMaleTemporaryEmployees ?? undefined,
      foreignFemaleTemporaryEmployees:
        business?.foreignFemaleTemporaryEmployees ?? undefined,

      // Specialized Business
      aquacultureWardNo: business?.aquacultureWardNo ?? undefined,
      pondCount: business?.pondCount ?? undefined,
      pondArea: business?.pondArea ? Number(business.pondArea) : undefined,
      fishProduction: business?.fishProduction
        ? Number(business.fishProduction)
        : undefined,
      fingerlingNumber: business?.fingerlingNumber ?? undefined,
      hasApiculture: business?.hasApiculture ?? "",
      apicultureWardNo: business?.apicultureWardNo ?? undefined,
      hiveCount: business?.hiveCount ?? undefined,
      honeyProduction: business?.honeyProduction
        ? Number(business.honeyProduction)
        : undefined,

      // Financial
      investmentAmount: business?.investmentAmount
        ? Number(business.investmentAmount)
        : undefined,
      totalInvestment: business?.totalInvestment
        ? Number(business.totalInvestment)
        : undefined,
      annualIncome: business?.annualIncome
        ? Number(business.annualIncome)
        : undefined,
      businessLocationOwnership: business?.businessLocationOwnership ?? "",
      businessLocationOwnershipOther:
        business?.businessLocationOwnershipOther ?? "",
    },
  });

  if (isLoading) {
    return (
      <ContentLayout title="Edit Business">
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
      title="Edit Business"
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
            form="business-form"
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
          id="business-form"
          //@ts-ignore
          onSubmit={form.handleSubmit((data) => updateMutation.mutate(data))}
          className="space-y-6"
        >
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="operator">Operator</TabsTrigger>
              <TabsTrigger value="classification">Classification</TabsTrigger>
              <TabsTrigger value="registration">Registration</TabsTrigger>
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="specialized">Specialized</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name *</FormLabel>
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
                              field.onChange(parseInt(e.target.value) || "")
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
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || "")
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Number</FormLabel>
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
                    name="enumeratorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enumerator Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
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

            {/* Operator Details Tab */}
            <TabsContent value="operator">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Operator Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="operatorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operator Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="operatorPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operator Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="operatorAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operator Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || "")
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="operatorGender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operator Gender</FormLabel>
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
                    name="operatorEducation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education Level</FormLabel>
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

            {/* Business Classification Tab */}
            <TabsContent value="classification">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Business Classification
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="businessNature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Nature</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select nature" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="manufacturing">
                              Manufacturing
                            </SelectItem>
                            <SelectItem value="service">Service</SelectItem>
                            <SelectItem value="trading">Trading</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("businessNature") === "other" && (
                    <FormField
                      control={form.control}
                      name="businessNatureOther"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specify Other Nature</FormLabel>
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
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="wholesale">Wholesale</SelectItem>
                            <SelectItem value="agriculture">
                              Agriculture
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("businessType") === "other" && (
                    <FormField
                      control={form.control}
                      name="businessTypeOther"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specify Other Type</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Registration & Legal Tab */}
            <TabsContent value="registration">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Registration & Legal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="registrationStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Status</FormLabel>
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
                            <SelectItem value="registered">
                              Registered
                            </SelectItem>
                            <SelectItem value="unregistered">
                              Unregistered
                            </SelectItem>
                            <SelectItem value="inProgress">
                              In Progress
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="statutoryStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Statutory Status</FormLabel>
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
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("statutoryStatus") === "other" && (
                    <FormField
                      control={form.control}
                      name="statutoryStatusOther"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specify Other Status</FormLabel>
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
                    name="panStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAN Status</FormLabel>
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
                            <SelectItem value="registered">
                              Registered
                            </SelectItem>
                            <SelectItem value="unregistered">
                              Unregistered
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("panStatus") === "registered" && (
                    <FormField
                      control={form.control}
                      name="panNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PAN Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Employee Statistics Tab */}
            <TabsContent value="employees">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Partners Section */}
                  <div className="mb-8 space-y-4">
                    <h3 className="text-lg font-semibold">Partners</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="hasPartners"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Has Partners?</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
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

                      {form.watch("hasPartners") === "yes" && (
                        <>
                          <FormField
                            control={form.control}
                            name="totalPartners"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Total Partners</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value) || "",
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
                            name="nepaliMalePartners"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nepali Male Partners</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value) || "",
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
                            name="nepaliFemalePartners"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nepali Female Partners</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value) || "",
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
                    </div>
                  </div>

                  {/* Permanent Employees Section */}
                  <div className="mb-8 space-y-4">
                    <h3 className="text-lg font-semibold">
                      Permanent Employees
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="hasPermanentEmployees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Has Permanent Employees?</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
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

                      {form.watch("hasPermanentEmployees") === "yes" && (
                        <>
                          <FormField
                            control={form.control}
                            name="totalPermanentEmployees"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Total Permanent Employees</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value) || "",
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
                            name="nepaliMalePermanentEmployees"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nepali Male Permanent</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value) || "",
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
                            name="nepaliFemalePermanentEmployees"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nepali Female Permanent</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value) || "",
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
                            name="hasForeignPermanentEmployees"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Has Foreign Permanent?</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
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

                          {form.watch("hasForeignPermanentEmployees") ===
                            "yes" && (
                            <>
                              <FormField
                                control={form.control}
                                name="foreignMalePermanentEmployees"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Foreign Male Permanent
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) =>
                                          field.onChange(
                                            parseInt(e.target.value) || "",
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
                                name="foreignFemalePermanentEmployees"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Foreign Female Permanent
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) =>
                                          field.onChange(
                                            parseInt(e.target.value) || "",
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
                    </div>
                  </div>

                  {/* Temporary Employees Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Temporary Employees
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="hasTemporaryEmployees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Has Temporary Employees?</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
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

                      {form.watch("hasTemporaryEmployees") === "yes" && (
                        <>
                          <FormField
                            control={form.control}
                            name="totalTemporaryEmployees"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Total Temporary</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value) || "",
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
                            name="nepaliMaleTemporaryEmployees"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nepali Male Temporary</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value) || "",
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
                            name="nepaliFemaleTemporaryEmployees"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nepali Female Temporary</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(
                                        parseInt(e.target.value) || "",
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
                            name="hasForeignTemporaryEmployees"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Has Foreign Temporary?</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
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

                          {form.watch("hasForeignTemporaryEmployees") ===
                            "yes" && (
                            <>
                              <FormField
                                control={form.control}
                                name="foreignMaleTemporaryEmployees"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Foreign Male Temporary
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) =>
                                          field.onChange(
                                            parseInt(e.target.value) || "",
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
                                name="foreignFemaleTemporaryEmployees"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Foreign Female Temporary
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) =>
                                          field.onChange(
                                            parseInt(e.target.value) || "",
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Specialized Business Tab */}
            <TabsContent value="specialized">
              <div className="space-y-6">
                {/* Aquaculture Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Aquaculture Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="pondCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Ponds</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || "")
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pondArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pond Area (sq.m)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="any"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
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
                      name="fishProduction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fish Production (kg)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="any"
                              {...field}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
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
                      name="fingerlingNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Fingerlings</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || "")
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Apiculture Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Apiculture Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="hasApiculture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Has Apiculture?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
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

                    {form.watch("hasApiculture") === "yes" && (
                      <>
                        <FormField
                          control={form.control}
                          name="hiveCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Hives</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseInt(e.target.value) || "",
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
                          name="honeyProduction"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Honey Production (kg)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="any"
                                  {...field}
                                  value={field.value ?? ""}
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value
                                        ? Number(e.target.value)
                                        : null,
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
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Financial Information Tab */}
            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="investmentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Amount (NPR)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value ? Number(e.target.value) : null,
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
                    name="totalInvestment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Investment (NPR)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value ? Number(e.target.value) : null,
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
                    name="annualIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Income (NPR)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value ? Number(e.target.value) : null,
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
                    name="businessLocationOwnership"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Ownership</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ownership" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="owned">Owned</SelectItem>
                            <SelectItem value="rented">Rented</SelectItem>
                            <SelectItem value="leased">Leased</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("businessLocationOwnership") === "other" && (
                    <FormField
                      control={form.control}
                      name="businessLocationOwnershipOther"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specify Other Ownership</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
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
