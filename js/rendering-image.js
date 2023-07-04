
const renderingImg = (matchedPhoto,templateClone)=>{


  templateClone.addEventListener('click', () =>{

    const {url, description, likes, comments} = matchedPhoto;

    const pictureBig = document.querySelector('.big-picture');
    pictureBig.classList.remove('hidden');

    pictureBig.querySelector('.big-picture__img').querySelector('img').src = url;
    pictureBig.querySelector('.comments-count').textContent = comments.length;
    pictureBig.querySelector('.likes-count').textContent = likes;
    pictureBig.querySelector('.social__caption').textContent = description;


    const createCommentsLi = document.createElement('li');
    createCommentsLi.classList.add('social__comment');

    const createElementImg = document.createElement('img');

    createElementImg.classList.add('social__picture');
    createElementImg.src = comments[0].avatar; //"{{имя комментатора}}"для примера img/avatar-6.svg тогда ошибки не будет
    createElementImg.alt = comments[0].name;//"{{имя комментатора}}"
    createElementImg.width = '35';
    createElementImg.height = '35';

    createCommentsLi.appendChild(createElementImg);

    const createElementP = document.createElement('p');
    createElementP.classList.add('social__text');
    createElementP.textContent = comments[0].message;//"{{имя комментатора}}"

    createCommentsLi.appendChild(createElementP);


    const containerComment = document.querySelector('.social__comments');
    containerComment.innerHTML = '';

    containerComment.appendChild(createCommentsLi);


    const counterComment = document.querySelector('.social__comment-count');
    counterComment.classList.add('hidden');
    const loadingComment = document.querySelector('.comments-loader');
    loadingComment.classList.add('hidden');

    const body = document.querySelector('body');

    body.classList.add('modal-open');

    const buttonX = document.querySelector('#picture-cancel');
    buttonX.addEventListener('click',(evt) =>{
      evt.preventDefault();
      pictureBig.classList.add('hidden');
    });
    document.addEventListener('keydown',(evt) =>{
      if(evt.key === 'Escape'){
        evt.preventDefault();
        pictureBig.classList.add('hidden');
      }
    });


  });

};

export {renderingImg};
