
function changeDropTabItem(name, index) {
    const oldActiveBtn = document.querySelector(`.metrovibor[data-tabs-name="${name}"] > .droptab-active`);
    const oldActiveTab = document.querySelector(`.droptab-box[data-tabs-name="${name}"] > .droptab-item__active`);
    const newActiveBtn = document.querySelectorAll(`.metrovibor[data-tabs-name="${name}"] > .droptab`)[index];
    const newActiveTab = document.querySelectorAll(`.droptab-box[data-tabs-name="${name}"] > .droptab-item`)[index];
    
    console.log(oldActiveBtn, oldActiveTab, newActiveBtn, newActiveTab)
  
    oldActiveTab.classList.remove("droptab-item__active");
    oldActiveBtn.classList.remove("droptab-active");
  
    newActiveBtn.classList.add("droptab-active");
    newActiveTab.classList.add("droptab-item__active");
}

function changeDropTab(otherItems, itemDropTab, button){
    otherItems.forEach((item)=>{item.classList.remove("header__label--def", "droptab-active")});
    let em = document.createElement("em");
    em.innerHTML =`<svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.91683 4.04175L5.00016 6.95842L2.0835 4.04175"
        stroke="#444444"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>`;
    button.innerHTML="";
    button.insertAdjacentHTML("afterbegin", itemDropTab.cloneNode(itemDropTab).innerHTML);
    button.querySelector(".metro").insertAdjacentElement("beforeend", em);
    itemDropTab.classList.add("header__label--def", "droptab-active");
}

function readMore(item,link){
  const dots = item.querySelector(".dots");
  const moreText = item.querySelector(".readMore");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    link.innerHTML = "Читать полностью";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    link.innerHTML = "Свернуть";
    moreText.style.display = "inline";
  }
}

const container=document.querySelectorAll(".droptab-container");
container.forEach((items)=>{
    const droptabs=items.querySelectorAll(".droptab");
    const dropButton=items.querySelector(".droptab-btn");
    droptabs.forEach(item=>item.addEventListener("click", ()=>changeDropTab(droptabs, item, dropButton)))
})

const dropTabBoxes = document.querySelectorAll(".droptab-container");
dropTabBoxes.forEach((droptabBox) => {
  const btns = droptabBox.querySelectorAll(".droptab");
  btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        changeDropTabItem(droptabBox.dataset.tabsName, index);
    });
  });
});

const rewTop=document.querySelectorAll(".rew__top");
rewTop.forEach((item)=>{
  let link = item.querySelector(".rew__link");
  if(link!==null){
    link.addEventListener("click", ()=>{readMore(item, link)});
  }
  
});