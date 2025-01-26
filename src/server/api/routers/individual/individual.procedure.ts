import { createTRPCRouter } from "@/server/api/trpc";
import { getAllIndividuals, getIndividualById, updateIndividualBasicInfo } from "./procedures/query";

export const individualRouter = createTRPCRouter({
  getAll: getAllIndividuals,
  getById: getIndividualById,
  updateBasicInfo: updateIndividualBasicInfo,
});
