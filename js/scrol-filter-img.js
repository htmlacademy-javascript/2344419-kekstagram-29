const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const START_SCALE = 100;
const buttonScaleMin = document.querySelector('.scale__control--smaller');//кнопка +
const buttonScaleMax = document.querySelector('.scale__control--bigger');//кнопка -
const scaleValue = document.querySelector('.scale__control--value');//поле вывода значения масшаба
const imgPreview = document.querySelector('.img-upload__preview img');//изображение в форме для редактирования
const sliderElement = document.querySelector('.effect-level__slider');

//по умолчанию 100% не сделано

const scaleImge = (value)=>{
  scaleValue.value = `${value}%`;
  imgPreview.style.transform = `scale(${value / 100})`;
};

const onClickButtonScaleMin = () =>{
  if(parseInt(scaleValue.value,10) !== MIN_SCALE){
    scaleImge(
      Math.min(parseInt(scaleValue.value,10) - STEP_SCALE, MAX_SCALE)
    );
  }
};
buttonScaleMin.addEventListener('click',onClickButtonScaleMin);


const onClickButtonScaleMax = ()=>{
  if(parseInt(scaleValue.value,10) !== MAX_SCALE){
    scaleImge(
      Math.max(parseInt(scaleValue.value,10) + STEP_SCALE, MIN_SCALE)
    );
  }
};
buttonScaleMax.addEventListener('click',onClickButtonScaleMax);


export {scaleImge,START_SCALE};/////не работает


/////////////////////////////////////размышления///////////////////////////////

const originalButton = document.querySelector('.effects__preview--none');
originalButton.addEventListener('click',()=>{
  //const originalFiltr = { //оригинал
  //   filter: 0,
  //   min:0,
  //   max:0,
  //   step:0
  // };
  // console.log(originalFiltr);
});

const grayscaleButton = document.querySelector('.effects__preview--chrome');
grayscaleButton.addEventListener('click',()=>{//хром
  imgPreview.style.filter = 'grayscale';

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
      step:0.1
    },
  });
  // console.log(grayscaleFiltr);
});

const sepiaButton = document.querySelector('.effects__preview--sepia');
sepiaButton.addEventListener('click',()=>{
  // const sepiaFiltr = { //сепия
  //   filter: 'sepia',
  //   min:0,
  //   max:1,
  //   step:0.1
  // };
  // console.log(sepiaFiltr);
});

const invertButton = document.querySelector('.effects__preview--marvin');
invertButton.addEventListener('click',()=>{
  // const invertFiltr = { //марвин//%
  //   filter: 'invert',
  //   min:0,
  //   max:100,
  //   step:1
  // };
  // console.log(invertFiltr);
});

const blurButton = document.querySelector('.effects__preview--phobos');
blurButton.addEventListener('click',()=>{
  // const blurFiltr = { //фобос//px
  //   filter: 'blur',
  //   min:0,
  //   max:3,
  //   step:0.1
  // };
  // console.log(blurFiltr);
});

const brightnessButton = document.querySelector('.effects__preview--heat');
brightnessButton.addEventListener('click',()=>{
  // const brightnessFiltr = { //зной
  //   filter: 'brightness',
  //   min:1,
  //   max:3,
  //   step:0.1
  // };
  // console.log(brightnessFiltr);
});


//по умолчанию эффект оригинал
//только один эффек
//при выборе оригинал контейнер с эффектами скрываются
//при переключении уровни сбрасываются до начатьного 100%
// const effectLevelValue = document.querySelector('.effect-level__value'); //уровень применения эффекта
// const containerImgEffect = document.querySelector('.img-upload__effect-level'); //контейнер с эффектами
