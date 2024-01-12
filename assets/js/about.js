const catalogz = document.querySelector(".catalog");
const cattest = document.querySelector(".cattest");
const podmenu = document.querySelector(".podmenu");
catalogz.addEventListener('click', () => {
  catalogz.classList.toggle('active');
  cattest.classList.toggle('active');
  podmenu.classList.toggle('active');
});
cattest.addEventListener('click', () => {
  catalogz.classList.toggle('active');
  cattest.classList.toggle('active');
  podmenu.classList.toggle('active');
});

const metroz = document.querySelector(".header__label .metro");
const metroz1 = document.querySelector(".header__label .popup");
const metroz2 = document.querySelector(".header__label .popup__close");
metroz.addEventListener('click', () => {
  metroz1.classList.add('active');
});
metroz.addEventListener('click', () => {
  metroz1.classList.add('active');
});
metroz2.addEventListener('click', () => {
  metroz1.classList.remove('active');
});

const headert = document.querySelector(".header");
const buttonzz = document.querySelectorAll(".slide2__buttons");
const buttonzz1 = document.querySelectorAll(".add");
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 0) {
    headert.classList.add('dvij');
    podmenu.classList.add('act');
  } else {
    headert.classList.remove('dvij');
    podmenu.classList.remove('act');
  }
});
var slider1 = new Swiper('.aslider1 .swiper', {
  direction: 'horizontal',
  spaceBetween: 0,
  slidesPerView: 1,
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})
var slider2 = new Swiper('.aslider2 .swiper', {
  direction: 'horizontal',
  spaceBetween: 30,
  slidesPerView: 3,
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
var slider3 = new Swiper('.slider3 .swiper', {
  direction: 'horizontal',
  spaceBetween: 30,
  slidesPerView: 6,
  // loop: true,
  // Navigation arrows
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})


$(document).ready(function () {
  setTimeout(function () {
    $('.pgs, .pgs-nav, .pgs-footer').removeClass('pgs-active-panel');
    $('.pgs-btn').removeClass('pgs-btn-active');
  }, 1500);

  $('.pgs-btn').click(function () {
    $(this).toggleClass('pgs-btn-active');
    $('.pgs, .pgs-nav, .pgs-footer').toggleClass('pgs-active-panel');
  });

  $(".pgs-nav").mCustomScrollbar({
    theme: "dark-thick",
    scrollInertia: 400,
    advanced: {
      updateOnBrowserResize: true
    }
  });
});

// Находим все элементы галереи
const galleryItems = document.querySelectorAll('.as8Item img');
const galleryContainer = document.querySelector('.gallery-container');
const expandedImg = document.querySelector('.expanded-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

// Показываем увеличенное изображение
function showImage(index) {
  expandedImg.src = galleryItems[index].src;
}

// При клике на изображение в галерее
galleryItems.forEach((item, index) => {
  item.addEventListener('click', function () {
    currentIndex = index;
    showImage(currentIndex);
    galleryContainer.style.display = 'block';
  });
});

// Листание вперед по изображениям
nextBtn.addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  showImage(currentIndex);
});

// Листание назад по изображениям
prevBtn.addEventListener('click', function () {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showImage(currentIndex);
});
galleryContainer.addEventListener('click', function (event) {
  if (event.target === this) {
    galleryContainer.style.display = 'none';
  }
});
const openModalBtn = document.querySelectorAll(".openModalBtn");
const openModalBtn1 = document.querySelector(".openModalBtn1");
const openModalBtn2 = document.querySelector(".openModalBtn2");
const modal = document.getElementById('myModal');
const modal1 = document.getElementById('myModal1');
const modal2 = document.getElementById('myModal2');
const modalBackground = document.getElementById('modalBackground');
const close = document.querySelectorAll(".popup__close");
openModalBtn.forEach(item => {
  console.log(item);
  item.addEventListener('click', () => {
    modal.style.display = 'block';
    modalBackground.style.display = 'block';
  });
});


openModalBtn1.addEventListener('click', () => {
  modal1.style.display = 'block';
  modalBackground.style.display = 'block';
});
openModalBtn2.addEventListener('click', () => {
  modal2.style.display = 'block';
  modalBackground.style.display = 'block';
});

modalBackground.addEventListener('click', () => {
  modal.style.display = 'none';
  modal1.style.display = 'none';
  modal2.style.display = 'none';
  modalBackground.style.display = 'none';
});
close.forEach(item => {
  item.addEventListener('click', () => {
    modal.style.display = 'none';
    modal1.style.display = 'none';
    modal2.style.display = 'none';
    modalBackground.style.display = 'none';
  });
});
const popupItem = document.querySelectorAll('.popup__item');

popupItem.forEach(item => {
  const inputLabel = item.querySelector('.popup__item-label');
  const inputField = item.querySelector('.popup__item-input');
  inputField.addEventListener('input', function () {
    if (inputField.value.length > 0) {
      inputLabel.style.opacity = '1';
    } else {
      inputLabel.style.opacity = '0';
    }
  });

  inputField.addEventListener('focus', function () {
    if (inputField.value.length === 1) {
      inputLabel.style.opacity = '1';
    }
  });
});

let popupForm = document.querySelectorAll('.popup');
popupForm.forEach(item => {
  let submitButton = item.querySelector('.submit');
  if (submitButton) {
    let inputField = item.querySelectorAll('input');
    submitButton.addEventListener('click', function () {
      inputField.forEach(input => {
        let error = input.nextElementSibling;
        if (input.value.length < 1) {
          error.classList.add('show');
        } else {
          error.classList.remove('show');
        }
      });
    });
  }
});