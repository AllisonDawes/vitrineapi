import { Request, Response } from "express";
import { classToPlain } from "class-transformer";

import UpdateProfileService from "../../services/profile/UpdateProfileService";

class ProfileControllers {
  public async show(request: Request, response: Response): Promise<Response> {
    return response;
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
    return response;
  }
}

export default ProfileControllers;
