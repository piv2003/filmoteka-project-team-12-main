import cardsMarkup from '../js/cards-markup';
import { filmsNotFoundTwo } from '../js/picture-not-found';

const library = document.querySelector('.films-catalog');
const watchedBtn = document.querySelector(`#watched-btn`);
const queueBtn = document.querySelector(`#queue-btn`);

queueBtn.addEventListener('click', addQueuedMarkup);
export default function addQueuedMarkup() {
  const queuedMovies = JSON.parse(localStorage.getItem('queued-movies'));

  watchedBtn.classList.remove('library_btn--active');
  queueBtn.classList.add('library_btn--active');

  if (!queuedMovies || queuedMovies.length === 0) {
    filmsNotFoundTwo();
    return;
  }
   library.innerHTML = cardsMarkup(queuedMovies);
}
