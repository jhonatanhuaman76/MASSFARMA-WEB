// Obtén el elemento de entrada por su ID
const input = document.getElementById('nomapellidoin');
const expresionRegular = /^[\p{L}\s.'-]+$/u; // Expresión regular como objeto

// Agrega un controlador de eventos para el evento "input"
input.addEventListener('input', function () {
  // Obtén el valor actual del campo de entrada
  const inputValor = input.value;

  // Verifica si el valor contiene caracteres no permitidos
  if (!expresionRegular.test(inputValor)) {
    input.value = inputValor.replace(/[^\p{L}\s.'-]+/gu, ''); // Elimina caracteres no permitidos
  }
});
