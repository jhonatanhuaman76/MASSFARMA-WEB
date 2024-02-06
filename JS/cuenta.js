window.addEventListener('load', () => {
  const CAUSA = document.querySelector('.cuenta');
  const loginLink = document.querySelector('.login-link');
  const registerLink = document.querySelector('.register-link');

  const btnPopup = document.querySelector('.btnLogin-popup');
  const iconClose = document.querySelector('.icon-close');

  // const overlay = document.querySelector('.overlay');
  let currentPosition = 0;

  registerLink.addEventListener('click', () => {
    CAUSA.classList.add('active');
  });

  loginLink.addEventListener('click', () => {
    CAUSA.classList.remove('active');
  });

  btnPopup.addEventListener('click', () => {
    CAUSA.classList.add('active-popup');
    // overlay.classList.toggle('overlay-active');
    currentPosition = window.scrollY;
    document.addEventListener('scroll', scrollToCurrentPosition);
  });

  iconClose.addEventListener('click', () => {
    CAUSA.classList.remove('active-popup');
    // overlay.classList.toggle('overlay-active');
    currentPosition = window.scrollY;
    document.removeEventListener('scroll', scrollToCurrentPosition);
  });

  // Función para hacer scroll a la posición actual
  function scrollToCurrentPosition() {
    window.scrollTo(0, currentPosition);
  }
});
