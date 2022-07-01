import { getRepository } from "typeorm";
import { hash, compare } from "bcryptjs";

import AppError from "../../errors/AppError";

import User from "../../models/User";

interface IRequest {
  profile_id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

class UpdateProfileService {
  public async execute({
    profile_id,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    const userRespository = getRepository(User);

    const profile = await userRespository.findOne(profile_id);

    if (!profile) {
      throw new AppError("Usuário não encontrado!", 400);
    }

    const findValidationUser = await userRespository.find();

    if (!name || !email) {
      throw new AppError("Insira os dados corretamente no formulário");
    }

    findValidationUser.filter((item) => {
      if (item.id !== profile_id && item.name === name) {
        throw new AppError("Nome de usuário já está em uso!", 400);
      }

      if (item.id !== profile_id && item.email === email) {
        throw new AppError("Este e-mail já está em uso!", 400);
      }
    });

    if (password && oldPassword) {
      const comparePassword = await compare(oldPassword, profile.password);

      if (!comparePassword) {
        throw new AppError(
          "Senha incorreta, por favor informe uma senha válida",
          400
        );
      }

      const passwordHashed = await hash(password, 8);

      profile.name = name;
      profile.email = email;
      profile.password = passwordHashed;

      await userRespository.save(profile);

      return profile;
    }

    profile.name = name;
    profile.email = email;

    await userRespository.save(profile);

    return profile;
  }
}

export default UpdateProfileService;
