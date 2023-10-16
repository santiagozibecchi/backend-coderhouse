(function () {
  const socket = io();

  // Obtengo todos los productos
  socket.on("all-products", (allProducts) => {
    const divProducts = document.getElementById("products");
    divProducts.innerText = "";

    allProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.innerHTML = `
        <h3>${product.title}</h3>
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
      price: document.getElementById("price").value,
      category: document.getElementById("category").value,
      code: document.getElementById("code").value,
      stock: document.getElementById("stock").value,
    };

    socket.emit("addProduct", newProduct);
  });
})();
