const { v4: uuidv4 } = require('uuid');

class ProductManager {

    #products = [];

    constructor(){};

    getProducts(){
        return [...this.#products];
    };

    addProduct(product){

        const isProductAlredyExist = this.#checkIfProductExist(product.id);
        const hasRequiereFields = this.#checkRequireFields(product);

        if (isProductAlredyExist || !hasRequiereFields) {
            return;
        };

        if (!product.thumbnail) {
            product.thumbnail = "Sin imagen";
        };

        return this.#products.push(product);
    };

    #checkRequireFields(product){
        const requireFields = ["title", "price", "code", "stock", "id"];
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
        console.log("Ya existe el producto con el ID: ", id);
        return this.#products.find( prod => prod.id === id);
    };

    getProductById(id){

        const product = this.#products.find(product => product.id === id); 

        if (!product){
            return {status: false, message: `No se encontró el producto con el id ${id}`}
        };

        return product;
    };
};


const productManager = new ProductManager();
console.log("1. ", productManager.getProducts());

const product1 = {
    id: uuidv4(),
    title: "Mermelada",
    price: "652",
    thumbnail: "Sin imagen",
    code: "MER123",
    stock: 15,
};
const product2 = {
    id: uuidv4(),
    title: "Fideo Marolio",
    price: "652",
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_638506-MLA48521707549_122021-O.webp",
    code: "ATR999",
    stock: 7,
};

const product4 = {
    id: uuidv4(),
    title: "YERBA",
    price: "1800",
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_638506-MLA48521707549_122021-O.webp",
    code: "YER999",
    stock: 7,
};
const product3 = {
    id: uuidv4(),
    // title: "Dulce de Leche",
    // price: "652",
    code: "DUL258",
    stock: 3,
};


productManager.addProduct(product1);
console.log("2. ", productManager.getProducts());

// No agrega un producto que ya se encuentre con el mismo ID:
productManager.addProduct(product1);
console.log("3. ", productManager.getProducts());

productManager.addProduct(product2);
console.log("4. ", productManager.getProducts());

// Agregar un producto sin un campo requerido
productManager.addProduct(product3);
console.log("5. ", productManager.getProducts());

console.log("Obtener producto por ID: ", productManager.getProductById(product1.id));

const productWithInvalidId = {
    id: 3333,
    title: "Dulce de Leche",
    price: "652",
    code: "ASD234",
    stock: 3,
};

console.log("Obtener producto por ID: ", productManager.getProductById(productWithInvalidId.id));

// Intentar modificar el arreglo de productos desde afuera, (Ahora no se puede porque estoy devolviendo una nueva referencia);
// productManager.getProducts().length = 0;
console.log(productManager.getProducts());

productManager.addProduct(product4).length = 0;
console.log("Agrego un nuevo producto", productManager.addProduct(product4));
console.log(productManager.getProducts());




