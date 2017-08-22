'use strict';

var advertisementsNearby = [];

var advertisementsData = {
  avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'],

  offer: {
    title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    type: ['flat', 'house', 'bungalo'],
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  }
};

function getRandomVariable(advertisementsDataArray) {
  return advertisementsDataArray[Math.floor(Math.random() * advertisementsDataArray.length)];
}

function getRandomArrayOfIndexes(advertisementsDataArray, count) {
  var randomArrayOfIndexes = [];
  while (randomArrayOfIndexes.length < count) {
    var randomNumber = Math.floor(Math.random() * advertisementsDataArray.length);
    var foundedNumber = false;
    for (var i = 0; i < count; i++) {
      if (randomArrayOfIndexes[i] === randomNumber) {
        foundedNumber = true;
        break;
      }
    }
    if (!foundedNumber) {
      randomArrayOfIndexes[randomArrayOfIndexes.length] = randomNumber;
    }
  }
  return randomArrayOfIndexes;
}

function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomFeatures() {
  var randomFeaturesArray = [];
  var countOfFeatures = getRandomNumber(1, advertisementsData.offer.features.length);
  var randomFeaturesArrayIndexes = [];
  randomFeaturesArrayIndexes.length = countOfFeatures;
  randomFeaturesArrayIndexes = getRandomArrayOfIndexes(advertisementsData.offer.features, countOfFeatures);
  for (var i = 0; i < countOfFeatures; i++) {
    randomFeaturesArray[i] = advertisementsData.offer.features[randomFeaturesArrayIndexes[i]];
  }
  return randomFeaturesArray;
}

function createAdvertisementsNearby(count) {
  var indexes = getRandomArrayOfIndexes(advertisementsData.avatar, count);

  for (var i = 0; i < count; i++) {
    advertisementsNearby[i] = {
      author: {
        avatar: advertisementsData.avatar[indexes[i]] /* результат функции выбирающей один из 8 аватаров, с таким же индексом, что и offer.title*/
      },

      offer: {
        title: advertisementsData.offer.title[indexes[i]], /* результат функции выбирающей один из 8 названий, с таким же индексом, что и аватар*/
        address: getRandomNumber(300, 900) + ' ,' + getRandomNumber(100, 500),
        prise: getRandomNumber(1000, 1000000),
        type: getRandomVariable(advertisementsData.offer.type),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 15),
        checkin: getRandomVariable(advertisementsData.offer.checkin),
        checkout: getRandomVariable(advertisementsData.offer.checkout),
        features: getRandomFeatures(),
        description: '',
        photos: []
      },

      location: {
        x: getRandomNumber(300, 900),
        y: getRandomNumber(100, 500)
      }
    };
  }
  return advertisementsNearby;
}

createAdvertisementsNearby(7);

advertisementsNearby = createAdvertisementsNearby(7);
// На основе данных, созданных в предыдущем пункте, создайте DOM-элементы, соответствующие меткам на карте случайно сгенерированных объявлений и заполните их данными из массива. Итоговая разметка метки должна выглядеть следующим образом:
//
//   <div class="pin" style="left: {{location.x}}px; top: {{location.y}}px">
//   <img src="{{author.avatar}}" class="rounded" width="40" height="40">
//   </div>
//   Обратите внимание
// Координаты X и Y это не координаты левого верхнего угла блока метки, а координаты, на которые указывает метка своим острым концом. Чтобы найти эту координату нужно учесть размеры элемента с меткой.

function createPinList(pinCount) {
  var pinList = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  var pinHeight = 94;
  var pinWidth = 75;
  for (var i = 0; i < pinCount; i++) {
    var pinElement = document.createElement('div');
    pinElement.className = 'pin';
    pinElement.style.left = advertisementsNearby[i].location.x + pinWidth / 2 + 'px';
    pinElement.style.top = advertisementsNearby[i].location.y + pinHeight + 'px';
    fragment.appendChild(pinElement);
  }
  pinList.appendChild(fragment);
}

createPinList(7);
