import { getRepository } from "typeorm";
import { compare } from "bcryptjs";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  admin_id: string;
  user_id: string;
  passAdmin: string;
}

class DeactivateAdminSecundaryService {
  public async execute({
    admin_id,
    user_id,
    passAdmin,
  }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const findAdmin = await userRepository.findOne({
      where: { id: admin_id, admin: true },
    });

    if (!findAdmin) {
      throw new AppError("Usuário administrador não encontrado!", 400);
    }

    const passAdminCompared = await compare(
      passAdmin,
      findAdmin.admin_password
    );

    if (!passAdminCompared) {
      throw new AppError(
        "Senha não encontrada ou usuário sem permissão! ",
        400
      );
    }

    const findUser = await userRepository.findOne({
      where: { id: user_id, admin: false, admin_secundary: true },
    });

    if (!findUser) {
      throw new AppError("Usuário não encontrado!", 400);
    }

    findUser.admin_password = "";
    findUser.admin_secundary = false;

    await userRepository.save(findUser);

    return findUser;
  }
}

export default DeactivateAdminSecundaryService;
