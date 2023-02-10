const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Данные не загрузились');
      }
    })
    .then((pictures) => onSuccess(pictures))
    .catch((err) => document.body.insertAdjacentHTML('afterbegin',
      `<section class="error">
        <div class="error__inner">
          <h2 class="error__title">${err.message}</h2>
        </div>
      </section>`));
};

const sendData = (onSuccess, onError, body) => {
  fetch('https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body
    })
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        throw new Error();
      }
    })
    .catch(() => onError());
};

export { getData, sendData };
