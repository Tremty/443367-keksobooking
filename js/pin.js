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
      var pin = document.createElement('div');
      var fullPinList = document.querySelector('.pin');
      var pinAvatar = document.createElement('img');

      window.map.addClickHandlerForPin(pin);
      window.map.addButtonHandlerForPin(pin);
      pin.classList.add('pin');
      pin.tabIndex = 0;
      pin.dataset.number = i;
      pin.style.left = dataArr[i].location.x - PIN_WIDTH / 2 + 'px';
      pin.style.top = dataArr[i].location.y - PIN_HEIGHT + 'px';

      pinAvatar.src = dataArr[i].author.avatar;
      pinAvatar.classList.add('rounded');
      pinAvatar.width = PIN_AVATAR_SIZE;
      pinAvatar.height = PIN_AVATAR_SIZE;
      pin.appendChild(pinAvatar);
      fragment.appendChild(pin);
    }
    tokyoMap.appendChild(fragment);
    fullPinList.appendChild(fragment);
  }

  function formFilterHandler(dataArr) {
    dataArr = window.newAdvertisementsArr;
    var askedTypeAdvertisements = typeFilter(dataArr, type);
    var askedPriceAdvertisements = priceFilter(askedTypeAdvertisements);
    var askedRoomsAdvertisements = roomsFilter(askedPriceAdvertisements, rooms);
    var askedGuestsAdvertisements = guestsFilter(askedRoomsAdvertisements, guests);
    var askedFeatures = findCheckedFeaturesOnFilterForm();
    removePins();
    var askedAdvertisements = askedFeatures.length === 0 ? askedGuestsAdvertisements : filterFeatures(askedFeatures, askedGuestsAdvertisements);
    window.createPinList(askedAdvertisements);
    window.map.closeModal();
    window.askedAdvertisements = askedAdvertisements;
  }

  function typeFilter(dataArr, filterValue) {
    var filteredAdvertisements = dataArr;
    if (!filterValue.options[0].selected) {
      filteredAdvertisements = dataArr.filter(function (item) {
        return filterValue.value === item.offer.type;
      });
    }
    return filteredAdvertisements;
  }

  function roomsFilter(dataArr, filterValue) {
    var askedRoomsAdvertisements = dataArr;
    if (!filterValue.options[0].selected) {
      askedRoomsAdvertisements = dataArr.filter(function (item) {
        return item.offer.rooms === (+filterValue.value);
      });
    }
    return askedRoomsAdvertisements;
  }

  function guestsFilter(dataArr, filterValue) {
    var askedGuestsAdvertisements = dataArr;
    if (!filterValue.options[0].selected) {
      askedGuestsAdvertisements = dataArr.filter(function (item) {
        return item.offer.guests === (+filterValue.value);
      });
    }
    return askedGuestsAdvertisements;
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
    window.debounce(formFilterHandler);
  });

  window.createPinList = createPinList;
})();
