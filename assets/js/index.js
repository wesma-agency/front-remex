/* Accordion */
const $accordions = document.querySelectorAll(".accordion");
$accordions.forEach(($accordion) => {
  const $btn = $accordion.querySelector(".accordion__btn");
  const $content = $accordion.querySelector(".accordion__content");
  const $main = $accordion.querySelector(".accordion__main");
  const delay = $accordion.dataset.accordionDelay || 500;
  let animated = false;

  $content.style.transition = `height ${delay / 1000}s`;

  $btn.addEventListener("click", () => {
    if (animated) {
      return;
    }

    animated = true;

    if (!$accordion.classList.contains("accordion--active")) {
      $btn.classList.add("accordion__btn--active");
      $accordion.classList.add("accordion--activating");
      $content.style.height = `${$main.getBoundingClientRect().height}px`;
    } else {
      $btn.classList.remove("accordion__btn--active");
      $content.style.height = `${$content.scrollHeight}px`;
      $accordion.classList.add("accordion--activating");
      setTimeout(() => ($content.style.height = "0px"));
    }

    if ($btn.dataset.toggleText) {
      const $btnSpan = $btn.querySelector("span");
      const toggleText = $btnSpan.innerText;
      $btnSpan.innerText = $btn.dataset.toggleText;
      $btn.dataset.toggleText = toggleText;
    }

    setTimeout(() => {
      animated = false;
      $accordion.classList.remove("accordion--activating");

      if (!$accordion.classList.contains("accordion--active")) {
        $content.style.height = "";
        $accordion.classList.add("accordion--active");
      } else {
        $accordion.classList.remove("accordion--active");
      }
    }, delay);
  });
});

/* Tabs */
const $tabsBtnsBoxes = document.querySelectorAll(".tabs-btns");
$tabsBtnsBoxes.forEach(($tabsBtnsBox) => {
  const $btns = $tabsBtnsBox.querySelectorAll(".tabs-btns__btn");
  $btns.forEach(($btn, index) => {
    $btn.addEventListener("click", () => {
      const tabsName = $tabsBtnsBox.dataset.tabsName;
      const $list = document.querySelector(`.tabs-list[data-tabs-name="${tabsName}"]`);

      const $oldActiveBtn = $tabsBtnsBox.querySelector(".tabs-btns__btn--active");
      const $oldActiveTab = $list.querySelector(".tabs-list__item--active");
      const $newActiveBtn = $tabsBtnsBox.querySelectorAll(".tabs-btns__btn")[index];
      const $newActiveTab = $list.querySelectorAll(".tabs-list__item")[index];

      $oldActiveTab.classList.remove("tabs-list__item--active");
      $oldActiveBtn.classList.remove("tabs-btns__btn--active");

      $newActiveBtn.classList.add("tabs-btns__btn--active");
      $newActiveTab.classList.add("tabs-list__item--active");
    });
  });
});

/* Smooth scroll */
const $anchors = document.querySelectorAll('a[href*="#"]');
$anchors.forEach(($anchor) => {
  $anchor.addEventListener("click", (e) => {
    const id = $anchor.getAttribute("href");
    const headerHeight = Math.max(document.querySelector(".header__hover").offsetHeight, 80);

    if (id[0] === "#") {
      e.preventDefault();
    }

    if (id === "#") {
      return;
    }

    const $elem = document.querySelector(id);
    if ($elem) {
      const offsetTop = $elem.getBoundingClientRect().top - headerHeight;
      window.scrollBy({ top: offsetTop, left: 0, behavior: "smooth" });
    }
  });
});

/* Dropdown */
const $dropdowns = document.querySelectorAll(".dropdown");
$dropdowns.forEach(($dropdown) => {
  const $btn = $dropdown.querySelector(".dropdown__btn");
  $btn.addEventListener("click", () => {
    $btn.classList.toggle("dropdown__btn--active");
    $dropdown.classList.toggle("dropdown--active");
  });

  const $closeBtn = $dropdown.querySelector(".dropdown__close");
  $closeBtn?.addEventListener("click", () => $dropdown.classList.remove("dropdown--active"));
});

window.addEventListener("click", (e) => {
  const $activeDropdown = document.querySelector(".dropdown--active");
  const isInner = e.target.closest(".dropdown") && !e.target.classList.contains("dropdown");
  if (!$activeDropdown || isInner) {
    return;
  }

  $activeDropdown.classList.remove("dropdown--active");

  const $btn = $activeDropdown.querySelector(".dropdown__btn");
  $btn.classList.remove("dropdown__btn--active");
});

/* Scrollbar */
Scrollbar.initAll({
  alwaysShowTracks: true,
  continuousScrolling: false,
  damping: 0.08,
});

/* Modal */
const absoluteSelectors = ".header__hover";
const $openBtns = document.querySelectorAll(".js-open-modal");
$openBtns.forEach(($btn) => {
  $btn.addEventListener("click", () => {
    const name = $btn.dataset.modalName;
    const $modal = document.querySelector(`.modal-new[data-name="${name}"`);
    if (!name || !$modal) {
      return;
    }

    $modal.classList.add("modal-new--active");
    lockBody(absoluteSelectors);
  });
});

const $modals = document.querySelectorAll(".modal-new");
$modals.forEach(($modal) => {
  $modal.classList.add("modal-new--show");

  const $closeBtn = $modal.querySelector(".modal-new__close");
  $closeBtn.addEventListener("click", () => {
    $modal.classList.remove("modal-new--active");
    $modal.addEventListener("transitionend", () => unlockBody(absoluteSelectors), { once: true });
  });

  $modal.addEventListener("click", (e) => {
    if ($modal === e.target || e.target.classList.contains("modal-new__dialog")) {
      $modal.classList.remove("modal-new--active");
      $modal.addEventListener("transitionend", () => unlockBody(absoluteSelectors), { once: true });
    }
  });
});

/* Input */
const $inputs = document.querySelectorAll(".input");
$inputs.forEach(($input) => {
  const $field = $input.querySelector(".input__field");
  const $placeholder = $input.querySelector(".input__placeholder");
  $input.addEventListener("input", function () {
    if (!$placeholder) {
      return;
    }

    if ($field.value == "") {
      $placeholder.classList.remove("input__placeholder--hide");
    } else {
      $placeholder.classList.add("input__placeholder--hide");
    }
  });
});

/* Form validate */
const $forms = document.querySelectorAll(".js-form");
$forms.forEach(($form) => {
  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isError = false;
    const $items = $form.querySelectorAll(".js-form-input");
    $items.forEach(($item) => {
      const $input = $item.querySelector(".input__field");
      const validateType = $input.dataset.validate;

      if (validateType && !validateEmpty($input)) {
        $item.classList.add("input--error");
        isError = true;
        return;
      }
    });
  });

  const $formItems = $form.querySelectorAll(".js-form-input");
  $formItems.forEach(($item) => {
    const $input = $item.querySelector(".input__field");
    $input.addEventListener("focus", () => {
      $item.classList.remove("input--error");
    });
  });
});

function validateEmpty($input) {
  if ($input.value.length < 1) {
    return false;
  }

  return true;
}

/* Categories */
const $categoriesToggleAllBtns = document.querySelectorAll(".categories__toggle-all");
let categoriesToggleAnimate = false;
$categoriesToggleAllBtns.forEach(($categoriesToggleAll) => {
  $categoriesToggleAll.addEventListener("click", () => {
    if (categoriesToggleAnimate) {
      return;
    }

    categoriesToggleAnimate = true;
    setTimeout(() => {
      categoriesToggleAnimate = false;
    }, $categoriesToggleAll.dataset.toggleDelay);
    const $toggleBtns = document.querySelectorAll(".category__list-toggle");
    if ($categoriesToggleAll.classList.contains("categories__toggle-all--active")) {
      $toggleBtns.forEach(($btn) => {
        if ($btn.classList.contains("accordion__btn--active")) {
          $btn.click();
        }
      });
    } else {
      const $toggleBtns = document.querySelectorAll(".category__list-toggle");
      $toggleBtns.forEach(($btn) => {
        if (!$btn.classList.contains("accordion__btn--active")) {
          $btn.click();
        }
      });
    }

    $categoriesToggleAll.classList.toggle("categories__toggle-all--active");

    const $toggleSpan = $categoriesToggleAll.querySelector("span");
    const toggleText = $toggleSpan.innerText;
    $toggleSpan.innerText = $categoriesToggleAll.dataset.toggleText;
    $categoriesToggleAll.dataset.toggleText = toggleText;
  });
});

/**
 * Custom range input
 */
const $priceFilters = document.querySelectorAll(".price-filter");
$priceFilters.forEach(($filter) => {
  const $slider = $filter.querySelector(".price-filter__slider");

  const data = {
    min: +$slider.dataset.min,
    max: +$slider.dataset.max,
    startMin: +$slider.dataset.startMin,
    startMax: +$slider.dataset.startMax,
    step: +$slider.dataset.step,
  };

  noUiSlider.create($slider, {
    start: [data.startMin, data.startMax],
    connect: true,
    step: data.step,
    range: {
      min: data.min,
      max: data.max,
    },
    format: {
      from: function (value) {
        return parseInt(value);
      },
      to: function (value) {
        return parseInt(value);
      },
    },
  });

  const $minInput = $filter.querySelector(".price-filter__input--min");
  const $maxInput = $filter.querySelector(".price-filter__input--max");
  $minInput.addEventListener("blur", () => {
    $slider.noUiSlider.set($minInput.value);
  });

  $maxInput.addEventListener("blur", () => {
    $slider.noUiSlider.set([null, $maxInput.value]);
  });

  $slider.noUiSlider.on("update", function (values, handle, unencoded) {
    $minInput.value = values[0];
    $maxInput.value = values[1];
  });
});

/* Filter */
const $filtersBtns = document.querySelectorAll(".filter__btn");
$filtersBtns.forEach(($filterBtn) => {
  const $filter = $filterBtn.closest(".filter");
  $filterBtn.addEventListener("click", () => {
    $filter.classList.toggle("filter--inactive");
  });
});

const filterCheckboxesMoreBtns = document.querySelectorAll(".filter__checkboxes-more");
filterCheckboxesMoreBtns.forEach(($btn) => {
  $btn.addEventListener("click", () => {
    const $checkboxes = $btn.closest(".filter__checkboxes");
    $checkboxes.classList.add("filter__checkboxes--active");
  });
});

/* Sort */
const $sortBtns = document.querySelectorAll(".sort__btn");
$sortBtns.forEach(($btn) => {
  const $sort = $btn.closest(".sort");

  $btn.addEventListener("click", () => {
    const $activeSort = document.querySelector(".sort--active");
    if ($activeSort) {
      $activeSort.classList.remove("sort--active");
    }

    $sort.classList.toggle("sort--active");
  });

  const $inputs = $sort.querySelectorAll(".sort__menu-item-input");
  $inputs.forEach(($input) => {
    $input.addEventListener("change", (e) => {
      const $btnText = $btn.querySelector(".sort__btn-text");

      if (e.target.dataset.text) {
        $btnText.innerText = e.target.dataset.text;
      }

      $sort.classList.remove("sort--active");
    });
  });
});

window.addEventListener("click", (e) => {
  const $activeSort = document.querySelector(".sort--active");

  const isInner = e.target.closest(".sort") && !e.target.classList.contains("sort");
  if (!$activeSort || isInner) {
    return;
  }

  $activeSort.classList.remove("sort--active");
});

/* Catalog products sizes */
const $catalogProducts = document.querySelectorAll(".catalog__products-item");
const $productsSizesBtns = document.querySelectorAll(".catalog__products-size");
$productsSizesBtns.forEach(($sizeBtn) => {
  $sizeBtn.addEventListener("click", () => {
    if ($sizeBtn.classList.contains("catalog__products-size--active")) {
      return;
    }

    const $oldActiveBtn = document.querySelector(".catalog__products-size--active");
    $oldActiveBtn?.classList.remove("catalog__products-size--active");

    $sizeBtn.classList.add("catalog__products-size--active");

    if ($sizeBtn.classList.contains("catalog__products-size--line")) {
      $catalogProducts.forEach(($product) => $product.classList.add("product-card--line", "catalog__products-item--line"));
    } else {
      $catalogProducts.forEach(($product) => $product.classList.remove("product-card--line", "catalog__products-item--line"));
    }
  });
});

/* Product card */
const $productCards = document.querySelectorAll(".product-card");
$productCards.forEach(($productCard) => {
  const $controls = $productCard.querySelector(".product-card__controls");
  if ($controls) {
    const $addBtn = $controls.querySelector(".product-card__add");
    $addBtn?.addEventListener("click", () => {
      const $controlsAdded = $controls.querySelector(".product-card__added");
      if (!$controlsAdded) {
        return;
      }

      $footerControls?.classList.add("product-card__footer-controls--active");
      $controls.classList.add("product-card__controls--active");
    });
  }

  const $footerControls = $productCard.querySelector(".product-card__footer-controls");
  if ($footerControls) {
    const $footerAddBtn = $footerControls.querySelector(".product-card__add");
    $footerAddBtn.addEventListener("click", () => {
      const $controlsAdded = $footerControls.querySelector(".product-card__added");
      if (!$controlsAdded) {
        return;
      }

      $controls?.classList.add("product-card__controls--active");
      $footerControls.classList.add("product-card__footer-controls--active");
    });
  }
});

/* Counter */
const $counters = document.querySelectorAll(".counter");
$counters.forEach(($counter) => {
  const $btnMinus = $counter.querySelector(".counter__btn--minus");
  const $btnPlus = $counter.querySelector(".counter__btn--plus");
  const $input = $counter.querySelector(".counter__input");

  $input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });

  $input.addEventListener("blur", function () {
    $input.value = $input.value === "" ? 0 : $input.value;
  });

  $btnMinus.addEventListener("click", function (e) {
    e.preventDefault();
    if ($btnMinus.parentNode.querySelector("input").value > "0") {
      $btnMinus.nextElementSibling.stepDown();
    }
  });

  $btnPlus.addEventListener("click", function (e) {
    e.preventDefault();
    $btnPlus.previousElementSibling.stepUp();
  });
});

/* Product */
const $product = document.querySelector(".product");
if ($product) {
  const navSlider = new Swiper(".product__other-slider", {
    slidesPerView: "auto",
  });

  new Swiper(".product__main-img-slider", {
    effect: "fade",
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    thumbs: {
      swiper: navSlider,
    },
    mousewheel: {
      sensitivity: 1.4,
    },
  });
}

/* Cart controls */
const $cartControls = document.querySelectorAll(".cart-controls");
$cartControls.forEach(($controls) => {
  const $addBtn = $controls.querySelector(".cart-controls__add");
  $addBtn?.addEventListener("click", () => {
    const $controlsAdded = $controls.querySelector(".cart-controls__added");
    if (!$controlsAdded) {
      return;
    }

    $controls.classList.add("cart-controls--active");
  });
});

/* Product colors */
const $productColors = document.querySelectorAll(".product-colors__item");
$productColors.forEach(($color) => {
  $color.addEventListener("mouseenter", () => {
    const num = $color.dataset.num;
    const type = $color.dataset.type;
    const label = $color.dataset.label;
    const value = $color.dataset.value;
    const backgroundColor = $color.dataset.backgroundColor;
    const color = $color.dataset.color;
    const $oldInfo = $color.querySelector(".product-colors__item-modal");

    if ($oldInfo) {
      $oldInfo.remove();
    }

    const $colorInfo = createColorInfo({
      num,
      type,
      label,
      value,
      backgroundColor: backgroundColor,
      color: color,
    });
    $color.appendChild($colorInfo);
  });

  $color.addEventListener("mouseleave", () => {
    const $oldInfo = $color.querySelector(".product-colors__item-modal");
    if ($oldInfo) {
      $oldInfo.remove();
    }
  });
});

function createColorInfo({ num = "", type = "", label = "", value = "", backgroundColor = "rgb(255, 255, 255)", color = "#fff" }) {
  const $colorInfo = document.createElement("div");
  $colorInfo.classList.add("color-info", "product-colors__item-modal");
  $colorInfo.innerHTML = `
    <div class="color-info__num" style="background-color: ${backgroundColor}; color: ${color}">${num}</div>
    <div class="color-info__main">
      <div class="text text--xs text--light  text--lh-1 color-info__type">${type}</div>
      <div class="text color-info__label">${label}</div>
      <div class="text text--light text--sm text--lh-1 color-info__value">${value}</div>
    </div>
  `;

  return $colorInfo;
}

const catalogBtn = document.querySelector(".catalog-btn");
const cattest = document.querySelector(".cattest");
const podmenu = document.querySelector(".podmenu");
catalogBtn.addEventListener("click", () => {
  catalogBtn.classList.toggle("active");
  cattest.classList.toggle("active");
  podmenu.classList.toggle("active");
});
cattest.addEventListener("click", () => {
  catalogBtn.classList.toggle("active");
  cattest.classList.toggle("active");
  podmenu.classList.toggle("active");
});
window.addEventListener("click", (e) => {
  if (e.target.closest(".catalog-btn")) {
    return;
  }

  const $activePodmenu = document.querySelector(".podmenu.active");
  const isInner = e.target.closest(".podmenu") && !e.target.classList.contains("podmenu");
  if (!$activePodmenu || isInner) {
    return;
  }

  $activePodmenu.classList.remove("active");

  catalogBtn.classList.remove("active");
});

const headert = document.querySelector(".header");
const buttonzz = document.querySelectorAll(".product-card__controls");
const buttonzz1 = document.querySelectorAll(".add");
moveHeaderHandler();
window.addEventListener("scroll", moveHeaderHandler);

function moveHeaderHandler() {
  if (window.scrollY >= 400) {
    headert.classList.add("dvij");
    podmenu.classList.add("act");
  } else {
    headert.classList.remove("dvij");
    podmenu.classList.remove("act");
  }
}

/* Sliders */
var slider = new Swiper(".slider .swiper", {
  direction: "horizontal",
  spaceBetween: 500,
  slidesPerView: 1,
  // centeredSlides: true,
  loop: true,

  // If we need pagination
  pagination: {
    el: ".slider .swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var slider1 = new Swiper(".slider2 .swiper", {
  direction: "horizontal",
  spaceBetween: 30,
  slidesPerView: 4,
  // centeredSlides: true,
  // loop: true,
  autoplay: {
    delay: 2000,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".slider2 .swiper-button-next",
    prevEl: ".slider2 .swiper-button-prev",
  },
});
var slider11 = new Swiper(".slider22 .swiper", {
  direction: "horizontal",
  spaceBetween: 30,
  slidesPerView: 4,
  // centeredSlides: true,
  // loop: true,
  autoplay: {
    delay: 2000,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".slider22 .swiper-button-next",
    prevEl: ".slider22 .swiper-button-prev",
  },
});
var slider2 = new Swiper(".slider3 .swiper", {
  direction: "horizontal",
  spaceBetween: 30,
  slidesPerView: 6,
  // centeredSlides: true,
  // loop: true,
  // If we need pagination
  pagination: {
    el: ".slider3 .swiper-pagination",
    clickable: true,
  },
});
var slider3 = new Swiper(".slider4 .swiper", {
  direction: "horizontal",
  spaceBetween: 30,
  slidesPerView: 3,
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const openModalBtn = document.querySelectorAll(".openModalBtn");
const openModalBtn1 = document.querySelector(".openModalBtn1");
const openModalBtn2 = document.querySelector(".openModalBtn2");
const modal = document.getElementById("myModal");
const modal1 = document.getElementById("myModal1");
const modal2 = document.getElementById("myModal2");
const modalBackground = document.getElementById("modalBackground");
const close = document.querySelectorAll(".popup__close");
openModalBtn.forEach((item) => {
  item.addEventListener("click", () => {
    modal.style.display = "block";
    modalBackground.style.display = "block";
  });
});

openModalBtn1.addEventListener("click", () => {
  modal1.style.display = "block";
  modalBackground.style.display = "block";
});
openModalBtn2.addEventListener("click", () => {
  modal2.style.display = "block";
  modalBackground.style.display = "block";
});

modalBackground.addEventListener("click", () => {
  modal.style.display = "none";
  modal1.style.display = "none";
  modal2.style.display = "none";
  modalBackground.style.display = "none";
});
close.forEach((item) => {
  item.addEventListener("click", () => {
    modal.style.display = "none";
    modal1.style.display = "none";
    modal2.style.display = "none";
    modalBackground.style.display = "none";
  });
});
const popupItem = document.querySelectorAll(".popup__item");

popupItem.forEach((item) => {
  const inputLabel = item.querySelector(".popup__item-label");
  const inputField = item.querySelector(".popup__item-input");
  inputField.addEventListener("input", function () {
    if (inputField.value.length > 0) {
      inputLabel.style.opacity = "1";
    } else {
      inputLabel.style.opacity = "0";
    }
  });

  inputField.addEventListener("focus", function () {
    if (inputField.value.length === 1) {
      inputLabel.style.opacity = "1";
    }
  });
});

let popupForm = document.querySelectorAll(".popup");
popupForm.forEach((item) => {
  let submitButton = item.querySelector(".submit");
  if (submitButton) {
    let inputField = item.querySelectorAll("input");
    submitButton.addEventListener("click", function () {
      inputField.forEach((input) => {
        let error = input.nextElementSibling;
        if (input.value.length < 1) {
          error.classList.add("show");
        } else {
          error.classList.remove("show");
        }
      });
    });
  }
});

/* Helpers */
function lockBody(absoluteSelectors) {
  const scrollbarWidthPX = `${getScrollbarWidth()}px`;

  document.body.classList.add("body--lock");
  document.body.style.paddingRight = scrollbarWidthPX;

  const $absoluteElems = document.querySelectorAll(absoluteSelectors);
  $absoluteElems.forEach(($elem) => ($elem.style.paddingRight = scrollbarWidthPX));
}

function unlockBody(absoluteSelectors) {
  document.body.classList.remove("body--lock");
  document.body.style.paddingRight = "";

  const $absoluteElems = document.querySelectorAll(absoluteSelectors);
  $absoluteElems.forEach(($elem) => ($elem.style.paddingRight = ""));
}

function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}
