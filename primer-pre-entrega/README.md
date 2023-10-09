<h1>Express Avanzado</h1>

<h3>Primer pre entraga del proyecto final</h3>

* Para correr el proyecto:

    * Instalar dependencias (nodemon, uuid): `npm install`
    * Para correr el proyecto Desafío N° 1: `npm start`

<hr/>

## Consigna

Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. Dichos endpoints estarán implementados con el router de express


## Consideraciones a la hora de trabajar con en carrito de compras
Propiedades de un producto: 
{
    "id": string,
    "title": string,
    "description": string,
    "code": string,
    "price": number,
    "status": boolean,
    "stock": number,
    "category": string,
    "thumbnails": array
}

## Consideraciones a la hora de trabajar con en carrito de compras

La ruta POST =>  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)

quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 

Propiedades de un carrito:
{
    "id": string,
    "products": [
        {
            "productId": string,
            "quantity": number
        },
        {
            "productId": string,
            "quantity": number
        }
    ],
}



