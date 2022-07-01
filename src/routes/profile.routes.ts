import { Router } from "express";
import multer from "multer";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import ProfileControllers from "../controllers/profile/ProfileControllers";
import ProfileAvatarControllers from "../controllers/profile/ProfileAvatarControllers";

import uploadAvatarConfig from "../config/uploadAvatar";
const upload = multer(uploadAvatarConfig);

const profileRouter = Router();

const profileControllers = new ProfileControllers();
const profileAvatarControllers = new ProfileAvatarControllers();

profileRouter.use(ensureAuthenticated);

profileRouter.get("/", profileControllers.show);
profileRouter.put("/", profileControllers.update);
profileRouter.delete("/", profileControllers.delete);

profileRouter.patch(
  "/avatar_user",
  upload.single("user_avatar"),
  profileAvatarControllers.update
);

export default profileRouter;
