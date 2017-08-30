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
    pinElement.setAttribute('data-number', i);
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
    pinElementCollection[i].addEventListener('click', openHandler);
  }
}

function addEnterHandlerForArr() {
  for (var i = 0; i < pinElementCollection.length; i++) {
    pinElementCollection[i].addEventListener('keydown', openHandler);
  }
}

addEnterHandlerForArr();

addClickHandlerForArr();

function removePinActiveFromArr() {
  for (var j = 0; j < pinElementCollection.length; j++) {
    pinElementCollection[j].classList.remove('pin--active');
  }
}

function openHandler(event) {
  removePinActiveFromArr();

  if (event.button === 0 || event.keyCode === ENTER_KEYCODE) {
    var pinActive = event.currentTarget;
    pinActive.classList.add('pin--active');
    var index = pinActive.dataset.number;
    showAdvertisement(advertisementsNearby[index]);
    showModal();
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

// Задание к лекции по событиям. Валидация форм

var notice = document.querySelector('.notice');
var noticeTitle = notice.querySelector('#title');
var noticeAddress = notice.querySelector('#address');
var noticeTimeIn = notice.querySelector('#timein');
var noticeTimeOut = notice.querySelector('#timeout');
var noticeType = notice.querySelector('#type');
var noticePrice = notice.querySelector('#price');
var minPriceForBungalo = 0;
var minPriceForFlat = 1000;
var minPriceForHouse = 5000;
var minPriceForPalace = 10000;
var noticeRooms = notice.querySelector('#room_number');
var noticeCapacity = notice.querySelector('#capacity');
var noticeSubmitBtn = notice.querySelector('.form__submit');

noticeTimeIn.addEventListener('change', changeTimeIn);
noticeTimeOut.addEventListener('change', changeTimeOut);
noticeType.addEventListener('change', changePriceFromType);
noticeRooms.addEventListener('change', changeCapacityFromRooms);
noticeSubmitBtn.addEventListener('click', submitAndGetValue);


function changeTimeIn(event) {
  noticeTimeOut.value = event.target.value;
}

function changeTimeOut(event) {
  noticeTimeIn.value = event.target.value;
}

function changePriceFromType(event) {
  if (event.target.value === 'bungalo') {
    noticePrice.setAttribute('min', minPriceForBungalo);
    noticePrice.value = minPriceForBungalo;
  } else if (event.target.value === 'flat') {
    noticePrice.setAttribute('min', minPriceForFlat);
    noticePrice.value = minPriceForFlat;
  } else if (event.target.value === 'house') {
    noticePrice.setAttribute('min', minPriceForHouse);
    noticePrice.value = minPriceForHouse;
  } else if (event.target.value === 'palace') {
    noticePrice.setAttribute('min', minPriceForPalace);
    noticePrice.value = minPriceForPalace;
  }
}

// я не знаю, как проверить, работает ли это, так как при нажатии происходит переход на другую страницу
function submitAndGetValue() {
  noticeTitle.reset();
  noticeAddress.reset();
  noticeTimeIn.reset();
  noticeTimeOut.reset();
  noticeType.reset();
  noticePrice.reset();
  noticeRooms.reset();
  noticeCapacity.reset();
}

function changeCapacityFromRooms(event) {
  if (event.target.value === '100') {
    // 100
    noticeCapacity.value = 0;
    noticeCapacity.children[2].classList.add('hidden');
    noticeCapacity.children[1].classList.add('hidden');
    noticeCapacity.children[0].classList.add('hidden');
    noticeCapacity.children[3].classList.remove('hidden');
  } else if (event.target.value === '1') {
    // 1
    noticeCapacity.value = 1;
    noticeCapacity.children[3].classList.add('hidden');
    noticeCapacity.children[1].classList.add('hidden');
    noticeCapacity.children[0].classList.add('hidden');
    noticeCapacity.children[2].classList.remove('hidden');
  } else if (event.target.value === '2') {
    // 2
    noticeCapacity.value = 1;
    noticeCapacity.children[3].classList.add('hidden');
    noticeCapacity.children[0].classList.add('hidden');
    noticeCapacity.children[2].classList.remove('hidden');
    noticeCapacity.children[1].classList.remove('hidden');
  } else if (event.target.value === '3') {
    // 3
    noticeCapacity.value = 1;
    noticeCapacity.children[3].classList.add('hidden');
    noticeCapacity.children[2].classList.remove('hidden');
    noticeCapacity.children[1].classList.remove('hidden');
    noticeCapacity.children[0].classList.remove('hidden');
  }
}

// Проблема есть с состоянием на момент открытия страницы.
//   Так как функция работает только после получения event.
//   Я бы просто внесла изменения в разметку, добавив где надо селектед,
//   а где надо hidden. Но не знаю, можно ли так по условиям задачи

// И еще я не поняла: подсветку полей при невалидном значении надо делать через js
// или можно это сделать псевдоклассами из css?
