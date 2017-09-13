'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  }

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };

  var form = document.querySelector('.notice__form');

  function errorHandler(errorMessage) {
    var errorMessageModal = document.createElement('div');
    errorMessageModal.style.position = 'absolute';
    errorMessageModal.style.left = 0;
    errorMessageModal.style.top = 0;
    errorMessageModal.style.width = '100%';
    errorMessageModal.style.zIndex = '500';
    errorMessageModal.style.textAlign = 'center';
    errorMessageModal.style.fontSize = '50px';
    errorMessageModal.style.background = '#7dc5f0';
    errorMessageModal.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorMessageModal);
  }

  function successHandler(loadedAdvertisements) {
    window.newAdvertisementsArr = loadedAdvertisements;
    window.createPinList(loadedAdvertisements);
    window.showAdvertisement(loadedAdvertisements[0]);
  }

  window.backend.load(successHandler, errorHandler);

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      window.reset();
    }, errorHandler);
    evt.preventDefault();
  });
})();
