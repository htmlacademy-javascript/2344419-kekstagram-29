import {removedKeydownForm, returnKeydown} from './validation-form.js';
const TIMEOUT_KEYDOW = 10;
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
const buttonClick = successMessage.querySelector('.success__button');
const buttonClickError = errorMessage.querySelector('.error__button');

const removedModal = () =>{
  const successElemtnt = document.querySelector('.success');
  successElemtnt.remove();
};
const removModalEroor = () =>{
  const successElementError = document.querySelector('.error');
  successElementError.remove();

};

const removedKeydown = (evt) =>{
  if(evt.key === 'Escape'){
    removedModal();
  }
};
const removedKeydownError = (evt) =>{
  if(evt.key === 'Escape'){
    removModalEroor();
    removedKeydownForm();
  }
  setTimeout(()=>{
    returnKeydown();
  },TIMEOUT_KEYDOW);
};


const openModal = () =>{
  body.append(successMessage);
  buttonClick.addEventListener('click',removedModal);
  document.addEventListener('keydown',removedKeydown);

  const elem = document.querySelector('.success');
  elem.addEventListener('click',(evt)=>{
    const targetClick = evt.target;
    if(targetClick === elem){
      removedModal();
    }
  });
};

const openModalError = () =>{
  body.append(errorMessage);
  buttonClickError.addEventListener('click',removModalEroor);
  document.body.addEventListener('keydown',removedKeydownError);
  const elem = document.querySelector('.error');
  elem.addEventListener('click',(evt)=>{
    const targetClick = evt.target;
    if(targetClick === elem){
      removModalEroor();
    }
  });

};

export{openModal,openModalError};
