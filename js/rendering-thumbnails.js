import { getData, showAlert } from './api.js';
import {renderingImg} from './rendering-image.js';
import {createRandomIdFromRangeGenerator, debounce} from './util.js';

const RANDOM_IMG_FILTER = 10;
const RERENDER_DELAY = 500;
const pictures = document.querySelector('.pictures');
pictures.querySelector('.pictures__title').classList.remove('visually-hidden');
const templateElement = document.querySelector('#picture').content.querySelector('.picture');
const blockFilter = document.querySelector('.img-filters');//блок фильтров
const buttonDefault = document.querySelector('#filter-default');//по умолчанию
const buttonRandom = document.querySelector('#filter-random');//случайные
const buttonDiscussed = document.querySelector('#filter-discussed');//обсуждаемые

let matchedPhotos = [];

const createThumbnails = (arrayImg) =>{
  const fragment = document.createDocumentFragment();
  for (const img of arrayImg) {
    const {url, description, likes, comments, id} = img;
    const templateClone = templateElement.cloneNode(true);
    templateClone.id = id;
    renderingImg(img,templateClone);
    templateClone.querySelector('.picture__img').src = url;
    templateClone.querySelector('.picture__img').alt = description;
    templateClone.querySelector('.picture__likes').textContent = likes;
    templateClone.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(templateClone);
  }
  pictures.appendChild(fragment);
};

try{
  matchedPhotos = await getData();
  createThumbnails(matchedPhotos);
  blockFilter.classList.remove('img-filters--inactive');
}catch(err){
  showAlert(err.message);
  blockFilter.classList.add('img-filters--inactive');
}

const body = document.querySelector('body');
body.classList.remove('modal-open');


const newFuncDelays = debounce((images) => {
  for (let i = pictures.children.length;i > 2;i--){//очистить предыдущий фильтр
    pictures.removeChild(pictures.children[i - 1]);//удаляй с конца относительно своей длинны, но оставь 2 стандартных
  }
  createThumbnails(images);
}, RERENDER_DELAY);


buttonDefault.addEventListener('click',() => {
  newFuncDelays(matchedPhotos);
  buttonDefault.classList.add('img-filters__button--active');
  buttonRandom.classList.remove('img-filters__button--active');
  buttonDiscussed.classList.remove('img-filters__button--active');
});


buttonRandom.addEventListener('click',() => {
  const randomImges = [];
  const temp = createRandomIdFromRangeGenerator(0,matchedPhotos.length - 1);
  for(let i = 0; i < RANDOM_IMG_FILTER; i++){
    randomImges.push(matchedPhotos[temp()]); //10 рандомных фоток
  }
  newFuncDelays(randomImges);
  buttonRandom.classList.add('img-filters__button--active');
  buttonDefault.classList.remove('img-filters__button--active');
  buttonDiscussed.classList.remove('img-filters__button--active');
});

const sortDiscussed = (a,b) => b.comments.length - a.comments.length;

buttonDiscussed.addEventListener('click',() => {
  const discussedImg = [...matchedPhotos].sort(sortDiscussed);//фильтр по количеству комментариев по убыванию

  newFuncDelays(discussedImg);
  buttonDiscussed.classList.add('img-filters__button--active');
  buttonDefault.classList.remove('img-filters__button--active');
  buttonRandom.classList.remove('img-filters__button--active');
});


