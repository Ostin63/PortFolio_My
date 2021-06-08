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

