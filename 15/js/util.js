const getRandom = (min, max) => {
  const minRes = Math.ceil(min);
  const maxRes = Math.floor(max);
  return Math.floor(Math.random() * (maxRes - minRes + 1)) + minRes;
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandom(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandom(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const debounce = (callback, timeoutDelay)=> {//функция для устранения дребезга
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest)
      , timeoutDelay);
  };
};

export { createRandomIdFromRangeGenerator, getRandom, debounce};
