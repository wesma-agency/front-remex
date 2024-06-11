//navigation / navigation__btns //сайд бар в аккордион
//profile-card //аккордион на инфу
//profile-card__tabs-btns //в аккордеон
const ACTIVE_UI = {
    DROPDOWN: {
        NAVIGATION: document.querySelector(".navigation__btns"),
        BTN_NAVIGATION: document.querySelectorAll(".navigation__btn"),
        BTN_ACTIVE_NAV: document.querySelector(".navigation__btn--active"),
    },
    ACCORDION:{
        MAIN: document.querySelectorAll(".accordion-main"),
        BTN: document.querySelectorAll(".accordion-btn"),
        CONTENT: document.querySelectorAll(".accordion-content"),
        BASE:document.querySelectorAll(".accordion"),
    },

    SWITCHBLOCKS:{
        noadaptive: document.querySelectorAll(".no-adaptive"),
        adaptive:document.querySelectorAll(".with-adaptive"),
    }
}


function reportWindowSize() {

    /*ACCORDION*/
    if (document.body.clientWidth < 1299 && ACTIVE_UI.ACCORDION.BASE[0].classList.contains('accordion') === false) {
        ACTIVE_UI.ACCORDION.CONTENT.forEach((item) => item.classList.add('accordion-content'));
        ACTIVE_UI.ACCORDION.MAIN.forEach((item) => item.classList.add('accordion-main'));
    }   

    if (document.body.clientWidth >= 1299 && ACTIVE_UI.ACCORDION.BASE[0].classList.contains('accordion') === true) {
        ACTIVE_UI.ACCORDION.CONTENT.forEach((item) => item.classList.remove('accordion-content'));
        ACTIVE_UI.ACCORDION.MAIN.forEach((item) => item.classList.remove('accordion-main'));
    }

}
reportWindowSize();
window.addEventListener('resize', () => reportWindowSize());