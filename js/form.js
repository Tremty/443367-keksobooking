'use strict';

(function () {
  var MIN_LENGTH = 30;
  var notice = document.querySelector('.notice');
  var noticeTimeIn = notice.querySelector('#timein');
  var noticeTimeOut = notice.querySelector('#timeout');
  var noticeType = notice.querySelector('#type');
  var noticePrice = notice.querySelector('#price');
  var noticeRooms = notice.querySelector('#room_number');
  var noticeCapacity = notice.querySelector('#capacity');
  var noticeTitle = notice.querySelector('#title');
  var inputs = notice.querySelectorAll('input');
  var textarea = notice.querySelector('textarea');
  var featuresBlock = notice.querySelector('#features');
  var formFeatures = featuresBlock.querySelectorAll('input');

  function addCheckValidityForInputs() {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', inputValidationHandler);
    }
  }

  function inputValidationHandler(evt) {
    var target = evt.target;
    target.style.border = target.validity.valid ? '1px solid #d9d9d3' : '2px solid red';
  }

  function selectCapacityHandler(evt) {
    switch (evt.target.value) {
      case '100':
        noticeCapacity.value = 0;
        noticeCapacity.children[2].classList.add('hidden');
        noticeCapacity.children[1].classList.add('hidden');
        noticeCapacity.children[0].classList.add('hidden');
        noticeCapacity.children[3].classList.remove('hidden');
        break;
      case '1':
        noticeCapacity.value = 1;
        noticeCapacity.children[3].classList.add('hidden');
        noticeCapacity.children[1].classList.add('hidden');
        noticeCapacity.children[0].classList.add('hidden');
        noticeCapacity.children[2].classList.remove('hidden');
        break;
      case '2':
        noticeCapacity.value = 1;
        noticeCapacity.children[3].classList.add('hidden');
        noticeCapacity.children[0].classList.add('hidden');
        noticeCapacity.children[2].classList.remove('hidden');
        noticeCapacity.children[1].classList.remove('hidden');
        break;
      case '3':
        noticeCapacity.value = 1;
        noticeCapacity.children[3].classList.add('hidden');
        noticeCapacity.children[2].classList.remove('hidden');
        noticeCapacity.children[1].classList.remove('hidden');
        noticeCapacity.children[0].classList.remove('hidden');
        break;
    }
  }

  noticeTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_LENGTH) {
      target.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
    } else {
      target.setCustomValidity('');
    }
  });

  function resetDataInForm() {
    var priceValue = 1000;

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }

    for (var j = 0; j < formFeatures.length; j++) {
      formFeatures[j].checked = false;
    }

    window.setValueForPinMain();

    textarea.value = '';
    noticeTimeIn.value = noticeTimeIn.options[0].value;
    noticeTimeOut.value = noticeTimeOut.options[0].value;
    noticeRooms.value = noticeRooms.options[2].value;
    noticeCapacity.value = noticeCapacity.options[2].value;
    noticeType.value = noticeType.options[0].value;
    noticePrice.value = priceValue;
    noticePrice.min = priceValue;
  }

  noticeRooms.addEventListener('change', selectCapacityHandler);

  addCheckValidityForInputs();

  window.resetDataInForm = resetDataInForm;
})();
