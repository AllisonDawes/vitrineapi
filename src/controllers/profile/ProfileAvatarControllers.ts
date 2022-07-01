import { Request, Response } from "express";
import { classToPlain } from "class-transformer";

import UpdateProfileAvatarService from "../../services/profile/UpdateProfileAvatarService";

class ProfileAvatarControllers {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const updateAvatar = new UpdateProfileAvatarService();

    const profile = await updateAvatar.execute({
      user_id,
      avatarFileName: request.file?.filename,
    });

    return response.status(200).json(classToPlain(profile));
  }
}

export default ProfileAvatarControllers;
