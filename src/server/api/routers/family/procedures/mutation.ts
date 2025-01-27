import { TRPCError } from "@trpc/server";
import { createFamilySchema, updateFamilySchema } from "../family.schema";
import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import likhupikeFamily from "@/server/db/schema/family";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export const createFamily = protectedProcedure
  .input(createFamilySchema)
  .mutation(async ({ input }) => {
    try {
      console.log("Creating family with data:", input);

      const family = await db
        .insert(likhupikeFamily)
        .values({
          ...input,
          id: nanoid(),
          altitude: input.altitude?.toString(),
          gpsAccuracy: input.gpsAccuracy?.toString(),
        })
        .returning();

      return family[0];
    } catch (error) {
      console.error("Database error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create family",
      });
    }
  });

export const updateFamily = protectedProcedure
  .input(updateFamilySchema)
  .mutation(async ({ input }) => {
    try {
      console.log("Updating family with data:", input);

      const { id, ...updateData } = input;

      const family = await db
        .update(likhupikeFamily)
        .set({
          ...updateData,
          altitude: updateData.altitude?.toString(),
          gpsAccuracy: updateData.gpsAccuracy?.toString(),
        })
        .where(eq(likhupikeFamily.id, id))
        .returning();

      if (!family.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Family not found",
        });
      }

      return family[0];
    } catch (error) {
      console.error("Database error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update family",
      });
    }
  });
