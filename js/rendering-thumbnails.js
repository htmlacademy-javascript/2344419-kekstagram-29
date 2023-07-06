import { result } from './data.js';
import {renderingImg} from './rendering-image.js';


const pictures = document.querySelector('.pictures');
pictures.querySelector('.pictures__title').classList.remove('visually-hidden');

const templateElement = document.querySelector('#picture').content.querySelector('.picture');

const matchedPhotos = result();

const fragment = document.createDocumentFragment();

for (const matchedPhoto of matchedPhotos) {

  const {url, description, likes, comments, id} = matchedPhoto;

  const templateClone = templateElement.cloneNode(true);
  templateClone.dataset.id = id;

  renderingImg(matchedPhoto,templateClone);

  templateClone.querySelector('.picture__img').src = url;
  templateClone.querySelector('.picture__img').alt = description;
  templateClone.querySelector('.picture__likes').textContent = likes;
  templateClone.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(templateClone);
}

pictures.appendChild(fragment);

const body = document.querySelector('body');

body.classList.remove('modal-open');


