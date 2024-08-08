document.addEventListener("DOMContentLoaded", () => {
  renderSeriesList();
});

function renderSeriesList() {
  const seriesItems = document.querySelectorAll(".swiper-slide.catalog__series-slide");
  const showHideListBtns = document.querySelectorAll(".show-hide-list-btn");

  const seriesLabels = document.querySelectorAll(".product-series.catalog__series-item");
  const labelsBtn = document.querySelectorAll(".but.catalog__series-item");

  function getDeletingItems(items) {
    const arr = [];

    items.forEach((item) => {
      arr.push(item);
    });

    return arr.slice(5);
  }

  function hideFullList(list) {
    const items = getDeletingItems(list);

    items.forEach((item) => {
      item.style.display = "none";
    });
  }

  hideFullList(seriesItems);
  hideFullList(seriesLabels);

  function toggleItemsStyle(items, style) {
    items.forEach((item) => {
      item.style.display = `${style}`;
    });
  }

  function toggleFullList(btns, list) {
    const toggleItems = getDeletingItems(list);

    btns.forEach((btn) => {
      const isShow = btn.querySelector(".show-full-list");
      const isHide = btn.querySelector(".hide-full-list");

      btn.addEventListener("click", () => {
        if (isShow.classList.contains("active")) {
          isShow.classList.remove("active");
          isHide.classList.add("active");

          toggleItemsStyle(toggleItems, "block");
          seriesSlider.update();
        } else if (isHide.classList.contains("active")) {
          isHide.classList.remove("active");
          isShow.classList.add("active");

          toggleItemsStyle(toggleItems, "none");
          seriesSlider.update();
        }
      });
    });
  }

  toggleFullList(showHideListBtns, seriesItems);
  toggleFullList(labelsBtn, seriesLabels);
}

const seriesSlider = new Swiper(".catalog__series-slider", {
  slidesPerView: 2,
  spaceBetween: 10,
  enabled: true,
  pagination: {
    el: ".catalog__series-pagination",
    clickable: true,
  },
  breakpoints: {
    767.01: {
      enabled: false,
      spaceBetween: 0,
      slidesPerView: "auto",
    },
  },
});
