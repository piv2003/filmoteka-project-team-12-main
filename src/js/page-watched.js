import cardsMarkup from '../js/cards-markup';
import { filmsNotFoundTwo } from '../js/picture-not-found';

const btnWatched = document.querySelector('#watched-btn');
const btnQueue = document.querySelector('#queue-btn');
const sectionEl = document.querySelector('.films-catalog');

btnWatched.addEventListener('click', addWatchedMarkup);


export default function addWatchedMarkup() {
  const markupArr = localStorage.getItem('watched-movies');
  const markupArrParse = JSON.parse(markupArr);
  btnWatched.classList.add('library_btn--active');
  btnQueue.classList.remove('library_btn--active');
  if (!markupArrParse || markupArrParse.length === 0) {
    filmsNotFoundTwo();
  } else {
    const strokeMarkup = cardsMarkup(markupArrParse);
    sectionEl.innerHTML = strokeMarkup;
  }
  }
