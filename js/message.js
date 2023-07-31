import {removalKeydown} from './validation-form.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
const buttonClick = successMessage.querySelector('.success__button');
const buttonClickError = errorMessage.querySelector('.error__button');

const removalModal = () =>{
  const successElemtnt = document.querySelector('.success');
  successElemtnt.remove();//удалить модуль
};
const removalModalEroor = () =>{
  const successElementError = document.querySelector('.error');
  successElementError.remove();//удалить модуль

};

const keydownRemoval = (evt) =>{
  if(evt.key === 'Escape'){
    removalModal();
  }
};
const keydownRemovalError = (evt) =>{
  if(evt.key === 'Escape'){
    removalModalEroor();
  }
};


const openModal = () =>{
  body.append(successMessage);//открыть модуль правильной загрузки
  buttonClick.addEventListener('click',removalModal);//по клику
  document.addEventListener('keydown',keydownRemoval);//по клавише
  const elem = document.querySelector('.success');
  elem.addEventListener('click',(evt)=>{
    const targetClick = evt.target;
    if(targetClick === elem){
      removalModal();
    }
  });
};

const openModalError = () =>{
  body.append(errorMessage);//открыть модуль ошибки загрузки
  buttonClickError.addEventListener('click',removalModalEroor);//по клику
  document.body.addEventListener('keydown',keydownRemovalError);//по клавише
  const elem = document.querySelector('.error');
  elem.addEventListener('click',(evt)=>{
    const targetClick = evt.target;
    if(targetClick === elem){
      removalModalEroor();
    }
  });
  removalKeydown();
};

export{openModal,openModalError};
