import { TRPCError } from "@trpc/server";
import { createIndividualSchema, updateIndividualSchema } from "../individual.schema";
import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import likhupikeIndividual from "@/server/db/schema/individual";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export const createIndividual = protectedProcedure
  .input(createIndividualSchema)
  .mutation(async ({ input }) => {
    try {
      // Log the input for debugging
      console.log("Creating individual with data:", input);

      const individual = await db
        .insert(likhupikeIndividual)
        .values({
          ...input,
          id: nanoid(),
          wardNo: input.wardNo ?? 0, // Provide a default value for wardNo
        })
        .returning();

      return individual[0];
    } catch (error) {
      console.error("Database error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create individual",
      });
    }
  });

export const updateIndividual = protectedProcedure
  .input(updateIndividualSchema)
  .mutation(async ({ input }) => {
    try {
      // Log the input for debugging
      console.log("Updating individual with data:", input);

      const { id, ...updateData } = input;

      const individual = await db
        .update(likhupikeIndividual)
        .set(updateData)
        .where(eq(likhupikeIndividual.id, id))
        .returning();

      if (!individual.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Individual not found",
        });
      }

      return individual[0];
    } catch (error) {
      console.error("Database error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update individual",
      });
    }
  });
