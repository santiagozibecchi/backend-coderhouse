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

    // Add more options just for practices
    getTotalProduct(){
        return this.#products.length
    }

    getProductsShort(){

        const products = structuredClone(this.#products);

        const orderProducts =  products.sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

          return orderProducts;
    };

    modifyProductById(id, renameProduct){

        const { title, price, thumbnail, stock } = renameProduct;

        const product = this.#products.find( prod => prod.id === id);
        // I modify the object reference! 
        
        if (title){
            product.title = title;
        };
        if (price) {
            product.price = price;
        };
        if (thumbnail) {
            product.thumbnail = thumbnail;
        };
        if (stock) {
            product.stock = stock;
        };

        return product;
    };

};


const productManager = new ProductManager();

const product = buildProduct({getUUID});
const product1 = product({ title: "Mermelada", code:"MER123", price: 750, stock: 15 });
const product2 = product({ title: "Fideo Marolio", price: "652", thumbnail: "https://http2.mlstatic.com/D_NQ_NP_638506-MLA48521707549_122021-O.webp", code: "ATR999", stock: 2 });
const product3 = product({ title: "Dulce de Leche", price: "652", code: "ATR999", stock: 10 });
const product4 = product({ title: "Arroz", price: "355", code: "ATR999", stock: 70 });
const product5 = product({ title: "Proteina", price: "4599", code: "ATR999", stock: 8 });
const product6 = product({ title: "Sopa", price: "700", code: "ATR999", stock: 3 });


productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
productManager.addProduct(product5);
productManager.addProduct(product6);

console.log("Productos ", productManager.getProducts());
console.log(productManager.getTotalProduct());
console.log("Productos Ordenados!", productManager.getProductsShort());
console.log("Productos DESORDENADOS!", productManager.getProducts());

// Modifico la mermelada:
console.log(productManager.modifyProductById(product1.id, {title: "Mermelada de Durazno"}));

// Obtengo todos los productos nuevamente!
console.log("Obtengo todos los productos nuevamente!", productManager.getProducts());







