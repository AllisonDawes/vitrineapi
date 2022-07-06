import { Router } from "express";
import multer from "multer";

import uploadImgCategoryProducts from "../config/uploadImgCategoryProducts";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CategoryProductsController from "../controllers/category_products/CategoryProductsController";
import CategoryProductsImgController from "../controllers/category_products/CategoryProductImgController";

const upload = multer(uploadImgCategoryProducts);

const categoryProductRouter = Router();
const categoryProductsController = new CategoryProductsController();
const categoryProductsImgController = new CategoryProductsImgController();

categoryProductRouter.use(ensureAuthenticated);

categoryProductRouter.get("/", categoryProductsController.index);
categoryProductRouter.post("/", categoryProductsController.create);
categoryProductRouter.put("/:category_id", categoryProductsController.update);
categoryProductRouter.patch("/:category_id", categoryProductsController.patch);

categoryProductRouter.patch(
  "/:category_id/category_img",
  upload.single("img_category"),
  categoryProductsImgController.patch
);

categoryProductRouter.delete(
  "/:category_id",
  categoryProductsController.delete
);

export default categoryProductRouter;
