'use strict';

(function () {
  var notice = document.querySelector('.notice');
  // var noticeTimeIn = notice.querySelector('#timein');
  // var noticeTimeOut = notice.querySelector('#timeout');
  // var noticeType = notice.querySelector('#type');
  // var noticePrice = notice.querySelector('#price');
  var noticeRooms = notice.querySelector('#room_number');
  var noticeCapacity = notice.querySelector('#capacity');
  // var noticeTitle = notice.querySelector('#title');
  // var noticeAddress = notice.querySelector('#address');
  var inputs = notice.querySelectorAll('input');


  noticeRooms.addEventListener('change', changeCapacityFromRooms);

  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].validity.valid) {
      inputs[i].style.border = '1px solid red';
    }
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


})();
