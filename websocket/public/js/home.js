(function () {
  // Función para cargar y mostrar los productos
  async function loadAndDisplayProducts() {
    try {
      const response = await fetch("http://localhost:8080/api/product");
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      const data = await response.json();

      const productsDiv = document.getElementById("products");
      productsDiv.innerHTML = ""; // Limpia el contenido actual del div

      if (data.length === 0) {
        productsDiv.textContent = "No hay productos disponibles.";
      } else {
        const ul = document.createElement("ul");
        data.forEach((product) => {
          const li = document.createElement("li");
          li.textContent = product.title;
          ul.appendChild(li);
        });
        productsDiv.appendChild(ul);
      }
    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
    }
  }

  // Llama a la función para cargar y mostrar los productos
  loadAndDisplayProducts();
})();
