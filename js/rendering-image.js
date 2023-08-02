let COUNTER = 0;
const FIVE_COMMENTS = 5;
const pictureBig = document.querySelector('.big-picture');
const body = document.querySelector('body');
const containerComments2 = pictureBig.querySelector('.social__comments');
const loadingComment = document.querySelector('.comments-loader');
const counterComment = document.querySelector('.social__comment-count');
const buttonX = pictureBig.querySelector('#picture-cancel');

const createComments = (start,end,comments,containerComments) =>{
  for(let i = start; i < end; i++){

    const createCommentsLi = document.createElement('li');
    createCommentsLi.classList.add('social__comment');
    const createElementImg = document.createElement('img');
    createElementImg.classList.add('social__picture');

    createElementImg.src = comments[i].avatar;
    createElementImg.alt = comments[i].name;
    createElementImg.width = '35';
    createElementImg.height = '35';

    createCommentsLi.appendChild(createElementImg);
    const createElementP = document.createElement('p');
    createElementP.classList.add('social__text');
    createElementP.textContent = comments[i].message;
    createCommentsLi.appendChild(createElementP);
    containerComments.appendChild(createCommentsLi);
  }
};


const createdImg = (matchedPhoto, templateClone)=>{

  templateClone.addEventListener('click', () =>{

    body.classList.add('modal-open');
    const {url, description, likes, comments} = matchedPhoto;

    pictureBig.classList.remove('hidden');

    pictureBig.querySelector('.big-picture__img').querySelector('img').src = url;
    pictureBig.querySelector('.likes-count').textContent = likes;
    pictureBig.querySelector('.social__caption').textContent = description;


    containerComments2.innerHTML = '';
    loadingComment.classList.remove('hidden');
    createComments(0,Math.min(comments.length,FIVE_COMMENTS),comments,containerComments2);
    counterComment.innerHTML = `5 из ${comments.length} комментариев`;
    if(comments.length < FIVE_COMMENTS){
      loadingComment.classList.add('hidden');
      counterComment.innerHTML = `${comments.length} из ${comments.length} комментариев`;
    }

    COUNTER = 5;
    const pressedClickComments = ()=>{
      createComments(COUNTER,Math.min(comments.length,COUNTER + FIVE_COMMENTS),comments,containerComments2);
      COUNTER += FIVE_COMMENTS;
      counterComment.innerHTML = `${COUNTER} из ${comments.length} комментариев`;
      if(COUNTER >= comments.length){
        counterComment.innerHTML = `${comments.length} из ${comments.length} комментариев`;
        loadingComment.classList.add('hidden');
      }
    };
    loadingComment.addEventListener('click',pressedClickComments);


    const pressedCleanButton = (evt)=>{
      evt.preventDefault();
      pictureBig.classList.add('hidden');
      body.classList.remove('modal-open');
      loadingComment.removeEventListener('click',pressedClickComments);
    };

    const keyDown = (evt)=>{
      if(evt.key === 'Escape'){
        pressedCleanButton(evt);

      }
    };
    buttonX.addEventListener('click',pressedCleanButton);
    document.addEventListener('keydown',keyDown);
  });

};

export {createdImg};
