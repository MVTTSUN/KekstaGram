const getRandomIntNumber = (from, to) =>
  from < 0 || from > to ? false : Math.floor(Math.random() * (to + 1 - from) + from);

getRandomIntNumber(1, 6);

const checkMaxLengthString = (checkString, maxLength) => checkString.length === maxLength;

checkMaxLengthString('gdhghhd', 5);
