import { TRPCError } from "@trpc/server";
import { Scrypt } from "lucia";
import { generateId } from "lucia";
import { eq, not, sql } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createUserSchema,
  resetUserPasswordSchema,
  updateUserSchema,
} from "./user.schema";
import { users } from "@/server/db/schema/basic";
import * as z from "zod";

export const userManagementRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Must be an admin to manage users",
        });
      }

      const existingUser = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.userName, input.userName),
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already exists",
        });
      }

      const hashedPassword = await new Scrypt().hash(input.password);
      const userId = generateId(21);

      await ctx.db.insert(users).values({
        id: userId,
        ...input,
        hashedPassword,
        role: "viewer",
      });

      return { success: true };
    }),

  resetPassword: protectedProcedure
    .input(resetUserPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Must be an admin to reset passwords",
        });
      }

      const hashedPassword = await new Scrypt().hash(input.password);
      console.log("Ressting password", input.userId, hashedPassword);
      await ctx.db
        .update(users)
        .set({ hashedPassword })
        .where(eq(users.id, input.userId));

      return { success: true };
    }),

  update: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Must be an admin to update enumerator details",
        });
      }

      const { userId, ...updateData } = input;

      if (updateData.userName) {
        const existingUser = await ctx.db.query.users.findFirst({
          where: (users, { eq }) =>
            updateData.userName
              ? eq(users.userName, updateData.userName)
              : undefined,
        });

        if (existingUser && existingUser.id !== userId) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Username already exists",
          });
        }
      }

      await ctx.db.update(users).set(updateData).where(eq(users.id, userId));

      return { success: true };
    }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Must be an admin to view enumerator details",
        });
      }

      const enumerator = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, input),
      });

      if (!enumerator) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Enumerator not found",
        });
      }

      return enumerator;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Must be an admin to view enumerators",
      });
    }

    return ctx.db.query.users.findMany({
      where: (users, { eq }) => not(eq(users.id, ctx.user.id)),
    });
  }),
});
