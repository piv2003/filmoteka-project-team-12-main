const icon = document.querySelector('.fas');
const switchDayNight = document.querySelector('.day-night-switch');
const footerEl = document.querySelector(".footer")
const footerTextEl = document.querySelector(".footer-paragraph") 

if (localStorage.getItem('darkMode') === null) {
  localStorage.setItem('darkMode', 'false');
}
checkDarkModeStatus();

function checkDarkModeStatus() {
  if (localStorage.getItem('darkMode') === 'true') {
    addDarkTheme();
    switchDayNight.checked = true;
  } else {
    removeDarkTheme();
    switchDayNight.checked = false;
  }
}

switchDayNight.addEventListener('change', () => {
  if (switchDayNight.checked) {
    addDarkTheme();
  } else {
    removeDarkTheme();
  }
  localStorage.setItem('darkMode', switchDayNight.checked);
});

function addDarkTheme() {
  document.body.classList.add('dark__theme');
  footerEl.classList.add("footer__dark-theme")
  footerEl.classList.remove("footer")
  footerEl.classList.add("footer-paragraph__dark-theme")
  footerEl.classList.remove("footer-paragraph")
}
function removeDarkTheme() {
  document.body.classList.remove('dark__theme');
  footerEl.classList.add("footer")
  footerEl.classList.remove("footer__dark-theme")
  footerEl.classList.add("footer-paragraph")
  footerEl.classList.remove("footer-paragraph__dark-theme")
}

