import { getRepository } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";
import Address from "../../models/Address";

interface IRequest {
  user_id: string;
  address_id: string;
}

class ActiveAddressService {
  public async execute({ user_id, address_id }: IRequest): Promise<Address> {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado, ou não tem permissão!", 400);
    }

    const findAddressExists = await addressRepository.findOne({
      where: { user_id, active: true },
    });

    if (findAddressExists) {
      findAddressExists.active = false;

      await addressRepository.save(findAddressExists);
    }

    const address = await addressRepository.findOne({
      where: { id: address_id, user_id },
    });

    if (!address) {
      throw new AppError("Endereço não encontrado!", 400);
    }

    address.active = true;

    await addressRepository.save(address);

    return address;
  }
}

export default ActiveAddressService;
