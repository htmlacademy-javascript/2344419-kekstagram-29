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

const buttonScaleMin = document.querySelector('.scale__control--smaller');
const buttonScaleMax = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const containerSlider = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');
containerSlider.classList.add('hidden');

const scaleImge = (value)=>{
  scaleValue.value = `${value}%`;
  imgPreview.style.transform = `scale(${value / 100})`;
};

const pressedClickButtonScaleMin = () =>{
  if(parseInt(scaleValue.value,10) !== MIN_SCALE){
    scaleImge(
      Math.min(parseInt(scaleValue.value,10) - STEP_SCALE, MAX_SCALE)
    );
  }
};
buttonScaleMin.addEventListener('click',pressedClickButtonScaleMin);


const pressedClickButtonScaleMax = ()=>{
  if(parseInt(scaleValue.value,10) !== MAX_SCALE){
    scaleImge(
      Math.max(parseInt(scaleValue.value,10) + STEP_SCALE, MIN_SCALE)
    );
  }
};
buttonScaleMax.addEventListener('click',pressedClickButtonScaleMax);

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
  sliderElement.noUiSlider.on('update', ()=> {
    effectLevelElement.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `${effect.filter}(${effectLevelElement.value}${effect.ed})`;
  });
};


const originalButton = document.querySelector('.effects__preview--none');
originalButton.addEventListener('click',()=>{
  containerSlider.classList.add('hidden');
  imgPreview.style.filter = null;
});

const grayscaleButton = document.querySelector('.effects__preview--chrome');


grayscaleButton.addEventListener('click',()=>{
  containerSlider.classList.remove('hidden');
  if(sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
    effectLevelElement. value = EFFECTGRAYSCALE.max;
  }
  createEffect(EFFECTGRAYSCALE);
});


const sepiaButton = document.querySelector('.effects__preview--sepia');
sepiaButton.addEventListener('click',()=>{
  containerSlider.classList.remove('hidden');
  if(sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
    effectLevelElement. value = EFFECTSEPIA.max;
  }
  createEffect(EFFECTSEPIA);
});

const invertButton = document.querySelector('.effects__preview--marvin');
invertButton.addEventListener('click',()=>{
  containerSlider.classList.remove('hidden');
  if(sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
    effectLevelElement. value = EFFECTINVERT.max;
  }
  createEffect(EFFECTINVERT);
});

const blurButton = document.querySelector('.effects__preview--phobos');
blurButton.addEventListener('click',()=>{
  containerSlider.classList.remove('hidden');
  if(sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
    effectLevelElement. value = EFFECTBLUR.max;
  }
  createEffect(EFFECTBLUR);
});


const brightnessButton = document.querySelector('.effects__preview--heat');
brightnessButton.addEventListener('click',()=>{
  containerSlider.classList.remove('hidden');
  if(sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
    effectLevelElement. value = EFFECTBRIGHTNESS.max;
  }
  createEffect(EFFECTBRIGHTNESS);
});

export {brightnessButton, blurButton, invertButton, sepiaButton, grayscaleButton, originalButton};
