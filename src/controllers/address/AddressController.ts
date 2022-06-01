import { Request, Response } from "express";

import CreateAddressService from "../../services/address/CreateAddressService";

class AddressControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { road, number, district, phone, city, uf } = request.body;

    const createAddress = new CreateAddressService();

    const address = await createAddress.execute({
      user_id,
      road,
      number,
      district,
      phone,
      city,
      uf,
    });

    return response.status(201).json(address);
  }
}

export default AddressControllers;
