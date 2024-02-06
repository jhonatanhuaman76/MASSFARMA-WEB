window.addEventListener('load', () => {
  const contenedorMasBuscado = document.querySelector('.buscados-wrapper');
  const contenedorCuiBe = document.querySelector('.cuibe-wrapper');
  const contenedorMamaBebe = document.querySelector('.mabebe-wrapper');
  const contenedorMediTra = document.querySelector('.metra-wrapper');
  const contenedorPriAux = document.querySelector('.priaux-wrapper');
  const contenedorVitaSuple = document.querySelector('.vitasuple-wrapper');
  const contenedorFitness = document.querySelector('.fitness-wrapper');

  mostrarProductosBuscados();
  mostrarProductosCuidadoBelleza();
  mostrarProductosMamaBebe();
  mostrarProductosMediTra();
  mostrarProductosPriAux();
  mostrarProductosVitaSuple();
  mostrarProductosFitness();

  async function mostrarProductosBuscados() {
    const productos = await obtenerProductos();
    const masBuscados = await obtenerMasBuscados();
    const productosMasBuscados = productos.filter((producto) => masBuscados.includes(producto.id));
    mostrarProductosHTML(productosMasBuscados, contenedorMasBuscado);
  }

  async function mostrarProductosCuidadoBelleza() {
    const productos = await obtenerProductos();
    const productosCuiBe = productos.filter((producto) => producto.categoria === 0);
    mostrarProductosHTML(productosCuiBe, contenedorCuiBe);
  }

  async function mostrarProductosMamaBebe() {
    const productos = await obtenerProductos();
    const productosMamaBebe = productos.filter((producto) => producto.categoria === 1);
    mostrarProductosHTML(productosMamaBebe, contenedorMamaBebe);
  }

  async function mostrarProductosMediTra() {
    const productos = await obtenerProductos();
    const productosMediTra = productos.filter((producto) => producto.categoria === 2);
    mostrarProductosHTML(productosMediTra, contenedorMediTra);
  }

  async function mostrarProductosPriAux() {
    const productos = await obtenerProductos();
    const productosPriaux = productos.filter((producto) => producto.categoria === 3);
    mostrarProductosHTML(productosPriaux, contenedorPriAux);
  }

  async function mostrarProductosVitaSuple() {
    const productos = await obtenerProductos();
    const productosVitaSuple = productos.filter((producto) => producto.categoria === 4);
    mostrarProductosHTML(productosVitaSuple, contenedorVitaSuple);
  }

  async function mostrarProductosFitness() {
    const productos = await obtenerProductos();
    const productosFitness = productos.filter((producto) => producto.categoria === 5);
    mostrarProductosHTML(productosFitness, contenedorFitness);
  }

  // Funcion para mostrar los productos en el HTML
  function mostrarProductosHTML(productos, contenedor) {
    productos.forEach((producto) => {
      const { id, nombre, precio } = producto;

      const cardProducto = document.createElement('div');
      cardProducto.classList.add('card-producto', 'swiper-slide');
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

  // Funcion para obtener el JSON con el id de los productos mas buscados
  async function obtenerMasBuscados() {
    const URL = 'DATA/DB_Pro_Buscados.json';
    try {
      const resultado = await fetch(URL);
      const data = await resultado.json();
      return data;
    } catch (error) {
      console.error('Error al obtener mas buscados: ', error);
      return respaldoBuscados;
    }
  }
});

// SLIDER DE LOS PRODUCTOS:
var swiperMasBuscado = new Swiper('.swiper-buscados', {
  navigation: {
    nextEl: '.buscados-button-next',
    prevEl: '.buscados-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    620: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    850: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1120: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1400: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});

var swiperCuiBe = new Swiper('.swiper-cuibe', {
  navigation: {
    nextEl: '.cuibe-button-next',
    prevEl: '.cuibe-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    620: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    850: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1120: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1400: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});

var swiperMamaBebe = new Swiper('.swiper-mabebe', {
  navigation: {
    nextEl: '.mabebe-button-next',
    prevEl: '.mabebe-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    680: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1080: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1460: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

var swiperMediTra = new Swiper('.swiper-metra', {
  navigation: {
    nextEl: '.metra-button-next',
    prevEl: '.metra-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    620: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    850: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1120: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1400: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});

var swiperPriAux = new Swiper('.swiper-priaux', {
  navigation: {
    nextEl: '.priaux-button-next',
    prevEl: '.priaux-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    620: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    850: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1120: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1400: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});

var swiperVitaSuple = new Swiper('.swiper-vitasuple', {
  navigation: {
    nextEl: '.vitasuple-button-next',
    prevEl: '.vitasuple-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    620: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    850: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1120: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1400: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});

var swiperFitnes = new Swiper('.swiper-fitness', {
  navigation: {
    nextEl: '.fitness-button-next',
    prevEl: '.fitness-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    680: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1080: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1460: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});
