(function () {
  const socket = io();

  // Obtengo todos los productos
  socket.on("all-products", (allProducts) => {
    const divProducts = document.getElementById("products");
    divProducts.innerText = "";

    allProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.innerHTML = `
        <h3>Producto: ${product.title}</h3>
        <div>Descripción: ${product.description}</div>
        <div>Precio: $${product.price}</div>
        <div>En Stock: ${product.stock}</div>
        <div>Categoría: ${product.category}</div>
      `;
      divProducts.appendChild(productElement);
    });
  });

  // Obtener los datos del formulario y emito el evento para agregar productos
  const formProduct = document.getElementById("form-product");

  formProduct.addEventListener("submit", (event) => {
    event.preventDefault();

    const newProduct = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      price: Number(document.getElementById("price").value),
      category: document.getElementById("category").value,
      code: document.getElementById("code").value,
      stock: Number(document.getElementById("stock").value),
    };
    console.log(newProduct);

    socket.emit("addProduct", newProduct);
  });
})();
