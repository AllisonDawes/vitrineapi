import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CategoryProductsController from "../controllers/category_products/CategoryProductsController";

const categoryProductRouter = Router();
const categoryProductsController = new CategoryProductsController();

categoryProductRouter.use(ensureAuthenticated);

categoryProductRouter.get("/", categoryProductsController.index);
categoryProductRouter.post("/", categoryProductsController.create);
categoryProductRouter.put("/:category_id", categoryProductsController.update);
categoryProductRouter.patch("/:category_id", categoryProductsController.patch);
categoryProductRouter.delete(
  "/:category_id",
  categoryProductsController.delete
);

export default categoryProductRouter;
