import { Router } from "express";

import userRouter from "./user.routes";
import sessionRouter from "./session.routes";
import adminRouter from "./admin.routes";
import passAdminSecundaryRouter from "./adminSecundary.routes";
import addressRouter from "./address.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/sessions", sessionRouter);
routes.use("/admins", adminRouter);
routes.use("/admin_secundary", passAdminSecundaryRouter);
routes.use("/address", addressRouter);

export default routes;
