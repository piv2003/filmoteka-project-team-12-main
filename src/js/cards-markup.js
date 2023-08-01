import getGenres from './get-genres';
import { IMAGE_BASE_URL } from './api-vars.js';
import posterPlug from '../images/utility-images/poster-plug.png';

export default function filmCardMarkupCreator(data) {
  const genresValue = JSON.parse(localStorage.getItem('Genre'));

  return data
    .map(film => {
      const genres = getGenres(genresValue, film.genre_ids);
      const title = film.title ?? film.name;

      const poster = film.poster_path
        ? IMAGE_BASE_URL + film.poster_path
        : posterPlug;

      let date =
        Number.parseInt(film.release_date) ??
        Number.parseInt(film.first_air_date);

      if (Number.isNaN(date)) {
        date = 'No Date';
      }

      return `<article class="film-card">
    <a src="#" class="film-card__link"  data-id='${film.id}'>
      <img
        class="film-card__image"
        src="${poster}"
        alt="${title}"
        width="395"
      />
      <h2 class="film-card__title">${title}</h2>
      <div class="film-card__desc">
        <p class="film-card__genre">${genres}</p>
        <p class="film-card__date">&nbsp|&nbsp${date}</p>
        <span class="film-card__rating">${film.vote_average.toFixed(1)}</span>
      </div>
    </a>
  </article>`;
    })
    .join('');
}
