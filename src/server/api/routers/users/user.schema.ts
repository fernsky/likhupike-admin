import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    phoneNumber: z.string().length(10, "Phone number must be 10 digits"),
    email: z.string().email("Invalid email").optional(),
    userName: z.string().min(3, "Username must be at least 3 characters"),
    scope: z.enum(["ward", "municipality"]),
    wardNumber: z.number().min(1, "Ward number is required").optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["admin", "editor", "viewer"]).default("viewer"),
  })
  .refine(
    (data) => {
      if (data.scope === "ward" && !data.wardNumber) {
        return false;
      }
      return true;
    },
    {
      message: "Ward number is required when scope is ward",
      path: ["wardNumber"],
    },
  );

export const resetUserPasswordSchema = z
  .object({
    userId: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateUserSchema = z
  .object({
    userId: z.string(),
    name: z.string().min(1, "Name is required").optional(),
    phoneNumber: z
      .string()
      .length(10, "Phone number must be 10 digits")
      .optional(),
    email: z.string().email("Invalid email").optional(),
    userName: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .optional(),
    scope: z.enum(["ward", "municipality"]).optional(),
    wardNumber: z.number().min(1, "Ward number is required").optional(),
    role: z.enum(["admin", "editor", "viewer"]).optional(),
  })
  .refine(
    (data) => {
      if (data.scope === "ward" && !data.wardNumber) {
        return false;
      }
      return true;
    },
    {
      message: "Ward number is required when scope is ward",
      path: ["wardNumber"],
    },
  );

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type ResetUserPasswordInput = z.infer<typeof resetUserPasswordSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
