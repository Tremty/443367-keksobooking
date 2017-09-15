'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var PIN_HEIGHT = 75;
  var PIN_WIDTH = 56;
  var PIN_AVATAR_SIZE = '40';

  var tokyoMap = document.querySelector('.tokyo__pin-map');
  var filtersForm = document.querySelector('.tokyo__filters');
  var type = filtersForm.querySelector('#housing_type');
  var price = filtersForm.querySelector('#housing_price');
  var rooms = filtersForm.querySelector('#housing_room-number');
  var guests = filtersForm.querySelector('#housing_guests-number');

  function createPinList(dataArr, count) {
    var fragment = document.createDocumentFragment();
    if (!count) {
      count = dataArr.length;
    }
    for (var i = 0; i < count; i++) {
      var pinElement = document.createElement('div');
      var fullPinList = document.querySelector('.pin');
      var pinAvatar = document.createElement('img');

      window.addClickHandlerForPin(pinElement);
      window.addButtonHandlerForPin(pinElement);
      pinElement.classList.add('pin');
      pinElement.tabIndex = 0;
      pinElement.setAttribute('data-number', i);
      pinElement.style.left = dataArr[i].location.x - PIN_WIDTH / 2 + 'px';
      pinElement.style.top = dataArr[i].location.y - PIN_HEIGHT + 'px';

      pinAvatar.src = dataArr[i].author.avatar;
      pinAvatar.classList.add('rounded');
      pinAvatar.width = PIN_AVATAR_SIZE;
      pinAvatar.height = PIN_AVATAR_SIZE;
      pinElement.appendChild(pinAvatar);
      fragment.appendChild(pinElement);
    }
    tokyoMap.appendChild(fragment);
    fullPinList.appendChild(fragment);
  }

  function chooseFilter(dataArr) {
    dataArr = window.newAdvertisementsArr;
    var askedAdvertisements = [];
    var askedTypeAdvertisements = typeFilter(dataArr);
    var askedPriceAdvertisements = priceFilter(askedTypeAdvertisements);
    var askedRoomsAdvertisements = roomsFilter(askedPriceAdvertisements);
    var askedGuestsAdvertisements = guestsFilter(askedRoomsAdvertisements);
    var askedFeatures = findCheckedFeaturesOnFilterForm();
    removePins();
    askedAdvertisements = askedFeatures.length === 0 ? askedGuestsAdvertisements : filterFeatures(askedFeatures, askedGuestsAdvertisements);
    window.createPinList(askedAdvertisements);
    window.closeModal();
    window.askedAdvertisements = askedAdvertisements;
  }

  function typeFilter(dataArr) {
    var askedTypeAdvertisements;
    for (var i = 0; i < type.options.length; i++) {
      if (type.options[i].selected) {
        askedTypeAdvertisements = dataArr.filter(function (item) {
          return item.offer.type === type.options[i].value;
        });
      } else if (type.options[0].selected) {
        askedTypeAdvertisements = dataArr;
      }
    }
    return askedTypeAdvertisements;
  }

  function priceFilter(dataArr) {
    var askedPriceAdvertisements;
    if (price.options[1].selected) {
      askedPriceAdvertisements = dataArr.filter(function (item) {
        return item.offer.price >= LOW_PRICE && item.offer.price <= HIGH_PRICE;
      });
    } else if (price.options[2].selected) {
      askedPriceAdvertisements = dataArr.filter(function (item) {
        return item.offer.price < LOW_PRICE;
      });
    } else if (price.options[3].selected) {
      askedPriceAdvertisements = dataArr.filter(function (item) {
        return item.offer.price > HIGH_PRICE;
      });
    } else {
      askedPriceAdvertisements = dataArr;
    }
    return askedPriceAdvertisements;
  }

  function roomsFilter(dataArr) {
    var askedRoomsAdvertisements;
    for (var i = 0; i < rooms.options.length; i++) {
      if (rooms.options[i].selected) {
        askedRoomsAdvertisements = dataArr.filter(function (item) {
          return item.offer.rooms === (+rooms.options[i].value);
        });
      } else if (rooms.options[0].selected) {
        askedRoomsAdvertisements = dataArr;
      }
    }
    return askedRoomsAdvertisements;
  }

  function guestsFilter(dataArr) {
    var askedGuestsAdvertisements;
    for (var i = 0; i < guests.options.length; i++) {
      if (guests.options[i].selected) {
        askedGuestsAdvertisements = dataArr.filter(function (item) {
          return item.offer.guests === (+guests.options[i].value);
        });
      } else if (guests.options[0].selected) {
        askedGuestsAdvertisements = dataArr;
      }
    }
    return askedGuestsAdvertisements;
  }

  function removePins() {
    var pinElements = tokyoMap.querySelectorAll('.pin');
    for (var i = pinElements.length - 1; i > 0; i--) {
      tokyoMap.removeChild(pinElements[i]);
    }
  }

  function findCheckedFeaturesOnFilterForm() {
    var featuresCheckboxes = filtersForm.querySelectorAll('input');
    var checkedFeaturesOnFilterForm = [];
    for (var i = 0; i < featuresCheckboxes.length; i++) {
      if (featuresCheckboxes[i].checked) {
        checkedFeaturesOnFilterForm.push(featuresCheckboxes[i].value);
      }
    }
    return checkedFeaturesOnFilterForm;
  }

  function filterFeatures(askedFeatures, advertisementsArray) {
    var askedFeaturesAdvertisements = [];
    for (var j = 0; j < advertisementsArray.length; j++) {
      var featuresInAdvertisement = advertisementsArray[j].offer.features;
      var count = 0;
      for (var i = 0; i < askedFeatures.length; i++) {
        if (featuresInAdvertisement.indexOf(askedFeatures[i]) !== -1) {
          count++;
        }
        if (count === askedFeatures.length) {
          askedFeaturesAdvertisements.push(advertisementsArray[j]);
        }
      }
    }
    return askedFeaturesAdvertisements;
  }

  filtersForm.addEventListener('change', function () {
    window.debounce(chooseFilter);
  });

  window.createPinList = createPinList;
})();
