import { sendData } from './fetch.js';

const effectPreviews = document.querySelectorAll('.effects__preview');
const preview = document.querySelector('#img-preview');
const IMAGE_TYPES = ['png', 'jpg', 'jpeg'];
const submit = document.querySelector('.img-upload__submit');
const uploadImageInput = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadPopup = document.querySelector('.img-upload__overlay');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const valueSizeImage = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const sliderFieldset = document.querySelector('.img-upload__effect-level');
let valueSizeNumber = 100;

imagePreview.style.backgroundColor = 'transparent';

const defaultEffectPicture = () => {
  imagePreview.removeAttribute('class');
  imagePreview.setAttribute('class', 'img-upload__preview');
  sliderFieldset.classList.add('hidden');
};

const openUploadForm = () => {
  const files = uploadImageInput.files[0];
  const fileName = files.name.toLowerCase();

  const match = IMAGE_TYPES.some((el) => fileName.endsWith(el));

  if(match) {
    effectPreviews.forEach((el) => {
      el.style.backgroundImage = `url(${URL.createObjectURL(files)})`;
      el.style.backgroundColor = 'transparent';
    });
    preview.src = URL.createObjectURL(files);
    uploadImageInput.removeEventListener('change', openUploadForm);
    uploadCancel.addEventListener('click', closeUploadForm);
    document.addEventListener('keydown', isEscape);

    uploadPopup.classList.remove('hidden');
    document.body.classList.add('modal-open');

    defaultEffectPicture();
    valueSizeNumber = 100;
    valueSizeImage.setAttribute('value', `${valueSizeNumber}%`);
    imagePreview.style.transform = `scale(${valueSizeNumber / 100})`;
  }
};

function closeUploadForm() {
  uploadImageInput.addEventListener('change', openUploadForm);
  uploadCancel.removeEventListener('click', closeUploadForm);
  document.removeEventListener('keydown', isEscape);

  uploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadImageInput.removeAttribute('disabled');
  uploadImageInput.value = '';
}

function isEscape(evt) {
  if(hashtagInput.focused || commentInput.focused) {
    evt.stopPropagation();
  } else if(evt.code === 'Escape') {
    closeUploadForm();
  }
}

const addEventsForm = () => {
  uploadImageInput.addEventListener('change', openUploadForm);
};

const successSendPicture = () => {
  closeUploadForm();
  const template = document.querySelector('#success').content;
  const clone = template.querySelector('.success').cloneNode(true);
  const successButton = clone.querySelector('.success__button');
  document.body.append(clone);
  successButton.addEventListener('click', () => {
    clone.remove();
  });
};

const errorSendPicture = () => {
  closeUploadForm();
  const template = document.querySelector('#error').content;
  const clone = template.querySelector('.error').cloneNode(true);
  const errorButton = clone.querySelector('.error__button');
  document.body.append(clone);
  errorButton.addEventListener('click', () => {
    clone.remove();
  });
};

const blockSumbit = () => {
  submit.disabled = true;
  submit.textContent = 'Опубликовываю...';
};

const unblockSumbit = () => {
  submit.disabled = false;
  submit.textContent = 'Опубликовать';
};

const validateForm = () => {
  const form = document.querySelector('#upload-select-image');
  const pristine = new Pristine(form, {
    classTo: 'text__validate',
    errorClass: 'text__validate--invalid',
    successClass: 'text__validate--valid',
    errorTextParent: 'text__validate',
    errorTextTag: 'p',
    errorTextClass: 'text__error'
  });

  pristine.addValidator(hashtagInput,
    () => hashtagInput.value
      .split(' ')
      .every((el) => el !== '#'),
    '- хеш-тег не может состоять только из одной решётки');

  pristine.addValidator(hashtagInput,
    () => hashtagInput.value
      .trim()
      .split(' ')
      .every((el) => /^#[A-Za-zА-Яа-яЁё0-9]{0,}$/.test(el))
      || hashtagInput.value === '',
    '- строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');

  pristine.addValidator(hashtagInput,
    () => hashtagInput.value
      .split(' ')
      .every((el) => el.length <= 20),
    '- максимальная длина одного хэш-тега 20 символов, включая решётку');

  pristine.addValidator(hashtagInput,
    () => hashtagInput.value
      .toLowerCase()
      .split(' ')
      .filter((el, i, arr) => arr.indexOf(el) !== i).length === 0,
    '- один и тот же хэш-тег не может быть использован дважды');

  pristine.addValidator(hashtagInput,
    () => hashtagInput.value.split(' ').length <= 5,
    '- нельзя указать больше пяти хэш-тегов');

  pristine.addValidator(commentInput,
    () => commentInput.value.length <= 140,
    '- длина комментария не может составлять больше 140 символов');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()) {
      blockSumbit();
      sendData(() => {
        successSendPicture();
        unblockSumbit();
      },
      () => {
        errorSendPicture();
        unblockSumbit();
      },
      new FormData(evt.target));
    }
  });

  hashtagInput.addEventListener('focus', function() {this.focused = true;});
  hashtagInput.addEventListener('blur', function() {this.focused = false;});
  commentInput.addEventListener('focus', function() {this.focused = true;});
  commentInput.addEventListener('blur', function() {this.focused = false;});
};

const editPhoto = () => {
  const scaleInput = document.querySelector('.img-upload__scale');
  const effectsInput = document.querySelector('.img-upload__effects');
  const slider = document.querySelector('.effect-level__slider');
  const effectLevelValue = document.querySelector('.effect-level__value');

  noUiSlider.create(slider, {
    start: 100,
    connect: 'lower',
    range: {
      'min': 0,
      'max': 100
    },
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  });

  scaleInput.addEventListener('click', (evt) => {
    switch(evt.target.className.split('  ')[1]) {
      case 'scale__control--smaller':
        if(valueSizeImage.value !== '25%') {
          valueSizeNumber -= 25;
          valueSizeImage.setAttribute('value', `${valueSizeNumber}%`);
          imagePreview.style.transform = `scale(${valueSizeNumber / 100})`;
        }
        break;
      case 'scale__control--bigger':
        if(valueSizeImage.value !== '100%') {
          valueSizeNumber += 25;
          valueSizeImage.setAttribute('value', `${valueSizeNumber}%`);
          imagePreview.style.transform = `scale(${valueSizeNumber / 100})`;
        }
        break;
    }
  });

  effectsInput.addEventListener('change', (evt) => {
    if(evt.target.value === 'none') {
      defaultEffectPicture();
      imagePreview.removeAttribute('style');
      imagePreview.style.transform = `scale(${valueSizeNumber / 100})`;
      imagePreview.style.backgroundColor = 'transparent';
    } else {
      defaultEffectPicture();
      sliderFieldset.classList.remove('hidden');
      imagePreview.classList.add(`effects__preview--${evt.target.value}`);
      switch(evt.target.value) {
        case 'chrome':
          slider.noUiSlider.updateOptions({
            start: 1,
            step: 0.1,
            range: {
              'min': 0,
              'max': 1
            }
          });
          break;
        case 'sepia':
          slider.noUiSlider.updateOptions({
            start: 1,
            step: 0.1,
            range: {
              'min': 0,
              'max': 1
            }
          });
          break;
        case 'marvin':
          slider.noUiSlider.updateOptions({
            start: 100,
            step: 1,
            range: {
              'min': 0,
              'max': 100
            }
          });
          break;
        case 'phobos':
          slider.noUiSlider.updateOptions({
            start: 3,
            step: 0.1,
            range: {
              'min': 0,
              'max': 3
            }
          });
          break;
        case 'heat':
          slider.noUiSlider.updateOptions({
            start: 3,
            step: 0.1,
            range: {
              'min': 1,
              'max': 3
            }
          });
          break;
      }
    }
  });

  slider.noUiSlider.on('update', () => {
    effectLevelValue.setAttribute('value', `${slider.noUiSlider.get()}`);
    if(imagePreview.classList.contains('effects__preview--chrome')) {
      imagePreview.style.filter = `grayscale(${slider.noUiSlider.get()})`;
    } else if(imagePreview.classList.contains('effects__preview--sepia')) {
      imagePreview.style.filter = `sepia(${slider.noUiSlider.get()})`;
    } else if(imagePreview.classList.contains('effects__preview--marvin')) {
      imagePreview.style.filter = `invert(${slider.noUiSlider.get()}%)`;
    } else if(imagePreview.classList.contains('effects__preview--phobos')) {
      imagePreview.style.filter = `blur(${slider.noUiSlider.get()}px)`;
    } else if(imagePreview.classList.contains('effects__preview--heat')) {
      imagePreview.style.filter = `brightness(${slider.noUiSlider.get()})`;
    }
  });
};

export {addEventsForm, validateForm , editPhoto};
