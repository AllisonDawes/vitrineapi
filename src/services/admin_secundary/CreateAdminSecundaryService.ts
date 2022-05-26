import { getRepository } from "typeorm";
import { hash, compare } from "bcryptjs";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  admin_id: string;
  user_id: string;
  passAdmin: string;
  passAdminSecundary: string;
}

class CreateAdminSecundaryService {
  public async execute({
    admin_id,
    user_id,
    passAdmin,
    passAdminSecundary,
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
      where: { id: user_id, admin: false, admin_secundary: false },
    });

    if (!findUser) {
      throw new AppError("Usuário não encontrado!", 400);
    }

    const passAdminSecundaryHashed = await hash(passAdminSecundary, 8);

    findUser.admin_password = passAdminSecundaryHashed;
    findUser.admin_secundary = true;

    await userRepository.save(findUser);

    return findUser;
  }
}

export default CreateAdminSecundaryService;
