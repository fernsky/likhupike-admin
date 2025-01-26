import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "@/server/db";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import likhupikeIndividual from "@/server/db/schema/individual";
import { createIndividualSchema, updateIndividualSchema } from "../individual.schema";
import { desc, eq, and } from "drizzle-orm";

export const individualRouter = createTRPCRouter({
  // Create individual
  create: protectedProcedure
    .input(createIndividualSchema)
    .mutation(async ({ input }) => {
      try {
        const individual = await db
          .insert(likhupikeIndividual)
          .values({
            id: crypto.randomUUID(),
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
    }),

  // Get all individuals with pagination
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().default(0),
        wardNo: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const { limit, cursor, wardNo } = input;
      
      try {
        const query = wardNo 
          ? and(eq(likhupikeIndividual.wardNo, wardNo))
          : undefined;

        const individuals = await db
          .select()
          .from(likhupikeIndividual)
          .where(query)
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
    }),

  // Get individual by ID
  getById: protectedProcedure
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
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch individual",
        });
      }
    }),

  // Update individual
  update: protectedProcedure
    .input(updateIndividualSchema)
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;

      try {
        const updated = await db
          .update(likhupikeIndividual)
          .set(updateData)
          .where(eq(likhupikeIndividual.id, id))
          .returning();

        if (!updated[0]) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Individual not found",
          });
        }

        return updated[0];
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update individual",
        });
      }
    }),

  // Delete individual
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const deleted = await db
          .delete(likhupikeIndividual)
          .where(eq(likhupikeIndividual.id, input.id))
          .returning();

        if (!deleted[0]) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Individual not found",
          });
        }

        return deleted[0];
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete individual",
        });
      }
    }),

  // Get individuals by parent ID
  getByParentId: protectedProcedure
    .input(z.object({ parentId: z.string() }))
    .query(async ({ input }) => {
      try {
        const individuals = await db
          .select()
          .from(likhupikeIndividual)
          .where(eq(likhupikeIndividual.parentId, input.parentId));

        return individuals;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch individuals",
        });
      }
    }),
});
