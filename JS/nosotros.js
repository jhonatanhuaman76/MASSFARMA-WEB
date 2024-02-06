window.addEventListener('load', () => {
  const caja = document.querySelector('.contenedor-zoom');
  const contenedor = caja.parentElement;
  let scrollPos = 0;

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) {
      window.removeEventListener('scroll', cambiarAncho);
    } else {
      console.log('SE VE');
      window.addEventListener('scroll', cambiarAncho);
    }
  });
  observer.observe(caja);

  function cambiarAncho() {
    console.log(caja.style.width);
    let anchoElemento = caja.offsetWidth;
    let anchoContenedor = contenedor.offsetWidth;
    let anchoEnPorcentaje = (anchoElemento / anchoContenedor) * 100;

    let currentScrollPos = document.documentElement.scrollTop;

    if (currentScrollPos > scrollPos) {
      caja.style.width = `${(anchoEnPorcentaje += 2)}%`;
    } else {
      caja.style.width = `${(anchoEnPorcentaje -= 2)}%`;
    }

    scrollPos = currentScrollPos;
  }
});
