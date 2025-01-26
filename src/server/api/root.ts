import { wardRouter } from "./routers/ward/ward.procedure";
import { userRouter } from "./routers/user/user.procedure";
import { createTRPCRouter } from "./trpc";
import { userManagementRouter } from "./routers/users/user.procedure";

export const appRouter = createTRPCRouter({
  user: userRouter,
  ward: wardRouter,
  userManagement: userManagementRouter,
});

export type AppRouter = typeof appRouter;
