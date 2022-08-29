const catalogList = document.querySelector('.catalog-list');
const catalogMore = document.querySelector('.catalog__more');
const prodModal = document.querySelector('[data-graph-target="prod-modal"] .modal__content');
const prodModalSlider = prodModal.querySelector('.modal-slider .swiper-wrapper');
const prodModalPreview = prodModal.querySelector('.modal-slider .modal-preview');
const prodModalInfo = prodModal.querySelector('.modal-info__wrapper');
const prodModalDescr = prodModal.querySelector('.modal-prod-descr');
const prodModalChars = prodModal.querySelector('.prod-chars');
const prodModalVideo = prodModal.querySelector('.prod-modal__video');
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
        dataLength = data.length;

        catalogList.innerHTML = '';

        for (let i = 0; i < dataLength; i++) {
          if (i < quantity) {
            let item = data[i];
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
                    <button class="btn-reset product__btn add-to-cart-btn" data-id="${item.id}" aria-label="Добавить товар в карзину">
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

        cartLogic()
        const modal = new GraphModal({
          isOpen: (modal) => {
            if (modal.modalContainer.classList.contains('prod-modal')) {
              const openBtn = modal.previousActiveElement.dataset.id;
              loadModalData(openBtn);
              prodSlider.update();
            }
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
        prodModalSlider.innerHTML = '';
        prodModalPreview.innerHTML = '';
        prodModalInfo.innerHTML = '';
        prodModalDescr.textContent = '';
        prodModalChars.innerHTML = '';
        prodModalVideo.innerHTML = '';

        for (let dataItem of data) {
          if (dataItem.id == id) {
            const slides = dataItem.gallery.map((image, idx) => {
              return `
              <div class="swiper-slide" data-index="${idx}">
                <img src="${image}" alt="${dataItem.title}">
              </div>
              `;
            });
            const preview = dataItem.gallery.map((image, idx) => {
              return `
                <div class="modal-preview__item ${idx === 0 ? 'modal-preview__item--active' : ''}" tabindex="0" data-index="${idx}">
                  <img src="${image}" alt="preview ${idx + 1}" data-index="0">
                </div>
              `;
            });
            const sizes = dataItem.sizes.map(size => {
              return `
              <li class="modal-sizes__item">
                <button class="modal-sizes__btn btn-reset">${size}</button>
              </li>
              `;
            });
            prodModalSlider.innerHTML = slides.join('');
            prodModalPreview.innerHTML = preview.join('');
            prodModalInfo.innerHTML = `
              <h3 class="modal-info__title">${dataItem.title}</h3>
              <div class="midal-info__rate">
                <img src="img/star.svg" alt="Рейтинг 5 из 5">
                <img src="img/star.svg" alt="">
                <img src="img/star.svg" alt="">
                <img src="img/star.svg" alt="">
                <img src="img/star.svg" alt="">
              </div>
              <div class="modal-info__sizes">
                <span class="modal-info__subtitle">Выберите размер</span>
                <ul class="list-reset modal-info__sizes-list modal-sizes">
                  ${sizes.join('')}
                </ul>
              </div>
              <div class="modal-info__price">
                <span class="modal-info__current-price">${dataItem.price} p</span>
                <span class="modal-info__old-price">${dataItem.oldPrice ? dataItem.oldPrice + ' p' : ''}</span>
              </div>
            `;
            prodModalDescr.textContent = dataItem.description;
            let charsItems = '';
            Object.keys(dataItem.chars).forEach( function eachKey(key) {
              charsItems += `<p class="prod-bottom__descr prod-chars__item">${key}: ${dataItem.chars[key]}</p>`
            });
            prodModalChars.innerHTML = charsItems;
            if (dataItem.video) {
              prodModalVideo.style.display = 'block';
              prodModalVideo.innerHTML = `<iframe class="prod-modal__video" src="${dataItem.video}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            } else {
              prodModalVideo.style.display = 'none';
            }
          }
        }
      })
      .then(() => {
        prodSlider.update();
        prodSlider.on('slideChangeTransitionEnd', function () {
          // let idx = document.querySelectorAll('.swiper-slide-active').dataset.swiperSlideIndex;
          let idx = document.querySelectorAll('.swiper-slide-active').dataset.index;
          document.querySelectorAll('.modal-preview__item').forEach(el => {el.classList.remove('modal-preview__item--active')});
          document.querySelector(`.modal-preview__item[data-index="${idx}"]`).classList.add('modal-preview__item--active');
        })
        document.querySelectorAll('.modal-preview__item').forEach(el => {
          el.addEventListener('click', (e) => {
            const idx = parseInt(e.currentTarget.dataset.index);
            document.querySelectorAll('.modal-preview__item').forEach(el => {el.classList.remove('modal-preview__item--active')});
            e.currentTarget.classList.add('modal-preview__item--active');
            prodSlider.slideTo(idx);
            prodSlider.update();
          })
        })
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
// cart functions for str
let price = 0;
const miniCartList = document.querySelector('.mini-cart__list');
const fullPrice = document.querySelector('.mini-cart__summ');
const cartCount = document.querySelector('.cart__count')

const priceWithoutSpaces = (str) => {
  return str.replace(/\s/g, '');
};

const plusFullPrice = (currentPrice) => {
  return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
  return price -= currentPrice;
}

const printFullPrice = () => {
  fullPrice.textContent = `${normalPrice(price)} р`;
}

const printQuantity = (num) => {
  cartCount.textContent = num;
};

const loadCartData = (id = 1) => {
  fetch('data.json')
    .then((response) => {
       return response.json()
    })
    .then((data) => {
      for (let dataItem of data) {
        if (dataItem.id == id) {
          miniCartList.insertAdjacentHTML('afterbegin', `
            <li class="mini-cart__item" data-id="${dataItem.id}">
              <article class="mini-cart__product mini-product">
                <div class="mini-product__image">
                  <img src="${dataItem.mainImage}" alt="${dataItem.title}">
                </div>
                <div class="mini-product__content">
                  <div class="mini-product__text">
                    <h3 class="mini-product__title">${dataItem.title}</h3>
                    <span class="mini-product__price">${normalPrice(dataItem.price)} р</span>
                  </div>
                  <button class="btn-reset mini-product__delete" aria-label="Удалить товар">
                    <svg>
                      <use xlink:href="img/sprite.svg#trash"></use>
                    </svg>
                  </button>
                </div>
              </article>
            </li>
          `);

          return dataItem;
        }
      }
    })
    .then((item) => {
      plusFullPrice(item.price);
      printFullPrice();

      let num = document.querySelectorAll('.mini-cart__item').length;
      if (num > 0) cartCount.classList.add('cart__count--visible');
      printQuantity(num);
    });
}

const cartLogic = () => {
  const productBtn = document.querySelectorAll('.product__btn');
  productBtn.forEach(el => {
    el.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      loadCartData(id);
      e.currentTarget.classList.add('product__btn--disabled');
    })
  })

  miniCartList.addEventListener('click', (e) => {
    if (e.target.classList.contains('mini-product__delete')) {
      const self = e.target;
      const parent = self.closest('.mini-cart__item');
      const price = parseInt(priceWithoutSpaces(parent.querySelector('.mini-product__price').textContent));
      const id = parent.dataset.id;
      document.querySelector(`.add-to-cart-btn[data-id="${id}"]`).classList.remove('product__btn--disabled')
      parent.remove();

      minusFullPrice(price);
      printFullPrice();
      let num = document.querySelectorAll('.mini-cart__item').length;

      if (num == 0) {
        cartCount.classList.remove('cart__count--visible');
        miniCart.classList.remove('mini-cart--visible');
      }
      printQuantity(num);
    }
  })

}
