import axios from "axios";
import { API_KEY, BASE_URL, TREND_URL, SEARCH_URL, MOVIE_DETAILS_URL } from '../js/api-vars';

async function addGenre() {
    try {
        const responses = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const objGenres = responses.data.genres;
        localStorage.setItem('Genre', JSON.stringify(objGenres));
} catch(err) {
  //console.log(err);
}
}

addGenre();
