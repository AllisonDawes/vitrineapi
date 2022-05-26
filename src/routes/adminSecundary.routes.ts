import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import PassAdminSecundaryController from "../controllers/admin_secundary/PassAdminSecundaryController";

const passAdminSecundaryRouter = Router();

const passAdminSecundaryController = new PassAdminSecundaryController();

passAdminSecundaryRouter.use(ensureAuthenticated);

passAdminSecundaryRouter.post("/:user_id", passAdminSecundaryController.create);
passAdminSecundaryRouter.put("/:user_id", passAdminSecundaryController.update);

export default passAdminSecundaryRouter;
