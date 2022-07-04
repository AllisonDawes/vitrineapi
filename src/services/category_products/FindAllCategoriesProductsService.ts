import { getRepository } from "typeorm";

import CategoryProduct from "../../models/CategoryProduct";

class FindAllCategoriesProducstService {
  public async execute(): Promise<CategoryProduct[] | undefined> {
    const categoryProductRepository = getRepository(CategoryProduct);

    const categoryProduct = await categoryProductRepository.find();

    return categoryProduct;
  }
}

export default FindAllCategoriesProducstService;
