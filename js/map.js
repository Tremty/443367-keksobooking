'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var modalDialog = document.querySelector('.dialog');
  var dialogClose = modalDialog.querySelector('.dialog__close');
  var pinElementCollection = document.querySelectorAll('.pin');
  var pinMain = document.getElementsByClassName('pin__main')[0];
  var formFieldAddress = document.querySelector('#address');
  var pinMainWidth = 74 / 2;
  var pinMainHeight = 94;

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
      if (pinActive.classList[1] !== 'pin__main') {
        var index = pinActive.dataset.number;
        window.showAdvertisement(window.advertisementsNearby[index]);
        // console.log(window.advertisementsNearby[index]);
        showModal();
      } else {
        window.showAdvertisement(window.advertisementMain);
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

  // Drag and drop

  pinMain.addEventListener('mousedown', function (evt) {
    // evt.preventDefault();

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
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
