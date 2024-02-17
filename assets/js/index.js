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

      const $oldActiveBtn = document.querySelector(`.tabs-btns[data-tabs-name="${tabsName}"] > .tabs-btns__btn--active`);
      const $oldActiveTab = document.querySelector(`.tabs-list[data-tabs-name="${tabsName}"] > .tabs-list__item--active`);
      const $newActiveBtn = document.querySelectorAll(`.tabs-btns[data-tabs-name="${tabsName}"] > .tabs-btns__btn`)[index];
      const $newActiveTab = document.querySelectorAll(`.tabs-list[data-tabs-name="${tabsName}"] > .tabs-list__item`)[index];

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
const $scrollbarElems = document.querySelectorAll("[data-scrollbar]");
$scrollbarElems.forEach(($scrollbarElem) => {
  const options = {
    alwaysShowTracks: true,
    continuousScrolling: false,
    damping: 0.08,
  };


  if ($scrollbarElem.dataset.scrollbarContinue === '') {
    options.continuousScrolling = true;
  }

  Scrollbar.init($scrollbarElem, options);
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

    openModal($modal);
  });
});

const $modals = document.querySelectorAll(".modal-new");
$modals.forEach(($modal) => {
  $modal.classList.add("modal-new--show");

  $modal.addEventListener("click", (e) => {
    if ($modal === e.target || e.target.classList.contains("modal-new__dialog")) {
      $modal.classList.remove("modal-new--active");

      const $otherActiveModal = document.querySelector(".modal-new--active");
      if (!$otherActiveModal) {
        $modal.addEventListener("transitionend", () => unlockBody(absoluteSelectors), { once: true });
      }
    }
  });
});

const $closeBtns = document.querySelectorAll(".js-close-modal");
$closeBtns.forEach(($btn) => {
  $btn.addEventListener("click", () => {
    const name = $btn.dataset.modalClose;
    let $modal;
    if (name) {
      $modal = document.querySelector(`.modal-new[data-name="${name}"`);
    } else {
      $modal = $btn.closest(".modal-new");
    }

    $modal.classList.remove("modal-new--active");

    const $otherActiveModal = document.querySelector(".modal-new--active");
    if (!$otherActiveModal) {
      $modal.addEventListener("transitionend", () => unlockBody(absoluteSelectors), { once: true });
    }
  });
});

function openModal($modal) {
  const $otherActiveModal = document.querySelector(".modal-new--active");
  if (!$otherActiveModal) {
    lockBody(absoluteSelectors);
  } else {
    const modalBodyScrollWidth = getScrollbarWidth($otherActiveModal.querySelector(".modal-new__body"));
    $modal.querySelector(".modal-new__dialog").style.paddingRight = `${modalBodyScrollWidth}px`;
  }

  $modal.classList.add("modal-new--active");
}

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

/* IMask.js */
const $maskInputs = document.querySelectorAll(".js-imask");
$maskInputs.forEach(($input) => {
  const mask = $input.dataset.mask;
  const data = {
    mask,
  };

  IMask($input, data);
});

/* Code inputs */
const $codeInputsItems = document.querySelectorAll(".code-inputs");
$codeInputsItems.forEach(($codeInputs) => {
  const $inputs = $codeInputs.querySelectorAll(".code-inputs__input");
  const inpustMasks = [];
  $inputs.forEach(($input, index) => {
    const maskData = {
      mask: Number,
      min: 0,
      max: 9,
      autofix: true,
    };
    inpustMasks[index] = IMask($input, maskData);

    $input.addEventListener("click", () => {
      $input.select();
    });

    $input.addEventListener("input", (e) => {
      if ($input.value !== "" && index < $inputs.length - 1) {
        $inputs[index + 1].focus();
        $inputs[index + 1].select();
      }
    });

    $input.addEventListener("keydown", (e) => {
      if (e.keyCode === 8 || e.keyCode === 46) {
        if (index <= 0 || $input.value !== "") {
          return;
        }

        $inputs[index - 1].focus();
      }
    });

    $input.addEventListener("paste", (e) => {
      e.preventDefault();
      const data = e.clipboardData.getData("text/plain");
      let symbolNumber = 0;
      for (let i = index; i < $inputs.length; i++) {
        if (!data[symbolNumber] || !isNumeric(data[symbolNumber])) {
          return;
        }

        inpustMasks[i].unmaskedValue = data[symbolNumber++];
        $inputs[i].focus();
      }
    });
  });
});

/* Edit form */
const $editForms = document.querySelectorAll(".edit-form");
$editForms.forEach(($editForm) => {
  const $inputs = $editForm.querySelectorAll(".edit-form__input");
  $inputs.forEach(($input) => {
    const validateType = $input.dataset.validate;
    const $field = $input.querySelector(".edit-input__field");
    const $errorText = $input.querySelector(".edit-input__error-text");
    const initialValue = $field.value;

    $input.addEventListener("input", () => {
      if (validateType === "email") {
        if (!validateEmail($field)) {
          $input.classList.add("edit-input--error");
          $errorText.innerText = "Пожалуйста, введите корректный адрес e-mail";
        } else {
          $input.classList.remove("edit-input--error");
        }
      } else if (validateType === "phone") {
        if (!validatePhone($field)) {
          $input.classList.add("edit-input--error");
          $errorText.innerText = "Пожалуйста, введите корректный номер телефона";
        } else if ($field.value !== initialValue) {
          $editForm.classList.add("edit-form--no-confirm");
          $input.classList.remove("edit-input--error");
          $input.classList.add("edit-input--no-confirm");
          $errorText.innerText = "Пожалуйста, подтвердите номер телефона";
        } else {
          $input.classList.remove("edit-input--error", "edit-input--no-confirm");
          $editForm.classList.remove("edit-form--no-confirm");
        }
      } else {
        if (!validateEmpty($field)) {
          $input.classList.add("edit-input--error");
          $errorText.innerText = "Поле обязательно для заполнения";
        } else {
          $input.classList.remove("edit-input--error");
        }
      }
    });

    const $btn = $input.querySelector(".edit-input__btn");
    $btn.addEventListener("click", () => {
      $field.focus();
      $field.selectionStart = $field.selectionEnd = $field.value.length;
    });
  });

  $editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const $errorField = $editForm.querySelector(".edit-input--error");
    const submitModal = $editForm.dataset.submitModal;
    if ($errorField || !submitModal) {
      return;
    }

    const $modal = document.querySelector(`.modal-new[data-name="${submitModal}"`);
    openModal($modal);
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

      if (validateType === "phone" && !validatePhone($input)) {
        $item.classList.add("input--error");
        isError = true;
        return;
      } else if (validateType && !validateEmpty($input)) {
        $item.classList.add("input--error");
        isError = true;
        return;
      }
    });

    const submitModal = $form.dataset.submitModal;
    if (isError || !submitModal) {
      return;
    }

    const $modal = document.querySelector(`.modal-new[data-name="${submitModal}"`);
    openModal($modal);
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

function validatePhone($input) {
  if ($input.value.length < 18) {
    return false;
  }

  return true;
}

function validateEmail($input) {
  return String($input.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
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

/* Copy btn */
const $copyBtns = document.querySelectorAll(".js-btn-copy");
$copyBtns.forEach(($btn) => {
  $btn.addEventListener("click", () => {
    const value = $btn.dataset.copyValue || "";
    navigator.clipboard.writeText(value);
  });
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

/* Cart */
const $cartLists = document.querySelectorAll(".cart-list");
$cartLists.forEach(($cartList) => {
  const $checkboxChooseAll = $cartList.querySelector(".cart-list__choose-all");
  const $itemsCheckboxes = $cartList.querySelectorAll(".cart-list__item .cart-item__checkbox .checkbox__input");
  $checkboxChooseAll?.addEventListener("change", function () {
    if (this.checked) {
      $itemsCheckboxes.forEach(($checkbox) => ($checkbox.checked = true));
    } else {
      $itemsCheckboxes.forEach(($checkbox) => ($checkbox.checked = false));
    }
  });

  $itemsCheckboxes.forEach(($checkbox) => {
    $checkbox.addEventListener("change", function () {
      if (!this.checked) {
        $checkboxChooseAll.checked = false;
      }
    });
  });
});

/* Cart loader */
const $cartTotalBtn = document.querySelector(".cart-total__btn");
const $cartTotalLoader = document.querySelector(".cart-total__loader");
$cartTotalBtn?.addEventListener(
  "click",
  () => {
    $cartTotalLoader.classList.add("cart-total__loader--active");
  },
  { once: true }
);

/* Swap buttons */
const $swapBtnsItems = document.querySelectorAll(".swap-btns");
$swapBtnsItems.forEach(($swapBtns) => {
  const $fromBtn = $swapBtns.querySelector(".swap-btns__btn--from");
  $fromBtn.addEventListener("click", () => {
    $swapBtns.classList.add("swap-btns--active");
  }),
    { once: true };
});

/* Search */
const $searchForms = document.querySelectorAll(".search");
$searchForms.forEach(($searchForm) => {
  const $closeBtn = $searchForm.querySelector(".search__close");
  const $input = $searchForm.querySelector(".search__input");

  $searchForm.addEventListener("click", () => {
    if ($input.value !== "") {
      $searchForm.classList.add("search--active", "search--fill");
    }
  });

  $closeBtn?.addEventListener("click", () => {
    $input.value = "";
    $searchForm.classList.remove("search--fill");
  });

  $input.addEventListener("input", () => {
    if ($input.value === "") {
      $searchForm?.classList.remove("search--fill", "search--active");
    } else {
      $searchForm?.classList.add("search--fill", "search--active");
    }
  });
});

window.addEventListener("click", (e) => {
  const $activeSearch = document.querySelector(".search--active");
  const isInner = e.target.closest(".search") && !e.target.classList.contains("dropdown");
  if (!$activeSearch || isInner) {
    return;
  }

  $activeSearch.classList.remove("search--active");
});

/* Select */
const SELECT_CLASS = "simple-select";
const SELECT_ACTIVE_CLASS = "simple-select--active";

const INPUT_CLASS = "simple-select__input";

const FIELD_CLASS = "simple-select__field";
const FIELD_ACTIVE_CLASS = "simple-select__field--active";

const LIST_CLASS = "simple-select__list";
const LIST_ACTIVE_CLASS = "simple-select__list--active";

const ITEM_CLASS = "simple-select__item";
const ITEM_PLACEHOLDER_CLASS = "simple-select__item--placeholder";
const ITEM_HOVER_CLASS = "simple-select__item--hover";

const $selectFields = document.querySelectorAll(".select__field");
$selectFields.forEach(($select) => {
  const $simpleSelect = createElem("div", SELECT_CLASS);
  $select.parentNode.insertBefore($simpleSelect, $select);
  $select.classList.add(INPUT_CLASS);
  $simpleSelect.append($select);
  $simpleSelect.tabIndex = 1;

  const $backdrop = createElem("div", `${SELECT_CLASS}__backdrop`);

  /* Field */
  const $simpleSelectField = createElem("div", FIELD_CLASS);
  $simpleSelectField.innerText = $select.options[0].innerText;
  $simpleSelectField.addEventListener("click", () => {
    $simpleSelectList.classList.toggle(LIST_ACTIVE_CLASS);
    $simpleSelectField.classList.toggle(FIELD_ACTIVE_CLASS);
    $simpleSelect.classList.toggle(SELECT_ACTIVE_CLASS);

    const offset = 15;
    const allHeight = $simpleSelectField.offsetHeight + $simpleSelectList.offsetHeight + offset;
    $backdrop.style.height = `${allHeight}px`;
  });
  $simpleSelect.append($simpleSelectField);

  /* Items */
  const $options = $select.querySelectorAll("option");
  const $simpleSelectList = createElem("div", LIST_CLASS);
  $options.forEach(($option, index) => {
    const $item = createElem("div", ITEM_CLASS, {
      innerText: $option.innerText,
    });

    if ($option.value === "") {
      $item.classList.add(ITEM_PLACEHOLDER_CLASS);
    }

    $item.dataset.selectIndex = index;
    $item.addEventListener("click", () => {
      $select.selectedIndex = +$item.dataset.selectIndex;
      $simpleSelectField.innerText = $item.innerText;
      $simpleSelect.blur();
      $simpleSelectList.classList.remove(LIST_ACTIVE_CLASS);
      $simpleSelectField.classList.remove(FIELD_ACTIVE_CLASS);
      $simpleSelect.classList.remove(SELECT_ACTIVE_CLASS);
    });

    $item.addEventListener("mouseover", () => {
      const $oldHoverItem = $simpleSelect.querySelector(`.${ITEM_HOVER_CLASS}`);
      if ($oldHoverItem) {
        swapHoverItem($oldHoverItem, $item);
      }

      $item.classList.add(ITEM_HOVER_CLASS);
    });

    $simpleSelectList.append($item);
  });
  $simpleSelect.append($simpleSelectList);

  $simpleSelect.append($backdrop);

  /* Close when click outside */
  window.addEventListener("click", (e) => {
    if (!e.target.classList.contains(SELECT_CLASS) && !e.target.closest(`.${SELECT_CLASS}`)) {
      $simpleSelectList.classList.remove(LIST_ACTIVE_CLASS);
      $simpleSelectField.classList.remove(FIELD_ACTIVE_CLASS);
      $simpleSelect.classList.remove(SELECT_ACTIVE_CLASS);
    }
  });

  /* Key controls */
  $simpleSelect.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      if ($simpleSelectList.classList.contains(LIST_ACTIVE_CLASS)) {
        const $hoverItem = $simpleSelect.querySelector(`.${ITEM_HOVER_CLASS}`);
        $hoverItem.click();
      } else {
        openList($simpleSelectList);
      }
    } else if (e.code === "Escape") {
      $simpleSelectList.classList.remove(LIST_ACTIVE_CLASS);
      $simpleSelectField.classList.remove(FIELD_ACTIVE_CLASS);
      $simpleSelect.classList.remove(SELECT_ACTIVE_CLASS);
    } else if (e.code === "ArrowDown") {
      const $oldHoverItem = $simpleSelect.querySelector(`.${ITEM_HOVER_CLASS}`);
      if (!$oldHoverItem) {
        const $newItem = $simpleSelect.querySelectorAll(`.${ITEM_CLASS}:not(.${ITEM_PLACEHOLDER_CLASS})`)[0];
        $newItem.classList.add(ITEM_HOVER_CLASS);
        return;
      }

      const oldIndex = +$oldHoverItem.dataset.selectIndex;
      if (oldIndex >= $simpleSelect.querySelectorAll(`.${ITEM_CLASS}`).length - 1) {
        return;
      }

      const $newItem = $simpleSelect.querySelectorAll(`.${ITEM_CLASS}`)[oldIndex + 1];
      if (!$newItem.classList.contains(ITEM_PLACEHOLDER_CLASS)) {
        swapHoverItem($oldHoverItem, $newItem);
      }
    } else if (e.code === "ArrowUp") {
      const $oldHoverItem = $simpleSelect.querySelector(`.${ITEM_HOVER_CLASS}`);
      if (!$oldHoverItem) {
        const $newItem = $simpleSelect.querySelectorAll(`.${ITEM_CLASS}:not(.${ITEM_PLACEHOLDER_CLASS})`)[0];
        $newItem.classList.add(ITEM_HOVER_CLASS);
        return;
      }

      const oldIndex = +$oldHoverItem.dataset.selectIndex;
      if (oldIndex < 1) {
        return;
      }

      const $newItem = $simpleSelect.querySelectorAll(`.${ITEM_CLASS}`)[oldIndex - 1];
      if (!$newItem.classList.contains(ITEM_PLACEHOLDER_CLASS)) {
        swapHoverItem($oldHoverItem, $newItem);
      }
    }
  });
});

function openList($list) {
  $list.classList.add(LIST_ACTIVE_CLASS);
}

function swapHoverItem($oldItem, $newItem) {
  $oldItem.classList.remove(ITEM_HOVER_CLASS);
  $newItem.classList.add(ITEM_HOVER_CLASS);
}

function createElem(type, className, options) {
  const $elem = document.createElement(type);
  $elem.className = className;
  for (let key in options) {
    $elem[key] = options[key];
  }

  return $elem;
}

/* Small slider */
const $smallSliders = document.querySelectorAll(".small-slider");
$smallSliders.forEach(($smallSlider) => {
  const $swiper = $smallSlider.querySelector(".small-slider__swiper");
  const $btnPrev = $smallSlider.querySelector(".small-slider__btn-prev");
  const $btnNext = $smallSlider.querySelector(".small-slider__btn-next");

  new Swiper($swiper, {
    spaceBetween: 30,
    slidesPerView: 3,
    navigation: {
      prevEl: $btnPrev,
      nextEl: $btnNext,
    },
  });
});

/* Tooltips */
const $tooltips = document.querySelectorAll('.tooltip');
$tooltips.forEach($tooltip => {
  const $btn = $tooltip.querySelector('.tooltip__btn');
  const $content = $tooltip.querySelector('.tooltip__content');
  const options = {
    content: $content.innerHTML,
    allowHTML: true,
    maxWidth: 300,
    placement: 'top-end',
  };

  tippy($btn, options);
});

const catalogBtn = document.querySelector(".catalog-btn");
const cattest = document.querySelector(".cattest");
const podmenu = document.querySelector(".podmenu");
catalogBtn.addEventListener("click", () => {
  catalogBtn?.classList.toggle("active");
  cattest?.classList.toggle("active");
  podmenu?.classList.toggle("active");
});
cattest?.addEventListener("click", () => {
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

/* Chart */
const chartsData = [
  {
    name: "all",
    content: {
      data: [
        {
          labels: [
            "Самоклеящиеся плёнки",
            "Самоклеящиеся плёнки",
            "Листовые материалы",
            "Листовые материалы",
            "Бумага",
            "Бумага",
            "Баннерные ткани",
            "Баннерные ткани",
            "Инструменты и крепеж",
            "Инструменты и крепеж",
            "Самоклеящиеся плёнки",
            "Самоклеящиеся плёнки",
            "Листовые материалы",
            "Листовые материалы",
          ],
          data: [343850, 281000, 250000, 230000, 120000, 80000, 45000, 70000, 30000, 20000, 15000, 10000, 8000, 6000],
        },
        {
          labels: [
            "Самоклеящиеся плёнки",
            "Самоклеящиеся плёнки",
            "Листовые материалы",
            "Листовые материалы",
            "Бумага",
            "Бумага",
            "Баннерные ткани",
            "Баннерные ткани",
            "Инструменты и крепеж",
            "Инструменты и крепеж",
            "Самоклеящиеся плёнки",
            "Самоклеящиеся плёнки",
            "Листовые материалы",
            "Листовые материалы",
          ],
          data: [243000, 200000, 180000, 100000, 50000, 40000, 45000, 35000, 20000, 180000, 35000, 25000, 7000, 5000],
        },
        {
          labels: [
            "Самоклеящиеся плёнки",
            "Самоклеящиеся плёнки",
            "Листовые материалы",
            "Листовые материалы",
            "Бумага",
            "Бумага",
            "Баннерные ткани",
            "Баннерные ткани",
            "Инструменты и крепеж",
            "Инструменты и крепеж",
            "Самоклеящиеся плёнки",
            "Самоклеящиеся плёнки",
            "Листовые материалы",
            "Листовые материалы",
          ],
          data: [140000, 220000, 100000, 50000, 70000, 60000, 45000, 55000, 25000, 40000, 15000, 8000, 2000, 1500],
        },
      ],
      backgroundColor: ["#5E3FBE", "#F4F0FD", "#E5DAFB", "#CBB6F8", "#A88DEB", "#886BD8", "#472EA3", "#341F88"],
      labelsParentClass: "chart",
    },
  },
  {
    name: "entity-1",
    content: {
      data: [
        {
          labels: ["Самоклеящиеся плёнки", "Самоклеящиеся плёнки", "Листовые материалы", "Листовые материалы", "Бумага", "Бумага"],
          data: [323850, 261000, 230000, 210000, 110000, 70000],
        },
        {
          labels: ["Самоклеящиеся плёнки", "Самоклеящиеся плёнки", "Листовые материалы", "Листовые материалы", "Бумага", "Бумага"],
          data: [243000, 200000, 180000, 100000, 50000, 40000],
        },
        {
          labels: ["Самоклеящиеся плёнки", "Самоклеящиеся плёнки", "Листовые материалы", "Листовые материалы", "Бумага", "Бумага"],
          data: [140000, 220000, 100000, 50000, 70000, 60000],
        },
      ],
      backgroundColor: ["#5E3FBE", "#F4F0FD", "#E5DAFB", "#CBB6F8", "#A88DEB", "#886BD8", "#472EA3", "#341F88"],
      labelsParentClass: "chart",
    },
  },
  {
    name: "entity-2",
    content: {
      data: [
        {
          labels: ["Самоклеящиеся плёнки", "Бумага"],
          data: [110000, 70000],
        },
        {
          labels: ["Самоклеящиеся плёнки", "Бумага"],
          data: [50000, 40000],
        },
        {
          labels: ["Самоклеящиеся плёнки", "Бумага"],
          data: [70000, 60000],
        },
      ],
      backgroundColor: ["#5E3FBE", "#F4F0FD", "#E5DAFB", "#CBB6F8", "#A88DEB", "#886BD8", "#472EA3", "#341F88"],
      labelsParentClass: "chart",
    },
  },
  {
    name: "all-offices",
    content: {
      data: [
        {
          labels: ["Самоклеящиеся плёнки", "Самоклеящиеся плёнки", "Листовые материалы", "Листовые материалы"],
          data: [230000, 210000, 110000, 70000],
        },
        {
          labels: ["Самоклеящиеся плёнки", "Самоклеящиеся плёнки", "Листовые материалы", "Листовые материалы"],
          data: [180000, 100000, 50000, 40000],
        },
        {
          labels: ["Самоклеящиеся плёнки", "Самоклеящиеся плёнки", "Листовые материалы", "Листовые материалы"],
          data: [100000, 50000, 70000, 60000],
        },
      ],
      backgroundColor: ["#5E3FBE", "#F4F0FD", "#E5DAFB", "#CBB6F8", "#A88DEB", "#886BD8", "#472EA3", "#341F88"],
      labelsParentClass: "chart",
    },
  },
];

const $charts = document.querySelectorAll(".chart");
$charts.forEach(($chart, chartIndex) => {
  const $chartCanvas = $chart.querySelector(".chart__canvas");
  const $chartLabels = $chart.querySelector(`.chart__labels`);
  const chartName = $chart.dataset.chartName;
  const chartData = chartsData.find((chartData) => chartData.name === chartName)?.content;
  let chartLoaded = false;

  if (!chartData) {
    return;
  }

  const chart = new Chart($chartCanvas, {
    type: "doughnut",
    data: {
      labels: chartData.data[0].labels,
      datasets: [
        {
          data: chartData.data[0].data,
          backgroundColor: chartData.backgroundColor,
        },
      ],
    },
    options: {
      animation: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          boxPadding: 5,
        },
      },
      cutout: 1,
    },
    plugins: [
      {
        beforeUpdate: function (chart) {
          if (Scrollbar.has(document.querySelector(".chart__labels"))) {
            Scrollbar.destroy(document.querySelector(".chart__labels"));
          }

          const ul = document.createElement("ul");
          ul.className = `${chartData.labelsParentClass}__labels-list`;

          let repeatColorIndex = 0;
          let maxColorIndex;
          chart.data.labels.forEach((label, i) => {
            let $value = `<span class="chart__label-value">${chart.data.datasets[0].data[i].toLocaleString()} ₽</span>`;

            if (!chart.data.datasets[0].backgroundColor[i] && !maxColorIndex) {
              maxColorIndex = i;
            }

            let color;
            if (chart.data.datasets[0].backgroundColor[i]) {
              color = chart.data.datasets[0].backgroundColor[i];
            } else if (repeatColorIndex >= maxColorIndex) {
              repeatColorIndex = 0;
              color = chart.data.datasets[0].backgroundColor[repeatColorIndex];
            } else {
              color = chart.data.datasets[0].backgroundColor[repeatColorIndex++];
            }

            ul.innerHTML += `
              <li class="text text--gray ${chartData.labelsParentClass}__label">
                <span class="${chartData.labelsParentClass}__label-point" style="background-color: ${color}">
                </span>
                <span class="${chartData.labelsParentClass}__label-name">${label}</span>
                ${$value}
              </li>
            `;
          });

          $chartLabels.innerHTML = "";
          $chartLabels.appendChild(ul);

          Scrollbar.init(document.querySelector(".chart__labels"), {
            alwaysShowTracks: true,
            damping: 0.08,
          });

          return;
        },
        afterRender: function (chart) {
          if (chartLoaded || chartIndex == 0) {
            chart.options.animation = true;
          } else {
            chartLoaded = true;
          }
        },
      },
    ],
  });

  const $chartBtns = $chart.querySelectorAll(".chart__btn .textbox__input");
  $chartBtns.forEach(($btn, index) => {
    $btn.addEventListener("change", () => {
      chart.data.labels = chartData.data[index].labels;
      chart.data.datasets[0].data = chartData.data[index].data;
      chart.update();
    });
  });
});

/* About */
var slider1 = new Swiper(".aslider1 .swiper", {
  direction: "horizontal",
  spaceBetween: 0,
  slidesPerView: 1,
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
var slider2 = new Swiper(".aslider2 .swiper", {
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
var slider3 = new Swiper(".slider3 .swiper", {
  direction: "horizontal",
  spaceBetween: 30,
  slidesPerView: 6,
  // loop: true,
  // Navigation arrows
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Находим все элементы галереи
const galleryItems = document.querySelectorAll(".as8Item img");
const galleryContainer = document.querySelector(".gallery-container");
const expandedImg = document.querySelector(".expanded-img");
const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex = 0;

// Показываем увеличенное изображение
function showImage(index) {
  expandedImg.src = galleryItems[index].src;
}

// При клике на изображение в галерее
galleryItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    currentIndex = index;
    showImage(currentIndex);
    galleryContainer.style.display = "block";
  });
});

// Листание вперед по изображениям
nextBtn?.addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  showImage(currentIndex);
});

// Листание назад по изображениям
prevBtn?.addEventListener("click", function () {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showImage(currentIndex);
});
galleryContainer?.addEventListener("click", function (event) {
  if (event.target === this) {
    galleryContainer.style.display = "none";
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

function getScrollbarWidth($elem) {
  if ($elem) {
    return Math.abs($elem.offsetWidth - $elem.clientWidth);
  }

  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
