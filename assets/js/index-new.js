document.addEventListener("DOMContentLoaded", () => {
  disablePageScroll();
});

function disablePageScroll() {
  const pageBody = document.querySelector(".pgs-body");
  const podmenu = document.querySelector(".podmenu");
  const headerBtn = document.querySelector(".header__catalog-btn");
  const catalogBtnFixed = document.querySelector(".catalog-btn.cattest");
  const podmenuAct = document.querySelector(".podmenu.act");

  function addRemoveActiveClass(block) {
    if (block.classList.contains("active")) {
      pageBody.classList.add("body--lock");
    } else {
      pageBody.classList.remove("body--lock");
    }
  }

  headerBtn.addEventListener("click", () => {
    addRemoveActiveClass(podmenu);
  });

  catalogBtnFixed.addEventListener("click", () => {
    addRemoveActiveClass(podmenuAct);
  });
}
