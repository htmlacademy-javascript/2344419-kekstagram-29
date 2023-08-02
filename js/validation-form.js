
import {openModal,openModalError } from './message.js';
import { sentData, showAlert, ErrorText} from './api.js';
import {brightnessButton, blurButton, invertButton, sepiaButton, grayscaleButton, originalButton} from './scrol-filter-img.js';
import './message.js';

const FILES_TYPES = ['jpg','jpeg','png'];
const HASHTAGS_LIMIT = 5;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HashtagMessage = {
  LIMIT: `Максимум ${HASHTAGS_LIMIT} хэштегов`,
  WRONG: 'Введен невалидный хэштег',
  REPEAT: 'Хэштеги не должны повторяться',
};
const form = document.querySelector('#upload-select-image');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-message'
});
const imgForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const inputTextHashtags = imgForm.querySelector('.text__hashtags');
const inputTextComments = imgForm.querySelector('.text__description');
const imgUploadInput = imgForm.querySelector('.img-upload__input');
const imgPreview = document.querySelector('.img-upload__preview img');
const buttonCancel = imgForm.querySelector('.img-upload__cancel');
const containerEditingForm = imgForm.querySelector('.img-upload__overlay');
const containerSlider = document.querySelector('.img-upload__effect-level');
const buttonSubmit = document.querySelector('#upload-submit');

const isValidType = (file)=>{
  const fileName = file.name.toLowerCase();
  return FILES_TYPES.some((it) =>fileName.endsWith(it));
};
imgUploadInput.addEventListener('change',()=>{
  const file = imgUploadInput.files[0];
  if(file && isValidType(file)){
    imgPreview.src = URL.createObjectURL(file);
    brightnessButton.style.backgroundImage = `url('${imgPreview.src}')`;
    blurButton.style.backgroundImage = `url('${imgPreview.src}')`;
    invertButton.style.backgroundImage = `url('${imgPreview.src}')`;
    sepiaButton.style.backgroundImage = `url('${imgPreview.src}')`;
    grayscaleButton.style.backgroundImage = `url('${imgPreview.src}')`;
    originalButton.style.backgroundImage = `url('${imgPreview.src}')`;
  }
});

const calledEventForm = () =>{
  containerEditingForm.classList.add('hidden');
  body.classList.remove('modal-open');
  buttonCancel.classList.add('hidden');
  imgPreview.style.transform = `scale(${1})`;
  imgPreview.style.filter = null;
  containerSlider.classList.add('hidden');
  pristine.reset();
  imgForm.reset();
};

const isValidHashtagsCount = (value) => value.trim().split(' ').filter((hashtag) => Boolean (hashtag.length)).length <= HASHTAGS_LIMIT;
const isValidHashtags = (value) => value === '' || value.trim().split(' ').filter((hashtag) => Boolean (hashtag.length)).every((hashtag) => (HASHTAG_REGEXP.test(hashtag)));
const isHashtagsDontRepeat = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(' ').filter((hashtag) => Boolean (hashtag.length));
  return new Set(hashtagsArray).size === hashtagsArray.length;
};

pristine.addValidator(form.hashtags, isValidHashtagsCount, HashtagMessage.LIMIT);
pristine.addValidator(form.hashtags, isValidHashtags, HashtagMessage.WRONG);
pristine.addValidator(form.hashtags, isHashtagsDontRepeat, HashtagMessage.REPEAT);


const blockButton = () =>{
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Сохраняю...';
};
const returnButton = ()=>{
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
};

inputTextHashtags.addEventListener('change',() => {
  if(!pristine.validate()){
    showAlert(ErrorText.POST_DATA_ERROR);
    buttonSubmit.disabled = true;
  } else {
    pristine.reset();
    buttonSubmit.disabled = false;
  }
});


const calledKeyDown = (evt) => {
  if(evt.key === 'Escape'){
    calledEventForm(evt);
  }
  document.removeEventListener('keydown',calledKeyDown);
};

imgUploadInput.addEventListener('change',()=>{
  containerEditingForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  buttonCancel.classList.remove('hidden');
  buttonCancel.addEventListener('click',calledEventForm);
  document.addEventListener('keydown',calledKeyDown);
});

const removedKeydownForm = () => {
  document.removeEventListener('keydown',calledKeyDown);
};
const returnKeydown = ()=>{
  document.addEventListener('keydown',calledKeyDown);
};

inputTextHashtags.addEventListener('focus',removedKeydownForm);
inputTextHashtags.addEventListener('blur',returnKeydown);

inputTextComments.addEventListener('focus',removedKeydownForm);
inputTextComments.addEventListener('blur',returnKeydown);

form.addEventListener('submit', async (evt)=>{
  evt.preventDefault();

  blockButton();
  let result;
  try{
    result = await sentData(evt.target);
  } catch(err) {
    result = err;
  }

  if(!result){
    calledEventForm();
    openModal();
    returnButton();
  } else{
    openModalError();
    returnButton();
  }
});

export { removedKeydownForm, returnKeydown };
