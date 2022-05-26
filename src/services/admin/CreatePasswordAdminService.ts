import { getRepository } from "typeorm";
import { compare, hash } from "bcryptjs";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  user_id: string;
  password: string;
  admin_password: string;
}

class CreatePasswordAdminService {
  public async execute({
    user_id,
    password,
    admin_password,
  }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const findUseradmin = await usersRepository.findOne({
      where: { admin: true },
    });

    if (findUseradmin) {
      throw new AppError("O sistema já tem um administrador cadastrado!", 400);
    }

    const userAuthenticated = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!userAuthenticated) {
      throw new AppError("User not authenticated", 400);
    }

    const passwordMatched = await compare(password, userAuthenticated.password);

    if (!passwordMatched) {
      throw new AppError("User not have permission!", 400);
    }

    const adminPasswordHashed = await hash(admin_password, 8);

    userAuthenticated.admin_password = adminPasswordHashed;
    userAuthenticated.admin = true;

    await usersRepository.save(userAuthenticated);

    return userAuthenticated;
  }
}

export default CreatePasswordAdminService;
