'use strict';

(function () {
  var TYPES_IN_ENGLISH = ['flat', 'bungalo', 'house'];
  var TYPES_IN_RUSSIAN = ['Квартира', 'Бунгало', 'Дом'];
  var LODGE_PHOTO_SIZE = {
    width: 52,
    height: 42
  };

  function translateType(englishValue) {
    return TYPES_IN_RUSSIAN[TYPES_IN_ENGLISH.indexOf(englishValue)];
  }

  function createAdvertisement(selectedArray) {
    var template = document.querySelector('#lodge-template');
    var lodge = template.content.cloneNode(true);
    var features = selectedArray.offer.features;
    var photos = selectedArray.offer.photos;
    var featureFragment = document.createDocumentFragment();
    var photosFragment = document.createDocumentFragment();
    lodge.querySelector('.lodge__title').textContent = selectedArray.offer.title;
    lodge.querySelector('.lodge__address').textContent = selectedArray.offer.address;
    lodge.querySelector('.lodge__price').textContent = selectedArray.offer.price + ' ' + String.fromCharCode(8381) + '/ночь';
    lodge.querySelector('.lodge__type').textContent = translateType(selectedArray.offer.type);
    lodge.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + selectedArray.offer.guests + ' гостей в ' + selectedArray.offer.rooms + ' комнатах';
    lodge.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + selectedArray.offer.checkin + ' , выезд до ' + selectedArray.offer.checkout;
    lodge.querySelector('.lodge__description').textContent = selectedArray.offer.description;
    features.forEach(function (item) {
      var oneFeatureImage = document.createElement('span');
      var oneFeature = 'feature__image--' + item;
      oneFeatureImage.classList.add('feature__image');
      oneFeatureImage.classList.add(oneFeature);
      featureFragment.appendChild(oneFeatureImage);
    });
    lodge.querySelector('.lodge__features').appendChild(featureFragment);
    photos.forEach(function (item) {
      var onePhoto = document.createElement('img');
      onePhoto.src = item;
      onePhoto.alt = 'Lodge photo';
      onePhoto.width = LODGE_PHOTO_SIZE.width;
      onePhoto.height = LODGE_PHOTO_SIZE.height;
      photosFragment.appendChild(onePhoto);
    });
    lodge.querySelector('.lodge__photos').appendChild(photosFragment);

    return lodge;
  }
  window.createAdvertisement = createAdvertisement;
})();
