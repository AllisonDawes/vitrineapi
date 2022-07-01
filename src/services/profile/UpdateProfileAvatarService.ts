import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import AppError from "../../errors/AppError";

import uploadAvatarConfig from "../../config/uploadAvatar";

import User from "../../models/User";

interface IRequest {
  user_id: string;
  avatarFileName: string | undefined;
}

class UpdateProfileAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const userRespository = getRepository(User);

    const user = await userRespository.findOne(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado!", 400);
    }

    if (user.user_avatar) {
      const userAvatarFilePath = path.join(
        uploadAvatarConfig.directory,
        user.user_avatar
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.user_avatar = avatarFileName!;

    await userRespository.save(user);

    return user;
  }
}

export default UpdateProfileAvatarService;
