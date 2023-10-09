import express  from 'express';
import productsRoutes from "./routes/products.route.js";
import cartRputes from "./routes/carts.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api", productsRoutes, cartRputes);


export default app;