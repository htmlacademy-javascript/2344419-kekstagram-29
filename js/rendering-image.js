let counter = 0;//создаем счетчик
const pictureBig = document.querySelector('.big-picture');//большая картинка
const body = document.querySelector('body');//боди
// const containerPfoto = document.querySelector('.pictures.container');//контейнер миниатюр
const containerComments2 = pictureBig.querySelector('.social__comments');//контейнер комментариев
const loadingComment = document.querySelector('.comments-loader');//кнопка загрузки новых комментариев
const counterComment = document.querySelector('.social__comment-count');//блок с колличеством открытых комментариев
const buttonX = pictureBig.querySelector('#picture-cancel');

const createComments = (start,end,comments,containerComments) =>{//функция создания комментариев(старт, финиш, комментарии, контейнер)
  for(let i = start; i < end; i++){

    const createCommentsLi = document.createElement('li');//создаем пунк списка
    createCommentsLi.classList.add('social__comment');
    const createElementImg = document.createElement('img');//создаем файл
    createElementImg.classList.add('social__picture');

    createElementImg.src = comments[i].avatar;
    createElementImg.alt = comments[i].name;
    createElementImg.width = '35';
    createElementImg.height = '35';

    createCommentsLi.appendChild(createElementImg);//кладем в список файл
    const createElementP = document.createElement('p');//в файл кладем параграф
    createElementP.classList.add('social__text');
    createElementP.textContent = comments[i].message;//в параграф кладем текст комментария
    createCommentsLi.appendChild(createElementP);//в список кладем параграф
    containerComments.appendChild(createCommentsLi);// и все что создали в контейнер
  }
};


const renderingImg = (matchedPhoto, templateClone)=>{//функция отрисовки большого изображения

  templateClone.addEventListener('click', () =>{

    body.classList.add('modal-open');//отключаем чтобы не работал скрол большого окна
    const {url, description, likes, comments} = matchedPhoto;

    pictureBig.classList.remove('hidden');//показываем большое изображение

    pictureBig.querySelector('.big-picture__img').querySelector('img').src = url;
    pictureBig.querySelector('.likes-count').textContent = likes;
    pictureBig.querySelector('.social__caption').textContent = description;


    containerComments2.innerHTML = '';//очищаем контейнер комментариев от шаблонных
    loadingComment.classList.remove('hidden');//кнопка нов ком показывается
    createComments(0,Math.min(comments.length,5),comments,containerComments2);//создаем первые 5 или меньше комментариев
    counterComment.innerHTML = `5 из ${comments.length} комментариев`;//меняем текст в блоке новых комментариев
    if(comments.length < 5){
      loadingComment.classList.add('hidden');//кнопка нов ком скрывается
      counterComment.innerHTML = `${comments.length} из ${comments.length} комментариев`;//меняем текст
    }

    counter = 5;
    const onClickComments = ()=>{//слушатель для создания 5 или меньше комментариев
      createComments(counter,Math.min(comments.length,counter + 5),comments,containerComments2);
      counter += 5;
      counterComment.innerHTML = `${counter} из ${comments.length} комментариев`;
      if(counter >= comments.length){
        counterComment.innerHTML = `${comments.length} из ${comments.length} комментариев`;
        loadingComment.classList.add('hidden');//кнопка нов ком скрывается
      }
    };
    loadingComment.addEventListener('click',onClickComments);


    const onCleanButton = (evt)=>{
      evt.preventDefault();
      pictureBig.classList.add('hidden');
      body.classList.remove('modal-open');
      loadingComment.removeEventListener('click',onClickComments);
    };

    const keyDown = (evt)=>{
      if(evt.key === 'Escape'){
        onCleanButton(evt);

      }
    };
    buttonX.addEventListener('click',onCleanButton);
    document.addEventListener('keydown',keyDown);
  });

};

export {renderingImg};
