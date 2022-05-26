import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import PasswordAdminController from "../controllers/admin/PasswordAdminController";

const adminRouter = Router();

const passwordAdminController = new PasswordAdminController();

adminRouter.use(ensureAuthenticated);

adminRouter.post("/", passwordAdminController.create);
adminRouter.put("/", passwordAdminController.update);
adminRouter.patch("/", passwordAdminController.patch);

export default adminRouter;
