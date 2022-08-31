const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__nav');
const navLinks = document.querySelectorAll('.header__nav .nav__item .nav__link');

window.addEventListener('resize', () => {
  if (document.body.clientWidth <= 1024) {
    const navScroll = new SimpleBar(menu);
  }
})

function disableScroll() {
  let pagePosition = window.scrollY;
  document.body.classList.add('disable-scroll');
  document.body.dataset.position = pagePosition;
  document.body.style.top = -pagePosition + 'px';
}

function enableScroll() {
  let pagePosition = parseInt(document.body.dataset.position, 10);
  document.body.style.top = 'auto';
  document.body.classList.remove('disable-scroll');
  window.scroll({
    top: pagePosition,
    left: 0
  });
  document.body.removeAttribute('data-position');
}

navLinks.forEach(el => {
  el.addEventListener('click', () => {
    burger.classList.remove('burger--active');
    menu.classList.remove('header__nav--active');
    enableScroll();
  })
})

burger.addEventListener('click', () => {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('header__nav--active');

  if (burger.classList.contains('burger--active')) {
    disableScroll();
  } else {
    enableScroll();
  }
})
