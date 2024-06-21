document.addEventListener("DOMContentLoaded", () => {
  toggleAccordion();
  showHideContent();
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
  loop: true,
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
