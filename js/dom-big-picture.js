const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const cancelButton = bigPicture.querySelector('#picture-cancel');
const imgHTML = bigPicture.querySelector('.big-picture__img').children[0];
const commentsLoader = bigPicture.querySelector('.comments-loader');
const likesHTML = bigPicture.querySelector('.likes-count');
const commentHTML = bigPicture.querySelector('.social__comment');
const commentsHTML = bigPicture.querySelector('.social__comments');
const descriptionHTML = bigPicture.querySelector('.social__caption');
const socialCommentsCountHTML = bigPicture.querySelector('.social__comment-count');

const cancelPicture = () => {
  pictures.addEventListener('click', clickPicture);
  cancelButton.removeEventListener('click', cancelPicture);
  document.removeEventListener('keydown', isEscape);

  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

function isEscape(evt) {
  if(evt.code === 'Escape') {
    cancelPicture();
  }
}

function clickPicture(picturesData) {
  return (evt) => {
    commentsHTML.innerHTML = '';
    commentsLoader.classList.remove('hidden');

    const fullClickElement = evt.target.nodeName === 'SPAN' ? evt.target.parentNode.parentNode : evt.target.parentNode;
    if(fullClickElement.classList.contains('picture')) {
      pictures.removeEventListener('click', clickPicture);

      document.body.classList.add('modal-open');
      bigPicture.classList.remove('hidden');

      cancelButton.addEventListener('click', cancelPicture);
      document.addEventListener('keydown', isEscape);

      const dataPictureOnclick = picturesData[Array.from(document.querySelectorAll('.picture')).indexOf(fullClickElement)];
      const { url, likes, comments, description } = dataPictureOnclick;

      imgHTML.src = url;
      likesHTML.textContent = likes;
      // Загрузка комментариев
      const loadComments = (start, end) => {
        for(let i = start; i < comments.length && i < end; i++) {
          const clone = commentHTML.cloneNode(true);
          const socialPicture = clone.querySelector('.social__picture');
          const socialText = clone.querySelector('.social__text');

          socialPicture.src = comments[i].avatar;
          socialPicture.alt = comments[i].name;
          socialText.textContent = comments[i].message;
          commentsHTML.append(clone);
        }
      };
      loadComments(0, 5);
      descriptionHTML.textContent = description;
      if(comments.length <= 5) {
        commentsLoader.classList.add('hidden');
      }
      // Рендеринг количества комментариев
      const renderCommentsCount = (commentsLoaded) => {
        socialCommentsCountHTML.textContent =
        comments.length !== 0 ?
          `${commentsLoaded} из ${comments.length} ${comments.length !== 1 ? 'комментариев' : 'комментарий'}` :
          'нет комментариев';
      };
      renderCommentsCount(commentsHTML.children.length);
      // Загрузка комментариев по нажатию кнопки "Загрузить еще"
      let countClick = 1;
      const getMoreComments = () => {
        loadComments(countClick * 5, countClick * 5 + 5);
        countClick++;
        if(commentsHTML.children.length === comments.length) {
          commentsLoader.classList.add('hidden');
        }
        renderCommentsCount(commentsHTML.children.length);
      };
      commentsLoader.addEventListener('click', getMoreComments);
    }
  };
}

const openClosePicture = (dataPictures) => {
  pictures.addEventListener('click', clickPicture(dataPictures));
};

export { openClosePicture };
