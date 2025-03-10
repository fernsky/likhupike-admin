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

const FormCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">{children}</CardContent>
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
      });
    }
  }, [user, form, userId]);

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
    <div className="space-y-6 px-2 lg:px-10">
      <Form {...form}>
        <form
          id="user-form"
          className="grid gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormCard
            title="Personal Information"
            description="Basic details about the user"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
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
                    <FormLabel>Phone Number</FormLabel>
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
                    <FormLabel>Email (Optional)</FormLabel>
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
            title="Account Details"
            description="Login credentials and account status"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="johndoe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wardNumber"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Ward Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={value}
                        onChange={(e) => onChange(parseInt(e.target.value))}
                        min={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormCard>
        </form>
      </Form>
      <div>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
          </div>

          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}

          <div className="flex justify-end">
            <LoadingButton
              type="button"
              onClick={handlePasswordReset}
              loading={resetPassword.isLoading}
            >
              Reset Password
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
