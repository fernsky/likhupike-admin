import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { desc, eq, sql } from "drizzle-orm";
import { protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { business } from "@/server/db/schema/business";
import { updateBusinessSchema } from "../business.schema";

export const getAllBusinesses = protectedProcedure
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
      let query = db.select().from(business);

      const businesses = await query
        .orderBy(desc(business.id))
        .limit(limit)
        .offset(cursor);

      const nextCursor = businesses.length === limit ? cursor + limit : null;

      return {
        items: businesses,
        nextCursor,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch businesses",
      });
    }
  });

export const getBusinessById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    try {
      const businessResult = await db
        .select()
        .from(business)
        .where(eq(business.id, input.id))
        .limit(1);

      if (!businessResult[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Business not found",
        });
      }

      return businessResult[0];
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch business",
      });
    }
  });
