'use strict';

const btnShow = document.querySelector('.nav-btn--show');
const btnClose = document.querySelector('.nav-btn--close');
const nav = document.querySelector('.nav');
const btnLearn = document.querySelectorAll('.btn');
const featuresContainer = document.querySelector('.features');

btnLearn.forEach(btn =>
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const id = btn.getAttribute('href');
    const learnTarget = document.querySelector(id);
    learnTarget.scrollIntoView({
      behavior: 'smooth',
    });
  })
);

// Navigation
btnShow.addEventListener('click', function () {
  nav.classList.add('nav--show');
  btnClose.style.visibility = 'visible';
});

btnClose.addEventListener('click', function () {
  nav.classList.remove('nav--show');
  btnClose.style.visibility = 'hidden';
});

nav.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);
    section.scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Nav effect
const linkEffect = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.textDecoration = this;
      }
    });
  }
};

nav.addEventListener(
  'mouseover',
  linkEffect.bind('line-through var(--primaryColor) 5px')
);

nav.addEventListener('mouseout', linkEffect.bind('none'));
