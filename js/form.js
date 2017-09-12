'use strict';

(function () {
  var notice = document.querySelector('.notice');
  var noticeTimeIn = notice.querySelector('#timein');
  var noticeTimeOut = notice.querySelector('#timeout');
  var noticeType = notice.querySelector('#type');
  var noticePrice = notice.querySelector('#price');
  var noticeRooms = notice.querySelector('#room_number');
  var noticeCapacity = notice.querySelector('#capacity');
  var inputs = notice.querySelectorAll('input');
  var textarea = notice.querySelector('textarea');
  var featuresBlock = notice.querySelector('#features');
  var formFeatures = featuresBlock.querySelectorAll('input');
  var priceValue = 1000;

  noticeRooms.addEventListener('change', changeCapacityFromRooms);
  addEventForInputs();

  function addEventForInputs() {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', checkValidity);
    }
  }

  function checkValidity(evt) {
    if (!evt.target.validity.valid) {
      evt.target.style.border = '2px solid red';
    } else if (evt.target.validity.valid) {
      evt.target.style.border = '1px solid #d9d9d3';
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

  window.reset = function () {
    for (var j = 0; j < inputs.length; j++) {
      inputs[j].value = '';
    }
    textarea.value = '';
    noticeTimeIn.value = noticeTimeIn.options[0].value;
    noticeTimeOut.value = noticeTimeOut.options[0].value;
    noticeRooms.value = noticeRooms.options[2].value;
    noticeCapacity.value = noticeCapacity.options[2].value;
    noticeType.value = noticeType.options[0].value;
    noticePrice.value = priceValue;

    for (j = 0; j < formFeatures.length; j++) {
      formFeatures[j].checked = false;
    }
  };
})();
