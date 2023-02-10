import { getData } from './fetch.js';
import { renderPictures, addEventsFilter } from './dom-pictures.js';
import { openClosePicture } from './dom-big-picture.js';
import { addEventsForm, validateForm, editPhoto } from './dom-form.js';

getData((pictures) => {
  renderPictures(pictures);
  addEventsFilter(pictures);
  openClosePicture(pictures);
});
addEventsForm();
validateForm();
editPhoto();
