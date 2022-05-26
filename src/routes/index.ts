import { Router } from "express";

import userRouter from "./user.routes";
import sessionRouter from "./session.routes";
import adminRouter from "./admin.routes";
import passAdminSecundaryRouter from "./adminSecundary.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/sessions", sessionRouter);
routes.use("/admins", adminRouter);
routes.use("/admin_secundary", passAdminSecundaryRouter);

export default routes;
