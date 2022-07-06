import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import AppError from "../../errors/AppError";

import uploadImgCategoryProductsConfig from "../../config/uploadImgCategoryProducts";

import User from "../../models/User";
import CategoryProduct from "../../models/CategoryProduct";

interface IRequest {
  admin_id: string;
  category_id: string;
  categoryProductImgFileName: string | undefined;
}

class UpdateImgCategoryProductService {
  public async execute({
    admin_id,
    category_id,
    categoryProductImgFileName,
  }: IRequest): Promise<CategoryProduct> {
    const userRespository = getRepository(User);
    const categoryProductRepository = getRepository(CategoryProduct);

    const admin = await userRespository.findOne({
      where: { id: admin_id, admin: true },
    });

    if (!admin) {
      throw new AppError("Usuário não encontrado!", 400);
    }

    const categoryProduct = await categoryProductRepository.findOne({
      where: { id: category_id, active: true },
    });

    if (!categoryProduct) {
      throw new AppError("Categoria de produto não encontrada.");
    }

    if (categoryProduct.category_products_img) {
      const categoryProductImgFilePath = path.join(
        uploadImgCategoryProductsConfig.directory,
        categoryProduct.category_products_img
      );

      const categoryProductImgFileExists = await fs.promises.stat(
        categoryProductImgFilePath
      );

      if (categoryProductImgFileExists) {
        await fs.promises.unlink(categoryProductImgFilePath);
      }
    }

    categoryProduct.category_products_img = categoryProductImgFileName!;

    await userRespository.save(categoryProduct);

    return categoryProduct;
  }
}

export default UpdateImgCategoryProductService;
