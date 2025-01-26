import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { desc, eq, sql } from "drizzle-orm";
import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import likhupikeIndividual from "@/server/db/schema/individual";

export const getAllIndividuals = protectedProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).default(10),
      cursor: z.number().default(0),
      wardNo: z.number().optional(),
      search: z.string().optional(),
    })
  )
  .query(async ({ input }) => {
    const { limit, cursor, wardNo, search } = input;

    try {
      let query = db.select().from(likhupikeIndividual);

    // No filtering conditions - will return all records

      const individuals = await query
        .orderBy(desc(likhupikeIndividual.id))
        .limit(limit)
        .offset(cursor);

      const nextCursor = individuals.length === limit ? cursor + limit : null;

      return {
        items: individuals,
        nextCursor,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch individuals",
      });
    }
  });

export const getIndividualById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    try {
      const individual = await db
        .select()
        .from(likhupikeIndividual)
        .where(eq(likhupikeIndividual.id, input.id))
        .limit(1);

      if (!individual[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Individual not found",
        });
      }

      return individual[0];
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch individual",
      });
    }
  });
