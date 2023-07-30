
import {openModal,openModalError } from './message.js';
import { sentData} from './api.js';
import {brightnessButton, blurButton, invertButton, sepiaButton, grayscaleButton, originalButton} from './scrol-filter-img.js';
import './message.js';

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
const FILE_TYPES = ['jpg','jpeg','png'];
const imgForm = document.querySelector('.img-upload__form');//форма загрузки и редактирования изображения
const inputTextHashtags = imgForm.querySelector('.text__hashtags');//поле ввода хештега
const inputTextComments = imgForm.querySelector('.text__description');//поле ввода коментария
const imgUploadInput = imgForm.querySelector('.img-upload__input');//поле выбора файла
const imgPreview = document.querySelector('.img-upload__preview img');//изображение в форме для редактирования
const buttonCancel = imgForm.querySelector('.img-upload__cancel');//кнопка Х
const containerEditingForm = imgForm.querySelector('.img-upload__overlay');//контейнер редактирования
const containerSlider = document.querySelector('.img-upload__effect-level');//контейнер слайдера
const buttonSubmit = document.querySelector('#upload-submit');

const isValidType = (file)=>{
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) =>fileName.endsWith(it));
};
imgUploadInput.addEventListener('change',()=>{//прием изображения
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

const onEventForm = () =>{//функция закрытия формы
  buttonCancel.classList.add('hidden');//скрываем кнопку Х
  document.querySelector('body').classList.remove('.modal-open');//возвращаем скрол
  containerEditingForm.classList.add('hidden');//скрывает контейнер редактирования
  imgPreview.style.transform = `scale(${1})`;
  imgPreview.style.filter = null;
  containerSlider.classList.add('hidden');
  pristine.reset();
  imgForm.reset();
};

const isValidHashtagsCount = (value) => value.trim().split(' ').length <= HASHTAGS_LIMIT;
const isValidHashtags = (value) => value === '' || value.trim().split(' ').every((hashtag) => (HASHTAG_REGEXP.test(hashtag)));
const isHashtagsDontRepeat = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(' ');
  return new Set(hashtagsArray).size === hashtagsArray.length;
};

pristine.addValidator(form.hashtags, isValidHashtagsCount, HashtagMessage.LIMIT);
pristine.addValidator(form.hashtags, isValidHashtags, HashtagMessage.WRONG);
pristine.addValidator(form.hashtags, isHashtagsDontRepeat, HashtagMessage.REPEAT);

const trimTwoSpaces = (evt) => {
  const str = evt.target.value;
  if (str[str.length - 1] + str[str.length - 2] === '  ') {
    evt.target.value = `${str.trim()} `;
  }
};

inputTextHashtags.addEventListener('chenge',(evt) => {
  trimTwoSpaces(evt);
  buttonSubmit.disabled = !pristine.validate();
});

const blockButton = () =>{//блокировка кнопки
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Сохраняю...';
};
const returnButton = ()=>{//возврат кнопки
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
};

imgForm.addEventListener('submit', async (evt)=>{// отправка данных из формы
  evt.preventDefault();

  blockButton();//залипает кнопка
  let result;
  try{
    result = await sentData(evt.target);//ожидает ответа
  } catch(err) {
    result = err;
  }

  if(!result){
    onEventForm();//закрытие модалки
    openModal();//окно удачной зарузки
    returnButton();
  } else{

    openModalError();//окно с ошибкой
    returnButton();//возвращается кнопка
  }
});


const keyDown = (evt) => {
  if(evt.key === 'Escape'){
    onEventForm(evt);
  }
  document.removeEventListener('keydown',keyDown);
};

imgUploadInput.addEventListener('change',()=>{//слушатель события открытие окна загрузки
  containerEditingForm.classList.remove('hidden');//показать контейнер редактирования
  document.querySelector('body').classList.add('modal-open');// чтобы не работал скрол большого окна
  buttonCancel.classList.remove('hidden');//показываем кнопку Х
  buttonCancel.addEventListener('click',onEventForm);//слушатель удаления по Х
  document.addEventListener('keydown',keyDown);//по кнопке ESC
});

const removalKeydown = () => {
  document.removeEventListener('keydown',keyDown);
};
const returnKeydown = ()=>{
  document.addEventListener('keydown',keyDown);
};

inputTextHashtags.addEventListener('focus',removalKeydown);//запрет на кнопку ескейпт в фокусе
inputTextHashtags.addEventListener('blur',returnKeydown);//возврат

inputTextComments.addEventListener('focus',removalKeydown);//запрет на кнопку ескейпт в фокусе
inputTextComments.addEventListener('blur',returnKeydown);//возврат

export {onEventForm};
