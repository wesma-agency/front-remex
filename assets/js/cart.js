/*Что "оживить" на странице Корзина
1. Счетчик на иконке корзинке
2. Очистка всей корзины
3. Удаление конкретных товаров
4. Подсчет со скидкой
5. Функция добавление опций к заказу
6. Очистка конкретных списков
*/


/*Добавить запросы нужно*/

/*Основные и неизменяемые UI*/
const UI_ELEMENT={
  TAB_ITEM:document.querySelectorAll(".tabs-list__item"),
  SECTION:{
    ORDERED: document.querySelectorAll(".cart-section__ordered"),
    OVER: document.querySelectorAll(".cart-section__over"),
    ANOTHER: document.querySelectorAll(".tabs-list__another--store"),
    
  },
  TOTAL: {
    COUNT:document.querySelectorAll(".cart-total__count"),
    MASS:document.querySelectorAll(".cart-total__mass"),
    PRICE:document.querySelectorAll(".cart-total__price"),
    PRICE_DISCOUNT:document.querySelectorAll(".cart-total__price-discount"),
  }
}

/*Объект карточки товара*/

const ITEM_IN_CART=[{
    code:"21",
    storage: "1",
    priceOne:0,
    count:0,
    price:0,
    priceWithDiscount:0,
    discount:{
      hasDiscount:false,
      priceOne:0,
    },
    optional:{
      hasOptional:false,
      text: "text",
      price: 0,
      checked: false,
    },
    mass:0,
    text:"text",
    checkedItem: false,
    img: "assets/img/products/2.jpg",
    
    /*Обновление общих стоимостей внутри карточек товара*/
    refreshData:function(){
      if(this.discount.hasDiscount)
      {
        if(this.optional.hasOptional){
          this.priceWithDiscount=this.count*this.discount.priceOne+this.optional.price;
        }
        else{
          this.priceWithDiscount=this.count*this.discount.priceOne;
        }
      }
      else{
        if(this.optional.hasOptional){
          this.priceWithDiscount=this.count*this.priceOne+this.optional.price;
        }
        else{
          this.priceWithDiscount=this.count*this.priceOne;
        }
      }

      if(this.optional.hasOptional){
        this.price=this.count*this.priceOne+this.optional.price;
      }
      else{
        this.price=this.count*this.priceOne;
      }
    },
  },
];


/*Объект общей суммы товаров*/
const TOTAL_CART = {
    totalCountItems:0,
    totalMass:0,
    totalPriceDiscount:0,
    totalPrice:0,
    setTotal(){
      this.totalPrice=0;
      this.totalPriceDiscount=0;
      this.totalCountItems=0;
      this.totalMass=0;
      ITEM_IN_CART.forEach(item=>{ 
        this.totalCountItems+=item.count;
        this.totalPriceDiscount+=item.priceWithDiscount;
        this.totalPrice+=item.price;
      });
    },
}


function updatedUIPrice(itemCart, priceHTML){
  if(itemCart.price>itemCart.priceWithDiscount){
    priceHTML.textContent=itemCart.priceWithDiscount.toLocaleString("ru-RU").replace(",",".");
  }
  else{
    priceHTML.textContent=itemCart.price.toLocaleString("ru-RU").replace(",",".");
  }

  UI_ELEMENT.TOTAL.PRICE.forEach(item=>{item.textContent=TOTAL_CART.totalPrice});
  UI_ELEMENT.TOTAL.COUNT.forEach(item=>{item.textContent=TOTAL_CART.totalCountItems});
  UI_ELEMENT.TOTAL.PRICE_DISCOUNT.forEach(item=>{item.textContent=TOTAL_CART.totalPriceDiscount});
}

/*Обновление цены карточки в объектах*/
/*COUNTER на товарах*/
function SetCountItem(priceHTML, code, counter) {
  itemCart=ITEM_IN_CART.find(item=>item.code==code);
  itemCart.count=Number(counter.value);
  itemCart.refreshData();

  /*Обновление данных общей суммы*/
  TOTAL_CART.setTotal();

  /*Обновление данных на странице*/
  updatedUIPrice(itemCart, priceHTML)
}

/*EVENT пока только на COUNTER */
function AddListenerOnUI(){
  UI_ELEMENT.TAB_ITEM.forEach(TAB=>{
    ITEM=TAB.querySelectorAll(".cart-list__item");
    ITEM.forEach((item, index) => {
        /*let oneItemPrice=item.querySelector(".price-one__item");*/
        const  code=String(item.querySelector(".item__code").textContent);
        const  counterBtn=item.querySelectorAll(".counter__btn");
        const  counter=item.querySelector(".counter__input");
        const  checkboxItem=item.querySelector(".checkbox__input");
        const  deleteItem=item.querySelector(".cart-item__delete-btn");
        const  priceHTML=item.querySelector(".cart-item__price-value-num");
        
        counterBtn.forEach((item)=>{
          item.addEventListener("click", ()=>SetCountItem(priceHTML, code, counter));
        })
    })
  })
}


function GetDataFromItemHTML(ITEM, indexStorage, section){
  ITEM.forEach((item, index) => {
    const code=String(item.querySelector(".item__code").textContent);

    const counterHTML=item.querySelector(".counter__input");
    const counter=counterHTML?Number(counterHTML.value):console.log("Нет каунтера");

    const checkboxItem=item.querySelector(".checkbox__input");
    const cartInfo=item.querySelector(".cart-item__info").firstElementChild.nextElementSibling.textContent;
    const priceOne=Number(item.querySelector(".price-one__item").textContent.replace(/ /g,""));
    const discussForCount=item.querySelector(".cart-item__discount");
    const priceTotal= (counter*priceOne).toFixed(2);

    /*бред костылек для табов складов*/

    const storage= "storage"+toString(indexStorage);
    let discount=0;

    if(discussForCount!==null){
      discount=Number(discussForCount);
    }
    const img=item.querySelector(".cart-item__img").getAttribute("src");

    const ITEM_IN_CART_TEMPLATE ={
        id:index,
        code:code,
        storage:storage,
        priceOne:priceOne,
        count:counter,
        price:priceTotal,
        priceWithDiscount:0,
        discount:{
          hasDiscount:false,
          priceOne:discount,
        },
        optional:{
          hasOptional:false,
          text: "text",
          price: 0,
          checked: false,
        },
        mass:0,
        text: cartInfo,
        checkedItem: false,
        img: img,
        
        /*Обновление общих стоимостей внутри карточек товара*/
        refreshData: function(){
        if(this.discount.hasDiscount)
        {
          if(this.optional.hasOptional){
            this.priceWithDiscount=this.count*this.discount.priceOne+this.optional.price;
          }
          else{
            this.priceWithDiscount=this.count*this.discount.priceOne;
          }
        }
        else{
          if(this.optional.hasOptional){
            this.priceWithDiscount=this.count*this.priceOne+this.optional.price;
          }
          else{
            this.priceWithDiscount=this.count*this.priceOne;
          }
        }
    
        if(this.optional.hasOptional){
          this.price=this.count*this.priceOne+this.optional.price;
        }
        else{
          this.price=this.count*this.priceOne;
        }
      },
    };
    ITEM_IN_CART_TEMPLATE.refreshData();
    ITEM_IN_CART.push(ITEM_IN_CART_TEMPLATE)
  })
}

/*Костыльная версия гетера, только из самого HTML файла //нужно поменять на запросы с апишки*/
function GetDataFromHTML() {
  UI_ELEMENT.TAB_ITEM.forEach((TAB, index)=>{
    const ITEM=TAB.querySelectorAll(".cart-list__item");
    const section="cart";
    GetDataFromItemHTML(ITEM, index, section)/*section для товаров на вкладке для других складах*/
  })

  /*
  ITEM.SECTION.ANOTHER.querySelectorAll(".cart-list__item").forEach((ITEM, index)=>{
    GetDataFromItemHTML(ITEM, index, section)
  });*/
}

function AddItemInHTML(){
  UI_ELEMENT.MAIN_ITEM.insertAdjacentHTML("beforeend",``);
}

document.addEventListener("DOMContentLoaded", GetDataFromHTML(), AddListenerOnUI());
                    