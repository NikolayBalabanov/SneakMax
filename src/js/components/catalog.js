const catalogMenu = document.querySelector('.catalog__show');
const catalogLeft = document.querySelector('.catalog__left');


catalogMenu.addEventListener('click', () => {
  catalogMenu.classList.toggle('catalog__show--active');
  catalogLeft.classList.toggle('catalog__left--active');
})
