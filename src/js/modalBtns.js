// Не знаю як цю функцію назвати, але коли модалка з фільмом показується, цю функцію треба викликати,передаючи в неї цей фільм, воно знайде кнопки і повісить усі прослуховувачи.Тепер по кліку на кнопки, воно буде додавати і видаляти фільм з локал стораджа.

export default function localStorageLibrary(movie) {
  const watchedList = JSON.parse(localStorage.getItem('watched-movies')) || [];
  const queuedList = JSON.parse(localStorage.getItem('queued-movies')) || [];
  const addToWatchedBtn = document.querySelector('.js-toWatched');
  const addToQueueBtn = document.querySelector('.js-toQueue');

  addToWatchedBtn.addEventListener('click', onWatchedBtnClick);
  addToQueueBtn.addEventListener('click', onQueueBtnClick);

  if (watchedList.find(({ id }) => id === movie.id)) {
    addToWatchedBtn.textContent = 'REMOVE FROM WATCHED';
  }

  if (queuedList.find(({ id }) => id === movie.id)) {
    addToQueueBtn.textContent = 'REMOVE FROM QUEUE';
  }

  function onWatchedBtnClick() {
    if (watchedList.find(({ id }) => id === movie.id)) {
      watchedList.splice(
        watchedList.findIndex(({ id }) => id === movie.id),
        1
      );
      localStorage.setItem('watched-movies', JSON.stringify(watchedList));

      addToWatchedBtn.textContent = `${
        watchedList.find(({ id }) => id === movie.id) ? 'REMOVE FROM' : 'ADD TO'
      } WATCHED `;
      return;
    }
    watchedList.push(movie);
    localStorage.setItem('watched-movies', JSON.stringify(watchedList));

    addToWatchedBtn.textContent = `${
      watchedList.find(({ id }) => id === movie.id) ? 'REMOVE FROM' : 'ADD TO'
    } WATCHED `;
  }

  function onQueueBtnClick() {
    if (queuedList.find(({ id }) => id === movie.id)) {
      queuedList.splice(
        queuedList.findIndex(({ id }) => id === movie.id),
        1
      );
      localStorage.setItem('queued-movies', JSON.stringify(queuedList));

      addToQueueBtn.textContent = `${
        queuedList.find(({ id }) => id === movie.id) ? 'REMOVE FROM' : 'ADD TO'
      } QUEUE `;

      return;
    }
    queuedList.push(movie);
    localStorage.setItem('queued-movies', JSON.stringify(queuedList));

    addToQueueBtn.textContent = `${
      queuedList.find(({ id }) => id === movie.id) ? 'REMOVE FROM' : 'ADD TO'
    } QUEUE `;
  }
}
