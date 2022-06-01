import { getRepository } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";
import Address from "../../models/Address";

interface IRequest {
  user_id: string;
  road: string;
  number: string;
  district: string;
  phone: string;
  city: string;
  uf: string;
}

class CreateAddressService {
  public async execute({
    user_id,
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
      throw new AppError("Usuário não encontrado!", 400);
    }

    if (
      road.length === 0 ||
      number.length === 0 ||
      district.length === 0 ||
      phone.length === 0 ||
      city.length === 0 ||
      uf.length === 0
    ) {
      throw new AppError("Preencha os campos obrigatórios", 400);
    }

    const allAddressUser = await addressRepository.find({
      where: { user: { id: user_id } },
    });

    if (allAddressUser.length >= 10) {
      throw new AppError(
        "Você só pode registrar 10 endereços diferentes!",
        400
      );
    }

    const addressExists = await addressRepository.findOne({
      where: { user: { id: user_id }, road, number, district, city, uf },
    });

    if (addressExists) {
      throw new AppError("Endereço já está cadastrado no seu perfil!", 400);
    }

    const address = addressRepository.create({
      road,
      number,
      district,
      phone,
      city,
      uf,
      user: { id: user_id },
    });

    await addressRepository.save(address);

    return address;
  }
}

export default CreateAddressService;
