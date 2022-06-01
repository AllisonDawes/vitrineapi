import Router from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import AddressController from "../controllers/address/AddressController";

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.use(ensureAuthenticated);

addressRouter.get("/", addressController.index);
addressRouter.post("/", addressController.create);
addressRouter.put("/:address_id", addressController.update);
addressRouter.patch("/:address_id", addressController.patch);
addressRouter.delete("/:address_id", addressController.delete);

export default addressRouter;
