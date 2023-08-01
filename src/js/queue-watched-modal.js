import addQueuedMarkup from './page-queued.js';
import addWatchedMarkup from './page-watched.js';
import localStorageLibrary from './modalBtns.js';
import posterPlug from '../images/utility-images/poster-plug.png';
// Получение объекта из localStorage

let currentMovies = JSON.parse(localStorage.getItem('watched-movies'));
const queueBtn = document.querySelector('[data-queue]');
const watchBtn = document.querySelector('[data-watch]');

queueBtn.addEventListener('click', addQueueJson);
watchBtn.addEventListener('click', addWatchJson);

// Парс если в queue
function addQueueJson() {
  currentMovies = JSON.parse(localStorage.getItem('queued-movies'));
  //console.log(currentMovies);
  return currentMovies;
}
// Парс если в watch
function addWatchJson() {
  currentMovies = JSON.parse(localStorage.getItem('watched-movies'));
  console.log(currentMovies);
  return currentMovies;
}

// <!-- функция открытия и разметки модалки
function modalOpen() {
  const refs = {
    openModalCard: document.querySelector('.container-catalog'),
    modal: document.querySelector('[data-modal]'),
    modalContainer: document.querySelector('.modal-container'),
  };

  refs.openModalCard.addEventListener('click', openModal);
  function openModal(evt) {
    document.body.style.overflow = 'hidden';
    const filmCard = evt.target.closest('.film-card__link');
    if (!filmCard) {
      return;
    }
    refs.modal.classList.toggle('is-hidden');

    window.addEventListener('keydown', onEscapeKeyPress);
    // получение id  по нажатому объекту
    const filmId = Number(filmCard.dataset.id);
    //console.log(filmId);

    const currentFilm = currentMovies.find(({ id }) => id === filmId);

    // ФУНКЦИЯ РАЗМЕТКИ МОДАЛКИ
    function modalMarkup() {
      //  формирование массива жанров карточки :
      const genresArr = currentFilm.genre_ids;
      const genresObj = addGenre();
      let genresFilm = [];
      genresArr.map(el => genresFilm.push(genresObj[el]));

      // Подстановка данных в шаблонный рядок модалки
      // если нет картинки на постере, то заглушка
      let imgUrl = !currentFilm.poster_path
        ? posterPlug
        : `https://image.tmdb.org/t/p/w500${currentFilm.poster_path}`;

      const title = currentFilm.title;
      const vote = Number(currentFilm.vote_average).toFixed(1);
      const votes = currentFilm.vote_count;
      const popularity = Number(currentFilm.popularity).toFixed(1);
      let genre = genresFilm.join(', ');
      if (!genre) {
        genre = 'no information';
      }
      let about = currentFilm.overview;
      if (!about) {
        about = 'no information, but coming soon';
      }

      const markup = `<div class="img-box">
           <img
             class="img-modal"
             src="${imgUrl}"
             alt="${title}"
             width="240px"
           />
         </div>
         <div class="content-box">
           <div class="text-box">
             <h2 class="modal-title">${title}</h2>
             <table>
               <tbody class="tbody">
                 <tr>
                   <td class="tbody-category">Vote / Votes</td>
                   <td class="tbody-vote">${vote}</td>
                   <td class="tbody-slash">/</td>
                   <td class="tbody-votes">${votes}</td>
                   <td></td>
                 </tr>
                 <tr>
                   <td class="tbody-category">Popularity</td>
                   <td colspan="4">${popularity}</td>
                   <td></td>
                   <td></td>
                 </tr>
                 <tr>
                   <td class="tbody-category">Original Title</td>
                   <td class="tbody-category__text" colspan="4">${title}</td>
                   <td></td>
                   <td></td>
                 </tr>
                 <tr>
                   <td class="tbody-category">Genre</td>
                   <td class="tbody-category__text" colspan="4">${genre}</td>
                   <td></td>
                   <td></td>
                 </tr>
               </tbody>
             </table>
      
             <h3 class="modal-subtitle">About</h3>
             <p class="textAbout">
               ${about}
             </p>
           </div>
           <div class="btn-container">
             <button class="js-toWatched btn-click-modal">add to watched</button>
             <button class="js-toQueue btn-click-modal">add to queue</button>
           </div>
         </div>`;

      refs.modalContainer.innerHTML = markup;
    }
    modalMarkup();
    localStorageLibrary(currentFilm);
  }
}
modalOpen();

// Функция закрытия модалки
function modalClose() {
  const refs = {
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.closeModalBtn.addEventListener('click', toggleModal);
  function toggleModal() {
    console.log('close');
    document.body.style.overflow = 'auto';
    if (queueBtn.classList.contains('library_btn--active')) {
      addQueuedMarkup();
    }
    if (watchBtn.classList.contains('library_btn--active')) {
      addWatchedMarkup();
    }

    refs.modal.classList.toggle('is-hidden');
  }
  window.removeEventListener('keydown', onEscapeKeyPress);
}
modalClose();

// Функция создания объекта жанров
function addGenre() {
  const genre = JSON.parse(localStorage.getItem('Genre'));

  const genreId = genre.flatMap(el => el.id);
  const genreName = genre.flatMap(el => el.name);
  const genreObj = genreId.reduce(
    (acc, id, i) => ({ ...acc, [id]: genreName[i] }),
    {}
  );

  return genreObj;
}
addGenre();

//закриття по бекдропу та Esc
const backdrop = document.querySelector('.backdrop');
backdrop.addEventListener('click', onBackdropClick);
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    document.body.style.overflow = 'auto';
    document.querySelector('[data-modal]').classList.toggle('is-hidden');
    //console.log('close');
    if (queueBtn.classList.contains('library_btn--active')) {
      addQueuedMarkup();
    }
    if (watchBtn.classList.contains('library_btn--active')) {
      addWatchedMarkup();
    }
  }
  window.removeEventListener('keydown', onEscapeKeyPress);
}

function onEscapeKeyPress(event) {
  // console.log(event.code);
  document.body.style.overflow = 'auto';
  if (event.code === 'Escape') {
    document.querySelector('[data-modal]').classList.toggle('is-hidden');
    console.log('close');
    if (queueBtn.classList.contains('library_btn--active')) {
      addQueuedMarkup();
    }
    if (watchBtn.classList.contains('library_btn--active')) {
      addWatchedMarkup();
    }
    window.removeEventListener('keydown', onEscapeKeyPress);
  }
}
