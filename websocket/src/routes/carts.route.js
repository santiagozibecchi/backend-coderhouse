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


const productPath = path.join(__dirname, "../../db/products/products.json");

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

const checkProductInDB = async (productId) => {
    const productInDb = await getAllFromFileSystem(productPath);
    const product = productInDb.find(prod => prod.id === productId);

    if (!product) {
        return {
            status: false,
            productId,
        };
    }

    return {
        status: true,
        productId,
    };
};

router.post('/carts/:cid/product/:pid', async (req, res) => {
    
    const cartsInDB = await getAllFromFileSystem(cartPath);

    const { cid, pid } = req.params;

    const { status } = await checkProductInDB(pid);

    if (!status){
        return res.status(400).json({status: "error", message: `El producto - ${pid} - que esta intentando añandir no forma parte del inventario!`})
    };
    
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
            return res.status(201).json({ status: "success", payload: cartInDB})
    
        } catch (error) {
            console.log(error);
            return res.status(400).json({status: "error", message: "Error al guardar"})
        };


    } else {
        return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    };

});


router.get('/carts', async (req, res) => {

    const allCarts = await getAllFromFileSystem(cartPath);
    
    try {
        
        return res.status(200).json({status: "success",payload: allCarts})

    } catch (error) {
        console.log(error);
        return res.status(400).json({status: "error", message: "Error al guardar"})
    };

});

router.get('/carts/:cid/product/:pid', async (req, res) => {

    const { cid, pid } = req.params;

    const cartsInDB = await getAllFromFileSystem(cartPath);
    const productInDB = await getAllFromFileSystem(productPath);

    let productInfo = {};
    cartsInDB.find( cart => cart.id === cid).products.forEach( (prod) => {

        if (prod.productId === pid) {
            productInfo = productInDB.find(p => p.id === pid);
        };
    });

    if (Object.keys(productInfo).length === 0) {
        return res.status(400).json({status: "error", message: "El producto que esta buscando no se encuentra en el carrito seleccionado"})
    }
    
    return res.status(200).json({status: "success", payload: productInfo})
});




export default router;