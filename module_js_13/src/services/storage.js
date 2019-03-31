export function setUrlToLocalStorage(array) {
  localStorage.setItem('favourites-links', JSON.stringify(array));
}
export function getUrlFromLocalStorage() {
  let data = localStorage.getItem('favourites-links');
  return data ? JSON.parse(data) : [];
}
