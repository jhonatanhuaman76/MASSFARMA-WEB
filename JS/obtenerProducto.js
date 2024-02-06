window.addEventListener('load', async () => {
  //Obtener el valor del parámetro "id" de la URL
  let urlParams = new URLSearchParams(window.location.search);
  let productoId = urlParams.get('id');

  //Validamos si productoID es un numero
  if (isNaN(productoId)) return;

  const categorias = [
    'CUIDADO PERSONAL Y BELLEZA ',
    'MAMÁ Y BEBÉ',
    'MEDICINAS Y TRATAMIENTOS',
    'PRIMEROS AUXILIOS',
    'VITAMINAS Y SUPLEMENTOS',
    'FITNESS Y NUTRICION ',
  ];

  //Obtener los productos
  const productos = await obtenerProductos();

  //Buscamos el producto correspondiente por el ID;
  const producto = productos.find((item) => {
    return item.id == productoId;
  });

  if (producto) {
    const nombreProducto = document.getElementById('producto_nombre');
    const precioProducto = document.querySelector('#producto_precio span');
    const imgProducto = document.getElementById('producto_imagen');
    const skuProducto = document.querySelector('#producto_SKU span');
    const categoria = document.querySelector('.producto_categorias span');
    const btnCategoria = document.querySelector('.agregar-carrito-detalle');

    nombreProducto.textContent = producto.nombre;
    precioProducto.textContent = producto.precio;
    imgProducto.src = `imagenes/Productos/${producto.id}.png`;
    skuProducto.textContent = producto.id;
    categoria.textContent = categorias[producto.categoria];
    btnCategoria.setAttribute('data-id', producto.id);

    document.querySelector('title').textContent = `${producto.nombre} | MassFarma`;
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
