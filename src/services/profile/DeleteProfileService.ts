import { getRepository } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  profile_id: string;
}

class DeleteProfileService {
  public async execute({ profile_id }: IRequest): Promise<void> {
    const userRespository = getRepository(User);

    const profile = await userRespository.findOne(profile_id);

    if (!profile) {
      throw new AppError("Usuário não encontrado!", 400);
    }

    await userRespository.remove(profile);

    return;
  }
}

export default DeleteProfileService;
