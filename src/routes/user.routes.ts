import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import UsersControllers from "../controllers/users/UsersControllers";

const usersRouter = Router();

const usersControllers = new UsersControllers();

usersRouter.post("/", usersControllers.create);

usersRouter.use(ensureAuthenticated);

usersRouter.get("/", usersControllers.index);
usersRouter.get("/find_users", usersControllers.show);
usersRouter.put("/:user_id", usersControllers.update);
usersRouter.delete("/:user_id", usersControllers.delete);

export default usersRouter;
