import { getRepository } from "typeorm";

import AppError from "../../errors/AppError";

import User from "../../models/User";
import CategoryProduct from "../../models/CategoryProduct";

interface IRequest {
  admin_id: string;
  category_id: string;
}

class ActiveCategoryProductService {
  public async execute({
    admin_id,
    category_id,
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

    categoryProduct.active === true
      ? (categoryProduct.active = false)
      : (categoryProduct.active = true);

    await categoryProductRepository.save(categoryProduct);

    return categoryProduct;
  }
}

export default ActiveCategoryProductService;
