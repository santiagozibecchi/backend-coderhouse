import { Server } from "socket.io";
import {
  getAllFromFileSystem,
  saveToFileSystem,
} from "./utils/file-system-management.js";

import path from "path";
import { fileURLToPath } from "url";
import { ProductManger } from "./controllers/productManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productPath = path.join(__dirname, "../db/products/products.json");

// Del lado del backend por convencion se lo llama io
let io;

export const init = (httpServer) => {
  io = new Server(httpServer);

  // listener on()

  // cuando se connecto un nuevo cliente
  io.on("connection", async (socketClient) => {
    console.log(`Client ID: ${socketClient.id} conectado`);

    const allProducts = await getAllFromFileSystem(productPath);

    // emito todos los productos!
    socketClient.emit("all-products", allProducts);

    // tengo que escuchar el evento, recibo el nuevo prod creado,
    // lo guardo y dentro de este emito los productos que acabo de guardar
    socketClient.on("addProduct", async (product) => {
      const allProducts = await getAllFromFileSystem(productPath);

      // funcion para crear el producto!
      const Product = new ProductManger(productPath);
      const newProduct = await Product.createNewProduct(product);
      allProducts.push(newProduct);
      await saveToFileSystem(productPath, allProducts);

      // luego obtengo nuevamente todos los productos y lo emito
      const products = await getAllFromFileSystem(productPath);
      io.emit("all-products", products);
    });

    socketClient.on("delete-product", async (productId) => {
      const allProducts = await getAllFromFileSystem(productPath);

      const products = allProducts.filter((p) => p.id !== productId);

      await saveToFileSystem(productPath, products);
    });
  });

  console.log("Server socket running!");
};

export const emitFromApi = (event, data) => io.emit(event, data);
