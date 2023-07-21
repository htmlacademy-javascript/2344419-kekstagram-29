const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const EFFECTGRAYSCALE = {
  filter:'grayscale',
  step:0.1,
  min:0,
  max:1,
  ed:'',
};
const EFFECTSEPIA = {
  filter:'sepia',
  step:0.1,
  min:0,
  max:1,
  ed:'',
};
const EFFECTINVERT = {
  filter:'invert',
  step:1,
  min:0,
  max:100,
  ed:'%',
};
const EFFECTBLUR = {
  filter:'blur',
  step:0.1,
  min:0,
  max:3,
  ed:'px',
};
const EFFECTBRIGHTNESS = {
  filter:'brightness',
  step:0.1,
  min:1,
  max:3,
  ed:'',
};

const buttonScaleMin = document.querySelector('.scale__control--smaller');//кнопка +
const buttonScaleMax = document.querySelector('.scale__control--bigger');//кнопка -
const scaleValue = document.querySelector('.scale__control--value');//поле вывода значения масшаба
const imgPreview = document.querySelector('.img-upload__preview img');//изображение в форме для редактирования
const sliderElement = document.querySelector('.effect-level__slider');//слайдер
const containerSlider = document.querySelector('.img-upload__effect-level');//контейнер слайдера

containerSlider.classList.add('hidden');

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

const createEffect = (effect) => {
  noUiSlider.create(sliderElement, {
    step:effect.step,
    start:effect.max,
    connect:'lower',
    range: {
      'min':effect.min,
      'max':effect.max,
    }
  });
  sliderElement.noUiSlider.on('update', (evt)=> {
    imgPreview.style.filter = `${effect.filter}(${evt[0]}${effect.ed})`;
  });
};


const originalButton = document.querySelector('.effects__preview--none');
originalButton.addEventListener('click',()=>{
  containerSlider.classList.add('hidden');//контейнер скрывается
  imgPreview.style.filter = null;
});

const grayscaleButton = document.querySelector('.effects__preview--chrome');


grayscaleButton.addEventListener('click',()=>{//хром
  containerSlider.classList.remove('hidden');//контейнер возвращается
  if(sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
  }
  createEffect(EFFECTGRAYSCALE);
});


const sepiaButton = document.querySelector('.effects__preview--sepia');
sepiaButton.addEventListener('click',()=>{//сепия
  containerSlider.classList.remove('hidden');//контейнер возвращается
  if(sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
  }
  createEffect(EFFECTSEPIA);
});

const invertButton = document.querySelector('.effects__preview--marvin');
invertButton.addEventListener('click',()=>{//марвин
  containerSlider.classList.remove('hidden');//контейнер возвращается
  if(sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
  }
  createEffect(EFFECTINVERT);
});

const blurButton = document.querySelector('.effects__preview--phobos');
blurButton.addEventListener('click',()=>{ //фобос//px
  containerSlider.classList.remove('hidden');//контейнер возвращается
  if(sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
  }
  createEffect(EFFECTBLUR);
});


const brightnessButton = document.querySelector('.effects__preview--heat');
brightnessButton.addEventListener('click',()=>{//зной
  containerSlider.classList.remove('hidden');//контейнер возвращается
  if(sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
  }
  createEffect(EFFECTBRIGHTNESS);
});


