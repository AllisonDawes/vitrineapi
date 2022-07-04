import { getRepository } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";
import CategoryProduct from "../../models/CategoryProduct";

interface IRequest {
  admin_id: string;
  name: string;
}

class CreateCategoryProductService {
  public async execute({ admin_id, name }: IRequest): Promise<CategoryProduct> {
    const userRepository = getRepository(User);
    const categoryProductRepository = getRepository(CategoryProduct);

    const admin = await userRepository.findOne({
      where: { id: admin_id, admin: true },
    });

    if (!admin) {
      throw new AppError("Usuário administrador não encontrado!", 400);
    }

    const findCategoryProduct = await categoryProductRepository.findOne({
      where: { name },
    });

    if (findCategoryProduct) {
      throw new AppError("Categoria já está cadastrada!", 400);
    }

    const categoryProduct = categoryProductRepository.create({
      name,
    });

    await categoryProductRepository.save(categoryProduct);

    return categoryProduct;
  }
}

export default CreateCategoryProductService;
