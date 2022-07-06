import { getRepository } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";
import CategoryProduct from "../../models/CategoryProduct";

interface IRequest {
  admin_id: string;
  category_id: string;
  name: string;
}

class UpdateCategoryProductService {
  public async execute({
    admin_id,
    category_id,
    name,
  }: IRequest): Promise<CategoryProduct> {
    const userRepository = getRepository(User);
    const categoryProductRepository = getRepository(CategoryProduct);

    const admin = await userRepository.findOne({
      where: { id: admin_id, admin: true },
    });

    if (!admin) {
      throw new AppError("Usuário administrador não encontrado!", 400);
    }

    const categoryProduct = await categoryProductRepository.findOne({
      where: { id: category_id },
    });

    if (!categoryProduct) {
      throw new AppError("Categoria não encontrada!", 400);
    }

    categoryProduct.name = name;

    await categoryProductRepository.save(categoryProduct);

    return categoryProduct;
  }
}

export default UpdateCategoryProductService;
