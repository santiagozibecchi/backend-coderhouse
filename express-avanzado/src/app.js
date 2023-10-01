const fs = require("fs");  




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
    title: "Bombilla para el mate",
    price: "10800",
    thumbnail: "Sin imagen",
    code: "BOM123",
    stock: 22,
};


const executeCode1 =  () => {
    const productManager = new ProductManager("./src/products/products.json");
    productManager.addProduct(product1);





};

const executeCode2 =  () => {
    const productManager = new ProductManager("./src/products/products.json");
    productManager.deleteProduct(1);
};

const executeCode3 =  () => {
    const productManager = new ProductManager("./src/products/products.json");  
    productManager.updateProduct({
        "id": 36,
		"title": "Yerba mate Bartolo",
		"price": "250000",
		"code": "MAT123",
		"stock": 14
	});
};

// executeCode1();
// executeCode2();
// executeCode3();
