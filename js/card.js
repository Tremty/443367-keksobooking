'use strict';

(function () {
  var TYPES_IN_ENGLISH = ['flat', 'bungalo', 'house'];
  var TYPES_IN_RUSSIAN = ['Квартира', 'Бунгало', 'Дом'];

  function translateType(englishValue) {
    var translatedTypeInRussian;
    switch (englishValue) {
      case TYPES_IN_ENGLISH[0] :
        translatedTypeInRussian = TYPES_IN_RUSSIAN[0];
        break;
      case TYPES_IN_ENGLISH[1] :
        translatedTypeInRussian = TYPES_IN_RUSSIAN[1];
        break;
      case TYPES_IN_ENGLISH[2] :
        translatedTypeInRussian = TYPES_IN_RUSSIAN[2];
        break;
    }
    return translatedTypeInRussian;
  }

  function createAdvertisement(selectedArray) {
    var template = document.querySelector('#lodge-template');
    var lodgeElement = template.content.cloneNode(true);
    var features = selectedArray.offer.features;
    lodgeElement.querySelector('.lodge__title').textContent = selectedArray.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = selectedArray.offer.address;
    lodgeElement.querySelector('.lodge__price').textContent = selectedArray.offer.price + ' ' + String.fromCharCode(8381) + '/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = translateType(selectedArray.offer.type);
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + selectedArray.offer.guests + ' гостей в ' + selectedArray.offer.rooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + selectedArray.offer.checkin + ' , выезд до ' + selectedArray.offer.checkout;
    lodgeElement.querySelector('.lodge__description').textContent = selectedArray.offer.description;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var oneFeatureImage = document.createElement('span');
      var oneFeature = 'feature__image--' + features[i];
      oneFeatureImage.classList.add('feature__image');
      oneFeatureImage.classList.add(oneFeature);
      fragment.appendChild(oneFeatureImage);
    }
    lodgeElement.querySelector('.lodge__features').appendChild(fragment);
    return lodgeElement;
  }

  window.createAdvertisement = createAdvertisement;
})();
