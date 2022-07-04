import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CategoryProductsController from "../controllers/category_products/CategoryProductsController";

const categoryProductRouter = Router();
const categoryProductsController = new CategoryProductsController();

categoryProductRouter.use(ensureAuthenticated);

categoryProductRouter.get("/", categoryProductsController.show);
categoryProductRouter.post("/", categoryProductsController.create);

export default categoryProductRouter;
