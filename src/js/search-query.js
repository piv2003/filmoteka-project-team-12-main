import { NewTrendApi, NewSearchApi } from './news-api';
import filmCardMarkupCreator from './cards-markup';
import { Loader } from './loader';

const loader = new Loader();

const hiddenWarning = document.querySelector('.search__text');
const carts = document.querySelector('.container-catalog');
const form = document.querySelector('.search');
//const searchInputEl = document.querySelector('.search__input');

const TrendApi = new NewTrendApi();
const SearchApi = new NewSearchApi();

TrendApi.fetchTrend()
  .then(dataForCatalog => {
    localStorage.setItem('current-movies', JSON.stringify(dataForCatalog));
    addCards(dataForCatalog);
  })
  .catch(console.log);

form.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  loader.show();
  SearchApi.query = e.currentTarget.elements.searchQuery.value.trim();

  // Type something

  if (SearchApi.query === '') {
    hiddenWarning.classList.remove('hidden');
    hiddenWarning.textContent = 'Please type something';
    setTimeout(function () {
      hiddenWarning.classList.add('hidden');
    }, 3000);
    loader.hide();
    return;
  }

  if (!SearchApi.query) {
    try {
      const dataForCatalog = await TrendApi.fetchTrend();
      console.log(dataForCatalog);
      localStorage.setItem('current-movies', JSON.stringify(dataForCatalog));
      addCards(dataForCatalog);
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  try {
    const dataForCatalog = await SearchApi.fetchSearch();
    //console.log(dataForCatalog);
    localStorage.setItem('current-movies', JSON.stringify(dataForCatalog));
    addCards(dataForCatalog);

    //wrongSearch

    if (dataForCatalog.length === 0) {
      //console.log(dataForCatalog);
      TrendApi.fetchTrend()
        .then(dataForCatalog => {
          localStorage.setItem(
            'current-movies',
            JSON.stringify(dataForCatalog)
          );
          addCards(dataForCatalog);
        })
        .catch(console.log);
      hiddenWarning.classList.remove('hidden');
      hiddenWarning.textContent =
        'Search result not successful. Enter the correct movie name';
      setTimeout(function () {
        hiddenWarning.classList.add('hidden');
      }, 3000);
      loader.hide();
    }
  } catch (error) {
    console.log(error.message);
  }
  loader.hide();
}

function addCards(data) {
  carts.innerHTML = filmCardMarkupCreator(data);
}


