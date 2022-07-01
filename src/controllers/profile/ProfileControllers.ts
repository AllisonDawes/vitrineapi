import { Request, Response } from "express";
import { classToPlain } from "class-transformer";

import UpdateProfileService from "../../services/profile/UpdateProfileService";
import DeleteProfileService from "../../services/profile/DeleteProfileService";
import FindProfileService from "../../services/profile/FindProfileService";

class ProfileControllers {
  public async show(request: Request, response: Response): Promise<Response> {
    const profile_id = request.user.id;

    const findProfileService = new FindProfileService();

    const profile = await findProfileService.execute({
      profile_id,
    });

    return response.status(200).json(classToPlain(profile));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const profile_id = request.user.id;
    const { name, email, password, oldPassword } = request.body;

    const updateProfileService = new UpdateProfileService();

    const profile = await updateProfileService.execute({
      profile_id,
      name,
      email,
      password,
      oldPassword,
    });

    return response.status(200).json(classToPlain(profile));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const profile_id = request.user.id;

    const deleteProfileService = new DeleteProfileService();

    await deleteProfileService.execute({
      profile_id,
    });

    return response.status(200).json({});
  }
}

export default ProfileControllers;
