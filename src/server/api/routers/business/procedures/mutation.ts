import { protectedProcedure } from "@/server/api/trpc";
import { rbacMiddleware } from "@/server/api/middleware/rbac-middleware";
import { TRPCError } from "@trpc/server";
import { createBusinessSchema, updateBusinessSchema } from "../business.schema";
import business from "@/server/db/schema/business"; // Import your Drizzle schema
import { eq } from "drizzle-orm";
import { Tsukimi_Rounded } from "next/font/google";

export const createBusiness = protectedProcedure
  .use(rbacMiddleware)
  .input(createBusinessSchema)
  .mutation(async ({ ctx, input }) => {
    //@ts-ignore
    if (!ctx.userPermissions.includes('create')) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You do not have permission to create businesses',
      });
    }
    
    const [newBusiness] = await ctx.db.insert(business)
    //@ts-ignore
      .values(input)
      .returning();
      
    return newBusiness;
  });

export const updateBusiness = protectedProcedure
  .use(rbacMiddleware)
  .input(updateBusinessSchema)
  .mutation(async ({ ctx, input }) => {
    //@ts-ignore
    if (!ctx.userPermissions.includes('update')) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You do not have permission to update businesses',
      });
    }
    
    const { id, ...data } = input;
    if (!id) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Business ID is required',
      });
    }
    const [updatedBusiness] = await ctx.db
      .update(business)
      //@ts-ignore
      .set(data)
      .where(eq(business.id, id))
      .returning();
      
    return updatedBusiness;
  });
