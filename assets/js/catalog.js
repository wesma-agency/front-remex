document.addEventListener("DOMContentLoaded", () => {
  renderCategoryList();
});

function renderCategoryList() {
  const categoryListItems = document.querySelectorAll(".category-list");
  const accordionParentItems = document.querySelectorAll(".category__list--more");
  const accordionsArr = getAccordionElems();

  function getAccordionElems() {
    const listItems = [];
    const accordionItems = [];

    categoryListItems.forEach((item) => {
      const categoryItems = item.querySelectorAll(".category__item");

      listItems.push(categoryItems);

      if (categoryItems.length <= 5) {
        item.nextElementSibling.style.display = "none";
      }

      // if (categoryItems.length > 5) {
      //   listItems.push(categoryItems);
      // } else if (categoryItems.length <= 5) {
      //   // item.nextElementSibling.style.display = "none";
      // }
    });

    listItems.forEach((item) => {
      const arrItems = Array.from(item).slice(5);

      accordionItems.push(arrItems);
    });

    return accordionItems;
  }

  function removeItems() {
    const items = getAccordionElems();

    items.forEach((item) => {
      item.forEach((el) => {
        el.remove();
      });
    });

    accordionParentItems.forEach((item) => {
      item.innerHTML = "";
    });
  }

  function renderAccordion() {
    // console.log(accordionsArr);

    // accordionItemsParent.forEach((item) => {
    //   item.innerHTML = "<div>TEST</div>";
    // });

    // accordionsArr.forEach((item) => {
    //   const items = [];

    //   item.forEach((el) => {
    //     items.push(el.outerHTML);
    //   });

    //   console.log(items);
    // });

    const itemsArr = accordionsArr.map((item) => {
      const items = [];

      item.forEach((el) => {
        items.push(el.outerHTML);
      });

      return items.join("");
    });

    console.log(itemsArr);

    accordionParentItems.forEach((item, i) => {
      item.insertAdjacentHTML("beforeend", itemsArr[i]);
    });
  }

  removeItems();
  renderAccordion();
}
