//==========================================================================================================================================================
// Новые формы для API dadata
$("#dadata-address").suggestions({
  token: "6bb7bbb9265b663a62be07fa4b6212df2efbeabc",
  type: "ADDRESS",
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function (suggestion) {
    console.log(suggestion);
  },
});

$("#dadata-legal-entity").suggestions({
  token: "6bb7bbb9265b663a62be07fa4b6212df2efbeabc",
  type: "PARTY",
  /* Вызывается, когда пользователь выбирает одну из подсказок */
  onSelect: function (suggestion) {
    console.log(suggestion);
    document.querySelector("[data-name='new-legal-entity-dadata'] #step-one .not-found-msg-active").style.display = "none";
    document.querySelector('[data-name="new-legal-entity-dadata"] .suggestions-wrapper').style.display = "none";

    document.querySelectorAll("[data-name='new-legal-entity-dadata'] #step-one .text-field.form__text-field").forEach((el) => {
      el.classList.remove("d-none");
    });

    document.querySelectorAll("[data-name='new-legal-entity-dadata'] #step-one .form__btn").forEach((btn) => {
      btn.style.display = "flex";
    });

    document.querySelector('[data-name="name"]').value = suggestion.data.name.full_with_opf;
    document.querySelector('[data-name="INN"]').value = suggestion.data.inn;
    document.querySelector('[data-name="KPP"]').value = suggestion.data.kpp;
    document.querySelector('[data-name="OGRN"]').value = suggestion.data.ogrn;
    document.querySelector('[data-name="general_manager"]').value = suggestion.data.management.name;
    document.querySelector('[data-name="legal_address"]').value = suggestion.data.address.value;
  },
});

// document.addEventListener("DOMContentLoaded", () => {
//   manualInputLegalEntity();
// });

// function manualInputLegalEntity() {
//   const dadataLegalEntityInput = document.querySelector("#dadata-legal-entity");
//   const form = document.querySelector("[data-name='new-legal-entity-dadata'] form");
//   const closeBtn = document.querySelector("[data-name='new-legal-entity-dadata'] .modal-new__close.js-close-modal");

//   if (dadataLegalEntityInput) {
//     dadataLegalEntityInput.addEventListener("input", () => {
//       const suggestions = document.querySelector("[data-name='new-legal-entity-dadata'] .suggestions-suggestions");
//       const parentElem = suggestions.parentElement;
//       const notFoundDiv = parentElem ? parentElem.querySelector(".not-found-msg-active") : null;

//       if (!dadataLegalEntityInput.value || !suggestions || suggestions.children.length === 0) {
//         if (notFoundDiv) {
//           notFoundDiv.remove();
//         }
//         return;
//       }

//       if (suggestions) {
//         const suggestionItems = suggestions.querySelectorAll(".suggestions-suggestion");

//         let notFoundDiv = parentElem.querySelector(".not-found-msg-active");

//         if (suggestionItems.length > 0 && !notFoundDiv) {
//           notFoundDiv = document.createElement("button");
//           notFoundDiv.innerText = "Не получилось найти";
//           notFoundDiv.classList.add("not-found-msg-active", "js-open-modal");
//           notFoundDiv.setAttribute("data-modal-name", "new-legal-entity");
//           notFoundDiv.setAttribute("type", "button");

//           parentElem.insertAdjacentElement("beforeend", notFoundDiv);
//         }

//         if (notFoundDiv) {
//           notFoundDiv.addEventListener("click", () => {
//             const dadataLegalEntityBtn = document.querySelector("[data-name='new-legal-entity-dadata'] .modal-new__close.js-close-modal");
//             const oldNewLegalEntityForm = document.querySelector('[data-name="new-legal-entity"]');

//             dadataLegalEntityBtn.click();
//             oldNewLegalEntityForm.classList.add("modal-new--active");
//           });
//         }
//       }
//     });
//   }

//   closeBtn.addEventListener("click", () => {
//     form.reset();
//     document.querySelector(".not-found-msg-active").remove();
//   });
// }
