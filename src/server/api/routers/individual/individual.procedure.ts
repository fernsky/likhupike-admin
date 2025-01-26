import { createTRPCRouter } from "@/server/api/trpc";
import { getAllIndividuals, getIndividualById } from "./procedures/query";
import { createIndividual, updateIndividual } from "./procedures/mutation";

export const individualRouter = createTRPCRouter({
  getAll: getAllIndividuals,
  getById: getIndividualById,
  updateIndividual: updateIndividual,
  createNewIndividual: createIndividual,
});
