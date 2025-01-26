"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/loading-button";
import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createUserSchema,
  type CreateUserInput,
} from "@/server/api/routers/users/user.schema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Globe,
  MapPin,
  User,
  Mail,
  Phone,
  Key,
  Shield,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

const FormCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Card className="bg-white">
    <CardHeader className="border-b bg-white">
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4 py-6">{children}</CardContent>
  </Card>
);

export function CreateUser() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const createUser = api.userManagement.create.useMutation();

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      userName: "",
      scope: "ward",
      wardNumber: undefined,
      password: "",
    },
  });

  const watchScope = form.watch("scope");

  async function onSubmit(values: CreateUserInput) {
    setIsLoading(true);
    try {
      console.log(values);
      await createUser.mutateAsync(values);
      toast.success("User created successfully");
      router.push("/users");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create user",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 px-2 lg:px-10"
      >
        <FormCard
          title="Personal Information"
          description="Enter the basic details of the user"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="9800000000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormCard>

        <FormCard
          title="Role Assignment"
          description="Set the user's role and permissions"
        >
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  User Role
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-muted/50">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="admin" />
                        </FormControl>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4 text-destructive" />
                            <FormLabel className="font-medium">
                              Administrator
                            </FormLabel>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Full system access with user management capabilities
                          </p>
                        </div>
                      </FormItem>
                    </div>

                    <div className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-muted/50">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="editor" />
                        </FormControl>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-warning" />
                            <FormLabel className="font-medium">
                              Editor
                            </FormLabel>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Can edit and manage survey data
                          </p>
                        </div>
                      </FormItem>
                    </div>

                    <div className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-muted/50">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="viewer" />
                        </FormControl>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-info" />
                            <FormLabel className="font-medium">
                              Viewer
                            </FormLabel>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Read-only access to view survey data
                          </p>
                        </div>
                      </FormItem>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormCard>

        <FormCard
          title="Access Control"
          description="Set up user access level and work area"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="scope"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="flex items-center gap-2 text-base">
                    <Globe className="h-5 w-5 text-primary" />
                    Access Level
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid gap-4 pt-2"
                    >
                      <div className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-muted/50">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ward" />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel className="font-medium">
                              Ward Level Access
                            </FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Can manage and view data for a specific ward only
                            </p>
                          </div>
                        </FormItem>
                      </div>
                      <div className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-muted/50">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="municipality" />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel className="font-medium">
                              Municipality Level Access
                            </FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Can access and manage data across all wards
                            </p>
                          </div>
                        </FormItem>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchScope === "ward" && (
              <FormField
                control={form.control}
                name="wardNumber"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Assigned Ward
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select ward number" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7].map((ward) => (
                          <SelectItem key={ward} value={ward.toString()}>
                            Ward {ward}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </FormCard>

        <FormCard
          title="Login Credentials"
          description="Set up username and password for account access"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="johndoe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-primary" />
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormCard>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="gap-2">
            {isLoading ? <LoadingButton /> : "Create User"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
