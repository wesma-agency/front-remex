document.addEventListener("DOMContentLoaded", () => {
  showMobileFilters();
  findBrand();
  showMoreProducts();
  pagination(".section-footer__pagination--desktop", 5);
});

//==========================================================================================================================================================
// Показать/скрыть мобильные фильтры
function showMobileFilters() {
  const openFiltersBtn = document.querySelector(".filters__btn");
  const mobileFilters = document.querySelector(".mobile-filters");
  const closeFiltersBtn = document.querySelector(".mobile-filters__close-btn");
  const bg = document.querySelector(".bg");

  openFiltersBtn.addEventListener("click", () => {
    mobileFilters.classList.add("active");
    bg.classList.add("active");
  });

  closeFiltersBtn.addEventListener("click", () => {
    mobileFilters.classList.remove("active");
    bg.classList.remove("active");
  });

  bg.addEventListener("click", () => {
    mobileFilters.classList.remove("active");
    bg.classList.remove("active");
  });
}

//==========================================================================================================================================================
// Поиск производителя
function findBrand() {
  const brandSearchField = document.querySelector(".brand__input");
  const brandItems = document.querySelectorAll(".brand__item");
  const brandNotFoundMessage = document.querySelector(".brand__not-found");
  const clearInputBtn = document.querySelector(".brand__close");
  const brandList = document.querySelector(".brand__list");
  const brandMoreBtn = document.querySelector(".brand__more-btn");
  const brandArr = [];

  brandItems.forEach((item) => {
    const input = item.querySelector("input");

    brandArr.push(input);
  });

  function searchBrand() {
    const searchText = brandSearchField.value.toLowerCase();
    let result = 0;

    brandArr.forEach((item) => {
      const brandName = item.value.toLowerCase();

      if (brandName.includes(searchText)) {
        result = 1;
        showResult(item, result, brandNotFoundMessage);
      } else {
        hideResult(item, result, brandNotFoundMessage);
      }
    });

    function showResult(item, result, message) {
      item.parentElement.style.display = "inline-flex";

      if (result == 1) {
        message.classList.remove("active");
      }
    }

    function hideResult(item, result, message) {
      item.parentElement.style.display = "none";

      if (result == 0) {
        message.classList.add("active");
      }
    }
  }

  clearInputBtn.addEventListener("click", () => {
    brandList.classList.remove("filter__checkboxes--active");
    brandMoreBtn.style.display = "flex";
    searchBrand();
  });

  brandSearchField.addEventListener("input", () => {
    // searchBrand();
    if (brandSearchField.value) {
      brandList.classList.add("filter__checkboxes--active");
      brandMoreBtn.style.display = "none";
      searchBrand();
    } else {
      brandList.classList.remove("filter__checkboxes--active");
      brandMoreBtn.style.display = "flex";
      searchBrand();
    }
  });
}

//==========================================================================================================================================================
// Кнопка показать еще
function showMoreProducts() {
  const productItems = document.querySelectorAll(".product-card.catalog__products-item");
  const showMoreBtn = document.querySelector(".but.section-footer__more-btn");
  const visibleItems = 15;
  let itemsToShow = 15;

  for (let i = visibleItems; i < productItems.length; i++) {
    productItems[i].style.display = "none";
  }

  showMoreBtn.addEventListener("click", () => {
    itemsToShow += 15;

    if (itemsToShow <= productItems.length) {
      for (let i = 0; i < itemsToShow; i++) {
        productItems[i].style.display = "flex";
      }
    }

    if (itemsToShow == productItems.length) {
      showMoreBtn.classList.add("disabled");
    }
  });
}

function pagination(paginationElem, startPagesCount) {
  // const productItems = document.querySelectorAll(".product-card.catalog__products-item");
  const visibleItems = 15;
  const pagination = document.querySelector(`${paginationElem}`);
  // const pagesCount = productItems.length / visibleItems;
  const currentPage = 1;

  const prevBtn = pagination.querySelector(".pagination__link--right");
  const nextBtn = pagination.querySelector(".pagination__link--left");

  // Test
  const productsCount = 180;
  const pagesCount = productsCount / visibleItems;

  // console.log(nextBtn);
}
