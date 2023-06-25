import { createRandomIdFromRangeGenerator, getRandom } from './util.js';

const COUNT_OBJ = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const MAX_ID_COMM = 1000;
const MAX_AVATAR = 6;

const NAMES = [
  'Артем',
  'Иван',
  'Антон',
  'Ксюша',
  'Марина',
  'Люда',
  'Тимофей',
  'Кирилл',
  'Соня',
  'Клава',
  'Максим',
  'Саша',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generateCommentId = createRandomIdFromRangeGenerator(0, MAX_ID_COMM);

const photoComments = (min, max) => {
  const count = getRandom(min, max);
  return Array.from({ length: count }).map(() => ({
    id: generateCommentId(),
    avatar: `img/avatar-${getRandom(1, MAX_AVATAR)}.svg`,
    message: MESSAGES[getRandom(0, MESSAGES.length)],
    name: NAMES[getRandom(0, NAMES.length)],
  }));
};
const fff = [];

fff.map((v)=> v);

const userPhoto = (count) => ({
  id: count,
  url: `photos/${count}.jpg`,
  description: `фотография с ${count} котиком`,
  likes: getRandom(MIN_LIKES, MAX_LIKES),
  comments: photoComments(0, MAX_COMMENTS),
});

const result = () =>
  Array.from({ length: COUNT_OBJ }).map((_, i) => userPhoto(i + 1));

export { result };
