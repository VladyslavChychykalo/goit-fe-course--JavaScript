import EventEmitter from '../services/event-emitter';
// import template from '../templates/grid-item.hbs';

export default class View extends EventEmitter {
  constructor() {
    super();
    this.form = document.querySelector('.url-form');
    this.input = document.querySelector('.url-form__input');
    this.addUrlButton = document.querySelector('.url-form__button');
    this.cardSection = document.querySelector('.favorites-wrapper');
    this.ring = document.querySelector('.ring-wrapper');
    this.form.addEventListener('submit', this.onUrlAdding.bind(this));
    this.cardSection.addEventListener('click', this.onDeleteClick.bind(this));
    this.cardForDeleteUrl;
  }
  onUrlAdding(event) {
    event.preventDefault();
    const { value } = this.input;
    this.cardSection.innerHTML = '';
    // if (this.input.value === '') return;
    this.emit('add', value);
    this.form.reset();
  }
  drawFavorites(list) {
    console.log(list);
    let template = document
      .querySelector('#favorites-template')
      .innerHTML.trim();
    let compileTemplate = Handlebars.compile(template);
    let cardMarkup = list.reduce(
      (acc, elem) => acc + compileTemplate(elem),
      '',
    );
    this.cardSection.insertAdjacentHTML('afterbegin', cardMarkup);
    // this.toggleRing();
  }
  onDeleteClick(event) {
    if (event.target.nodeName === 'BUTTON') {
      let cardForDelete = event.target.parentNode;
      this.cardForDeleteUrl = cardForDelete.querySelector(
        '.favorites-card__url',
      ).textContent;
      this.emit('remove', this.cardForDeleteUrl);
      cardForDelete.remove();
    }
  }

  // toggleRing() {
  //   this.ring.classList.toggle('ring--hidden');
  // }
}
