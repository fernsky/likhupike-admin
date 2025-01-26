import { wardRouter } from "./routers/ward/ward.procedure";
import { userRouter } from "./routers/user/user.procedure";
import { createTRPCRouter } from "./trpc";
import { areaRouter } from "./routers/areas/areas.procedure";
import { superadminRouter } from "./routers/superadmin/superadmin.procedure";
import { buildingRouter } from "./routers/building/building.procedure";
import { areaManagementRouter } from "./routers/area-management/area-management.procedure";
import { userManagementRouter } from "./routers/users/user.procedure";

export const appRouter = createTRPCRouter({
  user: userRouter,
  area: areaRouter,
  ward: wardRouter,
  superadmin: superadminRouter,
  userManagement: userManagementRouter,
  areaManagement: areaManagementRouter,
  building: buildingRouter,
});

export type AppRouter = typeof appRouter;
