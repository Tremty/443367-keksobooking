'use strict';

(function () {
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

  pinMain.addEventListener('mousedown', function (evt) {
    window.map.closeModal();

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

  setValueForPinMain();

  window.setValueForPinMain = setValueForPinMain;
})();
