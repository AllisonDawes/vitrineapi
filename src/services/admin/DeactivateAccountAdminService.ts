import { getRepository } from "typeorm";
import { compare } from "bcryptjs";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  user_id: string;
  password: string;
  admin_password: string;
}

class DeactivateAccountAdminService {
  public async execute({
    user_id,
    password,
    admin_password,
  }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const findUserAdmin = await usersRepository.findOne({
      where: { id: user_id, admin: true },
    });

    if (!findUserAdmin) {
      throw new AppError("Usuário não encontrado, ou sem permissão!", 400);
    }

    const passCompare = await compare(password, findUserAdmin.password);
    const passAdminCompare = await compare(
      admin_password,
      findUserAdmin.admin_password
    );

    if (!passCompare || !passAdminCompare) {
      throw new AppError("Combinação de senhas incorretas!", 400);
    }

    findUserAdmin.admin_password = "";
    findUserAdmin.admin = false;

    await usersRepository.save(findUserAdmin);

    return findUserAdmin;
  }
}

export default DeactivateAccountAdminService;
