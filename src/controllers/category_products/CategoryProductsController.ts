import { Request, Response } from "express";

import CreateCategoryProductService from "../../services/category_products/CreateCategoryProductService";
import FindAllCategoriesProducstService from "../../services/category_products/FindAllCategoriesProductsService";
import UpdateCategoryProductService from "../../services/category_products/UpdateCategoryProductService";
import DeleteCategoryProductService from "../../services/category_products/DeleteCategoryProduct";

class CategoryProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
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

  public async update(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { category_id } = request.params;
    const { name } = request.body;

    const updateCategoryProductService = new UpdateCategoryProductService();

    const categoryProduct = await updateCategoryProductService.execute({
      admin_id,
      category_id,
      name,
    });

    return response.status(200).json(categoryProduct);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { category_id } = request.params;

    const deleteCategoryProductService = new DeleteCategoryProductService();

    await deleteCategoryProductService.execute({
      admin_id,
      category_id,
    });

    return response.status(200).json();
  }
}

export default CategoryProductsController;
