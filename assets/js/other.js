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

    /*DROPBOX*/
    /*if (document.body.clientWidth < 500 && ACTIVE_UI.DROPDOWN.NAVIGATION.classList.contains('dropdown') === false) {
        ACTIVE_UI.DROPDOWN.NAVIGATION.classList.add("dropdown");
        ACTIVE_UI.DROPDOWN.BTN_NAVIGATION.forEach((item) => { if (!item.classList.contains('navigation__btn--active')) { item.classList.add("dropdown__main", "dropdown__main--mt-sm") } })

        ACTIVE_UI.DROPDOWN.BTN_ACTIVE_NAV.classList.add("dropdown__btn", "dropdown__btn--iflex", "dropdown__btn--active")
    }
    if (document.body.clientWidth >= 500 && ACTIVE_UI.DROPDOWN.NAVIGATION.classList.contains('dropdown') === true) {
        ACTIVE_UI.DROPDOWN.NAVIGATION.classList.remove("dropdown");
        ACTIVE_UI.DROPDOWN.BTN_NAVIGATION.forEach((item) => item.classList.remove("dropdown__main", "dropdown__main--mt-sm"));
        ACTIVE_UI.DROPDOWN.BTN_ACTIVE_NAV.classList.remove("dropdown__btn", "dropdown__btn--iflex", "dropdown__btn--active")
    }*/


    /*ACCORDION*/
    if (document.body.clientWidth < 1299 && ACTIVE_UI.ACCORDION.BASE[0].classList.contains('accordion') === false) {
        ACTIVE_UI.ACCORDION.CONTENT.forEach((item) => item.classList.add('accordion-content'));
        ACTIVE_UI.ACCORDION.MAIN.forEach((item) => item.classList.add('accordion-main'));

    }
    

    if (document.body.clientWidth >= 1299 && ACTIVE_UI.ACCORDION.BASE[0].classList.contains('accordion') === true) {
        ACTIVE_UI.ACCORDION.CONTENT.forEach((item) => item.classList.remove('accordion-content'));
        ACTIVE_UI.ACCORDION.MAIN.forEach((item) => item.classList.remove('accordion-main'));

    }

    if (document.body.clientWidth < 1299){

    }

    if(document.body.clientWidth >= 1299){

    }




}
reportWindowSize();
window.addEventListener('resize', () => reportWindowSize());