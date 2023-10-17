(function () {
  const socket = io();

  // Obtengo todos los productos
  socket.on("all-products", (allProducts) => {
    const divProducts = document.getElementById("products");
    divProducts.innerText = "";

    allProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.innerHTML = `
        <div style="display: flex; justify-content: space-around; align-items: center">
          <h3>Producto: ${product.title}</h3>
          <button id="${product.id}" style="height: 20px; width: auto;">Eliminar producto</button>
        </div>
        <div style="color: gray">ID: ${product.id}</div>
        <br>
        <div>Descripción: ${product.description}</div>
        <div>Precio: $${product.price}</div>
        <div>En Stock: ${product.stock}</div>
        <div>Categoría: ${product.category}</div>
      `;
      divProducts.appendChild(productElement);

      const button = document.getElementById(product.id);
      button.addEventListener("click", (event) => {
        const productId = event.target.id;

        socket.emit("delete-product", productId);
      });
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
