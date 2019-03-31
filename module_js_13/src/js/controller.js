export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    view.on('add', this.addItem.bind(this));
    view.on('remove', this.removeItem.bind(this));
  }
  addItem(value) {
    this.model.unshiftItem(value).then(list => this.view.drawFavorites(list));
  }
  removeItem() {
    this.model.removeItem(this.view.cardForDeleteUrl);
  }
  loadPage() {
    document.addEventListener(
      'DOMContentLoaded',
      this.view.drawFavorites(this.model.urlList),
      // сюда попробовать добавить drawFavorites и разобраться с этой функцией
    );
  }
}