document.addEventListener("DOMContentLoaded", () => {
  toggleAccordion();
  showDeliveryDetails();
  showCartOrderPopup();
  closeCartOrderPopup();
  switchTkItem();
  findTk();
  closeSearchTkModal();
  showDateTimePicker();
  clearDeliveryDateTimeInput();
  confirmDeliveryDateTime();
  closeDateTimeModal();
  showDadataChoiceTkForm();
});

function toggleAccordion() {
  const accordionBtns = document.querySelectorAll(".cart-order__top");

  accordionBtns.forEach((el) => {
    const icon = el.querySelector(".cart-order__top-btn");

    el.addEventListener("click", () => {
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

    inputs.forEach((el) => {
      el.addEventListener("change", (e) => {
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
    const inputValue = item.querySelector("input");

    tkItemsArr.push(inputValue);
  });

  fullListItems.forEach((item) => {
    const inputValue = item.querySelector("input");

    tkItemsArr.push(inputValue);
  });

  notFoundMessage.style.display = "none";

  function searchTk() {
    const searchText = tkSearchField.value.toLowerCase();
    const tkFormBtn = document.querySelector('[data-name="choice-tk"] .tk-confirm-btn');
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
        tkFormBtn.style.display = "flex";
      }
    }
    function hideResult(item, result, subTitle) {
      item.parentElement.style.display = "none";

      if (result == 0) {
        subTitle.forEach((item) => (item.style.display = "none"));
        notFoundMessage.style.display = "block";
        tkFormBtn.style.display = "none";
      }
    }
  }

  // let timeout = null;
  tkSearchField.addEventListener("input", () => {
    // clearTimeout(timeout);

    // timeout = setTimeout(() => {
    searchTk();
    // }, 1000);
  });
}

function showDadataChoiceTkForm() {
  const tkCloseBtn = document.querySelector('[data-name="choice-tk"] .choice-tk-close-modal');
  const anotherTkBtn = document.querySelector('[data-name="choice-tk"] .another-tk__btn');

  if (anotherTkBtn) {
    anotherTkBtn.addEventListener("click", () => {
      closeSearchTkModal();
      tkCloseBtn.click();
    });
  }
}

function closeSearchTkModal() {
  const tkSearchField = document.querySelector(".input__tk-search-field");
  const closeBtn = document.querySelector(".choice-tk-close-modal");
  const priorityTkItems = document.querySelectorAll(".priority-tk-radio");
  const fullListItems = document.querySelectorAll(".full-tk-radio");
  const notFoundMessage = document.querySelector(".modal-tk__not-found");
  const modalSubtitles = document.querySelectorAll(".modal-tk__subtitle");
  const confirmBtn = document.querySelector(".tk-confirm-btn");

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

    confirmBtn.style.display = "flex";
  }
}

const calendar = new AirDatepicker("#datePicker", {
  inline: true,
  // selectedDates: [new Date()],
  // timepicker: true,
  // minutesStep: 10,
  showOtherMonths: false,
  minDate: Date.now(),
  // buttons: ["today", "clear"],
  prevHtml:
    '<svg width="8" height="18" viewBox="0 0 8 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6628 17.5885L1.16113 9.27668L7.6628 0.964844" stroke="#444444" stroke-width="0.9" /></svg>',
  nextHtml:
    '<svg width="8" height="18" viewBox="0 0 8 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.337204 17.5885L6.83887 9.27668L0.337204 0.964844" stroke="#444444" stroke-width="0.87" /></svg>',
});

function showDateTimePicker() {
  function toggleDeliveryTimeList() {
    const choiceTimeBtn = document.querySelector(".timepicker__dropdown");
    const currentTime = document.querySelector(".timepicker__time");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    currentTime.innerHTML = `${hours}:${minutes}`;

    choiceTimeBtn.addEventListener("click", () => {
      if (choiceTimeBtn.classList.contains("active")) {
        choiceTimeBtn.classList.remove("active");
      } else {
        choiceTimeBtn.classList.add("active");
      }
    });
  }

  function renderTimeList() {
    const select = document.querySelector(`.select__list`);
    const itemsList = [];
    let hours, minutes;

    for (let i = 0; i <= 1430; i += 10) {
      hours = Math.floor(i / 60);
      minutes = i % 60;

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;

      const selectItem = document.createElement("li");
      selectItem.classList.add("select-item");
      selectItem.textContent = `${hours}:${minutes}`;
      select.insertAdjacentElement("beforeend", selectItem);

      itemsList.push(selectItem);
    }

    return select.childNodes;
  }

  function choiceDeliveryTime() {
    const timeItems = renderTimeList();
    const choiceTimeBtn = document.querySelector(".timepicker__btn");
    const currentTime = document.querySelector(".timepicker__time");

    timeItems.forEach((item) => {
      item.addEventListener("click", () => {
        removeSelectedClass(timeItems);

        item.classList.add("selected");
        currentTime.textContent = item.textContent;
        choiceTimeBtn.classList.remove("active");
      });
    });
    function removeSelectedClass(items) {
      items.forEach((item) => {
        item.classList.remove("selected");
      });
    }
  }

  toggleDeliveryTimeList();
  renderTimeList();
  choiceDeliveryTime();
}

function clearDeliveryDateTimeInput() {
  const dateTimeModal = document.querySelector(".choice-date-time__modal");

  openModal(".courier-delivery__input", "courier-delivery__input", "date-time__input", "courier-modal");
  openModal(".tk-delivery__input", "tk-delivery__input", "date-time__input", "tk-modal");
  openModal(".has-address__input", "has-address__input", "date-time__input", "has-address-modal");
  openModal(".self-delivery__input", "self-delivery__input", "date-time__input", "self-delivery-modal");

  function openModal(input, inputClass, inputWrapperClass, modalClass) {
    const dateTimeInput = document.querySelector(input);

    document.addEventListener("click", (e) => {
      const currentElem = e.target;

      if (currentElem.classList.contains(inputClass) || currentElem.classList.contains(inputWrapperClass)) {
        dateTimeInput.value = "";
        dateTimeModal.classList.add(modalClass);
      }
    });
  }
}

// function hideTimepicker() {
//   if (dateTimeModal.classList.contains("self-delivery-modal")) {
//     const timePicker = dateTimeModal.querySelector(".timepicker__dropdown");

//     timePicker.style.cssText = "pointer-events: none; opacity: 0.5;";
//   } else {
//     timePicker.style.cssText = "pointer-events: all; opacity: 1;";
//   }
// }

function confirmDeliveryDateTime() {
  const dateTimeInput = document.querySelector(".date-time-value");

  const courierInput = document.querySelector(".courier-delivery__input");
  const tkInput = document.querySelector(".tk-delivery__input");
  const hasAdressInput = document.querySelector(".has-address__input");
  const selfDeliveryInput = document.querySelector(".self-delivery__input");

  const confirmBtn = document.querySelector(".choice-date-time__btn");
  const spanText = document.querySelectorAll(".date-time__input span");
  const dateTimeModal = document.querySelector(".choice-date-time__modal");
  const currentTime = document.querySelector(".timepicker__time");
  const timeItems = document.querySelectorAll(".select-item");

  confirm("courier-modal", courierInput);
  confirm("tk-modal", tkInput);
  confirm("has-address-modal", hasAdressInput);
  confirm("self-delivery-modal", selfDeliveryInput);

  function confirm(modalClass, input) {
    confirmBtn.addEventListener("click", () => {
      if (dateTimeModal.classList.contains(modalClass)) {
        timeItems.forEach((item) => {
          if (!item.classList.contains("selected") && !dateTimeModal.classList.contains("self-delivery-modal")) {
            input.value = `${dateTimeInput.value} ${currentTime.textContent}`;
          } else {
            // deliveryInput.value = `${dateTimeInput.value} ${item.textContent}`;
            input.value = `${dateTimeInput.value}`;
          }
        });

        spanText.forEach((item) => {
          if (item.previousElementSibling == input) {
            item.style.display = "none";
          }
        });

        dateTimeModal.classList.remove("modal-new--active");
        dateTimeModal.classList.remove(modalClass);
        document.body.classList.remove("body--lock");
        // calendar.clear();
        // dateTimeInput.value = "";
      }
    });
  }
}

function closeDateTimeModal() {
  const closeBtn = document.querySelector(".close-date-time-modal-btn");
  const dateTimeModal = document.querySelector(".choice-date-time__modal");

  closeModal("courier-modal");
  closeModal("has-address-modal");
  closeModal("self-delivery-modal");
  closeModal("tk-modal");

  function closeModal(modalClass) {
    closeBtn.addEventListener("click", () => {
      if (dateTimeModal.classList.contains(modalClass)) {
        dateTimeModal.classList.remove("modal-new--active");
        dateTimeModal.classList.remove(modalClass);
        document.body.classList.remove("body--lock");
      }
    });
  }
}

// document.addEventListener("click", (e) => {
//   e.stopPropagation();
//   e.stopImmediatePropagation();
//   console.log(e.target);
// });

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

//==========================================================================================================================================================
// Новые формы для API dadata
$("#dadata-address").suggestions({
  token: "6bb7bbb9265b663a62be07fa4b6212df2efbeabc",
  type: "ADDRESS",
  deferRequestBy: 250,
  minChars: 3,
  // bounds: "city-house",
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function (suggestion) {
    console.log(suggestion);

    document.querySelector("[data-name='dadata-fias-id']").value = suggestion.data.fias_id;
    document.querySelector("[data-name='dadata-kladr-id']").value = suggestion.data.kladr_id;
  },
});

$("#dadata-courier").suggestions({
  token: "6bb7bbb9265b663a62be07fa4b6212df2efbeabc",
  type: "ADDRESS",
  deferRequestBy: 250,
  minChars: 3,
  // bounds: "city-house",
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function (suggestion) {
    console.log(suggestion);

    document.querySelector("[data-name='courier-dadata-fias-id']").value = suggestion.data.fias_id;
    document.querySelector("[data-name='courier-dadata-kladr-id']").value = suggestion.data.kladr_id;
  },
});

$("#dadata-legal-entity").suggestions({
  token: "6bb7bbb9265b663a62be07fa4b6212df2efbeabc",
  type: "PARTY",
  deferRequestBy: 250,
  minChars: 3,
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function (suggestion) {
    console.log(suggestion);
    if (document.querySelector("[data-name='new-legal-entity-dadata'] #step-one .not-found-msg-active")) {
      document.querySelector("[data-name='new-legal-entity-dadata'] #step-one .not-found-msg-active").style.display = "none";
    }

    document.querySelector('[data-name="new-legal-entity-dadata"] .suggestions-wrapper').style.display = "none";

    document.querySelectorAll("[data-name='new-legal-entity-dadata'] #step-one .text-field.form__text-field").forEach((el) => {
      el.classList.remove("d-none");
    });

    document.querySelectorAll("[data-name='new-legal-entity-dadata'] #step-one .form__btn").forEach((btn) => {
      btn.style.display = "flex";
    });

    document.querySelector('[data-name="new-legal-entity-dadata"] [data-name="name"]').value = suggestion.data.name.short_with_opf;
    document.querySelector('[data-name="new-legal-entity-dadata"] #step-two .text-field.form__text-field').classList.remove("d-none");
    document.querySelector('[data-name="new-legal-entity-dadata"] #step-two [data-name="name"]').textContent =
      suggestion.data.name.short_with_opf;
    document.querySelector('[data-name="new-legal-entity-dadata"] [data-name="INN"]').value = suggestion.data.inn;

    if (!suggestion.data.kpp) {
      document.querySelector('[data-name="new-legal-entity-dadata"] [data-name="KPP"]').style.display = "none";
      document.querySelector('[data-name="new-legal-entity-dadata"] [data-name="KPP"]').parentElement.style.display = "none";
    } else {
      document.querySelector('[data-name="new-legal-entity-dadata"] [data-name="KPP"]').value = suggestion.data.kpp;
    }

    document.querySelector('[data-name="new-legal-entity-dadata"] [data-name="OGRN"]').value = suggestion.data.ogrn;
    document.querySelector('[data-name="new-legal-entity-dadata"] [data-name="general_manager"]').value = suggestion.data.management.name;
    document.querySelector('[data-name="new-legal-entity-dadata"] [data-name="legal_address"]').value = suggestion.data.address.value;

    const spanElems = document.querySelectorAll('[data-name="new-legal-entity"] form .input__placeholder');
    spanElems.forEach((el, index) => {
      if (index < spanElems.length - 1) {
        el.style.display = "none";
      }
    });

    document.querySelector('[data-name="new-legal-entity"] [data-name="name"]').value = suggestion.data.name.short_with_opf;
    document.querySelector('[data-name="new-legal-entity"] [data-name="INN"]').value = suggestion.data.inn;
    document.querySelector('[data-name="new-legal-entity"] [data-name="KPP"]').value = suggestion.data.kpp;
  },
});

$("#dadata-payment-details").suggestions({
  token: "6bb7bbb9265b663a62be07fa4b6212df2efbeabc",
  type: "BANK",
  deferRequestBy: 250,
  minChars: 3,
  // bounds: "city-house",
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function (suggestion) {
    console.log(suggestion);

    document.querySelectorAll("[data-name='new-legal-entity-dadata'] #step-two .text-field.form__text-field").forEach((el) => {
      el.classList.remove("d-none");
    });

    document.querySelector('[data-name="bank-name"]').value = suggestion.value;
    document.querySelector('[data-name="bank-INN"]').value = suggestion.data.bic;
    document.querySelector('[data-name="bank-account"]').value = suggestion.data.correspondent_account;
  },
});

$("#dadata-tk").suggestions({
  token: "6bb7bbb9265b663a62be07fa4b6212df2efbeabc",
  type: "PARTY",
  deferRequestBy: 250,
  minChars: 3,
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function (suggestion) {
    console.log(suggestion);
    // document.querySelector("[data-name='new-tk-dadata'] .not-found-msg-active").style.display = "none";
    document.querySelector("[data-name='new-tk-dadata'] .suggestions-wrapper").style.display = "none";

    document.querySelectorAll("[data-name='new-tk-dadata'] .text-field.form__text-field").forEach((el) => {
      el.classList.remove("d-none");
    });

    document.querySelectorAll("[data-name='new-tk-dadata'] .form__btn").forEach((btn) => {
      btn.style.display = "flex";
    });

    document.querySelector('[data-name="new-tk-dadata"] [data-name="name"]').value = suggestion.data.name.full_with_opf;
    document.querySelector('[data-name="new-tk-dadata"] [data-name="INN"]').value = suggestion.data.inn;
    document.querySelector('[data-name="new-tk-dadata"] [data-name="KPP"]').value = suggestion.data.kpp;
    document.querySelector('[data-name="new-tk-dadata"] [data-name="OGRN"]').value = suggestion.data.ogrn;
    document.querySelector('[data-name="new-tk-dadata"] [data-name="general_manager"]').value = suggestion.data.management.name;
    document.querySelector('[data-name="new-tk-dadata"] [data-name="legal_address"]').value = suggestion.data.address.value;
  },
});
