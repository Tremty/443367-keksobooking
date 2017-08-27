'use strict';

var advertisementsNearby = [];

var advertisementsData = {
  offer: {
    title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    type: ['flat', 'house', 'bungalo'],
    typeTranslate: ['квартира', 'дом', 'бунгало'],
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

function getAdvertisementsDataType(advertisementsOfferTitle) {
  var advertisementType = advertisementsOfferTitle;
  if (advertisementsOfferTitle === 'flat') {
    advertisementType = advertisementsData.offer.typeTranslate[0];
  } else if (advertisementsOfferTitle === 'house') {
    advertisementType = advertisementsData.offer.typeTranslate[1];
  } else if (advertisementsOfferTitle === 'bungalo') {
    advertisementType = advertisementsData.offer.typeTranslate[2];
  }
  return advertisementType;
}

function createAdvertisementsNearby(count) {
  var indexes = getRandomArrayOfIndexes(advertisementsData.offer.title, count);
  for (var i = 0; i < count; i++) {
    advertisementsNearby[i] = {
      author: {
        avatar: 'img/avatars/user0' + [indexes[i] + 1] + '.png'
      },

      offer: {
        title: advertisementsData.offer.title[indexes[i]],
        address: '',
        price: getRandomNumber(1000, 1000000),
        type: getAdvertisementsDataType(getRandomVariable(advertisementsData.offer.type)),
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
    advertisementsNearby[i].offer.address = advertisementsNearby[i].location.x + ', ' + advertisementsNearby[i].location.y;
  }
  return advertisementsNearby;
}

function createPinList(pinCount) {
  var pinList = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  var pinHeight = 75;
  var pinWidth = 56;
  for (var i = 0; i < pinCount; i++) {
    var pinElement = document.createElement('div');
    pinElement.className = 'pin';
    pinElement.tabIndex = 0;
    pinElement.style.left = advertisementsNearby[i].location.x + pinWidth / 2 + 'px';
    pinElement.style.top = advertisementsNearby[i].location.y + pinHeight + 'px';
    var fullPinList = document.querySelector('.pin');
    var pinAvatar = document.createElement('img');
    pinAvatar.src = advertisementsNearby[i].author.avatar;
    pinAvatar.className = 'rounded';
    pinAvatar.width = '40';
    pinAvatar.height = '40';
    pinElement.appendChild(pinAvatar);
    fragment.appendChild(pinElement);
  }
  pinList.appendChild(fragment);
  fullPinList.appendChild(fragment);
}

function createAdvertisement(selectedArray) {
  var template = document.querySelector('#lodge-template');
  var lodgeElement = template.content.cloneNode(true);
  lodgeElement.querySelector('.lodge__title').textContent = selectedArray.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = selectedArray.offer.address;
  lodgeElement.querySelector('.lodge__price').textContent = selectedArray.offer.price + ' ' + String.fromCharCode(8381) + '/ночь';
  lodgeElement.querySelector('.lodge__type').textContent = selectedArray.offer.type;
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + selectedArray.offer.guests + ' гостей в ' + selectedArray.offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + selectedArray.offer.checkin + ' , выезд до ' + selectedArray.offer.checkout;
  lodgeElement.querySelector('.lodge__description').textContent = selectedArray.offer.description;
  var features = selectedArray.offer.features;
  for (var i = 0; i < features.length; i++) {
    lodgeElement.querySelector('.lodge__features').innerHTML += '<span class = "feature__image feature__image--' + features[i] + '"></span>';
  }
  return lodgeElement;
}

function showAdvertisement(selectedArray) {
  var dialogPanel = document.querySelector('.dialog__panel');
  dialogPanel.parentElement.replaceChild(createAdvertisement(selectedArray), dialogPanel);

  var dialogTitle = document.querySelector('.dialog__title');
  var dialogPanelAvatar = dialogTitle.querySelector('img');
  dialogPanelAvatar.src = selectedArray.author.avatar;
}

createAdvertisementsNearby(8);

createPinList(8);

showAdvertisement(advertisementsNearby[0]);

// Задание к лекции по событиям

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var modalDialog = document.querySelector('.dialog');
var dialogClose = modalDialog.querySelector('.dialog__close');
var pinElementCollection = document.querySelectorAll('.pin');

function addClickHandlerForArr() {
  for (var i = 0; i < pinElementCollection.length; i++) {
    pinElementCollection[i].addEventListener('click', clickHandler);
  }
}

// Попытка навесить энтер на пины, чтобы они открывались по нажатию, если находяятся в фокусе
// Попытка осуществлена по принципу, котрый использовался выше для навешивания события клика (addClickHandlerForArr)
// Проблема с логикой функции связана с тем, что в addClickHandlerForArr нет открытия окна, оно у меня находится
// в clickHandler. Но если убрать из addEnterHandlerForArr функцию открытия окна, то что будет внутри if?

// function addEnterHandlerForArr(evt) {
//   for (var i = 0; i < pinElementCollection.length; i++) {
//     pinElementCollection[i].addEventListener('keydown', clickHandler);
//     if (evt.keyCode === ENTER_KEYCODE) {
//       showModal();
//     }
//   }
// }
//
// addEnterHandlerForArr();

addClickHandlerForArr();

function removePinActiveFromArr() {
  for (var j = 0; j < pinElementCollection.length; j++) {
    pinElementCollection[j].classList.remove('pin--active');
  }
}

function clickHandler(evt) {
  removePinActiveFromArr();

  evt.target.parentNode.classList.add('pin--active');
  // Мы успешно навесили пин эктив на один элемент и теперь нам надо пывести диалог, который сответсвует
  // этому элементу. Для этого я хочу найти индекс элемента коллекции, к которому добавился пин-эктив
  var pinActive = document.querySelector('.pin--active');
  // я успешно нахожу пин эктив, он ложится в pinActive, это фиксирует дебаггер,
  //   и вот я хочу узнать индекс этого дива с классами пин и пин-эктив... Но нет...
  var index = pinElementCollection.indexOf(pinActive);
  // консоль лог и дебаггер утверждают, что в индекс лежит undefined
  // console.log(index);
  showAdvertisement(advertisementsNearby[index]);
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
