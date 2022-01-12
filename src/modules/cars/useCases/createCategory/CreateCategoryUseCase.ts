import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../repositories/ICategoriesRepository";

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: ICreateCategoryDTO): void {
    const categoriesAlreadyExists = this.categoriesRepository.findByName(name);
    if (categoriesAlreadyExists) throw new Error("Category already exists!");

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
