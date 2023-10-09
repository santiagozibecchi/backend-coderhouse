import { Router, json } from "express";
import { getUUID } from "../plugins/index.js";
import { saveToFileSystem, getAllFromFileSystem } from "../utils/index.js";

import path from 'path';
import { fileURLToPath } from 'url';
import { setTextsCorrectly } from "../utils/validations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();


const cartPath = path.join(__dirname, "../../db/carts/carts.json");

// POST
router.post('/carts', async (req, res) => {

    const allCarts = await getAllFromFileSystem(cartPath);

    allCarts.push({
        id: getUUID(),
        products: []
    });
    
    try {
        
        await saveToFileSystem(cartPath, allCarts)

    } catch (error) {
        console.log(error);
    }

});

router.post('/carts/:cid/product/:pid', async (req, res) => {
    
    const cartsInDB = await getAllFromFileSystem(cartPath);

    const { cid, pid } = req.params;
    
    const cartInDB = cartsInDB.find(c => c.id === cid);

    const newProduct = {
        productId: pid,
        quantity: 1
    };
    
    if (cartInDB){
        
        const product = cartInDB.products.find( product => product.productId === pid);

        product ? product.quantity++ : cartInDB.products.push(newProduct)

        try {
        
            await saveToFileSystem(cartPath, cartsInDB)
    
        } catch (error) {
            console.log(error);
        };


    } else {
        return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    };

});


// TODO GET






export default router;