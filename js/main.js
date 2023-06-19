const names = [
  "Артем",
  "Иван",
  "Антон",
  "Ксюша",
  "Марина",
  "Люда",
  "Тимофей",
  "Кирилл",
  "Соня",
  "Клава",
  "Максим",
];

const messages = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

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

const generateCommentId = createRandomIdFromRangeGenerator(0, 1000);

const photoComments = (min, max) => {
  const count = getRandom(min, max);
  return Array.from({ length: count }).map(() => ({
    id: generateCommentId(),
    avatar: `img/avatar-${getRandom(1, 6)}.svg`,
    message: messages[getRandom(0, 5)],
    name: names[getRandom(0, 9)],
  }));
};

const userPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: `фотография с ${id} котиком`,
  likes: getRandom(15, 200),
  comments: photoComments(0, 30),
});

const result = () => {
  const photoCount = 25;
  return Array.from({ length: photoCount }).map((_, i) => userPhoto(i + 1));
};

result();
