import { getRepository } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  profile_id: string;
}

class FindProfileService {
  public async execute({ profile_id }: IRequest): Promise<User> {
    const userRespository = getRepository(User);

    const profile = await userRespository.findOne(profile_id);

    if (!profile) {
      throw new AppError("Usuário não encontrado!", 400);
    }

    return profile;
  }
}

export default FindProfileService;
