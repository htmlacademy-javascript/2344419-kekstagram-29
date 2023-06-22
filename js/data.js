import { createRandomIdFromRangeGenerator, getRandom } from "./util.js";

const COUNTOBJ = 25;
const MINLIKES = 15;
const MAXLIKES = 200;
const MAXCOMMENTS = 30;
const MAXIDCOMM = 1000;
const MAXAVATAR = 6;

const NAMES = [
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
  "Саша",
];

const MESSAGES = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

const generateCommentId = createRandomIdFromRangeGenerator(0, MAXIDCOMM);

const photoComments = (min, max) => {
  const count = getRandom(min, max);
  return Array.from({ length: count }).map(() => ({
    id: generateCommentId(),
    avatar: `img/avatar-${getRandom(1, MAXAVATAR)}.svg`,
    message: MESSAGES[getRandom(0, MESSAGES.length)],
    name: NAMES[getRandom(0, NAMES.length)],
  }));
};

const userPhoto = (count) => ({
  id: count,
  url: `photos/${count}.jpg`,
  description: `фотография с ${count} котиком`,
  likes: getRandom(MINLIKES, MAXLIKES),
  comments: photoComments(0, MAXCOMMENTS),
});

const result = () =>
  Array.from({ length: COUNTOBJ }).map((_, i) => userPhoto(i + 1));

export { result };
