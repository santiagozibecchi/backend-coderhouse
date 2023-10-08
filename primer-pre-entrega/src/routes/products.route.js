import { Router } from "express";
import { getUUID } from "../plugins/index.js";
import { saveToFileSystem, getAllFromFileSystem } from "../utils/index.js";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();


const productPath = path.join(__dirname, "../../db/products/products.json");
const allProducts = await getAllFromFileSystem(productPath);


// POST
router.post('/product', async (req, res) => {

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

    const isValidProduct = () => {
        const fields = [title, description, code, price, status, stock, category];
        for (const field of fields) {
            if (!field) {
                return false;
            }; 
        };
        return true;
    };

    if (!isValidProduct()) {
        return res.status(400).json({status: "error", message: "Falta completar uno o más campos obligatorios!"})
    };


    const newProduct = {
        id: getUUID(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    };

    allProducts.push(newProduct);

    try {
        await saveToFileSystem(productPath, allProducts);
    } catch (error) {
        console.log(error);
    };


    return res.status(201).json({status: "success", payload: newProduct});
});



// GET
router.get('/product', async (req, res) => {

    if (!allProducts) {
        return res.status(500).json({
            status: 500,
            message: `Internal Server Error`,
        });
    };

    return res.status(200).json(allProducts);
});

router.get(`/products`, async (req, res) => {
    const { limit } = req.query;

    if (limit < 0 || allProducts.length < limit) {
        return res.status(400).json({
            status: 400,
            message: `The product number ${limit} doesnt exist!`,
        });
    };
        
    const productByQuantity = allProducts.slice(0, limit);

    return res.status(200).json(productByQuantity);
});

router.get(`/products/:productId`, (req, res) => {
    const { productId } = req.params;

    const product = allProducts.find((p) => p.id === parseInt(productId));

    if (!product) {
        return res.status(400).json({
            status: 400,
            message: `The product with ${productId} doesnt exist!`,
        });
        ;
    };

    return res.status(200).json(product);
});

// TODO PUT


// TODO DELETE



export default router;