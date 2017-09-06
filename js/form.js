'use strict';

(function () {
  var notice = document.querySelector('.notice');
  // var noticeTimeIn = notice.querySelector('#timein');
  // var noticeTimeOut = notice.querySelector('#timeout');
  // var noticeType = notice.querySelector('#type');
  // var noticePrice = notice.querySelector('#price');
  // var minPriceForBungalo = 0;
  // var minPriceForFlat = 1000;
  // var minPriceForHouse = 5000;
  // var minPriceForPalace = 10000;
  var noticeRooms = notice.querySelector('#room_number');
  var noticeCapacity = notice.querySelector('#capacity');
  var inputs = notice.querySelectorAll('input');

  // noticeTimeIn.addEventListener('change', changeTimeIn);
  // noticeTimeOut.addEventListener('change', changeTimeOut);
  // noticeType.addEventListener('change', changePriceFromType);
  noticeRooms.addEventListener('change', changeCapacityFromRooms);

  // function changeTimeIn(event) {
  //   noticeTimeOut.value = event.target.value;
  // }
  //
  // function changeTimeOut(event) {
  //   noticeTimeIn.value = event.target.value;
  // }

  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].validity.valid) {
      inputs[i].style.border = '1px solid red';
    }
  }

  // function changePriceFromType(event) {
  //   if (event.target.value === 'bungalo') {
  //     noticePrice.setAttribute('min', minPriceForBungalo);
  //     noticePrice.value = minPriceForBungalo;
  //   } else if (event.target.value === 'flat') {
  //     noticePrice.setAttribute('min', minPriceForFlat);
  //     noticePrice.value = minPriceForFlat;
  //   } else if (event.target.value === 'house') {
  //     noticePrice.setAttribute('min', minPriceForHouse);
  //     noticePrice.value = minPriceForHouse;
  //   } else if (event.target.value === 'palace') {
  //     noticePrice.setAttribute('min', minPriceForPalace);
  //     noticePrice.value = minPriceForPalace;
  //   }
  // }

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
})();
