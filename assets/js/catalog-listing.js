document.addEventListener("DOMContentLoaded", () => {
  showMobileFilters();
});

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
