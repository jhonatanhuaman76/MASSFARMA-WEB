window.addEventListener('load', () => {
  const slider = document.querySelector('#slider-inner');

  const btnLeft = document.querySelector('#btn-left');
  const btnRight = document.querySelector('#btn-right');

  //Variable para controlar la animacion
  let animacion = false;

  //Funcion para cambiar a la derecha
  function moverDerecha() {
    if (!animacion) {
      animacion = true;
      let sliderSectionFirst = document.querySelectorAll('.slider__section')[0];
      slider.style.transform = 'translateX(-200%)';
      slider.style.transition = 'transform 0.5s';
      setTimeout(() => {
        slider.style.transition = 'none';
        slider.insertAdjacentElement('beforeend', sliderSectionFirst);
        slider.style.transform = 'translateX(-100%)';
      }, 500);
      setTimeout(function () {
        animacion = false;
      }, 1000);
    }
  }

  //Funcion para cambiar a la izquierda
  function moverIzquierda() {
    if (!animacion) {
      animacion = true;
      let sliderSection = document.querySelectorAll('.slider__section');
      let sliderSectionLast = sliderSection[sliderSection.length - 1];
      slider.style.transform = 'translateX(0)';
      slider.style.transition = 'transform 0.5s';
      setTimeout(() => {
        slider.style.transition = 'none';
        slider.insertAdjacentElement('afterbegin', sliderSectionLast);
        slider.style.transform = 'translateX(-100%)';
      }, 500);
      setTimeout(function () {
        animacion = false;
      }, 1000);
    }
  }

  //Variable que almacena el intervalo en que se cambiará la imagen automaticamente
  let intervalo = setInterval(moverDerecha, 5000);

  //Evento al dar click en el boton derecha
  btnRight.addEventListener('click', () => {
    clearInterval(intervalo);
    moverDerecha();
    intervalo = setInterval(moverDerecha, 5000);
  });

  //Evento al dar click en el boton izquierdo
  btnLeft.addEventListener('click', () => {
    clearInterval(intervalo);
    moverIzquierda();
    intervalo = setInterval(moverDerecha, 5000);
  });
});