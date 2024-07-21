import { ActivityLogController } from "./controllers/ActivityLogController";
import { UserController } from "./controllers/UserController";
import { WashroomController } from "./controllers/WashroomController";
import { verifyToken } from "./middleware/verifyToken";

const Routes: Array<{
  method: string;
  route: string;
  action: (...args: any[]) => void;
  middleware?: any;
}> = [
  {
    method: "post",
    route: "/admin/login",
    action: UserController.verifyUser,
  },
  {
    method: "post",
    route: "/admin/add-user", // For adding admin/janitor
    action: UserController.createUser,
    middleware: verifyToken,
  },
  {
    method: "get",
    route: "/admin/get-janitors-list",
    action: UserController.getJanitorsList,
    middleware: verifyToken,
  },
  {
    method: "post",
    route: "/admin/add-washroom",
    action: WashroomController.createWashroom,
    middleware: verifyToken,
  },
  {
    method: "get",
    route: "/admin/get-washrooms-list",
    action: WashroomController.getWashroomsList,
    middleware: verifyToken,
  },
  {
    method: "get",
    route: "/admin/get-activity-logs",
    action: ActivityLogController.getActivityLog,
    middleware: verifyToken,
  },
  {
    method: "post",
    route: "/verify-janitor",
    action: UserController.verifyUser,
  },
  {
    method: "get",
    route: "/washroom-detail/:id",
    action: WashroomController.getWashroom,
  },
  {
    method: "post",
    route: "/update-washroom-status/:id",
    action: WashroomController.updateWashroomStatus,
  },
];

export default Routes;
