'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var tokyoMap = document.querySelector('.tokyo__pin-map');
  var modalDialog = document.querySelector('.dialog');
  var dialogClose = modalDialog.querySelector('.dialog__close');

  function openHandler(evt) {
    removePinActiveFromArr();
    if (evt.button === 0 || evt.keyCode === ENTER_KEYCODE) {
      var pinActive = evt.currentTarget;
      pinActive.classList.add('pin--active');
      if (!pinActive.classList.contains('pin__main')) {
        selectAskedCart(pinActive, window.askedAdvertisements);
      }
    }
  }

  function selectAskedCart(pinActive, advertisements) {
    var index = pinActive.dataset.number;
    advertisements = window.askedAdvertisements ? window.askedAdvertisements : window.newAdvertisementsArr;
    window.showAdvertisement(advertisements[index]);
    showModal();
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
    var pinActivePrevious = tokyoMap.querySelector('.pin--active');
    if (pinActivePrevious) {
      pinActivePrevious.classList.remove('pin--active');
    }
  }

  function addClickHandlerForPin(element) {
    element.addEventListener('click', openHandler);
  }

  function addButtonHandlerForPin(element) {
    element.addEventListener('keydown', openHandler);
  }

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


  dialogClose.addEventListener('click', function (evt) {
    evt.preventDefault();
  });

  window.map = {
    selectAskedCart: selectAskedCart,
    openHandler: openHandler,
    closeModal: closeModal,
    addClickHandlerForPin: addClickHandlerForPin,
    addButtonHandlerForPin: addButtonHandlerForPin
  };
})();
