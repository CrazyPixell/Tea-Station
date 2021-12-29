'use strict';

const btnShow = document.querySelector('.nav-btn--show');
const btnClose = document.querySelector('.nav-btn--close');
const nav = document.querySelector('.nav');
const btnLearn = document.querySelectorAll('.btn');
const featuresContainer = document.querySelector('.features');
const sectionsLeft = document.querySelectorAll('.section-slide-left');
const sectionsUp = document.querySelectorAll('.section-slide-up');
const lazyImgs = document.querySelectorAll('img[data-src');

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

// Slide effect
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (entry.target.classList.contains('section-slide-left'))
    entry.target.classList.remove('slide-left');
  if (entry.target.classList.contains('section-slide-up'))
    entry.target.classList.remove('slide-up');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

sectionsLeft.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('slide-left');
});

sectionsUp.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('slide-up');
});

// Lazy loading images
const lazyImg = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0,
});

lazyImgs.forEach(img => imgObserver.observe(img));

// Map
const latitude = 38.356143;
const longitude = -81.665556;
const coords = [latitude, longitude];
const map = L.map('map').setView(coords, 15);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker(coords).addTo(map).bindPopup('Here we are').openPopup();

// Services
class ServiceItem {
  constructor(image, icon, title) {
    this.image = image;
    this.icon = icon;
    this.title = title;
  }

  render() {
    const serviceItem = document.createElement('div');
    serviceItem.classList.add('service');
    serviceItem.innerHTML = `
      <img
      src="${this.image}"
      alt="Tea picture"
      class="service__img"
      />
      <div class="service__description">
        <span class="service__icon-box">
          <i class="${this.icon}"></i>
        </span>
        <h5 class="service__title">${this.title}</h5>
        <button class="service__btn">Read more</button>
      </div>
    `;
    return serviceItem;
  }
}

class Services {
  services = [
    new ServiceItem(
      'img/service-1.webp',
      'fas fa-mortar-pestle service__icon',
      'Custom recipe service'
    ),
    new ServiceItem(
      'img/service-2.webp',
      'fas fa-truck service__icon',
      'Home delivery service'
    ),
    new ServiceItem(
      'img/service-1.webp',
      'fas fa-mug-hot service__icon',
      'Tea aging service'
    ),
  ];
  render() {
    const servicesContainer = document.querySelector('.services-container');
    this.services.forEach(service => {
      const serviceEl = service.render();
      servicesContainer.append(serviceEl);
    });
  }
}

const services = new Services();
services.render();
