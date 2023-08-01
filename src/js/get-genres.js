export default function getGenres(genresVal, filmGenreIds) {
  const filmGenres = [];

  for (let i = 0; i < genresVal.length; i += 1) {
    filmGenreIds.includes(genresVal[i].id) &&
      filmGenres.push(genresVal[i].name);

    if (filmGenres.length === 2 && filmGenres.join('').length >= 20) {
      return filmGenres.join(',&nbsp');
    }
    if (
      filmGenres.length === 3 &&
      filmGenres[filmGenres.length - 1].length > 10
    ) {
      filmGenres.splice(2, filmGenres.length - 1, 'Other');

      return filmGenres.join(',&nbsp');
    }
    if (filmGenres.length === 4) {
      filmGenres.splice(2, filmGenres.length - 2, 'Other');

      return filmGenres.join(',&nbsp');
    }
  }

  if (!filmGenres.length) {
    return 'No Genres';
  }

  return filmGenres.join(',&nbsp');
}
