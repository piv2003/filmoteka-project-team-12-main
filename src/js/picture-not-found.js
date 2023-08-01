import zhdun from '../images/waiting/zdun.png';

const imgNotFound = `<div class='not-found_container'>
<h2 class="library_not-found-text">Are you serious? No movies have been added yet. 
Ok, I'll wait. </br><a href="./index.html" class="link_to-home">Go home page.</a></h1>
<img src="${zhdun}" width="400px" class='img_not-found'>
    </div>`;

function filmsNotFound() {
  const containerEl = document.querySelector('.container-catalog');

  containerEl.innerHTML = imgNotFound;
}

function filmsNotFoundTwo() {
  const containerEl = document.querySelector('.films-catalog');

  containerEl.innerHTML = imgNotFound;
}

export { filmsNotFound, filmsNotFoundTwo };
