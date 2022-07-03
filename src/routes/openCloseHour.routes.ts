import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import OpenCloseHourController from "../controllers/open_close/OpenCloseHourController";

const openCloseHour = Router();
const openCloseOpenHour = new OpenCloseHourController();

openCloseHour.use(ensureAuthenticated);

openCloseHour.post("/", openCloseOpenHour.create);

export default openCloseHour;
