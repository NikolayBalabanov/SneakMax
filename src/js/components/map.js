document.addEventListener('DOMContentLoaded', () => {
  let flag = 0;
  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    let mapOffset = document.querySelector('#map').offsetTop;
    if (scrollY >= mapOffset - 500 || (flag == 0)) {
      ymaps.ready(init);
      function init(){
          const myMap = new ymaps.Map("map", {
              center: [55.76, 37.64],
              zoom: 7
          });
          myMap.behaviors.disable('scrollZoom');
      }
      flag = 1;
    }
  })


})
