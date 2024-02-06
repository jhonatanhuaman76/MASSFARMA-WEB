window.addEventListener('load', () => {
  const categorias = [
    'CUIDADO PERSONAL Y BELLEZA ',
    'MAMÁ Y BEBÉ',
    'MEDICINAS Y TRATAMIENTOS',
    'PRIMEROS AUXILIOS',
    'VITAMINAS Y SUPLEMENTOS',
    'FITNESS Y NUTRICION ',
  ];

  const contenedorCategoria = document.querySelector('.categoria');
  const nombreCategoria = document.querySelectorAll('.nombre-categoria');

  //Obtener el valor del parámetro "cate" de la URL
  let urlParams = new URLSearchParams(window.location.search);
  let categoria = parseInt(urlParams.get('cate'));

  //Validamos que categoria sea un numero
  if (isNaN(categoria)) return;

  document.querySelector('title').textContent = `${categorias[categoria]} | MassFarma`;
  console.log(categorias[categoria]);
  console.log(categoria);

  nombreCategoria.forEach((cate) => {
    cate.textContent = categorias[categoria];
  });

  mostrarProductosCategoria();

  async function mostrarProductosCategoria() {
    const productos = await obtenerProductos();
    const productosCate = productos.filter((producto) => producto.categoria === categoria);
    mostrarProductosHTML(productosCate, contenedorCategoria);
  }

  // Funcion para mostrar los productos en el HTML
  function mostrarProductosHTML(productos, contenedor) {
    productos.forEach((producto) => {
      const { id, nombre, precio } = producto;

      const cardProducto = document.createElement('div');
      cardProducto.classList.add('card-producto');
      cardProducto.innerHTML = `
      <div class="card-producto--shadow" data-id="${id}">
        <div class="img-producto">
          <img src="imagenes/Productos/${id}.png" alt="">
        </div>
        <div class="texto-producto">
          <p class="nombre-producto">${nombre}</p>
          <p class="precio-producto">S/ <span>${precio.toFixed(2)}</span></p>
        </div>
        <div class="btn-agregar-carrito">
          <button class="btn-farmacia--celeste agregar-carrito" data-id="${id}">Agregar al carrito</button>
        </div>
      </div>
      `;
      contenedor.appendChild(cardProducto);
    });
  }

  // Funcion para obtener el JSON con los datos de los productos
  async function obtenerProductos() {
    const URL = 'DATA/DB_Productos.json';
    try {
      const resultado = await fetch(URL);
      const data = await resultado.json();
      return data;
    } catch (error) {
      console.error('Error al obtener productos: ', error);
      return respaldo;
    }
  }
});
