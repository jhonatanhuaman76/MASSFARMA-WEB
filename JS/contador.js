window.addEventListener('load', () => {
  const descuentoContador = document.querySelector('.descuento_contador');

  function iniciarContador() {
    let horas = 12;
    let minutos = 0;
    let segundos = 0;

    setInterval(function () {
      // Restar 1 segundo
      segundos--;

      // Si los segundos llegan a -1, restar 1 minuto y establecer segundos a 59
      if (segundos === -1) {
        minutos--;
        segundos = 59;
      }

      // Si los minutos llegan a -1, restar 1 hora y establecer minutos a 59
      if (minutos === -1) {
        horas--;
        minutos = 59;
      }

      // Si las horas llegan a -1, reiniciar el contador a 12 horas
      if (horas === -1) {
        horas = 12;
        minutos = 0;
        segundos = 0;
      }

      // Mostrar el tiempo
      descuentoContador.innerHTML = `
        <div class="descuento_horas">
          <span>${String(horas).padStart(2, '0')}</span>
          <span>Horas</span>
        </div>
        <span> : </span>
        <div class="descuento_minutos">
          <span>${String(minutos).padStart(2, '0')}</span>
          <span>Minutos</span>
        </div>
        <span> : </span>
        <div class="descuento_segundos">
          <span>${String(segundos).padStart(2, '0')}</span>
          <span>Segundos</span>
        </div>
      `;
    }, 1000); // La función se ejecuta cada 1000 milisegundos (1 segundo)
  }

  // Llamar a la función para iniciar el contador
  iniciarContador();
});
