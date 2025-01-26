import { TRPCError } from "@trpc/server";
import { createIndividualSchema } from "../individual.schema";
import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import likhupikeIndividual from "@/server/db/schema/individual";
import { nanoid } from "nanoid";

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
