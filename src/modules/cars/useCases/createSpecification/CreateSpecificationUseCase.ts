import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../../repositories/ISpecificationsRepository";

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: ICreateSpecificationDTO) {
    const specificationsAlreadyExists =
      this.specificationsRepository.findByName(name);
    if (specificationsAlreadyExists)
      throw new Error("Specification already exists!");

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
