import { openClosePicture } from './dom-big-picture.js';
import { getNoRepeatNumbers } from './util.js';
import { debounce } from './util.js';

const templatePicture = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();
const pictureContainer = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters');
const formFilterButtons = document.querySelector('.img-filters__form');

const renderPictures = (picturesData) => {
  picturesData.forEach(({ url, likes, comments }) => {
    const clone = templatePicture.querySelector('.picture').cloneNode(true);
    const imgHTML = clone.querySelector('.picture__img');
    const likesHTML = clone.querySelector('.picture__likes');
    const commentsHTML = clone.querySelector('.picture__comments');
    imgHTML.src = url;
    likesHTML.textContent = likes;
    commentsHTML.textContent = comments.length;
    fragment.append(clone);
  });

  pictureContainer.append(fragment);
  filters.classList.remove('img-filters--inactive');
};

const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((el) => el.remove());
};

const activateButton = (evt) => {
  formFilterButtons
    .querySelectorAll('.img-filters__button')
    .forEach((el) => el.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
};

const sortPictures = (picturesData) => (evt) => {
  activateButton(evt);
  if(evt.target.id === 'filter-default') {
    clearPictures();
    renderPictures(picturesData);
    openClosePicture(picturesData);
  } else if(evt.target.id === 'filter-random') {
    clearPictures();
    const sort = [];
    const arrNoRepeat = getNoRepeatNumbers(0, picturesData.length - 1, picturesData.length);
    arrNoRepeat.forEach((el) => sort.push(picturesData[el]));
    renderPictures(sort.slice(0, 10));
    openClosePicture(sort.slice(0, 10));
  } else if(evt.target.id === 'filter-discussed') {
    clearPictures();
    const sort = picturesData.slice().sort((a, b) => b.comments.length - a.comments.length);
    renderPictures(sort);
    openClosePicture(sort);
  }
};

const addEventsFilter = (picturesData) => {
  formFilterButtons.addEventListener('click', debounce(sortPictures(picturesData)));
};

export { renderPictures, addEventsFilter };
