import { result } from './data.js';

const pictures = document.querySelector('.pictures');
pictures.querySelector('.pictures__title').classList.remove('visually-hidden');

const templateElement = document.querySelector('#picture').content.querySelector('.picture');

const matchedPhotos = result();

const fragment = document.createDocumentFragment();

for (const matchedPhoto of matchedPhotos) {

  const {url, description, likes, comments} = matchedPhoto;

  const templateClone = templateElement.cloneNode(true);
  templateClone.querySelector('.picture__img').src = url;
  templateClone.querySelector('.picture__img').alt = description;
  templateClone.querySelector('.picture__likes').textContent = likes;
  templateClone.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(templateClone);
}

pictures.appendChild(fragment);
