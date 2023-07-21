import {openModal, openModalError} from './message.js';
import { sentData } from './api.js';
import './scrol-filter-img.js';
import './message.js';

const MAX_COUNT_HASHTAGE = 5;
const HASHTEG_REG = /^#[a-zа-яё0-9]{1,19}$/i;
const imgForm = document.querySelector('.img-upload__form');//форма загрузки и редактирования изображения
const inputTextHashtags = imgForm.querySelector('.text__hashtags');//поле ввода хештега
const inputTextComments = imgForm.querySelector('.text__description');//поле ввода коментария
const imgUploadInput = imgForm.querySelector('.img-upload__input');//поле выбора файла
const imgPreview = document.querySelector('.img-upload__preview img');//изображение в форме для редактирования
const buttonCancel = imgForm.querySelector('.img-upload__cancel');//кнопка Х
const containerEditingForm = imgForm.querySelector('.img-upload__overlay');//контейнер редактирования фотографии
const containerSlider = document.querySelector('.img-upload__effect-level');//контейнер слайдера

const pristine = new Pristine(imgForm,{
  classTo:'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper'
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

imgForm.addEventListener('submit',(evt)=>{// отправка данных из формы
  evt.preventDefault();
  try{
    sentData(imgForm);
    onEventForm();//закрытие модалки
    openModal();//окно удачной зарузки
  }catch(err){
    openModalError();//окно ошибки загрузки
  }
});

inputTextHashtags.addEventListener('input',(evt)=>{
  evt.preventDefault();
  const textHashtage = inputTextHashtags.value;

  const hashteges = textHashtage.trim().split(' ').filter((elem) => Boolean(elem.length));//убираем пробелы по бокам, делим по пробелам, фильтруем елем-если пустые(false)-убираем
  const uniqueHashteges = Array.from(new Set(hashteges.map((e) => e.toLowerCase())));//массив уникальных значений без повторений

  pristine.addValidator(
    inputTextHashtags,//поле ввода
    ()=> hashteges.every((elem)=> HASHTEG_REG.test(elem)),//функция проверки патерна
    'Неправильный хэштег',//сообщение ошибки
    1,//очередность
    true
  );
  pristine.addValidator(
    inputTextHashtags,//поле ввода
    ()=> hashteges.length <= 5,//функция проверки на кол-во хэштегов
    `Максимум ${MAX_COUNT_HASHTAGE} хэштегов`,//сообщение ошибки
    3,//очередность
    true
  );
  pristine.addValidator(
    inputTextHashtags,//поле ввода
    ()=> hashteges.length === uniqueHashteges.length,//функция проверки на никальность хэштегов
    'Хэштеги должны быть уникальными',//сообщение ошибки
    2,//очередность
    true
  );
  if(hashteges.length <= 5 && hashteges.length === uniqueHashteges.length && hashteges.every((elem)=> HASHTEG_REG.test(elem))){
    pristine.reset();
  } else {
    pristine.validate();
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
