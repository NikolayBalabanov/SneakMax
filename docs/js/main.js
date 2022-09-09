"use strict";var burger=document.querySelector(".burger"),menu=document.querySelector(".header__nav"),navLinks=document.querySelectorAll(".header__nav .nav__item .nav__link");function disableScroll(){var e=window.scrollY;document.body.classList.add("disable-scroll"),document.body.dataset.position=e,document.body.style.top=-e+"px"}function enableScroll(){var e=parseInt(document.body.dataset.position,10);document.body.style.top="auto",document.body.classList.remove("disable-scroll"),window.scroll({top:e,left:0}),document.body.removeAttribute("data-position")}window.addEventListener("resize",(function(){if(document.body.clientWidth<=1024)new SimpleBar(menu)})),navLinks.forEach((function(e){e.addEventListener("click",(function(){burger.classList.remove("burger--active"),menu.classList.remove("header__nav--active"),enableScroll()}))})),burger.addEventListener("click",(function(){burger.classList.toggle("burger--active"),menu.classList.toggle("header__nav--active"),burger.classList.contains("burger--active")?disableScroll():enableScroll()}));var cartBtn=document.querySelector(".cart__btn"),miniCart=document.querySelector(".mini-cart");cartBtn.addEventListener("click",(function(){miniCart.classList.add("mini-cart--visible")})),document.addEventListener("click",(function(e){e.target.classList.contains("mini-cart")||e.target.closest(".mini-cart")||e.target.classList.contains("mini-product__delete")||e.target.classList.contains("cart__btn")||miniCart.classList.remove("mini-cart--visible")}));var catalogMenu=document.querySelector(".catalog__show"),catalogLeft=document.querySelector(".catalog__left");catalogMenu.addEventListener("click",(function(){catalogMenu.classList.toggle("catalog__show--active"),catalogLeft.classList.toggle("catalog__left--active")}));var accordions=document.querySelectorAll(".faq-accordion");function _createForOfIteratorHelper(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw o}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}accordions.forEach((function(e){e.addEventListener("click",(function(e){var t=e.currentTarget,n=t.querySelector(".faq-accordion__control"),r=t.querySelector(".faq-accordion__content");t.classList.toggle("open"),t.classList.contains("open")?(n.setAttribute("aria-expanded",!0),r.setAttribute("aria-hidden",!1),r.style.maxHeight=r.scrollHeight+"px"):(n.setAttribute("aria-expanded",!1),r.setAttribute("aria-hidden",!0),r.style.maxHeight=null)}))})),document.addEventListener("DOMContentLoaded",(function(){var e=0;window.addEventListener("scroll",(function(){if(window.scrollY>=document.querySelector("#map").offsetTop-500&&0===e){ymaps.ready((function(){new ymaps.Map("map",{center:[55.76,37.64],zoom:7}).behaviors.disable("scrollZoom")})),e=1}}))}));var catalogList=document.querySelector(".catalog-list"),catalogMore=document.querySelector(".catalog__more"),prodModal=document.querySelector('[data-graph-target="prod-modal"] .modal__content'),prodModalSlider=prodModal.querySelector(".modal-slider .swiper-wrapper"),prodModalPreview=prodModal.querySelector(".modal-slider .modal-preview"),prodModalInfo=prodModal.querySelector(".modal-info__wrapper"),prodModalDescr=prodModal.querySelector(".modal-prod-descr"),prodModalChars=prodModal.querySelector(".prod-chars"),prodModalVideo=prodModal.querySelector(".prod-modal__video"),prodQuantity=5,dataLength=null,modal=null,normalPrice=function(e){return String(e).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")},prodSlider=new Swiper(".modal-slider__container",{slidesPerView:1,spaceBetween:20});if(catalogList){var loadProducts=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5;fetch("data.json").then((function(e){return e.json()})).then((function(t){dataLength=t.length,catalogList.innerHTML="";for(var n=0;n<dataLength;n++)if(n<e){var r=t[n];catalogList.innerHTML+='\n            <li class="catalog-list__item">\n              <article class="product">\n                <div class="product__image">\n                  <img src="'.concat(r.mainImage,'" loading="lazy" alt="').concat(r.title,'">\n                  <div class="product__btns">\n                    <button class="btn-reset product__btn" data-id="').concat(r.id,'" data-graph-path="prod-modal" aria-label="Показать информацию о товаре">\n                      <svg>\n                        <use xlink:href="img/sprite.svg#eye"></use>\n                      </svg>\n                    </button>\n                    <button class="btn-reset product__btn add-to-cart-btn" data-id="').concat(r.id,'" aria-label="Добавить товар в карзину">\n                      <svg>\n                        <use xlink:href="img/sprite.svg#cart"></use>\n                      </svg>\n                    </button>\n                  </div>\n                </div>\n                <h3 class="product__title">').concat(r.title,'</h3>\n                <span class="product__price">').concat(normalPrice(r.price)," р</span>\n              </article>\n            </li>")}})).then((function(){document.querySelectorAll(".product__title").forEach((function(e){$clamp(e,{clamp:"22px"})})),document.querySelectorAll(".product__btn").forEach((function(e){e.addEventListener("focus",(function(e){e.currentTarget.closest(".product__btns").classList.add("product__btns--active")}),!0),e.addEventListener("blur",(function(e){e.currentTarget.closest(".product__btns").classList.remove("product__btns--active")}),!0)})),cartLogic(),modal=new GraphModal({isOpen:function(e){if(e.modalContainer.classList.contains("prod-modal")){var t=e.previousActiveElement.dataset.id;loadModalData(t),prodSlider.update()}}})}))};loadProducts(prodQuantity);var loadModalData=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;fetch("data.json").then((function(e){return e.json()})).then((function(t){prodModalSlider.innerHTML="",prodModalPreview.innerHTML="",prodModalInfo.innerHTML="",prodModalDescr.textContent="",prodModalChars.innerHTML="",prodModalVideo.innerHTML="";var n,r=_createForOfIteratorHelper(t);try{var a=function(){var t=n.value;if(t.id==e){var r=t.gallery.map((function(e,n){return'\n              <div class="swiper-slide" data-index="'.concat(n,'">\n                <img src="').concat(e,'" loading="lazy" alt="').concat(t.title,'">\n              </div>\n              ')})),a=t.gallery.map((function(e,t){return'\n                <div class="modal-preview__item '.concat(0===t?"modal-preview__item--active":"",'" tabindex="0" data-index="').concat(t,'">\n                  <img src="').concat(e,'" loading="lazy" alt="preview ').concat(t+1,'" data-index="0">\n                </div>\n              ')})),o=t.sizes.map((function(e){return'\n              <li class="modal-sizes__item">\n                <button class="modal-sizes__btn btn-reset">'.concat(e,"</button>\n              </li>\n              ")}));prodModalSlider.innerHTML=r.join(""),prodModalPreview.innerHTML=a.join(""),prodModalInfo.innerHTML='\n              <h3 class="modal-info__title">'.concat(t.title,'</h3>\n              <div class="modal-info__rate">\n                <img src="img/star.svg" loading="lazy" alt="Рейтинг 5 из 5">\n                <img src="img/star.svg" loading="lazy" alt="">\n                <img src="img/star.svg" loading="lazy" alt="">\n                <img src="img/star.svg" loading="lazy" alt="">\n                <img src="img/star.svg" loading="lazy" alt="">\n              </div>\n              <div class="modal-info__sizes">\n                <span class="modal-info__subtitle">Выберите размер</span>\n                <ul class="list-reset modal-info__sizes-list modal-sizes">\n                  ').concat(o.join(""),'\n                </ul>\n              </div>\n              <div class="modal-info__price">\n                <span class="modal-info__current-price">').concat(t.price,' p</span>\n                <span class="modal-info__old-price">').concat(t.oldPrice?t.oldPrice+" p":"","</span>\n              </div>\n            "),prodModalDescr.textContent=t.description;var i="";Object.keys(t.chars).forEach((function(e){i+='<p class="prod-bottom__descr prod-chars__item">'.concat(e,": ").concat(t.chars[e],"</p>")})),prodModalChars.innerHTML=i,t.video?(prodModalVideo.style.display="block",prodModalVideo.innerHTML='<iframe class="prod-modal__video" src="'.concat(t.video,'" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')):prodModalVideo.style.display="none"}};for(r.s();!(n=r.n()).done;)a()}catch(e){r.e(e)}finally{r.f()}})).then((function(){prodSlider.update(),prodSlider.on("slideChangeTransitionEnd",(function(){var e=document.querySelectorAll(".swiper-slide-active").dataset.index;document.querySelectorAll(".modal-preview__item").forEach((function(e){e.classList.remove("modal-preview__item--active")})),document.querySelector('.modal-preview__item[data-index="'.concat(e,'"]')).classList.add("modal-preview__item--active")})),document.querySelectorAll(".modal-preview__item").forEach((function(e){e.addEventListener("click",(function(e){var t=parseInt(e.currentTarget.dataset.index);document.querySelectorAll(".modal-preview__item").forEach((function(e){e.classList.remove("modal-preview__item--active")})),e.currentTarget.classList.add("modal-preview__item--active"),prodSlider.slideTo(t)}))}))}))};catalogMore.addEventListener("click",(function(e){loadProducts(prodQuantity+=3),catalogMore.style.display=prodQuantity>=dataLength?"none":"block"}))}var price=0,miniCartList=document.querySelector(".mini-cart__list"),fullPrice=document.querySelector(".mini-cart__summ"),cartCount=document.querySelector(".cart__count"),priceWithoutSpaces=function(e){return e.replace(/\s/g,"")},plusFullPrice=function(e){return price+=e},minusFullPrice=function(e){return price-=e},printFullPrice=function(){fullPrice.textContent="".concat(normalPrice(price)," р")},printQuantity=function(e){cartCount.textContent=e},loadCartData=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;fetch("data.json").then((function(e){return e.json()})).then((function(t){var n,r=_createForOfIteratorHelper(t);try{for(r.s();!(n=r.n()).done;){var a=n.value;if(a.id==e)return miniCartList.insertAdjacentHTML("afterbegin",'\n            <li class="mini-cart__item" data-id="'.concat(a.id,'">\n              <article class="mini-cart__product mini-product">\n                <div class="mini-product__image">\n                  <img src="').concat(a.mainImage,'" loading="lazy" alt="').concat(a.title,'">\n                </div>\n                <div class="mini-product__content">\n                  <div class="mini-product__text">\n                    <h3 class="mini-product__title">').concat(a.title,'</h3>\n                    <span class="mini-product__price">').concat(normalPrice(a.price),' р</span>\n                  </div>\n                  <button class="btn-reset mini-product__delete" aria-label="Удалить товар">\n                    Удалить\n                    <svg>\n                      <use xlink:href="img/sprite.svg#trash"></use>\n                    </svg>\n                  </button>\n                </div>\n              </article>\n            </li>\n          ')),a}}catch(e){r.e(e)}finally{r.f()}})).then((function(e){plusFullPrice(e.price),printFullPrice();var t=document.querySelectorAll(".mini-cart__list .mini-cart__item").length;t>0&&cartCount.classList.add("cart__count--visible"),printQuantity(t)}))},cartLogic=function(){document.querySelectorAll(".add-to-cart-btn").forEach((function(e){e.addEventListener("click",(function(e){var t=e.currentTarget.dataset.id;loadCartData(t),document.querySelector(".cart__btn").classList.remove("cart__btn--inactive"),e.currentTarget.classList.add("product__btn--disabled")}))})),miniCartList.addEventListener("click",(function(e){if(e.target.classList.contains("mini-product__delete")){var t=e.target.closest(".mini-cart__item"),n=parseInt(priceWithoutSpaces(t.querySelector(".mini-product__price").textContent)),r=t.dataset.id;document.querySelector('.add-to-cart-btn[data-id="'.concat(r,'"]')).classList.remove("product__btn--disabled"),t.remove(),minusFullPrice(n),printFullPrice();var a=document.querySelectorAll(".mini-cart__list .mini-cart__item").length;0==a&&(cartCount.classList.remove("cart__count--visible"),miniCart.classList.remove("mini-cart--visible"),document.querySelector(".cart__btn").classList.add("cart__btn--inactive")),printQuantity(a)}}))},openOrderModal=document.querySelector(".mini-cart__btn"),orderModalList=document.querySelector(".cart-modal-order__list"),orderModalQuantity=document.querySelector(".cart-modal-order__quantity span"),orderModalSumm=document.querySelector(".cart-modal-order__summ span"),orderModalShow=document.querySelector(".cart-modal-order__show");function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _createForOfIteratorHelper(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw o}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}openOrderModal.addEventListener("click",(function(){var e=document.querySelector(".mini-cart__list").innerHTML;orderModalList.innerHTML=e,orderModalQuantity.textContent="".concat(document.querySelectorAll(".mini-cart__list .mini-cart__item").length," шт"),orderModalSumm.textContent="".concat(fullPrice.textContent)})),orderModalShow.addEventListener("click",(function(){orderModalList.classList.contains("cart-modal-order__list--visible")?(orderModalList.classList.remove("cart-modal-order__list--visible"),orderModalShow.classList.remove("cart-modal-order__show--active")):(orderModalList.classList.add("cart-modal-order__list--visible"),orderModalShow.classList.add("cart-modal-order__show--active"))})),orderModalList.addEventListener("click",(function(e){if(e.target.classList.contains("mini-product__delete")){var t=e.target.closest(".mini-cart__item"),n=parseInt(priceWithoutSpaces(t.querySelector(".mini-product__price").textContent)),r=t.dataset.id;document.querySelector('.add-to-cart-btn[data-id="'.concat(r,'"]')).classList.remove("product__btn--disabled"),setTimeout((function(){t.remove(),document.querySelector('.mini-cart__item[data-id="'.concat(r,'"]')).remove()}),100),minusFullPrice(n),printFullPrice(),setTimeout((function(){var e=document.querySelectorAll(".cart-modal-order__list .mini-cart__item").length;0==e&&(cartCount.classList.remove("cart__count--visible"),miniCart.classList.remove("mini-cart--visible"),document.querySelector(".cart__btn").classList.add("cart__btn--inactive"),modal.close()),orderModalQuantity.textContent="".concat(e," шт"),orderModalSumm.textContent="".concat(fullPrice.textContent),printQuantity(e)}),100)}}));var quizFormData=null,textareaText=null,quizData=[{number:1,title:"Какой тип кроссовок рассматриваете?",answer_alias:"type",answers:[{answer_title:"кеды",type:"checkbox"},{answer_title:"кеды",type:"checkbox"},{answer_title:"кеды",type:"checkbox"},{answer_title:"кеды",type:"checkbox"},{answer_title:"кеды",type:"checkbox"},{answer_title:"кеды",type:"checkbox"}]},{number:2,title:"Какой размер вам подойдет?",answer_alias:"size",answers:[{answer_title:"менее 36",type:"checkbox"},{answer_title:"36-38",type:"checkbox"},{answer_title:"39-41",type:"checkbox"},{answer_title:"42-44",type:"checkbox"},{answer_title:"45 и больше",type:"checkbox"}]},{number:3,title:"Уточните какие-либо моменты",answer_alias:"message",answers:[{answer_title:"Введите сообщение",type:"textarea"}]}],quizTemplate=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2?arguments[2]:void 0,r=e.number,a=e.title,o=n.nextBtnText,i=e.answers.map((function(t){return"checkbox"===t.type?'\n        <li class="quiz-question__item">\n          <img src="img/sneaker.jpg" loading="lazy" alt="product-pic">\n          <label class="custom-checkbox quiz-question__label">\n            <input type="'.concat(t.type,'" class="custom-checkbox__field data-valid="false quiz-question__answer" name="').concat(e.answer_alias,'" ').concat("text"==t.type?'placeholder="Введите ваш вариант"':"",' value="').concat("text"!==t.type?t.answer_title:"",'"">\n            <span class="custom-checkbox__content">').concat(t.answer_title,"</span>\n          </label>\n        </li>\n      "):"textarea"===t.type?'\n        <label class="quiz-question__label">\n          <textarea placeholder="'.concat(t.answer_title,'" class="quiz-question__message" name="').concat(e.answer_alias,'"></textarea>\n        </label>\n      '):'\n        <label class="quiz-question__label">\n          <input type="'.concat(t.type,'" data-valid="false" class="quiz-question__answer" name="').concat(e.answer_alias,'" ').concat("text"==t.type?'placeholder="Введите ваш вариант"':"",' value="').concat("text"!==t.type?t.answer_title:"",'">\n          <span>').concat(t.answer_title,"</span>\n        </label>\n      ")}));return'\n    <div class="quiz-question">\n      <h3 class="quiz-question__title">'.concat(a,'</h3>\n      <ul class="quiz-question__answers list-reset">\n        ').concat(i.join(""),'\n      </ul>\n      <div class="quiz-bottom">\n        <div class="quiz__count">').concat(r," из ").concat(t,'</div>\n        <button type="button" class="quiz-question__btn btn btn-reset btn--thirdly" data-next-btn>').concat(o,"</button>\n      </div>\n    </div>\n\t  ")},Quiz=function(){function e(t,n,r){_classCallCheck(this,e),this.$el=document.querySelector(t),this.options=r,this.data=n,this.counter=0,this.dataLength=this.data.length,this.resultArray=[],this.tmp={},this.init(),this.events()}return _createClass(e,[{key:"init",value:function(){this.$el.innerHTML=quizTemplate(this.data[this.counter],this.dataLength,this.options)}},{key:"nextQuestion",value:function(){var e=this;this.valid()?this.counter+1<this.dataLength?(this.counter++,this.$el.innerHTML=quizTemplate(this.data[this.counter],this.dataLength,this.options),this.counter+1==this.dataLength&&(document.querySelector(".quiz-question__answers").style.display="block")):(document.querySelector(".quiz-questions").style.display="none",document.querySelector(".last-question").style.display="block",document.querySelector(".quiz__title").textContent="Ваша подборка готова!",document.querySelector(".quiz__descr").textContent="Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог",document.querySelector(".quiz-form").addEventListener("submit",(function(t){t.preventDefault(),quizFormData=new FormData;var n,r=_createForOfIteratorHelper(e.resultArray);try{for(r.s();!(n=r.n()).done;){var a=n.value;for(var o in a)quizFormData.append(o,a[o].substring(0,a[o].length-1))}}catch(e){r.e(e)}finally{r.f()}quizFormData.append("textarea",textareaText);var i=new XMLHttpRequest;i.onreadystatechange=function(){4===i.readyState&&200===i.status&&console.log("Отправлено")},document.querySelector(".quiz-form").querySelectorAll("input").forEach((function(e){e.value&&(i.open("POST","mail.php",!0),i.send(quizFormData),document.querySelector(".quiz-form").reset())}))}))):console.log("Не валидно!")}},{key:"events",value:function(){var e=this;this.$el.addEventListener("click",(function(t){t.target==document.querySelector("[data-next-btn]")&&(e.addToSend(),e.nextQuestion())})),this.$el.addEventListener("change",(function(t){if("INPUT"==t.target.tagName){if("checkbox"!==t.target.type&&"radio"!==t.target.type)e.$el.querySelectorAll("input").forEach((function(e){e.checked=!1}));e.tmp=e.serialize(document.querySelector(".quiz-form"))}else{var n=e.$el.querySelector("textarea");textareaText=n.value}}))}},{key:"valid",value:function(){var e=!1,t=this.$el.querySelector("textarea");return t&&t.value.length>0?e=!0:(this.$el.querySelectorAll("input").forEach((function(t){switch(t.nodeName){case"INPUT":switch(t.type){case"text":t.value?e=!0:t.classList.add("error");case"checkbox":t.checked?e=!0:t.classList.add("error");case"radio":t.checked?e=!0:t.classList.add("error")}}})),e)}},{key:"addToSend",value:function(){this.resultArray.push(this.tmp)}},{key:"serialize",value:function(e){var t,n={},r="";if("object"==_typeof(e)&&"FORM"==e.nodeName)for(var a=e.elements.length,o=0;o<a;o++)if((t=e.elements[o]).name&&!t.disabled&&"file"!=t.type&&"reset"!=t.type&&"submit"!=t.type&&"button"!=t.type)if("select-multiple"==t.type)for(j=e.elements[o].options.length-1;j>=0;j--)t.options[j].selected&&(n[n.length]=encodeURIComponent(t.name)+"="+encodeURIComponent(t.options[j].value));else("checkbox"!=t.type&&"radio"!=t.type&&t.value||t.checked)&&(r+=t.value+",",n[t.name]=r);return n}}]),e}();window.quiz=new Quiz(".quiz-form .quiz-questions",quizData,{nextBtnText:"Следующий шаг",sendBtnText:"Отправить"});var rangeSlider=document.getElementById("range-slider");if(rangeSlider){noUiSlider.create(rangeSlider,{start:[500,999999],connect:!0,step:1,range:{min:[500],max:[999999]}});var input0=document.getElementById("input-0"),input1=document.getElementById("input-1"),inputs=[input0,input1];rangeSlider.noUiSlider.on("update",(function(e,t){inputs[t].value=Math.round(e[t])}));var setRangeSlider=function(e,t){var n=[null,null];n[e]=t,rangeSlider.noUiSlider.set(n)};inputs.forEach((function(e,t){e.addEventListener("change",(function(e){setRangeSlider(t,e.currentTarget.value)}))}))}var styles=getComputedStyle(document.documentElement),colorValue=styles.getPropertyValue("--color-accent"),selector=document.querySelector('input[type="tel"]'),im=new Inputmask("+7 (999) 999-9999");im.mask(selector);var productsFormData=null,validateForms=function(e,t,n,r,a){new window.JustValidate(e,{rules:t,messages:n,colorWrong:colorValue,submitHandler:function(e){if(e.classList.contains("cart-modal__form")){productsFormData=new FormData(document.querySelector(".cart-modal__form")),document.querySelectorAll(".cart-modal-order__list .mini-cart__item").forEach((function(e,t){var n=e.querySelector(".mini-product__title").textContent,r=e.querySelector(".mini-product__price").textContent;productsFormData.append("product-".concat(t+1),"".concat(n,", ").concat(r))})),productsFormData.append("summ","".concat(document.querySelector(".cart-modal-order__summ span").textContent));var t=new XMLHttpRequest;t.onreadystatechange=function(){4===t.readyState&&200===t.status&&console.log("Отправлено")},t.open("POST","mail.php",!0),t.send(productsFormData),e.reset()}else{var n=new FormData(e),r=new XMLHttpRequest;r.onreadystatechange=function(){4===r.readyState&&200===r.status&&console.log("Отправлено")},r.open("POST","mail.php",!0),r.send(n),e.reset()}}})};validateForms(".callback-form",{name:{required:!0},phone:{required:!0}},{name:{required:"Вы должны ввести имя"},phone:{required:"Вы должны ввести телефон"}},".thanks-popup"),validateForms(".cart-modal__form",{name:{required:!0},phone:{required:!0},email:{required:!0,email:!0}},{name:{required:"Вы должны ввести имя"},phone:{required:"Вы должны ввести телефон"},email:{required:"Вы должны ввести email",email:"Вы должны ввести корректный email"}},".thanks-popup");