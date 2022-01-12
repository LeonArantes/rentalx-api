import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../repositories/ICategoriesRepository";
// import { parse } from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
  constructor(private categoriesRepositories: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<ICreateCategoryDTO[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: ICreateCategoryDTO[] = [];

      // const parseFile = parse();
      // stream.pipe(parseFile);

      // parseFile
      //   .on("data", async (line) => {
      //     const [name, description] = line;
      //     categories.push({ name, description });
      //   })
      //   .on("end", () => {
      //     fs.promises.unlink(file.path);
      //     resolve(categories);
      //   })
      //   .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map((category) => {
      const { name, description } = category;
      const existCategory = this.categoriesRepositories.findByName(name);

      if (!existCategory) {
        console.log("Criado");
        this.categoriesRepositories.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
