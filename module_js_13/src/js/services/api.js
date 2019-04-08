// export default function onUrlAdding(event) {
//   event.preventDefault();
//   const API_KEY = '5c8ce7f5e8eabc0a94cff7a1e60bd1c87bc2f4d0d14c4';
//   const reg = /^(ftp|http|https):\/\/[^ "]+$/;
//   const url = `https://api.linkpreview.net/?key=${API_KEY}&q=${input.value}`;

//   if (!reg.test(input.value)) {
//     alert('Не прошло валидацию!');
//   } else {
//     fetch(url)
//       .then(response => {
//         if (response.ok) return response.json();
//         throw new Error('error' + response.statusText);
//       })
//       .then(data => {
//         if (urlList.find(el => el.url === data.url)) {
//           alert('Такая закладка уже существует!');
//           console.log(data);
//         } else {
//           cardSection.innerHTML = '';
//           urlList.unshift(data);
//           setUrlToLocalStorage(urlList);
//           drawFavorites();
//         }
//       })
//       .catch(err => console.log(err));
//   }
//   form.reset();
// }
