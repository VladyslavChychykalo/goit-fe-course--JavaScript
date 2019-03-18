'use strict';

// import { link } from 'fs';
// import { format } from 'path';

/* 
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок. 
  
  Реализуйте следующий функционал:
    - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    
    - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    
    - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    
    - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для
      создания списка карточек. Форма уже есть в HTML при загрузке страницы.
      
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
        * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
        * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
          
    - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    
    - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике 
      на кнопку происходит удаление.
      
    - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
      
  🔔 Оформление интерфейса произвольное
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходи проверка 
      на валидность введенной ссылки: если был введен невалидный url то должно всплывать 
      диалоговое окно, оповещающее пользователя о том, что это невалидный url. Используйте
      регулярные выражения для валидации url.
          
    - Каждая карточка содержит превью изображение и базовую информацию о странице по адресу закладки,
      для получения этой информации воспользуйтесь этим Rest API - https://www.linkpreview.net/
*/

// ===========================================================================

var urlList = getUrlFromLocalStorage();

var form = document.querySelector('.url-form');
var input = document.querySelector('.url-form__input');
var addUrlButton = document.querySelector('.url-form__button');
var cardSection = document.querySelector('.favorites-wrapper');
drawFavorites();
console.log(urlList);

function drawFavorites() {
  var template = document.querySelector('#favorites-template').innerHTML.trim();
  var compileTemplate = Handlebars.compile(template);
  var cardMarkup = urlList.reduce(function (acc, elem) {
    return acc + compileTemplate(elem);
  }, '');
  cardSection.insertAdjacentHTML('afterbegin', cardMarkup);
}

form.addEventListener('submit', onUrlAdding);
cardSection.addEventListener('click', onDeleteClick);

function onUrlAdding(event) {
  event.preventDefault();
  var API_KEY = '5c8ce7f5e8eabc0a94cff7a1e60bd1c87bc2f4d0d14c4';
  var reg = /^(ftp|http|https):\/\/[^ "]+$/;
  var url = 'http://api.linkpreview.net/?key=' + API_KEY + '&q=' + input.value;

  if (!reg.test(input.value)) {
    alert('Не прошло валидацию!');
  } else fetch(url).then(function (response) {
    if (response.ok) return response.json();
    throw new Error('error' + response.statusText);
  }).then(function (data) {
    if (data.url === input.value) {
      alert('Такая закладка уже существует!');
      console.log(data);
    } else {
      urlList.unshift(data);
      setUrlToLocalStorage(urlList);
      drawFavorites();
    }
  }).catch(function (err) {
    return console.log(err);
  });
  form.reset();
}

function onDeleteClick(event) {
  if (event.target.nodeName === 'BUTTON') {
    var cardForDelete = event.target.parentNode;
    var cardForDeleteUrl = cardForDelete.querySelector('.favorites-card__url').textContent;
    var indexOfDeletedUrl = urlList.indexOf(urlList.find(function (el) {
      return el.url === cardForDeleteUrl;
    }));
    cardForDelete.remove();
    urlList.splice([indexOfDeletedUrl], 1);
    setUrlToLocalStorage(urlList);
  }
}

function setUrlToLocalStorage(array) {
  localStorage.setItem('favourites-links', JSON.stringify(array));
}
function getUrlFromLocalStorage() {
  var data = localStorage.getItem('favourites-links');
  return data ? JSON.parse(data) : [];
}