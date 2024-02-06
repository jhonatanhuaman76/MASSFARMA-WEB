let articulosProducto = [];
let contadorProductos = 0;
let importeTotal = 0.0;
window.addEventListener('load', () => {
  const btnCarrito = document.querySelector('#btn-carrito');
  const btnCerrarCarito = document.querySelector('#carrito_cerrar');
  const carritoContenedor = document.querySelector('.carrito_contenedor');
  const overlay = document.querySelector('.overlay');

  const body = document.querySelector('body');
  const carritoProductos = document.querySelector('.carrito_productos');
  const contadorProductosSpan = document.querySelectorAll('.contador-productos');
  const subTotal = document.querySelector('.carrito_subtotal span');
  const importePagar = document.querySelector('.carrito_total-pagar span');

  let currentPosition = 0;

  cargarLocalStorage();

  btnCarrito.addEventListener('click', () => {
    carritoContenedor.style.transform = 'translateX(0)';
    overlay.classList.toggle('overlay-active');
    currentPosition = window.scrollY;
    document.addEventListener('scroll', scrollToCurrentPosition);
  });

  btnCerrarCarito.addEventListener('click', () => {
    carritoContenedor.style.transform = 'translateX(100%)';
    overlay.classList.toggle('overlay-active');
    document.removeEventListener('scroll', scrollToCurrentPosition);
  });

  // Función para hacer scroll a la posición actual
  function scrollToCurrentPosition() {
    window.scrollTo(0, currentPosition);
  }

  //Cuando agregar un producto presionando "Agregar al carrito"
  body.addEventListener('click', agregarProducto);

  //Elimina productos del carrito
  carritoProductos.addEventListener('click', eliminarProducto);

  function agregarProducto(e) {
    if (e.target.classList.contains('agregar-carrito')) {
      try {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
      } catch (error) {
        console.error('Error al obtener datos de producto', error);
      }
    }

    if (e.target.classList.contains('agregar-carrito-detalle')) {
      try {
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
        leerDatosProductoDetalle(productoSeleccionado);
      } catch (error) {
        console.error('Error al obtener datos de producto', error);
      }
    }
  }

  function eliminarProducto(e) {
    if (e.target.classList.contains('carrito_producto-eliminar')) {
      const productoId = e.target.getAttribute('data-id');

      //Elimina del arreglo de articulosCarrito por el data-id
      articulosProducto = articulosProducto.filter((producto) => producto.id !== productoId);

      carritoHTML();
    }
  }

  //Lee el contenido del HTML al que le dimos click y extrae la informacin del producto
  function leerDatosProducto(producto) {
    //Crear un objeto con el contenido del producto actual
    const infoProducto = {
      imagen: producto.querySelector('.img-producto img').src,
      titulo: producto.querySelector('.nombre-producto').textContent,
      precio: producto.querySelector('.precio-producto span').textContent,
      id: producto.querySelector('.agregar-carrito').getAttribute('data-id'),
      cantidad: 1,
    };

    agregarDatosProducto(infoProducto);
  }

  function leerDatosProductoDetalle(producto) {
    const infoProducto = {
      imagen: producto.querySelector('#producto_imagen').src,
      titulo: producto.querySelector('#producto_nombre').textContent,
      precio: producto.querySelector('#producto_precio span').textContent,
      id: producto.querySelector('.agregar-carrito-detalle').getAttribute('data-id'),
      cantidad: 1,
    };

    agregarDatosProducto(infoProducto);
  }

  function agregarDatosProducto(infoProducto) {
    //Comprobar si ese elemento ya existe en el carrito
    const existe = articulosProducto.some((producto) => producto.id === infoProducto.id);

    if (existe) {
      //Actualizamos la cantidad
      const productos = articulosProducto.map((producto) => {
        if (producto.id === infoProducto.id) {
          producto.cantidad++;
          return producto;
        } else {
          return producto;
        }
      });

      //Pasando los productos actualizados al arreglo original
      articulosProducto = [...productos];
    } else {
      //Agrega productos nuevos al arreglo de carrito
      articulosProducto = [...articulosProducto, infoProducto];
    }
    carritoHTML();
  }

  //Muestra los productos en el HTMl del carrito de compras
  function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();
    contadorProductos = 0;
    importeTotal = 0.0;

    // Recorre el carrito y genera el HTML
    articulosProducto.forEach((producto) => {
      const { imagen, titulo, precio, cantidad, id } = producto;

      const item = document.createElement('div');
      item.classList.add('carrito_producto-item');

      item.innerHTML = `
        <img class="carrito_producto-img" src="${imagen}" alt="">
        <p class="carrito_producto-nombre">${titulo}</p>
        <img class="carrito_producto-eliminar" src="imagenes/eliminar.png" data-id="${id}" alt="">
        <p class="carrito_producto-precio">S/ <span>${parseFloat(precio).toFixed(2)}</span></p>
        <p class="carrito_producto-cantidad">Cantidad: <span class="carrito_producto-cantidad">${cantidad}</span></p>
      `;

      const hr = document.createElement('hr');

      // Agrega el HTML del carrito
      carritoProductos.appendChild(item);
      carritoProductos.appendChild(hr);

      contadorProductos += cantidad;
      importeTotal += parseFloat(precio) * cantidad;
    });

    //Actualizar contador de productos
    contadorProductosSpan.forEach((contador) => {
      contador.textContent = contadorProductos;
    });

    //Actualizar importe total
    subTotal.textContent = importeTotal.toFixed(2);
    importePagar.textContent = importeTotal.toFixed(2);

    // Agregar el carrito de compras al local storage
    sincronizarStorage();
  }

  function limpiarHTML() {
    while (carritoProductos.firstChild) {
      carritoProductos.removeChild(carritoProductos.firstChild);
    }
  }

  function cargarLocalStorage() {
    articulosProducto = JSON.parse(localStorage.getItem('carrito-farmacia')) || [];
    carritoHTML();
  }

  function sincronizarStorage() {
    localStorage.setItem('carrito-farmacia', JSON.stringify(articulosProducto));
  }
});
