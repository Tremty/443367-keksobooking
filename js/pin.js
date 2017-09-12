'use strict';

(function () {

  window.createPinList = function (dataArr) {
    var pinList = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();
    var pinHeight = 75;
    var pinWidth = 56;
    for (var i = 0; i < dataArr.length; i++) {
      var pinElement = document.createElement('div');
      pinElement.className = 'pin';
      pinElement.tabIndex = 0;
      pinElement.setAttribute('data-number', i);
      pinElement.addEventListener('click', window.openHandler);
      pinElement.addEventListener('keydown', window.openHandler);
      pinElement.style.left = dataArr[i].location.x - pinWidth / 2 + 'px';
      pinElement.style.top = dataArr[i].location.y - pinHeight + 'px';
      var fullPinList = document.querySelector('.pin');
      var pinAvatar = document.createElement('img');
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

  filtersForm.addEventListener('change', chooseFilter);


  function chooseFilter(dataArr) {
    removePins();
    dataArr = window.newAdvertisementsArr;
    var askedTypeAdvertisements = typeFilter(dataArr);
    var askedPriceAdvertisements = priceFilter(askedTypeAdvertisements);
    var askedRoomsAdvertisements = roomsFilter(askedPriceAdvertisements);
    var askedGuestsAdvertisements = guestsFilter(askedRoomsAdvertisements);
    var askedFeaturesAdvertisements = filterFeatures(findCheckedFeaturesOnFilterForm(), askedGuestsAdvertisements);

    window.createPinList(askedFeaturesAdvertisements);
    window.showAdvertisement(askedFeaturesAdvertisements[0]);
    window.askedAdvertisements = askedFeaturesAdvertisements;
  }

  function typeFilter(dataArr) {
    dataArr = window.newAdvertisementsArr;
    var askedTypeAdvertisements;
    if (type.options[1].selected === true) {
      askedTypeAdvertisements = dataArr.filter(function (it) {
        return it.offer.type === type.options[1].value;
      });
    } else if (type.options[2].selected === true) {
      askedTypeAdvertisements = dataArr.filter(function (it) {
        return it.offer.type === type.options[2].value;
      });
    } else if (type.options[3].selected === true) {
      askedTypeAdvertisements = dataArr.filter(function (it) {
        return it.offer.type === type.options[3].value;
      });
    } else {
      askedTypeAdvertisements = dataArr;
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

    if (rooms.options[1].selected === true) {
      askedRoomsAdvertisements = dataArr.filter(function (it) {
        return it.offer.rooms === (+rooms.options[1].value);

      });
    } else if (rooms.options[2].selected === true) {
      askedRoomsAdvertisements = dataArr.filter(function (it) {
        return it.offer.rooms === (+rooms.options[2].value);
      });
    } else if (rooms.options[3].selected === true) {
      askedRoomsAdvertisements = dataArr.filter(function (it) {
        return it.offer.rooms === (+rooms.options[3].value);
      });
    } else {
      askedRoomsAdvertisements = dataArr;
    }
    return askedRoomsAdvertisements;
  }

  function guestsFilter(dataArr) {
    var askedGuestsAdvertisements;

    if (guests.options[1].selected === true) {
      askedGuestsAdvertisements = dataArr.filter(function (it) {
        return it.offer.guests === (+guests.options[1].value);
      });
    } else if (guests.options[2].selected === true) {
      askedGuestsAdvertisements = dataArr.filter(function (it) {
        return it.offer.guests === (+guests.options[2].value);
      });
    } else {
      askedGuestsAdvertisements = dataArr;
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
      for (var i = 0; i < featuresInAdvertisement.length; i++) {
        if (featuresInAdvertisement[i] === askedFeatures[i]) {
          askedFeaturesAdvertisements.push(advertisementsArray[j]);
        }
      }
    }
    return askedFeaturesAdvertisements;
  }

})();
