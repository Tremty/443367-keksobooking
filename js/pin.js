'use strict';

(function () {

  window.createPinList = function (pinCount) {
    var pinList = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();
    var pinHeight = 75;
    var pinWidth = 56;
    for (var i = 0; i < pinCount; i++) {
      var pinElement = document.createElement('div');
      pinElement.className = 'pin';
      pinElement.tabIndex = 0;
      pinElement.setAttribute('data-number', i);
      pinElement.style.left = window.advertisementsNearby[i].location.x + pinWidth / 2 + 'px';
      pinElement.style.top = window.advertisementsNearby[i].location.y + pinHeight + 'px';
      var fullPinList = document.querySelector('.pin');
      var pinAvatar = document.createElement('img');
      pinAvatar.src = window.advertisementsNearby[i].author.avatar;
      pinAvatar.className = 'rounded';
      pinAvatar.width = '40';
      pinAvatar.height = '40';
      pinElement.appendChild(pinAvatar);
      fragment.appendChild(pinElement);
    }
    pinList.appendChild(fragment);
    fullPinList.appendChild(fragment);
  };
  window.createPinList(8);
})();

