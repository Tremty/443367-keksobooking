'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var modalDialog = document.querySelector('.dialog');
  var dialogClose = modalDialog.querySelector('.dialog__close');
  var pinMain = document.getElementsByClassName('pin__main')[0];
  var formFieldAddress = document.querySelector('#address');
  var pinMainWidth = 74 / 2;
  var pinMainHeight = 94;

  var pinMainStartCoords = {
    y: 300,
    x: 637
  };

  var possibleCoords = {
    minY: 220,
    maxY: 657,
    minX: 37,
    maxX: 1155
  };

  formFieldAddress.value = 'y: ' + (pinMainStartCoords.y + pinMainHeight) + ' x: ' + (pinMainStartCoords.x + pinMainWidth);

  window.openHandler = function (evt) {

    removePinActiveFromArr();
    if (evt.button === 0 || evt.keyCode === ENTER_KEYCODE) {
      var pinActive = evt.currentTarget;
      pinActive.classList.add('pin--active');
      if (pinActive.classList[1] !== 'pin__main') {
        var index = pinActive.dataset.number;
        if (window.askedAdvertisements) {
          window.showAdvertisement(window.askedAdvertisements[index]);
        } else {
          window.showAdvertisement(window.newAdvertisementsArr[index]);
        }
        showModal();
      } else {
        window.showAdvertisement(window.advertisementMain);
        showModal();
      }
    }
  };

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
    var pinActivePrev = document.querySelector('.pin--active');
    if (pinActivePrev) {
      pinActivePrev.classList.remove('pin--active');
    }
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

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
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
      formFieldAddress.value = 'y: ' + ((pinMain.offsetTop - shift.y) + pinMainHeight) + ' x: ' + (pinMainWidth + (pinMain.offsetLeft - shift.x));

      if (pinMain.offsetTop < possibleCoords.minY - pinMainHeight) {
        pinMain.style.top = '115px';
      }

      if (pinMain.offsetTop > possibleCoords.maxY - pinMainHeight) {
        pinMain.style.top = '560px';
      }

      if (pinMain.offsetLeft < pinMainWidth - possibleCoords.minX) {
        pinMain.style.left = '2px';
      }

      if (pinMain.offsetLeft > possibleCoords.maxX - pinMainWidth) {
        pinMain.style.left = '1125px';
      }
    };

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
