const getRandomIntNumber = (from, to) =>
  from < 0 || from > to ? false : Math.floor(Math.random() * (to + 1 - from) + from);

const checkMaxLengthString = (checkString, maxLength) => checkString.length <= maxLength;

const getNoRepeatNumbers = (from, to, length) => {
  const arr = [];
  while(arr.length < length) {
    const randomNumber = getRandomIntNumber(from, to);
    if(arr.every((el) => el !== randomNumber)) {
      arr.push(randomNumber);
    }
  }
  return arr;
};

const debounce = (cb) => {
  let timeout;
  return (...rest) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb.apply(this, rest);
    }, 500);
  };
};

export {getRandomIntNumber, checkMaxLengthString, getNoRepeatNumbers, debounce};
