'use strict';

(function () {

  window.createPinList = function (dataArr) {
    var pinList = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();
    var pinHeight = 75;
    var pinWidth = 56;
    for (var i = 0; i < dataArr.length; i++) {
      var pinElement = document.createElement('div');
      var fullPinList = document.querySelector('.pin');
      var pinAvatar = document.createElement('img');
      pinElement.className = 'pin';
      pinElement.tabIndex = 0;
      pinElement.setAttribute('data-number', i);
      pinElement.addEventListener('click', window.openHandler);
      pinElement.addEventListener('keydown', window.openHandler);
      pinElement.style.left = dataArr[i].location.x - pinWidth / 2 + 'px';
      pinElement.style.top = dataArr[i].location.y - pinHeight + 'px';
      pinAvatar.src = dataArr[i].author.avatar;
      pinAvatar.className = 'rounded';
      pinAvatar.width = '40';
      pinAvatar.height = '40';
      pinElement.appendChild(pinAvatar);
      fragment.appendChild(pinElement);
    }
    pinList.appendChild(fragment);
    fullPinList.appendChild(fragment);
  };

  var filtersForm = document.querySelector('.tokyo__filters');
  var type = filtersForm.querySelector('#housing_type');
  var price = filtersForm.querySelector('#housing_price');
  var rooms = filtersForm.querySelector('#housing_room-number');
  var guests = filtersForm.querySelector('#housing_guests-number');

  filtersForm.addEventListener('change', function () {
    window.debounce(chooseFilter);
  });

  function chooseFilter(dataArr) {
    removePins();
    dataArr = window.newAdvertisementsArr;
    var askedAdvertisements = [];
    var askedTypeAdvertisements = typeFilter(dataArr);
    var askedPriceAdvertisements = priceFilter(askedTypeAdvertisements);
    var askedRoomsAdvertisements = roomsFilter(askedPriceAdvertisements);
    var askedGuestsAdvertisements = guestsFilter(askedRoomsAdvertisements);
    var askedFeatures = findCheckedFeaturesOnFilterForm();

    if (askedFeatures.length === 0) {
      askedAdvertisements = askedGuestsAdvertisements;
    } else {
      askedAdvertisements = filterFeatures(askedFeatures, askedGuestsAdvertisements);
    }
    window.createPinList(askedAdvertisements);
    window.showAdvertisement(askedAdvertisements[0]);
    window.askedAdvertisements = askedAdvertisements;
  }

  function typeFilter(dataArr) {
    var askedTypeAdvertisements;
    for (var i = 0; i < type.options.length; i++) {
      if (type.options[i].selected === true) {
        askedTypeAdvertisements = dataArr.filter(function (it) {
          return it.offer.type === type.options[i].value;
        });
      } else if (type.options[0].selected === true) {
        askedTypeAdvertisements = dataArr;
      }
    }
    return askedTypeAdvertisements;
  }

  function priceFilter(dataArr) {
    var askedPriceAdvertisements;
    if (price.options[1].selected === true) {
      askedPriceAdvertisements = dataArr.filter(function (it) {
        return it.offer.price >= 10000 && it.offer.price <= 50000;
      });
    } else if (price.options[2].selected === true) {
      askedPriceAdvertisements = dataArr.filter(function (it) {
        return it.offer.price < 10000;
      });
    } else if (price.options[3].selected === true) {
      askedPriceAdvertisements = dataArr.filter(function (it) {
        return it.offer.price > 50000;
      });
    } else {
      askedPriceAdvertisements = dataArr;
    }
    return askedPriceAdvertisements;
  }

  function roomsFilter(dataArr) {
    var askedRoomsAdvertisements;
    for (var i = 0; i < rooms.options.length; i++) {
      if (rooms.options[i].selected === true) {
        askedRoomsAdvertisements = dataArr.filter(function (it) {
          return it.offer.rooms === (+rooms.options[i].value);
        });
      } else if (rooms.options[0].selected === true) {
        askedRoomsAdvertisements = dataArr;
      }
    }
    return askedRoomsAdvertisements;
  }

  function guestsFilter(dataArr) {
    var askedGuestsAdvertisements;
    for (var i = 0; i < guests.options.length; i++) {
      if (guests.options[i].selected === true) {
        askedGuestsAdvertisements = dataArr.filter(function (it) {
          return it.offer.guests === (+guests.options[i].value);
        });
      } else if (guests.options[0].selected === true) {
        askedGuestsAdvertisements = dataArr;
      }
    }
    return askedGuestsAdvertisements;
  }

  function removePins() {
    var pinList = document.querySelector('.tokyo__pin-map');
    var pinElements = document.querySelectorAll('.pin');
    for (var i = pinElements.length - 1; i > 0; i--) {
      pinList.removeChild(pinElements[i]);
    }
  }

  function findCheckedFeaturesOnFilterForm() {
    var featuresCheckboxes = filtersForm.querySelectorAll('input');
    var checkedFeaturesOnFilterForm = [];
    for (var i = 0; i < featuresCheckboxes.length; i++) {
      if (featuresCheckboxes[i].checked === true) {
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
})();
