import { Server } from "socket.io";
import { getAllFromFileSystem } from "./utils/file-system-management.js";

import path from "path";
import { fileURLToPath } from "url";

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

    const products = await getAllFromFileSystem(productPath);

    // emito todos los productos!
    socketClient.emit("all-products", products);

    // tengo que escuchar el evento, recibo el nuevo prod creado,
    // lo guardo y dentro de este emito los productos que acabo de guardar
    socketClient.on("addProduct", async (newProduct) => {
      // funcion para crear el producto!
      products.push(newProduct);

      // luego obtengo nuevamente todos los productos y lo emito

      io.emit("all-products", products);
    });
  });

  console.log("Server socket running!");
};

export const emitFromApi = (event, data) => io.emit(event, data);
