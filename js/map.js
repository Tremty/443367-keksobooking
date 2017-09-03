'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var modalDialog = document.querySelector('.dialog');
  var dialogClose = modalDialog.querySelector('.dialog__close');
  var pinElementCollection = document.querySelectorAll('.pin');

  function addClickHandlerForArr() {
    for (var i = 0; i < pinElementCollection.length; i++) {
      pinElementCollection[i].addEventListener('click', openHandler);
    }
  }

  function addEnterHandlerForArr() {
    for (var i = 0; i < pinElementCollection.length; i++) {
      pinElementCollection[i].addEventListener('keydown', openHandler);
    }
  }

  function openHandler(event) {
    removePinActiveFromArr();

    if (event.button === 0 || event.keyCode === ENTER_KEYCODE) {
      var pinActive = event.currentTarget;
      pinActive.classList.add('pin--active');
      var index = pinActive.dataset.number;
      window.showAdvertisement(window.advertisementsNearby[index]);
      showModal();
    }
  }

  function modalEscHandler(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal();
      removePinActiveFromArr();
    }
  }

  function showModal() {
    modalDialog.classList.remove('hidden');
    document.addEventListener('keydown', modalEscHandler);
  }

  function closeModal() {
    modalDialog.classList.add('hidden');
    document.removeEventListener('keydown', modalEscHandler);
  }

  function removePinActiveFromArr() {
    for (var j = 0; j < pinElementCollection.length; j++) {
      pinElementCollection[j].classList.remove('pin--active');
    }
  }

  addEnterHandlerForArr();

  addClickHandlerForArr();

  dialogClose.addEventListener('click', function () {
    closeModal();
    removePinActiveFromArr();
  });

  dialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeModal();
      removePinActiveFromArr();
    }
  });
})();

