document.addEventListener("DOMContentLoaded", () => {
  renderSeriesList();
});

function renderSeriesList() {
  const seriesItems = document.querySelectorAll(".swiper-slide.catalog__series-slide");
  const showHideListBtns = document.querySelectorAll(".show-hide-list-btn");

  function getDeletingItems() {
    const seriesList = [];

    seriesItems.forEach((el) => {
      seriesList.push(el);
    });

    return seriesList.slice(5);
  }

  function hideFullList() {
    const itemsToHide = getDeletingItems();

    itemsToHide.forEach((item) => {
      item.style.display = "none";
    });
  }

  function toggleFullList() {
    const toggleItems = getDeletingItems();
    // const isListShow = showHideListBtns.querySelectorAll(".show-full-list");
    // const isListHide = showHideListBtns.querySelectorAll(".hide-full-list");

    showHideListBtns.forEach((btn) => {
      const isListShow = btn.querySelector(".show-full-list");
      const isListHide = btn.querySelector(".hide-full-list");

      btn.addEventListener("click", () => {
        if (isListShow.classList.contains("active")) {
          isListShow.classList.remove("active");
          isListHide.classList.add("active");
          toggleItems.forEach((item) => {
            item.style.display = "block";
          });
          seriesSlider.update();
        } else if (isListHide.classList.contains("active")) {
          isListHide.classList.remove("active");
          isListShow.classList.add("active");
          toggleItems.forEach((item) => {
            item.style.display = "none";
          });
          seriesSlider.update();
        }
      });
    });
  }

  hideFullList();
  toggleFullList();
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
