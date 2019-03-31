'use strict';
/*
  Создайте компонент галлереи изображений следующего вида.

    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>

    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2

    Реализуйте функционал:

      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.

      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.

      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются
        динамически, при загрузке страницы.

      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.

      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.

      - Изображений может быть произвольное количество.

      - Используйте делегирование для элементов preview.

      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.

      - CSS-оформление и имена классов на свой вкус.

    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

const galleryItems = [
  {
    preview: './img/preview-1.jpeg',
    fullview: 'img/fullview-1.jpeg',
    alt: 'alt text 1',
  },
  {
    preview: 'img/preview-2.jpeg',
    fullview: 'img/fullview-2.jpeg',
    alt: 'alt text 2',
  },
  {
    preview: 'img/preview-3.png',
    fullview: 'img/fullview-3.png',
    alt: 'alt text 3',
  },
  {
    preview: 'img/preview-4.jpeg',
    fullview: 'img/fullview-4.jpeg',
    alt: 'alt text 4',
  },
  {
    preview: 'img/preview-5.jpeg',
    fullview: 'img/fullview-5.jpeg',
    alt: 'alt text 5',
  },
  {
    preview: 'img/preview-6.jpeg',
    fullview: 'img/fullview-6.jpeg',
    alt: 'alt text 6',
  },
];

class Gallery {
  constructor({ items, parentNode, defaultActiveItem }) {
    this.items = items;
    this.parentNode = parentNode;
    this.defaultActiveItem = defaultActiveItem;
    this.fullviewImg = document.createElement('img');
  }

  setFullviewElement() {
    const containerImg = document.createElement('div');
    containerImg.classList.add('fullview');
    this.parentNode.appendChild(containerImg);

    this.fullviewImg.classList.add('fullviewImg');
    const imageFullview = this.setFullviewImg(
      this.items[this.defaultActiveItem],
    );
    containerImg.appendChild(this.fullviewImg);

    return containerImg;
  }

  setFullviewImg({ fullview, alt }) {
    this.fullviewImg.src = fullview;
    this.fullviewImg.alt = alt;
  }

  setPreviewElement({ preview, fullview, alt }) {
    const previewItem = document.createElement('li');
    previewItem.classList.add('list-preview__item');

    const previewImg = document.createElement('img');
    previewImg.classList.add('preview');
    previewImg.src = preview;
    previewImg.dataset.fullview = fullview;
    previewImg.alt = alt;

    previewItem.appendChild(previewImg);
    return previewItem;
  }

  createPreviewList() {
    const previewContainer = document.createElement('ul');
    previewContainer.classList.add('list-preview');
    this.parentNode.appendChild(previewContainer);
    previewContainer.addEventListener('click', this.changeFullview.bind(this));

    const previewList = this.items.map(img => this.setPreviewElement(img));
    previewContainer.append(...previewList);
    const activePreview = this.parentNode.querySelectorAll('.preview')[
      this.defaultActiveItem
    ];
    activePreview.classList.add('preview--active');
    return previewList;
  }

  createGallery() {
    const gallery = {
      fullview: this.setFullviewElement(),
      previewList: this.createPreviewList(),
    };

    return gallery;
  }

  changeFullview({ target }) {
    if (target.className !== 'preview') return;
    this.setActiveImage(target);
    this.setFullviewImg(target.dataset, target.alt);
  }

  setActiveImage(nextPreview) {
    const currentPreviewImg = this.parentNode.querySelector('.preview--active');
    if (currentPreviewImg) {
      currentPreviewImg.classList.toggle('preview--active');
    }
    nextPreview.classList.toggle('preview--active');
  }
}

const gallery = new Gallery({
  items: galleryItems,
  parentNode: document.querySelector('.image-gallery'),
  defaultActiveItem: 0,
});

gallery.createGallery();
