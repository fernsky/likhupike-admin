import { createTRPCRouter } from "@/server/api/trpc";
import { getAllBusinesses, getBusinessById } from "./procedures/query";
import { createBusiness, updateBusiness } from "./procedures/mutation";

export const businessRouter = createTRPCRouter({
  getAll: getAllBusinesses,
  getById: getBusinessById,
  updateBusiness:updateBusiness,
  createBusiness:createBusiness
});
