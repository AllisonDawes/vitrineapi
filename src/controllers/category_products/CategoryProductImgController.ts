import { Request, Response } from "express";
import { classToPlain } from "class-transformer";

import UpdateImgCategoryProductService from "../../services/category_products/UpdateImgCategoryProductService";

class CategoryProductsImgController {
  public async patch(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { category_id } = request.params;

    const updateImgCategoryProductService =
      new UpdateImgCategoryProductService();

    const categoryProduct = await updateImgCategoryProductService.execute({
      admin_id,
      category_id,
      categoryProductImgFileName: request.file?.filename,
    });

    return response.status(200).json(classToPlain(categoryProduct));
  }
}

export default CategoryProductsImgController;
