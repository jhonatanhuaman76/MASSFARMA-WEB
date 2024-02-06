document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    // Verificar si el clic ocurrió en o dentro de un elemento .card-producto--shadow
    const card = e.target.closest('.card-producto--shadow');
    // Verificar si el clic ocurrió en el botón dentro del card
    const esBoton = e.target.classList.contains('btn-farmacia--celeste');

    if (card && !esBoton) {
      const url = `producto.html?id=${card.dataset.id}`;
      window.location.href = url;
    }
  });
});
