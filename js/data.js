'use strict';

(function () {
  // var advertisementsNearby = [];
  //
  // var advertisementsData = {
  //   offer: {
  //     title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  //     type: ['flat', 'house', 'bungalo'],
  //     typeTranslate: ['квартира', 'дом', 'бунгало'],
  //     checkin: ['12:00', '13:00', '14:00'],
  //     checkout: ['12:00', '13:00', '14:00'],
  //     features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  //   }
  // };
  //
  // function getRandomVariable(advertisementsDataArray) {
  //   return advertisementsDataArray[Math.floor(Math.random() * advertisementsDataArray.length)];
  // }

  // function getRandomArrayOfIndexes(advertisementsDataArray, count) {
  //   var randomArrayOfIndexes = [];
  //   while (randomArrayOfIndexes.length < count) {
  //     var randomNumber = Math.floor(Math.random() * advertisementsDataArray.length);
  //     var foundedNumber = false;
  //     for (var i = 0; i < count; i++) {
  //       if (randomArrayOfIndexes[i] === randomNumber) {
  //         foundedNumber = true;
  //       }
  //     }
  //     if (!foundedNumber) {
  //       randomArrayOfIndexes[randomArrayOfIndexes.length] = randomNumber;
  //     }
  //   }
  //   return randomArrayOfIndexes;
  // }

  // function getRandomNumber(min, max) {
  //   return Math.floor(min + Math.random() * (max + 1 - min));
  // }

  // function getRandomFeatures() {
  //   var randomFeaturesArray = [];
  //   var countOfFeatures = getRandomNumber(1, advertisementsData.offer.features.length);
  //   var randomFeaturesArrayIndexes = [];
  //   randomFeaturesArrayIndexes.length = countOfFeatures;
  //   randomFeaturesArrayIndexes = getRandomArrayOfIndexes(advertisementsData.offer.features, countOfFeatures);
  //   for (var i = 0; i < countOfFeatures; i++) {
  //     randomFeaturesArray[i] = advertisementsData.offer.features[randomFeaturesArrayIndexes[i]];
  //   }
  //   return randomFeaturesArray;
  // }

  // function getAdvertisementsDataType(advertisementsOfferTitle) {
  //   var advertisementType = advertisementsOfferTitle;
  //   if (advertisementsOfferTitle === 'flat') {
  //     advertisementType = advertisementsData.offer.typeTranslate[0];
  //   } else if (advertisementsOfferTitle === 'house') {
  //     advertisementType = advertisementsData.offer.typeTranslate[1];
  //   } else if (advertisementsOfferTitle === 'bungalo') {
  //     advertisementType = advertisementsData.offer.typeTranslate[2];
  //   }
  //   return advertisementType;
  // }

  // function createAdvertisementsNearby(count) {
  //   var indexes = getRandomArrayOfIndexes(advertisementsData.offer.title, count);
  //   for (var i = 0; i < count; i++) {
  //     advertisementsNearby[i] = {
  //       author: {
  //         avatar: 'img/avatars/user0' + [indexes[i] + 1] + '.png'
  //       },
  //
  //       offer: {
  //         title: advertisementsData.offer.title[indexes[i]],
  //         address: '',
  //         price: getRandomNumber(1000, 1000000),
  //         type: getAdvertisementsDataType(getRandomVariable(advertisementsData.offer.type)),
  //         rooms: getRandomNumber(1, 5),
  //         guests: getRandomNumber(1, 15),
  //         checkin: getRandomVariable(advertisementsData.offer.checkin),
  //         checkout: getRandomVariable(advertisementsData.offer.checkout),
  //         features: getRandomFeatures(),
  //         description: '',
  //         photos: []
  //       },
  //
  //       location: {
  //         x: getRandomNumber(300, 900),
  //         y: getRandomNumber(100, 500)
  //       }
  //     };
  //     advertisementsNearby[i].offer.address = advertisementsNearby[i].location.x + ', ' + advertisementsNearby[i].location.y;
  //   }
  //   return advertisementsNearby;
  // }

  window.advertisementMain = {
    author: {
      avatar: 'img/avatars/user01.png'
    },
    location: {
      x: 300,
      y: 600
    },
    offer: {
      address: '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
      checkin: '14:00',
      checkout: '10:00',
      description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и имеет свежий ремонт.',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      guests: 3,
      photos: [],
      price: 5200,
      rooms: 2,
      title: 'Уютное гнездышко для молодоженов',
      type: 'квартира'
    }
  };

  // window.advertisementMain.offer.address = window.advertisementMain.location.x + ':' + window.advertisementMain.location.y;

  // window.advertisementsNearby = createAdvertisementsNearby(8);
})();
