//import {onEventForm} from './validation-form.js';

const baseUrl = {
  GET_DATA:'https://29.javascript.pages.academy/kekstagram/data',
  SENT_DATA:'https://29.javascript.pages.academy/kekstagram/',
};
const ErrorText = {
  GET_DATA_ERROR:'Не удалось загрузить данные. Попробуйте обновить страницу',
  POST_DATA_ERROR:'Не удалось  отправить форму. Попробуйте еще раз',
};

const getData = () =>//получаем данные
  fetch(baseUrl.GET_DATA,{
    method:'GET'})
    .then((response) =>{
      if(!response.ok){
        throw new Error(ErrorText.GET_DATA_ERROR);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(ErrorText.GET_DATA_ERROR);
    });

const sentData = (imgForm) =>{//отправляем форму
  const formData = new FormData(imgForm);

  fetch(baseUrl.SENT_DATA,{
    method:'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  })
    .then((response) =>{
      if(!response.ok){
        throw new Error(ErrorText.POST_DATA_ERROR);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(ErrorText.POST_DATA_ERROR);
    });
};

const showAlert = (message) =>{
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '20px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(()=>{//удаление ошибки через 5 сек
    alert.remove();
  },5000);
};

export {getData, sentData, showAlert};

