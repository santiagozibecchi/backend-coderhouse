import { Router, json } from "express";
import { getUUID } from "../plugins/index.js";
import { saveToFileSystem, getAllFromFileSystem, validateRequireFields, validateTypes } from "../utils/index.js";

import path from 'path';
import { fileURLToPath } from 'url';
import { setTextsCorrectly } from "../utils/validations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();


const cartPath = path.join(__dirname, "../../db/carts/carts.json");
const allCarts = await getAllFromFileSystem(cartPath);

// POST
router.post('/:cid/product/:pid', async (req, res) => {

    const { cid, pid } = req.params;

    const cartsInDB = allCarts;
    
    const isCartInDB = cartsInDB.find(c => c.id === Number(cid));

    if (!isCartInDB){
        const newCart = {
            id: Number(cid),
            products: [
                {
                    productId: pid,
                    quantity: 1,
                }
            ]
        };
        cartsInDB.push(newCart);
    };

    cartsInDB.forEach( cart => {
        if (cart.id === Number(cid)){
            
            const isProductInCart =  cart.products.find( p => p.productId === pid);

            cart.products.forEach( prod => {

                if (prod.productId === pid && isCartInDB){
                    prod.quantity++;
                };

                if (!isProductInCart) {
                    const newProduct = {
                        productId: pid,
                        quantity: 1,
                    };

                    cart.products.push(newProduct);
                };


            });
        };
    });
    
    try {
        await saveToFileSystem(cartPath, cartsInDB);
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", message: "Internal Server Error"})
    };

    const cart = cartsInDB.find( cart => cart.id === Number(cid));

    return res.status(201).json({status: "success", payload: cart});

});



// TODO GET




export default router;