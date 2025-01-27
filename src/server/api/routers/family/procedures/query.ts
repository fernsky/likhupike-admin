import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { likhupikeFamily } from "@/server/db/schema/family";

export const getAllFamilies = protectedProcedure
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
      let query = db.select().from(likhupikeFamily);

      const families = await query
        .orderBy(desc(likhupikeFamily.id))
        .limit(limit)
        .offset(cursor);

      const nextCursor = families.length === limit ? cursor + limit : null;

      return {
        items: families,
        nextCursor,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch families",
      });
    }
  });

export const getlikhupikeFamilyById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    try {
      const likhupikeFamilyData = await db
        .select()
        .from(likhupikeFamily)
        .where(eq(likhupikeFamily.id, input.id))
        .limit(1);

      if (!likhupikeFamilyData[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "likhupikeFamily not found",
        });
      }

      return likhupikeFamilyData[0];
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch likhupikeFamily",
      });
    }
  });
