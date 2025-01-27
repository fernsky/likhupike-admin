import { createTRPCRouter } from "@/server/api/trpc";
import { getAllFamilies, getlikhupikeFamilyById } from "./procedures/query";
// import { createIndividual, updateIndividual } from "./procedures/mutation";

export const familyRouter = createTRPCRouter({
  getAll: getAllFamilies,
  getById: getlikhupikeFamilyById,
//   updateIndividual: updateIndividual,
//   createNewIndividual: createIndividual,
});
