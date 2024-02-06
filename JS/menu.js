window.addEventListener('load', () => {
  const menu = document.querySelector('.menu');
  const rellenoNav = document.querySelector('.relleno-nav');
  const menuSup = document.querySelector('.menu__sup');
  const menuInf = document.querySelector('.menu__inf');

  const menuCategoria = document.querySelector('.menu__inf-item--show');
  const shadowBackground = document.querySelector('.shadow--background');

  const iconoHamburguesa = document.querySelector('.menu__centro-hamburguesa');
  const cerrarMenuHamburguesa = document.querySelector('.menu-hambuerguesa__cerrar');
  const divMenuHamburguesa = document.querySelector('.menu-hambuerguesa');

  const listElements = document.querySelectorAll('.menu-hambuerguesa__item--show');

  const overlay = document.querySelector('.overlay');

  let currentPosition = 0;
  const alturaTotal = menu.offsetHeight;
  rellenoNav.style.height = alturaTotal + 'px';

  const logo = document.querySelector('.menu__centro-logo');
  logo.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Función para hacer scroll a la posición actual
  function scrollToCurrentPosition() {
    window.scrollTo(0, currentPosition);
  }

  menuCategoria.addEventListener('mouseenter', function (event) {
    shadowBackground.classList.toggle('shadow--background-active');
    currentPosition = window.scrollY;
    document.addEventListener('scroll', scrollToCurrentPosition);
  });

  menuCategoria.addEventListener('mouseleave', function (event) {
    shadowBackground.classList.toggle('shadow--background-active');
    document.removeEventListener('scroll', scrollToCurrentPosition);
  });

  /*COMPRIMIR EL MENÚ USANDO LA API DE OBSERVER*/
  let x = true;
  // Creamos el objeto de IO
  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) {
      menu.classList.add('menu--comprimido');
      menuSup.classList.add('menu__sup--comprimido');
      menuInf.classList.add('menu__inf--comprimido');
      iconoHamburguesa.classList.add('menu__centro-hamburguesa--comprimido');
      menu.classList.remove('menu--descomprimido');
      x = false;
    } else {
      menu.classList.remove('menu--comprimido');
      menuSup.classList.remove('menu__sup--comprimido');
      menuInf.classList.remove('menu__inf--comprimido');
      iconoHamburguesa.classList.remove('menu__centro-hamburguesa--comprimido');
      if (x === false) menu.classList.add('menu--descomprimido');
    }
  });
  observer.observe(rellenoNav);

  /*CONTROLAMOS EL MENU HAMBURGUESA*/
  iconoHamburguesa.addEventListener('click', () => {
    divMenuHamburguesa.style.transform = 'translateX(0)';
    overlay.classList.toggle('overlay-active');
    cerrarMenuHamburguesa.classList.toggle('menu-hambuerguesa__cerrar--active');
    currentPosition = window.scrollY;
    document.addEventListener('scroll', scrollToCurrentPosition);
  });

  cerrarMenuHamburguesa.addEventListener('click', () => {
    divMenuHamburguesa.style.transform = 'translateX(-100%)';
    overlay.classList.toggle('overlay-active');
    cerrarMenuHamburguesa.classList.toggle('menu-hambuerguesa__cerrar--active');
    document.removeEventListener('scroll', scrollToCurrentPosition);
  });

  /*SUBMENU ACORDEON DENTRO DEL MENU HAMBURGUESA*/
  listElements.forEach((element) => {
    element.addEventListener('click', () => {
      console.log(element);
      let subMenu = element.children[1];
      let height = 60;
      element.classList.toggle('menu-hamburguesa__item--active');
      console.log(subMenu.offsetHeight);
      if (element.clientHeight === 60) {
        height += subMenu.offsetHeight;
      }

      element.style.height = `${height}px`;
    });
  });

  /*CODIGO PARA DETECTAR MOVIMIENTO DE SCROLL*/
  // window.addEventListener('wheel', comprimirMenu);
  // Funcion para comprimir el menu
  // function comprimirMenu(event) {
  //   if (event.deltaY > 0) {
  //     menuSup.classList.add('menu__sup--comprimido');
  //     menuInf.classList.add('menu__inf--comprimido');
  //   } else {
  //     menuSup.classList.remove('menu__sup--comprimido');
  //     menuInf.classList.remove('menu__inf--comprimido');
  //   }
  // }
});
