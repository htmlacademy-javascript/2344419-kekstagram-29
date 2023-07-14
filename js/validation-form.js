import {scaleImge,START_SCALE} from './scrol-filter-img.js';

const maxCountHashtag = 5;
const hashtagRe = /^#[a-zа-яё0-9]{1,19}$/i;
const inputTextHashtags = document.querySelector('.text__hashtags');//поле ввода хештега
const inputTextComments = document.querySelector('.text__description');//поле ввода коментария
const imgUploadInput = document.querySelector('.img-upload__input');//поле выбора файла
const buttonCancel = document.querySelector('.img-upload__cancel');//кнопка Х
const containerEditingForm = document.querySelector('.img-upload__overlay');//контейнер редактирования фотографии
const imgForm = document.querySelector('.img-upload__form');//форма загрузки и редактирования изображения


const pristine = new Pristine(imgForm,{
  classTo:'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper'
});

imgForm.addEventListener('submit',(evt)=>{
  evt.preventDefault();
  pristine.validate();

  const textHashtage = inputTextHashtags.value;
  const hashteges = textHashtage.trim().split(' ').filter((elem) => Boolean(elem.length));//убираем пробелы по бокам, делим по пробелам, фильтруем елем-если пустые(false)-убираем
  const uniqueHashteges = Array.from(new Set(hashteges.map((e) => e.toLowerCase())));//массив уникальных значений без повторений


  pristine.addValidator(
    inputTextHashtags,//поле ввода
    ()=> hashteges.every((elem)=> hashtagRe.test(elem)),//функция проверки патерна
    'Неправильный хэштег',//сообщение ошибки
    2,//очередность
    true//продолжать ли при невалидности
  );
  pristine.addValidator(
    inputTextHashtags,//поле ввода
    ()=> hashteges.length <= 5,//функция проверки на кол-во хэштегов
    `Максимум ${maxCountHashtag} хэштегов`,//сообщение ошибки
    3,//очередность
    true//продолжать ли при невалидности
  );
  pristine.addValidator(
    inputTextHashtags,//поле ввода
    ()=> hashteges.length === uniqueHashteges.length,//функция проверки на никальность хэштегов
    'Хэштеги должны быть уникальными',//сообщение ошибки
    1,//очередность
    true//продолжать ли при невалидности
  );
});


const onEventForm = () =>{//функция закрытия формы
  buttonCancel.classList.add('hidden');//скрываем кнопку Х
  document.querySelector('body').classList.remove('.modal-open');//возвращаем скрол
  containerEditingForm.classList.add('hidden');//скрывает контейнер редактирования
  buttonCancel.removeEventListener('click',onEventForm);//слушатель удаления по Х
  document.removeEventListener('keydown',keyDown);//по кнопке ESC
  imgUploadInput.reset();
  inputTextHashtags.reset();
  inputTextComments.reset();
  pristine.reset();
  scaleImge(START_SCALE);
};
const keyDown = (evt) =>{
  if(evt.key === 'Escape'){
    onEventForm(evt);
  }
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


