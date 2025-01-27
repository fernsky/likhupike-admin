import { createTRPCRouter } from "@/server/api/trpc";
import { createIndividual, updateIndividual } from "./procedures/mutation";
// ...other imports...

export const individualRouter = createTRPCRouter({
  createNewIndividual: createIndividual,
  updateIndividual: updateIndividual,
  // ...other procedures...
});
