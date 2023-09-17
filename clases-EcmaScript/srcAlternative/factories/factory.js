// APLICANDO CONCEPTO DE CLOSURE JS

// Me permite guardar las dependecias por argumentos
// Evitamos tener un codigo altamente acoplado de dependencias de terceros

// Creo una fn. que me retorna una fn. que crea un objeto producto
// Podemos reutilizar esta misma funcion para crear distintos tipos de objeto PRODUCTOS en diferentes lugares de nuestra aplicacion

// fn. inicial => getUUID
const buildProduct = ({ getUUID }) => {
    return ({ title, price, thumbnail, code, stock }) => {
        // create the product
       return {
         id: getUUID(),
         title,
         price,
         thumbnail,
         code,
         stock,
       };
    };
};


module.exports = buildProduct;