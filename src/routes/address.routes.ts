import Router from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import AddressController from "../controllers/address/AddressController";

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.use(ensureAuthenticated);

addressRouter.post("/", addressController.create);

export default addressRouter;
