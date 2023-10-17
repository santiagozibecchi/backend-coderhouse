import { Router } from "express";
import {
  saveToFileSystem,
  getAllFromFileSystem,
  validateTypes,
} from "../utils/index.js";

import path from "path";
import { fileURLToPath } from "url";
import { ProductManger } from "../controllers/productManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const productPath = path.join(__dirname, "../../db/products/products.json");
const allProducts = await getAllFromFileSystem(productPath);

// POST
router.post("/product", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;

  const Product = new ProductManger(productPath);

  try {
    const newProduct = await Product.createNewProduct({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    });

    allProducts.push(newProduct);
    await saveToFileSystem(productPath, allProducts);

    res.status(201).json({ status: "success", payload: newProduct });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }

  return res.status(201).json({ status: "success", payload: newProduct });
});

// GET
router.get("/product", async (req, res) => {
  if (!allProducts) {
    return res.status(500).json({
      status: 500,
      message: `Internal Server Error`,
    });
  }

  return res.status(200).json(allProducts);
});

router.get(`/products`, async (req, res) => {
  const { limit } = req.query;

  if (limit < 0 || allProducts.length < limit) {
    return res.status(400).json({
      status: 400,
      message: `The product number ${limit} doesnt exist!`,
    });
  }

  const productByQuantity = allProducts.slice(0, limit);

  return res.status(200).json(productByQuantity);
});

router.get(`/products/:productId`, (req, res) => {
  const { productId } = req.params;

  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return res.status(400).json({
      status: 400,
      message: `The product with ${productId} doesnt exist!`,
    });
  }

  return res.status(200).json(product);
});

// DELETE
router.delete(`/products/:productId`, async (req, res) => {
  const { productId } = req.params;

  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return res.status(400).json({
      status: 400,
      message: `The product with ${productId} doesnt exist!`,
    });
  }

  const products = allProducts.filter((p) => p.id !== productId);

  await saveToFileSystem(productPath, products);

  return res.status(200).json(products);
});

// UPDATE
router.put(`/products/:productId`, async (req, res) => {
  const { productId } = req.params;

  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return res.status(400).json({
      status: 400,
      message: `The product with ${productId} doesnt exist!`,
    });
  }

  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  // Validaciones
  const updatedProduct = {
    ...product,
    title: title ? title : product.title,
    description: description ? description : product.description,
    code: code ? code : product.code,
    price: price ? price : product.price,
    status: status ? status : product.status,
    stock: stock ? stock : product.stock,
    category: category ? category : product.category,
    thumbnails: thumbnails ? thumbnails : product.thumbnails,
  };

  if (!validateTypes(updatedProduct, "product")) {
    return res.status(400).json({
      status: "error",
      message: "Verifique si ingreso los tipos de datos segun lo solicitado",
    });
  }

  const updatedAllProducts = allProducts.filter((p) => p.id !== productId);

  updatedAllProducts.push(updatedProduct);

  try {
    await saveToFileSystem(productPath, updatedAllProducts);
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json(updatedProduct);
});

export default router;
