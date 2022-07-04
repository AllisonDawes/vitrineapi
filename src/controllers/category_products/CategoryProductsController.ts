import { Request, Response } from "express";

import CreateCategoryProductService from "../../services/category_products/CreateCategoryProductService";
import FindAllCategoriesProducstService from "../../services/category_products/FindAllCategoriesProductsService";

class CategoryProductsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const findAllCategoriesProducstService =
      new FindAllCategoriesProducstService();

    const allCategoriesProducts =
      await findAllCategoriesProducstService.execute();

    return response.status(200).json(allCategoriesProducts);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { name } = request.body;

    const createCategoryProductService = new CreateCategoryProductService();

    const categoryProduct = await createCategoryProductService.execute({
      admin_id,
      name,
    });

    return response.status(200).json(categoryProduct);
  }
}

export default CategoryProductsController;
