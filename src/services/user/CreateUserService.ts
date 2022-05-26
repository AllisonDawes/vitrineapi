import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  admin_email: string;
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    admin_email,
    name,
    email,
    password,
  }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const findUser = await userRepository.find();

    if (!name || !email || !password) {
      throw new AppError("Insira os dados corretamente no formulário");
    }

    if (findUser.length > 0) {
      const findAdminUser = await userRepository.findOne({
        where: { email: admin_email, admin: true },
      });

      if (!findAdminUser) {
        throw new AppError("Usuário não tem acesso de administrador!", 400);
      }

      findUser.filter((item) => {
        if (item.email === email) {
          throw new AppError("Este e-mail já está em uso!", 400);
        }

        if (item.name === name) {
          throw new AppError("Nome de usuário já está em uso!", 400);
        }
      });

      const passwordHashed = await hash(password, 8);

      const user = userRepository.create({
        email,
        name,
        password: passwordHashed,
      });

      await userRepository.save(user);

      return user;
    }

    const passwordHashed = await hash(password, 8);

    const user = userRepository.create({
      email,
      name,
      password: passwordHashed,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
