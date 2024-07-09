document.addEventListener("DOMContentLoaded", () => {
  toggleAccordion();
  showDeliveryDetails();
  showCartOrderPopup();
  closeCartOrderPopup();
  switchTkItem();
  findTk();
  closeSearchTkModal();
  showDateTimePicker();
  modifyDateTimePickerElems();
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

function showDeliveryDetails() {
  const deliveryItems = document.querySelectorAll(".delivery__label");

  deliveryItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const input = e.currentTarget.querySelector(".toggle-input");

      if (!input.hasAttribute("checked")) {
        input.setAttribute("checked", "");
        item.nextElementSibling.classList.add("active");
      } else {
        input.removeAttribute("checked");
        item.nextElementSibling.classList.remove("active");
      }
    });
  });
}

function showCartOrderPopup() {
  const cartOrderPopup = document.querySelector(".cart-order__popup");
  const cartOrderPopupTop = document.querySelector(".cart-order__popup-top");
  const cartOrderBtn = document.querySelector(".cart-order-summary__btn.cart-order__top-btn");

  cartOrderPopupTop.addEventListener("click", () => {
    if (cartOrderPopup.classList.contains("active")) {
      cartOrderPopup.classList.remove("active");
      cartOrderBtn.classList.remove("active");
    } else {
      cartOrderPopup.classList.add("active");
    }
  });
}

function closeCartOrderPopup() {
  const cartOrderPopup = document.querySelector(".cart-order__popup");
  const cartOrderBtn = document.querySelector(".cart-order-summary__btn.cart-order__top-btn");

  document.addEventListener("click", (e) => {
    const cartOrderPopupActive = document.querySelector(".cart-order__popup.active");

    if (cartOrderPopupActive && e.target !== cartOrderPopupActive && !cartOrderPopupActive.contains(e.target)) {
      cartOrderPopup.classList.remove("active");
      cartOrderBtn.classList.remove("active");
    }
  });
}

function switchTkItem() {
  const tkItems = document.querySelectorAll(".tk__item");
  const myTk = document.querySelector(".my-tk");
  const recomendedTk = document.querySelector(".recomended-tk__list");

  tkItems.forEach((item) => {
    const inputs = item.querySelectorAll(".tk-radio");
    // console.log(inputs);

    inputs.forEach((el) => {
      el.addEventListener("change", (e) => {
        // console.log(e.target.id);

        if (e.target.id == myTk.id && e.target.id != recomendedTk.id) {
          myTk.classList.remove("d-none");
          recomendedTk.classList.add("d-none");
        } else if (e.target.id == recomendedTk.id && e.target.id != myTk.id) {
          recomendedTk.classList.remove("d-none");
          myTk.classList.add("d-none");
        }
      });
    });
  });
}

function findTk() {
  const tkSearchField = document.querySelector(".input__tk-search-field");
  const priorityTkItems = document.querySelectorAll(".priority-tk__item");
  const fullListItems = document.querySelectorAll(".full-list__item");
  const notFoundMessage = document.querySelector(".modal-tk__not-found");
  const modalSubtitle = document.querySelectorAll(".modal-tk__subtitle");
  const tkItemsArr = [];

  priorityTkItems.forEach((item) => {
    // const spanText = item.querySelector(".checkbox__text");
    const inputValue = item.querySelector("input");

    // spanText.textContent = inputValue;

    // tkItemsArr.push(spanText);
    tkItemsArr.push(inputValue);
  });

  fullListItems.forEach((item) => {
    const inputValue = item.querySelector("input");
    // const spanText = item.querySelector(".checkbox__text");

    // spanText.textContent = inputValue;

    tkItemsArr.push(inputValue);
    // tkItemsArr.push(spanText);
  });
  // console.log(tkItemsArr);

  notFoundMessage.style.display = "none";

  function searchTk() {
    const searchText = tkSearchField.value.toLowerCase();
    let result = 0;

    tkItemsArr.forEach((item) => {
      const tkName = item.value.toLowerCase();
      const subtitle = item.closest(".modal-tk__list").firstElementChild;

      if (tkName.includes(searchText)) {
        result = 1;
        subtitle.style.display = "block";
        showResult(item, result);
      } else {
        hideResult(item, result, modalSubtitle);
      }
    });

    function showResult(item, result) {
      item.parentElement.style.display = "flex";

      if (result == 1) {
        notFoundMessage.style.display = "none";
        // subTitle.forEach((item) => (item.style.display = "block"));
      }
    }
    function hideResult(item, result, subTitle) {
      item.parentElement.style.display = "none";

      if (result == 0) {
        subTitle.forEach((item) => (item.style.display = "none"));
        notFoundMessage.style.display = "block";
      }
    }

    // tkItemsArr.forEach((item) => {
    //   const tkName = item.value.toLowerCase();

    //   if (tkName.includes(searchText)) {
    //     console.log(searchText.localeCompare(tkName));
    //     item.parentElement.style.display = "flex";
    //   } else {
    //     item.parentElement.style.display = "none";
    //   }
    // });
  }

  // let timeout = null;
  tkSearchField.addEventListener("input", () => {
    // clearTimeout(timeout);

    // timeout = setTimeout(() => {
    searchTk();
    // }, 1000);
  });
}

function closeSearchTkModal() {
  const tkSearchField = document.querySelector(".input__tk-search-field");
  const closeBtn = document.querySelector(".choice-tk-close-modal");
  // const confirmBtn = document.querySelector(".choice-tk__btn");
  const priorityTkItems = document.querySelectorAll(".priority-tk-radio");
  const fullListItems = document.querySelectorAll(".full-tk-radio");
  const notFoundMessage = document.querySelector(".modal-tk__not-found");
  const modalSubtitles = document.querySelectorAll(".modal-tk__subtitle");

  closeBtn.addEventListener("click", () => {
    resetForm();
  });

  document.addEventListener("click", (e) => {
    const choiceTkModalActive = document.querySelector(".choice-tk-modal.modal-new--active");
    if (choiceTkModalActive && e.target !== choiceTkModalActive && !choiceTkModalActive.contains(e.target)) {
      resetForm();
    }
  });

  function resetForm() {
    tkSearchField.value = "";

    priorityTkItems.forEach((item) => {
      item.parentElement.style.display = "flex";
    });
    fullListItems.forEach((item) => {
      item.parentElement.style.display = "flex";
    });

    notFoundMessage.style.display = "none";
    modalSubtitles.forEach((item) => {
      item.style.display = "block";
    });
  }
}

function showDateTimePicker() {
  $("#datepicker").datetimepicker({
    inline: true,
    timepicker: false,
    format: "d.m.Y",
    dayOfWeekStart: 1,
  });
  $("#timepicker").datetimepicker({
    inline: true,
    datepicker: false,
    format: "H:i",
    step: 10,
  });
  $.datetimepicker.setLocale("ru");
}

function modifyDateTimePickerElems() {
  const monthSelect = document.querySelectorAll(".xdsoft_datetimepicker .xdsoft_label>.xdsoft_select");
  const monthContainer = document.querySelector(".xdsoft_monthpicker");
  const monthDiv = document.createElement("div");
  const monthBtnPrev = document.querySelector(".xdsoft_datetimepicker .xdsoft_prev");
  const monthBtnNext = document.querySelector(".xdsoft_datetimepicker .xdsoft_next");
  const monthLabel = document.querySelector(".xdsoft_datetimepicker .xdsoft_month ");
  const yearLabel = document.querySelector(".xdsoft_datetimepicker .xdsoft_year");
  const dateYearDiv = document.createElement("div");

  monthContainer.insertAdjacentElement("afterbegin", monthDiv);
  monthDiv.classList.add("month-div");
  dateYearDiv.classList.add("month-year-div");

  dateYearDiv.insertAdjacentElement("beforeend", monthLabel);
  dateYearDiv.insertAdjacentElement("beforeend", yearLabel);

  monthDiv.insertAdjacentElement("beforeend", monthBtnPrev);
  monthDiv.insertAdjacentElement("beforeend", dateYearDiv);
  monthDiv.insertAdjacentElement("beforeend", monthBtnNext);

  monthSelect.forEach((item) => {
    item.remove();
  });
}

const cartOrderSlider = new Swiper(".cart-order-slider", {
  direction: "horizontal",
  slidesPerView: 4,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // 639.98: {
    //   slidesPerView: 3,
    //   spaceBetween: 20,
    // },
    767.98: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1198.98: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
