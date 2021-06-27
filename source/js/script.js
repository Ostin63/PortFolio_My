const upButton = document.querySelector('.up-button');

window.onscroll = () => {
  if (window.pageYOffset > 300) {
    upButton.classList.add('show')
  } else {
    upButton.classList.remove('show')
  }
};

upButton.onclick = () => {
  window.scrollTo(0, 0)
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
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 48.81847,
    lng: 44.62908,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});