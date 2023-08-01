//import "tui-pagination/dist/tui-pagination.css";
import Pagination from 'tui-pagination';
import axios from 'axios';
import {
  API_KEY,
  TREND_URL,
  SEARCH_URL,
} from './api-vars';
import filmCardMarkupCreator from './cards-markup';
import { Loader } from './loader';

const loader = new Loader();

const cards = document.querySelector('.container-catalog');
const container = document.getElementById('pagination');
const searchInputEl = document.querySelector('.search__input');

const options = { // default value of options
     totalItems: 0,
     itemsPerPage: 20,
     visiblePages: 5,
     page: 1,
    centerAlign: true,
     
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
      template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
                currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
                    moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
                '<span class="tui-ico-{{type}}">:::</span>' +
                '</a>',
                disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
                '<span class="tui-ico-{{type}}">:::</span>' +
                '</span>',
                moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
                '<span class="tui-ico-ellip">...</span>' +
                '</a>',
        },
    usageStatistics: false,
    
};

class NewPageTrendApi {
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
      return resp.data.results;
    } catch (err) {
      console.log(err.message);
    } finally {
      loader.hide();
    }
  }
}

class NewPageSearchApi {
  constructor() {
    (this.page = 1), (this.searchQuery = '');
  }
  async fetchSearch() {
    try {
      loader.show();
      const resp = await axios.get(
        `${SEARCH_URL}?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}`
      );
      return resp.data.results;
    } catch (err) {
      console.log(err.message);
    } finally {
      loader.hide();
    }
  }
}

const TrendApi = new NewPageTrendApi();
const SearchApi = new NewPageSearchApi();

export const pagination = new Pagination(container, options);

export function onResultsResetPagination(res) {
  pagination.reset(res.data.total_results);
}

function addCards(data) {
  cards.innerHTML = filmCardMarkupCreator(data);
}

pagination.on('afterMove', event => {
  movePage(event);
});

async function movePage(event) {
   let URL_handler;
   let currentRequest = searchInputEl.value.trim();
  pagination.currentSearchString = currentRequest;

  if (!pagination.currentSearchString) {
    URL_handler = TrendApi;
  } else {
    URL_handler = SearchApi;
  }

  const currentPage = event.page;
  URL_handler.page = currentPage;
 
      SearchApi.searchQuery = currentRequest;
      document.querySelector('.container-catalog').innerHTML = '';
      onSearchTwo();
  
      async function onSearchTwo(e) {
        
        if (!pagination.currentSearchString) {
        try {
          const dataForCatalog = await TrendApi.fetchTrend();
          localStorage.setItem('current-movies', JSON.stringify(dataForCatalog));
          addCards(dataForCatalog);
        } catch (error) {
        console.log(error.message);
        }
        return;
      }

    try {
      const dataForCatalog = await SearchApi.fetchSearch();
      localStorage.setItem('current-movies', JSON.stringify(dataForCatalog));
      addCards(dataForCatalog);
    } catch (error) {
      console.log(error.message);
    }
  }
};
