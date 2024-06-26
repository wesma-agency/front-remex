document.addEventListener("DOMContentLoaded", () => {
  toggleAccordion();
  showHideContent();
  showCartOrderPopup();
});

function toggleAccordion() {
  const accordionBtns = document.querySelectorAll(".cart-order__top");

  accordionBtns.forEach((el) => {
    const icon = el.querySelector(".cart-order__top-btn");

    el.addEventListener("click", () => {
      // icon.classList.toggle("active");
      if (icon.classList.contains("active")) {
        icon.classList.remove("active");
      } else {
        icon.classList.add("active");
      }
    });
  });
}

function showCartOrderPopup() {
  const cartOrderAsideBtn = document.querySelector(".cart-total__list .cart-order-summary");

  const cartOrderAsidePopup = document.querySelector(".cart-order__popup");
  const cartOrderAsidePopupTop = document.querySelector(".cart-order__popup-top");

  const cartOrderAsidePopupBtn = document.querySelector(".cart-order__popup .cart-order__top-btn");
  const cartOrderAsideAccordion = document.querySelector(".cart-total__list .cart-order__top-btn");

  cartOrderAsideBtn.addEventListener("click", () => {
    cartOrderAsidePopup.classList.add("active");
    cartOrderAsidePopupBtn.classList.add("active");
  });

  cartOrderAsidePopupTop.addEventListener("click", () => {
    cartOrderAsidePopup.classList.remove("active");
    cartOrderAsidePopupBtn.classList.remove("active");
    cartOrderAsideAccordion.classList.remove("active");
  });
}

function showHideContent() {
  const deliveryItems = document.querySelectorAll(".delivery__label");

  deliveryItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const input = e.currentTarget.querySelector(".toggle-input");

      if (!input.hasAttribute("checked")) {
        input.setAttribute("checked", "");
        item.nextElementSibling.classList.add("active");
      } else {
        input.removeAttribute("checked", "");
        item.nextElementSibling.classList.remove("active");
      }
    });
  });
}

const cartOrderSlider = new Swiper(".cart-order-slider", {
  direction: "horizontal",
  slidesPerView: 4,
  spaceBetween: 20,
  // breakpoints: {
  //   768: {
  //     slidesPerView: 2,
  //     spaceBetween: 20,
  //   },
  //   1140.01: {
  //     slidesPerView: 3,
  //     spaceBetween: 30,
  //   },
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
