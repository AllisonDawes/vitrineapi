import { getRepository } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";
import Address from "../../models/Address";

interface IRequest {
  user_id: string;
  address_id: string;
  road: string;
  number: string;
  district: string;
  phone: string;
  city: string;
  uf: string;
}

class UpdateAddressService {
  public async execute({
    user_id,
    address_id,
    road,
    number,
    district,
    phone,
    city,
    uf,
  }: IRequest): Promise<Address> {
    const userRepository = getRepository(User);
    const addressRepository = getRepository(Address);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado, ou não tem permissão!", 400);
    }

    const address = await addressRepository.findOne({
      where: { id: address_id, user_id },
    });

    if (!address) {
      throw new AppError("Endereço não encontrado!", 400);
    }

    address.road = road;
    address.number = number;
    address.district = district;
    address.phone = phone;
    address.city = city;
    address.uf = uf;

    await addressRepository.save(address);

    return address;
  }
}

export default UpdateAddressService;
