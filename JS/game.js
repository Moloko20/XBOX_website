'use strict';

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
const head = document.querySelectorAll('.nav__logo[data-goto]');
if (head.length > 0) {
  head.forEach((link) => {
    link.addEventListener('click', onLogoLinkClick);
  });

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

// Анимация при скролле
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add('_active');
      } else {
        if (!animItem.classList.contains('_anim-no-hide')) {
          animItem.classList.remove('_active');
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + screenLeft };
  }
  setTimeout(() => {
    animOnScroll();
  }, 300);
}
