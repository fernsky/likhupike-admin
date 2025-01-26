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
      const individual = await db
        .insert(likhupikeIndividual)
        .values({
          id: nanoid(),
          ...input,
        })
        .returning();

      return individual[0];
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create individual",
      });
    }
  });
