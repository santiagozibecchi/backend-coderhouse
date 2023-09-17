const { getUUID } = require("./plugins");
const buildProduct = require("./factories/factory")

class ProductManager {

    #products = [];

    constructor(){};

    getProducts(){
        
        if (this.#products.length === 0) {
            return [];
        };

        return this.#products;
    };

    addProduct(product){

        const isSameId = this.#checkValidId(product)
        const hasField = this.#checkRequireFields(product);

        if (isSameId || !hasField) {
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

    #checkValidId(product){
        return this.#products.find( prod => prod.id === product.id);
    }

    getProductById(prod){

        const product = this.#products.find(product => product.id === prod.id); 

        if (!product){
            return {status: false, message: `No se encontró el producto con el id ${prod.id}`}
        };

        return product;
    };
};


const productManager = new ProductManager();


const product = buildProduct({getUUID});


console.log("1. ", productManager.getProducts());

const product1 = product({
    title: "Mermelada",
    code:"MER123",
    price: 750,
    stock: 15,
});

const product2 = product({
    title: "Fideo Marolio",
    price: "652",
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_638506-MLA48521707549_122021-O.webp",
    code: "ATR999",
    stock: 7,
});


const product3 = {
    id: getUUID(),
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

console.log("Obtener producto por ID: ", productManager.getProductById(product1));

const productWithInvalidId = {
    id: 3333,
    title: "Dulce de Leche",
    price: "652",
    code: "ASD234",
    stock: 3,
};

console.log("Obtener producto por ID: ", productManager.getProductById(productWithInvalidId).message);




