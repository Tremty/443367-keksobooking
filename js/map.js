'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var PIN_MAIN_HALF_WIDTH = 74 / 2;
  var PIN_MAIN_HEIGHT = 94;

  var PIN_MAIN_START_COORDS = {
    y: 300,
    x: 637
  };

  var POSSIBLE_COORDS = {
    minY: 210,
    maxY: 657,
    minX: 37,
    maxX: 1155
  };

  var tokyoMap = document.querySelector('.tokyo__pin-map');
  var modalDialog = document.querySelector('.dialog');
  var dialogClose = modalDialog.querySelector('.dialog__close');
  var pinMain = tokyoMap.querySelector('.pin__main');
  var formFieldAddress = document.querySelector('#address');

  function controlPinMainPosition() {
    if (pinMain.offsetTop < POSSIBLE_COORDS.minY - PIN_MAIN_HEIGHT) {
      pinMain.style.top = POSSIBLE_COORDS.minY - PIN_MAIN_HEIGHT + 'px';
    }

    if (pinMain.offsetTop > POSSIBLE_COORDS.maxY - PIN_MAIN_HEIGHT) {
      pinMain.style.top = POSSIBLE_COORDS.maxY - PIN_MAIN_HEIGHT + 'px';
    }

    if (pinMain.offsetLeft < PIN_MAIN_HALF_WIDTH - POSSIBLE_COORDS.minX) {
      pinMain.style.left = PIN_MAIN_HALF_WIDTH - POSSIBLE_COORDS.minX + 'px';
    }

    if (pinMain.offsetLeft > POSSIBLE_COORDS.maxX - PIN_MAIN_HALF_WIDTH) {
      pinMain.style.left = POSSIBLE_COORDS.maxX - PIN_MAIN_HALF_WIDTH + 'px';
    }
  }

  function setValueForPinMain() {
    formFieldAddress.value = 'y: ' + (PIN_MAIN_START_COORDS.y + PIN_MAIN_HEIGHT) + ' x: ' + (PIN_MAIN_START_COORDS.x + PIN_MAIN_HALF_WIDTH);
  }

  function openHandler(evt) {
    removePinActiveFromArr();
    if (evt.button === 0 || evt.keyCode === ENTER_KEYCODE) {
      var pinActive = evt.currentTarget;
      pinActive.classList.add('pin--active');
      if (!pinActive.classList.contains('pin__main')) {
        var index = pinActive.dataset.number;
        if (window.askedAdvertisements) {
          window.showAdvertisement(window.askedAdvertisements[index]);
        } else {
          window.showAdvertisement(window.newAdvertisementsArr[index]);
        }
        showModal();
      }
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

  pinMain.addEventListener('mousedown', function (evt) {
    closeModal();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      formFieldAddress.value = 'y: ' + ((pinMain.offsetTop - shift.y) + PIN_MAIN_HEIGHT) + ' x: ' + (PIN_MAIN_HALF_WIDTH + (pinMain.offsetLeft - shift.x));
      controlPinMainPosition();
    }

    function mouseUpHandler(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  dialogClose.addEventListener('click', function (evt) {
    evt.preventDefault();
  });

  setValueForPinMain();

  window.map = {
    setValueForPinMain: setValueForPinMain,
    openHandler: openHandler,
    closeModal: closeModal,
    addClickHandlerForPin: addClickHandlerForPin,
    addButtonHandlerForPin: addButtonHandlerForPin
  };
})();
