import {getNoRepeatNumbers, getRandomIntNumber} from './util.js';

const COUNT = 25;

const DESCRIPTIONS = [
  'Это прекрасно!',
  'Now it\'s cold',
  'We go to school',
  'if you love me',
  'i don\'t know',
  'He walk'
]

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME = [
  'Artem',
  'Matvey',
  'Valeria',
  'Dasha',
  'Anton'
];

const noRepeatArrayForCommentsId = getNoRepeatNumbers(1, 1000, 1000);

// eslint-disable-next-line arrow-body-style
const generateComment = (i) => {
  return {
    id: noRepeatArrayForCommentsId[i],
    avatar: `img/avatar-${getRandomIntNumber(1, 6)}.svg`,
    message: MESSAGE[getRandomIntNumber(0, MESSAGE.length - 1)],
    name: NAME[getRandomIntNumber(0, NAME.length - 1)]
  };
};

const noRepeatArrayForIdAndUrl = getNoRepeatNumbers(1, COUNT, COUNT);
// eslint-disable-next-line arrow-body-style
const generateImage = (i) => {
  return {
    id: noRepeatArrayForIdAndUrl[i],
    url: `photos/${noRepeatArrayForIdAndUrl[i]}.jpg`,
    description: DESCRIPTIONS[getRandomIntNumber(0, DESCRIPTIONS.length - 1)],
    likes: getRandomIntNumber(15, 200),
    // eslint-disable-next-line no-return-assign
    comments: Array.from({length: getRandomIntNumber(1, 10)}, (el, i) => el = generateComment(i))
  };
};

// eslint-disable-next-line no-return-assign
const createDataImages = () => Array.from({length: COUNT}, (el, i) => el = generateImage(i));

export {createDataImages};
