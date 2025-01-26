import { createTRPCRouter } from "@/server/api/trpc";
import { getAllIndividuals, getIndividualById } from "./procedures/query";

export const individualRouter = createTRPCRouter({
  getAll: getAllIndividuals,
  getById: getIndividualById,
});
