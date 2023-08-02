const baseUrl = {
  GET_DATA:'https://29.javascript.pages.academy/kekstagram/data',
  SENT_DATA:'https://29.javascript.pages.academy/kekstagram/',
};
const ErrorText = {
  GET_DATA_ERROR:'Не удалось загрузить данные. Попробуйте обновить страницу',
  POST_DATA_ERROR:'Не удалось  отправить форму. Попробуйте еще раз',
};

const getData = () =>
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

const sentData = async(imgForm) =>{
  const formData = new FormData(imgForm);

  await fetch(baseUrl.SENT_DATA,{
    method:'POST',
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

  setTimeout(()=>{
    alert.remove();
  },4000);
};


export {getData, sentData, showAlert,ErrorText };

