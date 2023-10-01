const fs = require("fs");  
const express = require('express');

const port = 8080;
const app = express();

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));


class ProductManager {


    constructor(path){
        this.path = path;
    };

     getProducts(){

        const products =  getAllProductsInFileSystem(this.path);

        if (products.length === 0){
            return "No hay productos guardados."
        }

        return products;
    };

     addProduct(product){

        const isProductAlredyExist =  this.#checkIfProductExist(product.id);
        const hasRequiereFields = this.#checkRequireFields(product);

        if (isProductAlredyExist || !hasRequiereFields) {
            return;
        };

        if (!product.thumbnail) {
            product.thumbnail = "Sin imagen";
        };

        let allProducts = getAllProductsInFileSystem(this.path);

        product.id = allProducts.length**2;

        allProducts.push(product);
        saveProductToFileSystem(this.path, allProducts);
    };

     getProductById(id){
        const products = getAllProductsInFileSystem(this.path);
        const product = products.find(product => product.id === id); 

        if (!product){
            return {status: false, message: `No se encontró el producto con el id ${id}`}
        };

        return product;
    };

     updateProduct(product){
        const existingProduct =  this.getProductById(product.id);

        if(!existingProduct) {
            console.log(`No existe el producto con el ID: ${product.id}`);
            return;
        };

        const updatedProducts =  this.deleteProduct(product.id);
        updatedProducts.push(product);

        saveProductToFileSystem(this.path, updatedProducts);
    };

     deleteProduct(id){
        const products =  getAllProductsInFileSystem(this.path);
        const updatedAllProducts = products.filter( p => p.id !== id);

        try {
            saveProductToFileSystem(this.path, updatedAllProducts);
        } catch (error) {
        throw new Error(`Error al guardar los productos en el archivo.`);
        }

        return updatedAllProducts;
    };



    #checkRequireFields(product){
        const requireFields = ["title", "price", "code", "stock"];
        const productField = Object.keys(product);
        let fulfillsCondition = true;

        for (const field of requireFields) {
            if (!productField.includes(field)) {
                console.log(`Falta el campo requerido: "${field}"`);
                fulfillsCondition = false;
            };
        };

        return fulfillsCondition;
    };

     #checkIfProductExist(id){
        const allProducts =  getAllProductsInFileSystem(this.path);
        const isProductInFileSystem = allProducts.find( prod => prod.id === id);

        if (isProductInFileSystem) {
            console.log("Ya existe el producto con el ID: ", id);
        };

        return isProductInFileSystem;
    };


};


// Utilidades
const saveProductToFileSystem =  (path, data) => {
    const content = JSON.stringify(data, null, "\t");
    console.log(content);
    try {
         fs.writeFileSync(path, content, "utf-8");
    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato valido`);
    };
};

const getAllProductsInFileSystem = (path) => {

    try {
        // Para verificar si un archivo o directorio existe o si tienes permiso para acceder a él.
         fs.accessSync(path);
    } catch (error) {
        return [];
    };
    
    
    try {
        const content =  fs.readFileSync(path);
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato valido`);
    };
};

const product1 = {
    title: "AAASDASDASDASd",
    price: "555",
    thumbnail: "Sin imagen",
    code: "AAAAAAAAAAAAAAAAAAAAAAAAA",
    stock: 22,
};


const executeCode1 =  () => {
    const productManager = new ProductManager("./src/products/products.json");
    
    const allProducts = productManager.getProducts();

    app.get('/product', async (req, res) => {
        // http://localhost:8080/product
        if (!allProducts) {
            res.status(500).json({
                status: 500,
                message: `Internal Server Error`,
            });
            return;
        }

        return res.status(200).json(allProducts);
    });

    app.get(`/products`, async (req, res) => {
        // http://localhost:8080/products?limit=5
        const { limit } = req.query;

        if (limit < 0 || allProducts.length < limit) {
            res.status(400).json({
                status: 400,
                message: `The product number ${limit} doesnt exist!`,
            });
            return;
        }
            
        const productByQuantity = allProducts.slice(0, limit);

        return res.status(200).json(productByQuantity);
    });

    app.get(`/products/:productId`, (req, res) => {
        // http://localhost:8080/products/2
        const { productId } = req.params;

        const product = allProducts.find((p) => p.id === parseInt(productId));

        if (!product) {
            res.status(400).json({
                status: 400,
                message: `The product with ${productId} doesnt exist!`,
            });
            return;
        }

        return res.status(200).json(product);
    });

};

executeCode1();


