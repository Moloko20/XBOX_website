'use strict';
// Слайдеры
$(document).ready(function () {
  $('.slider').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 767.98,
        settings: {
          dots: false,
        },
      },
    ],
  });
  $('.games__slider').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    appendArrows: $('.games__arrow'),
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1199.98,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
        breakpoint: 767.98,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  });
});

// Саб меню
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add('_touch');

  let navArrows = document.querySelectorAll('.arrow');
  if (navArrows.length > 0) {
    for (let index = 0; index < navArrows.length; index++) {
      const navArrow = navArrows[index];
      navArrow.addEventListener('click', function (e) {
        navArrow.parentElement.classList.toggle('_active');
      });
    }
  }
} else {
  document.body.classList.add('_pc');
}

// Меню бургер

const burgerIcon = document.querySelector('.menu-burger__header');
const burgerBody = document.querySelector('.nav__menu');
if (burgerIcon) {
  burgerIcon.addEventListener('click', function (e) {
    document.body.classList.toggle('_lock');
    burgerIcon.classList.toggle('_active');
    burgerBody.classList.toggle('_active');
  });
}

// Плавная прокрутка
const menuLinks = document.querySelectorAll('.link[data-goto]');
const head = document.querySelectorAll('.nav__logo[data-goto]');
if (menuLinks.length > 0 && head.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });
  head.forEach((link) => {
    link.addEventListener('click', onLogoLinkClick);
  });
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector('header').offsetHeight;

      if (burgerIcon.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        burgerIcon.classList.remove('_active');
        burgerBody.classList.remove('_active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
      e.preventDefault();
    }
  }

  function onLogoLinkClick(e) {
    if (burgerIcon.classList.contains('_active')) {
      document.body.classList.remove('_lock');
      burgerIcon.classList.remove('_active');
      burgerBody.classList.remove('_active');
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    e.preventDefault();
  }
}
