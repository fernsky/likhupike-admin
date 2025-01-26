"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  updateUserSchema,
  type UpdateUserInput,
} from "@/server/api/routers/users/user.schema";
import { z } from "zod";
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

export function EditUser({ userId }: { userId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const updateUser = api.userManagement.update.useMutation();
  const resetPassword = api.userManagement.resetPassword.useMutation();
  const { data: user, isLoading: isLoadingUser } =
    api.userManagement.getById.useQuery(userId);

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      userId: userId,
      name: "",
      phoneNumber: "",
      email: "",
      userName: "",
      wardNumber: 1,
      role: "viewer", // Add default role
      scope: "ward", // Add default scope
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        userId: userId,
        name: user.name ?? undefined,
        phoneNumber: user.phoneNumber ?? undefined,
        email: user.email ?? undefined,
        userName: user.userName ?? undefined,
        wardNumber: user.wardNumber ?? undefined,
        role: user.role ?? undefined, // Set role from user data
        scope: user.scope ?? undefined, // Set scope from user data
      });
    }
  }, [user, form, userId]);

  const watchScope = form.watch("scope");

  async function onSubmit(values: UpdateUserInput) {
    setIsLoading(true);
    try {
      await updateUser.mutateAsync(values);
      toast.success("User updated successfully");
      router.push("/users");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const handlePasswordReset = async () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      await resetPassword.mutateAsync({
        userId,
        password,
        confirmPassword,
      });
      toast.success("Password reset successfully");
      setPassword("");
      setConfirmPassword("");
      setPasswordError("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to reset password",
      );
    }
  };

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form
        id="user-form"
        className="space-y-6 px-2 lg:px-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormCard
          title="Personal Information"
          description="Basic details about the user"
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
                    value={field.value}
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
                      value={field.value}
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

        <FormCard title="Security" description="Reset password for this user">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-primary" />
                  New Password
                </FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <FormLabel className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-primary" />
                  Confirm Password
                </FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            {passwordError && (
              <p className="text-sm text-destructive">{passwordError}</p>
            )}

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handlePasswordReset}
                disabled={resetPassword.isLoading}
              >
                Reset Password
              </Button>
            </div>
          </div>
        </FormCard>
      </form>
    </Form>
  );
}
