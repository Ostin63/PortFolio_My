/* eslint-disable id-length */
/* eslint-disable no-shadow */
const body = document.querySelector('.body');
const order = body.querySelector('.order');
const ordeButtons = order.querySelectorAll('.order__item-button');
const orderContents = order.querySelectorAll('.order__content-item');
const upButton = body.querySelector('.up-button');
const headerLinkLogo = body.querySelector('.header__link-logo');
const footerLinkLogo = body.querySelector('.footer__link-logo');
const errorMessage = body.querySelector('#error')
  .content
  .querySelector('.error');

const onError = (evt) => {
  evt.preventDefault();
  body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, 3000);
};

window.onscroll = () => {
  if (window.pageYOffset > 300) {
    upButton.classList.add('show');
  } else {
    upButton.classList.remove('show');
  }
};

upButton.onclick = () => {
  window.scrollTo(0, 0);
};

const map = L.map('map')
  .setView({
    lat: 48.81847,
    lng: 44.62908,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/pin-home.png',
  iconSize: [40, 60],
  iconAnchor: [20, 60],
});

const mainPinMarker = L.marker(
  {
    lat: 48.81847,
    lng: 44.62908,
  },
  {
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const switchSlides = (switchers, slides) => {
  for (let i = 0; i < switchers.length; i++) {
    switchers[i].addEventListener('click', () => {

      for (let i = 0; i < switchers.length; i++) {
        switchers[i].classList.remove('active');
        slides[i].classList.remove('active');
      }

      switchers[i].classList.add('active');
      slides[i].classList.add('active');
    });
  }
};

switchSlides(ordeButtons, orderContents);

headerLinkLogo.addEventListener('click', onError);
footerLinkLogo.addEventListener('click', onError);

// 60.71618, 28.75676 ВАТУ ГА
