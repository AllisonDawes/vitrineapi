import { Request, Response } from "express";

import CreateAddressService from "../../services/address/CreateAddressService";
import FindAllAddressService from "../../services/address/FindAllAddressService";
import UpdateAddressService from "../../services/address/UpdateAddressService";
import ActiveAddressService from "../../services/address/ActiveAddressService";
import DeleteAddressService from "../../services/address/DeleteAddressService";

class AddressControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const findAllAddress = new FindAllAddressService();

    const address = await findAllAddress.execute({
      user_id,
    });

    return response.status(200).json(address);
  }

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

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { address_id } = request.params;
    const { road, number, district, phone, city, uf } = request.body;

    const updateAddress = new UpdateAddressService();

    const address = await updateAddress.execute({
      user_id,
      address_id,
      road,
      number,
      district,
      phone,
      city,
      uf,
    });

    return response.status(200).json(address);
  }

  public async patch(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { address_id } = request.params;

    const activeAddress = new ActiveAddressService();

    const address = await activeAddress.execute({
      user_id,
      address_id,
    });

    return response.status(200).json(address);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { address_id } = request.params;

    const deleteAddress = new DeleteAddressService();

    await deleteAddress.execute({
      user_id,
      address_id,
    });

    return response.status(200).json();
  }
}

export default AddressControllers;
