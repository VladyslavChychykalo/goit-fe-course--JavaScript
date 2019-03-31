// import * as get from '../services/storage';
export default class Model {
  constructor() {
    this.urlList = this.getUrlFromLocalStorage();
  }

  unshiftItem(value) {
    const API_KEY = '5c8ce7f5e8eabc0a94cff7a1e60bd1c87bc2f4d0d14c4';
    const reg = /^(ftp|http|https):\/\/[^ "]+$/;
    const url = `https://api.linkpreview.net/?key=${API_KEY}&q=${value}`;

    if (!reg.test(value)) {
      alert('Не прошло валидацию!');
    } else {
      fetch(url)
        .then(response => {
          if (response.ok) return response.json();
          throw new Error('error' + response.statusText);
        })
        .then(data => {
          if (this.urlList.find(el => el.url === data.url)) {
            alert('Такая закладка уже существует!');
            console.log(data);
          } else {
            this.urlList.unshift(data);
            this.setUrlToLocalStorage(this.urlList);
          }
        })
        .catch(err => console.log(err));
    }
    return new Promise(resolve => resolve(this.urlList));
  }

  removeItem(cardUrl) {
    let indexOfDeletedUrl = this.urlList.indexOf(
      this.urlList.find(el => el.url === cardUrl),
    );
    console.log(this.urlList);
    this.urlList.splice([indexOfDeletedUrl], 1);
    console.log(this.urlList);
    console.log(indexOfDeletedUrl);
    console.log(cardUrl);
    this.setUrlToLocalStorage(this.urlList);
  }
  setUrlToLocalStorage(array) {
    localStorage.setItem('favourites-links', JSON.stringify(array));
  }
  getUrlFromLocalStorage() {
    let data = localStorage.getItem('favourites-links');
    return data ? JSON.parse(data) : [];
  }
}
