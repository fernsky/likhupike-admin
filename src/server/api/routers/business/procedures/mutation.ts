import { TRPCError } from "@trpc/server";
import { createBusinessSchema, updateBusinessSchema } from "../business.schema";
import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { business } from "@/server/db/schema/business";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export const createBusiness = protectedProcedure
  .input(createBusinessSchema)
  .mutation(async ({ input }) => {
    try {
      console.log("Creating business with data:", input);
      const newBusiness = await db
        .insert(business)
        //@ts-ignore
        .values({
          ...input,
          id: nanoid(),
          wardNo: input.wardNo ?? 0,
          altitude: input.altitude?.toString(),
          gpsAccuracy: input.gpsAccuracy?.toString(),
        })
        .returning();

      return newBusiness[0];
    } catch (error) {
      console.error("Database error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create business",
      });
    }
  });

export const updateBusiness = protectedProcedure
  .input(updateBusinessSchema)
  .mutation(async ({ input }) => {
    try {
      console.log("Updating business with data:", input);

      const { id, ...updateData } = input;

      if (!id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Business ID is required",
        });
      }

      const updatedBusiness = await db
        .update(business)
        //@ts-ignore
        .set(updateData)
        .where(eq(business.id, id))
        .returning();

      if (!updatedBusiness.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Business not found",
        });
      }

      return updatedBusiness[0];
    } catch (error) {
      console.error("Database error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update business",
      });
    }
  });
