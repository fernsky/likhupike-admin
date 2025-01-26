import { createTRPCRouter } from "@/server/api/trpc";
import { getAllIndividuals, getIndividualById, updateIndividualBasicInfo } from "./procedures/query";
import { createIndividual } from "./procedures/mutation";

export const individualRouter = createTRPCRouter({
  getAll: getAllIndividuals,
  getById: getIndividualById,
  updateBasicInfo: updateIndividualBasicInfo,
  createNewIndividual: createIndividual,
});
