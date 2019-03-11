'use strict';
/*
  Реализуйте форму фильтра товаров в каталоге и список отфильтрованных товаров.
  Используйте шаблонизацию для создания карточек товаров.
  
  Есть массив объектов (дальше в задании), каждый из которых описывает 
  ноутбук с определенными характеристиками.
  
  Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
  Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.
    
  Изначально есть форма с 3-мя секциями, состоящими из заголовка и группы 
  чекбоксов (разметка дальше в задании). После того как пользователь выбрал 
  какие либо чекбоксы и нажал кнопку Filter, необходимо собрать значения чекбоксов по группам. 
  
  🔔 Подсказка: составьте объект формата
      const filter = { size: [], color: [], release_date: [] }
    
  После чего выберите из массива только те объекты, которые подходят 
  под выбраные пользователем критерии и отрендерите список карточек товаров.
  
  🔔 Каждый раз когда пользователь фильтрует товары, список карточек товаров очищается, 
      после чего в нем рендерятся новые карточки товаров, соответствующих текущим критериям фильтра.
*/

const sizeInputs = document.querySelectorAll(
  'input[type="checkbox"][name="size"]',
);
const colorInputs = document.querySelectorAll(
  'input[type="checkbox"][name="color"]',
);
const dateInputs = document.querySelectorAll(
  'input[type="checkbox"][name="release_date"]',
);

const template = document.querySelector('#compile-template').innerHTML.trim();
const compile = Handlebars.compile(template);
const container = document.querySelector('.container');

const form = document.querySelector('.js-form');
form.addEventListener('submit', doContainer);
form.addEventListener('reset', eraseAll);

let filter;
function doContainer(e) {
  e.preventDefault();
  filter = { size: [], color: [], release_date: [] };
  container.innerHTML = '';

  sizeInputs.forEach(input => {
    if (input.checked) {
      filter.size.push(+input.value);
    }
  });

  colorInputs.forEach(input => {
    if (input.checked) {
      filter.color.push(input.value);
    }
  });

  dateInputs.forEach(input => {
    if (input.checked) {
      filter.release_date.push(+input.value);
    }
  });

  let laptopsFiltered = laptops.filter(el => {
    console.log(el);
    if (
      filter.size.includes(el.size) &&
      filter.color.includes(el.color) &&
      filter.release_date.includes(el.release_date)
    ) {
      return el;
    }
    if (
      filter.size.length === 0 &&
      filter.color.length === 0 &&
      filter.release_date.length === 0
    ) {
      return el;
    }
    if (filter.size.length === 0) {
      if (
        filter.release_date.includes(el.release_date) &&
        filter.color.includes(el.color)
      ) {
        return el;
      }
      if (filter.color.length === 0) {
        if (filter.release_date.includes(el.release_date)) {
          return el;
        }
      }
      if (filter.release_date.length === 0) {
        if (filter.color.includes(el.color)) {
          return el;
        }
      }
    }

    if (filter.color.length === 0) {
      if (
        filter.size.includes(el.size) &&
        filter.release_date.includes(el.release_date)
      ) {
        return el;
      }
      if (filter.size.length === 0) {
        if (filter.release_date.includes(el.release_date)) {
          return el;
        }
      }
      if (filter.release_date.length === 0) {
        if (filter.size.includes(el.size)) {
          return el;
        }
      }
    }

    if (filter.release_date.length === 0) {
      if (filter.size.includes(el.size) && filter.color.includes(el.color)) {
        return el;
      }
      if (filter.color.length === 0) {
        if (filter.size.includes(el.size)) {
          return el;
        }
      }
      if (filter.size.length === 0) {
        if (filter.color.includes(el.color)) {
          return el;
        }
      }
    }
  });

  let markup = laptopsFiltered.reduce((acc, elem) => acc + compile(elem), '');
  container.innerHTML = markup;
}

function eraseAll() {
  container.innerHTML = '';
}

const laptops = [
  {
    size: 13,
    color: 'white',
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'gray',
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'black',
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'white',
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'gray',
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'black',
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'white',
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'gray',
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'black',
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
];
