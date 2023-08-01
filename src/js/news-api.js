import axios from 'axios';
import {
  API_KEY,
  BASE_URL,
  TREND_URL,
  SEARCH_URL,
  MOVIE_DETAILS_URL,
} from './api-vars';
import { pagination, onResultsResetPagination } from './pagination';
import { Loader } from './loader';

const loader = new Loader();

class NewTrendApi {
  constructor() {
    this.page = 1;
  }
  async fetchTrend() {
    try {
      loader.show();
      const resp = await axios.get(
        `${TREND_URL}?api_key=${API_KEY}&page=${this.page}`
      );
      pagination.currentSearchString = '';
      onResultsResetPagination(resp);
      return resp.data.results;
    } catch (err) {
      //console.log(err.message);
    } finally {
      loader.hide();
    }
  }
}

class NewSearchApi {
  constructor() {
    (this.page = 1), (this.searchQuery = '');
  }
  async fetchSearch() {
    try {
      loader.show();

      const resp = await axios.get(
        `${SEARCH_URL}?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}`
      );

      //змінюємо загальну кількість сторінок на пагінації
      onResultsResetPagination(resp);
      return resp.data.results;
    } catch (err) {
      console.log(err.message);
    } finally {
      loader.hide();
    }
  }

  //   addPage() {
  //   this.page += 1;
  // }

  // resetPage() {
  //   this.page = 1;
  // }

  get query() {
    return this.searchQuery;
  }
  set query(newSearchQuery) {
    return (this.searchQuery = newSearchQuery);
  }
}

export { NewTrendApi, NewSearchApi };
