export class Loader {
  constructor() {
    this.loaderEl = document.createElement('div');
    this.loaderEl.classList.add('loader', 'loader-hidden');
    document.body.appendChild(this.loaderEl);
  }

  hide() {
    this.loaderEl.classList.add('loader-hidden');
  }

  show() {
    this.loaderEl.classList.remove('loader-hidden');
  }
}
