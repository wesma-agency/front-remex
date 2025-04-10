//==========================================================================================================================================================
// Новые формы для API dadata
$("#dadata-address").suggestions({
  token: "6bb7bbb9265b663a62be07fa4b6212df2efbeabc",
  type: "ADDRESS",
  deferRequestBy: 250,
  minChars: 3,
  bounds: "city-house",
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function (suggestion) {
    console.log(suggestion);

    document.querySelector("[data-name='dadata-fias-id']").value = suggestion.data.fias_id;
    document.querySelector("[data-name='dadata-kladr-id']").value = suggestion.data.kladr_id;
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
