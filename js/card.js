'use strict';

(function () {
  window.createAdvertisement = function (selectedArray) {
    var template = document.querySelector('#lodge-template');
    var lodgeElement = template.content.cloneNode(true);
    var features = selectedArray.offer.features;
    lodgeElement.querySelector('.lodge__title').textContent = selectedArray.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = selectedArray.offer.address;
    lodgeElement.querySelector('.lodge__price').textContent = selectedArray.offer.price + ' ' + String.fromCharCode(8381) + '/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = selectedArray.offer.type;
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + selectedArray.offer.guests + ' гостей в ' + selectedArray.offer.rooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + selectedArray.offer.checkin + ' , выезд до ' + selectedArray.offer.checkout;
    lodgeElement.querySelector('.lodge__description').textContent = selectedArray.offer.description;
    for (var i = 0; i < features.length; i++) {
      lodgeElement.querySelector('.lodge__features').innerHTML += '<span class = "feature__image feature__image--' + features[i] + '"></span>';
    }
    return lodgeElement;
  };
})();
