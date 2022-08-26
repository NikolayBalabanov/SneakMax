const catalogList = document.querySelector('.catalog-list');
const catalogMore = document.querySelector('.catalog__more');
const prodModal = document.querySelector('[data-graph-target="prod-modal"] .modal__content');
let prodQuantity = 5;
let dataLength = null;

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

// slider config
const prodSlider = new Swiper('.modal-slider__container', {
  slidesPerView: 1,
  spaceBetween: 20,
});
// catalog list fetch and render
if (catalogList) {
  const loadProducts = (quantity = 5) => {
    fetch('data.json')
      .then((response) => {
         return response.json()
      })
      .then((data) => {
        console.log(data)

        dataLength = data.length;

        catalogList.innerHTML = '';

        for (let i = 0; i < dataLength; i++) {
          if (i < quantity) {
            let item = data[i];
            console.log(item);
            catalogList.innerHTML += `
            <li class="catalog-list__item">
              <article class="product">
                <div class="product__image">
                  <img src="${item.mainImage}" alt="${item.title}">
                  <div class="product__btns">
                    <button class="btn-reset product__btn" data-id="${item.id}" data-graph-path="prod-modal" aria-label="Показать информацию о товаре">
                      <svg>
                        <use xlink:href="img/sprite.svg#eye"></use>
                      </svg>
                    </button>
                    <button class="btn-reset product__btn" aria-label="Добавить товар в карзину">
                      <svg>
                        <use xlink:href="img/sprite.svg#cart"></use>
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 class="product__title">${item.title}</h3>
                <span class="product__price">${normalPrice(item.price)} р</span>
              </article>
            </li>`
          }
        }
      })
      .then(() => {
        const productTitle = document.querySelectorAll('.product__title');
        productTitle.forEach(el => {
          $clamp(el, {clamp: '22px'});
        })
        const modal = new GraphModal({
          isOpen: (modal) => {
            const openBtn = modal.previousActiveElement.dataset.id;
            loadModalData(openBtn);
            prodSlider.update();
          },
        });
      })
  }

  loadProducts(prodQuantity);

  // fetch modal data
  const loadModalData = (id = 1) => {
    fetch('data.json')
      .then((response) => {
         return response.json()
      })
      .then((data) => {
        // prodModal.innerHTML = '';

        for (let dataItem of data) {
          if (dataItem.id == id) {
            console.log(dataItem)
            console.log(typeof dataItem.id, typeof id)
          }
        }
      })
  }
  // more btn
  catalogMore.addEventListener('click', (e) => {
    prodQuantity = prodQuantity + 3;
    loadProducts(prodQuantity);
    if (prodQuantity >= dataLength) {
      catalogMore.style.display = 'none';
    } else {
      catalogMore.style.display = 'block';
    }
  })
}



