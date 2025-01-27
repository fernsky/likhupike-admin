import { createTRPCRouter } from "@/server/api/trpc";
import { getAllFamilies, getlikhupikeFamilyById } from "./procedures/query";
import { createFamily, updateFamily } from "./procedures/mutation";

export const familyRouter = createTRPCRouter({
  getAll: getAllFamilies,
  getById: getlikhupikeFamilyById,
  updateFamily: updateFamily,
  createNewFamily: createFamily,
});
