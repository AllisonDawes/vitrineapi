import { Router } from "express";

import userRouter from "./user.routes";
import profileRouter from "./profile.routes";
import sessionRouter from "./session.routes";
import adminRouter from "./admin.routes";
import passAdminSecundaryRouter from "./adminSecundary.routes";
import addressRouter from "./address.routes";
import openCloseHour from "./openCloseHour.routes";
import categoryProductRouter from "./categoryProduct.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/profiles", profileRouter);
routes.use("/sessions", sessionRouter);
routes.use("/admins", adminRouter);
routes.use("/admin_secundary", passAdminSecundaryRouter);
routes.use("/address", addressRouter);
routes.use("/openclosehours", openCloseHour);
routes.use("/category_products", categoryProductRouter);

export default routes;
