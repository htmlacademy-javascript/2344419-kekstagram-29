const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
const buttonClick = successMessage.querySelector('.success__button');
const buttonClickError = errorMessage.querySelector('.error__button');

const removalModal = () =>{
  const successElemtnt = document.querySelector('.success');
  successElemtnt.remove();
};
const removalModalEroor = () =>{
  const successElemtnt = document.querySelector('.error');
  successElemtnt.remove();
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
  body.append(successMessage);
  buttonClick.addEventListener('click',removalModal);//по клику
  document.addEventListener('keydown',keydownRemoval);//по клавише
// по клику вне окна???
};

const openModalError = () =>{
  body.append(errorMessage);
  buttonClickError.addEventListener('click',removalModalEroor);//по клику
  document.addEventListener('keydown',keydownRemovalError);//по клавише
};
export{openModal,openModalError};
