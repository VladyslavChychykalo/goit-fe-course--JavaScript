'use strict';

const posts = [
  {
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 1',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-1.com',
  },
  {
    img: 'https://placeimg.com/400/150/nature',
    title: 'Post title 2',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-2.com',
  },
  {
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 3',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-3.com',
  },
];

const body = document.querySelector('body');
const postList = document.createElement('div');
body.appendChild(postList);

function createPostCard({
  linkUrl = '#',
  bodyText = '',
  titleText = '',
  linkImg = '',
}) {
  const postItem = document.createElement('article');

  const img = document.createElement('img');
  img.setAttribute('src', linkImg);

  const title = document.createElement('h2');
  title.textContent = titleText;

  const text = document.createElement('p');
  text.textContent = bodyText;

  const link = document.createElement('a');
  link.setAttribute('href', linkUrl);

  postItem.append(img, title, text, link);
  return postItem;
}

const postsArr = [];

posts.forEach(post => {
  const element = createPostCard({
    linkUrl: post.link,
    bodyText: post.text,
    titleText: post.title,
    linkImg: post.img,
  });

  postsArr.push(element);
});

postList.append(...postsArr);
