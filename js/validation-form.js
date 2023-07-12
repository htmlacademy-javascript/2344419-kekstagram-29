
const imgUploadInput = document.querySelector('.img-upload__input');
const buttonCancel = document.querySelector('.img-upload__cancel');//кнопка Х
const containerEditingForm = document.querySelector('.img-upload__overlay');//контейнер редактирования фотографии

imgUploadInput.addEventListener('change',()=>{
  containerEditingForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  buttonCancel.classList.remove('hidden');
});

const onEventForm = () =>{
  buttonCancel.classList.add('hidden');
  document.querySelector('body').classList.remove('.modal-open');
  containerEditingForm.classList.add('hidden');
};

buttonCancel.addEventListener('click',onEventForm);
const keyDown = (evt) =>{
  if(evt.key === 'Escape'){
    onEventForm(evt);
  }
};
document.addEventListener('keydown',keyDown);


const inputTextHashtags = document.querySelector('.text__hashtags');//поле ввода хештега
const inputTextComments = document.querySelector('.text__description');//поле ввода коментария
inputTextHashtags.addEventListener('focus',(evt)=>{
  evt.stopPropagation();
});
inputTextComments.addEventListener('focus',(evt)=>{
  evt.stopPropagation();
});


const imgForm = document.querySelector('.img-upload__form');//форма загрузки и редактирования изображения

const pristine = new Pristine(imgForm);
imgForm.addEventListener('submit',(evt)=>{
  evt.preventDefault();
  const isValid = pristine.validate();
  console.log(isValid);


  const textHashtage = inputTextHashtags.value;
  console.log(textHashtage);

  const hashteges = textHashtage.split(' ');
  console.log(hashteges);

  const hashtagReg = /^#[a-zа-яё0-9]{1,19}$/i;

  const uniqueHashteges = Array.from(new Set(hashteges.map((e) => e.toLowerCase())));
  console.log(uniqueHashteges);


  if (hashteges.every((elem)=> hashtagReg.test(elem)) && hashteges.length <= 5 && hashteges.length === uniqueHashteges.length){
    console.log('можно отправлять');
  }else{
    console.log('форма не валидна');
  }


});
