import { getRepository } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";
import Address from "../../models/Address";

interface IRequest {
  user_id: string;
}

class FindAllAddressService {
  public async execute({ user_id }: IRequest): Promise<Address[]> {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado!", 400);
    }

    const allAddressUser = await addressRepository.find({
      where: { user: { id: user_id } },
      relations: ["user"],
    });

    return allAddressUser;
  }
}

export default FindAllAddressService;
