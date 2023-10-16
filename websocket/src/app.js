// express ser
import express from "express";

// Routes
import productsRoutes from "./routes/products.route.js";
import cartRputes from "./routes/carts.route.js";
import realtimeproducts from "./routes/realtime.products.js";
import home from "./routes/home.js";

// handlebars
import handlebars from "express-handlebars";

// path configuration
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View configuration
app.use(express.static(path.join(__dirname, "../public")));
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// Routes
app.use("/api", productsRoutes, cartRputes);
app.use("/home", home);
app.use("/realtimeproducts", realtimeproducts);

app.use((error, req, res, next) => {
  const message = `Ocurrio un error desconocido: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: "error", message });
});

export default app;
