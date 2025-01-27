import { wardRouter } from "./routers/ward/ward.procedure";
import { userRouter } from "./routers/user/user.procedure";
import { createTRPCRouter } from "./trpc";
import { userManagementRouter } from "./routers/users/user.procedure";
import { individualRouter } from "./routers/individual/individual.procedure";
import { familyRouter } from "./routers/family/family.procedure";

export const appRouter = createTRPCRouter({
  user: userRouter,
  ward: wardRouter,
  userManagement: userManagementRouter,
  individual:individualRouter,
  family: familyRouter
});

export type AppRouter = typeof appRouter;
