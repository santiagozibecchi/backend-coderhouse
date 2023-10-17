import { getUUID } from "../plugins/index.js";
import { validateTypes } from "../utils/index.js";
import {
  setTextsCorrectly,
  validateRequireFields,
} from "../utils/validations.js";

export class ProductManger {
  constructor(path) {
    this.path = path;
  }

  createNewProduct = async (product) => {
    const { title, description, code, price, stock, category, thumbnails } =
      product;

    const requestProduct = {
      ...product,
      thumbnails: thumbnails ? thumbnails : [],
      status: true,
    };

    // validar campos
    if (
      !validateRequireFields({
        title,
        description,
        code,
        price,
        stock,
        category,
      })
    ) {
      throw new Error("Falta completar campos obligatorios!");
    }

    // validar tipos
    if (!validateTypes(requestProduct, "product")) {
      throw new Error(
        "Verifique si ingreso los tipos de datos segun lo solicitado"
      );
    }

    const {
      title: formatTitle,
      description: formatDescription,
      category: formatCategory,
    } = setTextsCorrectly({ title, description, category });

    const newProduct = {
      id: getUUID(),
      title: formatTitle,
      description: formatDescription,
      code,
      price,
      status: true,
      stock,
      category: formatCategory,
      thumbnails: thumbnails ? thumbnails : [],
    };

    return newProduct;
  };
}
