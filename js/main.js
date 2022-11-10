const getRandomIntNumber = (from, to) =>
  from < 0 || from > to ? false : Math.floor(Math.random() * (to + 1 - from) + from);

const checkMaxLengthString = (checkString, maxLength) => checkString.length <= maxLength;

const getNoRepeatNumbers = (from, to) => {
  const arr = [];
  while(arr.length < to) {
    const randomNumber = getRandomIntNumber(from, to);
    if(arr.every((el) => el !== randomNumber)) {
      arr.push(randomNumber);
    }
  }
  return arr;
};

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

// eslint-disable-next-line arrow-body-style
const generateComment = () => {
  return {
    id: getNoRepeatNumbers(1, 1000),
    avatar: `img/avatar-${getRandomIntNumber(1, 6)}.svg`,
    message: MESSAGE[getRandomIntNumber(0, MESSAGE.length - 1)],
    name: NAME[getRandomIntNumber(0, NAME.length - 1)]
  };
};

const noRepeatArrayForIdAndUrl = getNoRepeatNumbers(1, COUNT);
// eslint-disable-next-line arrow-body-style
const generateImage = (i) => {
  return {
    id: noRepeatArrayForIdAndUrl[i],
    url: `photos/${noRepeatArrayForIdAndUrl[i]}.jpg`,
    description: DESCRIPTIONS[getRandomIntNumber(0, DESCRIPTIONS.length - 1)],
    likes: getRandomIntNumber(15, 200),
    comments: Array.from({length: getRandomIntNumber(1, 10)}, generateComment)
  };
};

// eslint-disable-next-line no-return-assign
const dataImages = Array.from({length: COUNT}, (el, i) => el = generateImage(i));
