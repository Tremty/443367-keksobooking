'use strict';

(function () {
  var notice = document.querySelector('.notice');
  var noticeTimeIn = notice.querySelector('#timein');
  var noticeTimeOut = notice.querySelector('#timeout');
  var noticeTimeInValues = ['12:00', '13:00', '14:00'];
  var noticeTimeOutValues = ['12:00', '13:00', '14:00'];
  var noticeType = notice.querySelector('#type');
  var noticePrice = notice.querySelector('#price');
  var minPrices = [0, 1000, 5000, 10000];
  var types = ['bungalo', 'flat', 'house', 'palace'];

  noticeTimeIn.addEventListener('change', synchronizeFieldsTimeIn);
  noticeTimeOut.addEventListener('change', synchronizeFieldsTimeOut);
  noticeType.addEventListener('change', synchronizeFieldsMinPrice);
  noticeType.addEventListener('change', synchronizeFieldsSetMinPrice);

  function searchValueWithoutEvt(targetElementValue, selectedFieldValues, dependentFieldValues, dependentField) {
    var index = selectedFieldValues.indexOf(targetElementValue);
    dependentField.value = dependentFieldValues[index];
  }

  function searchValueForTimeEvt(evt, selectedFieldValues, dependentFieldValues, dependentField) {
    var targetElementValue = evt.target.value;
    searchValueWithoutEvt(targetElementValue, selectedFieldValues, dependentFieldValues, dependentField);
  }

  function searchValueForMinPriceEvt(evt, selectedFieldValues, dependentFieldValues, dependentField) {
    var targetElementValue = evt.target.value;
    searchValueWithoutEvt(targetElementValue, selectedFieldValues, dependentFieldValues, dependentField);
  }

  function setValueForMinPriceEvt(evt, selectedFieldValues, dependentFieldValues, dependentField) {
    var targetElementValue = evt.target.value;
    var index = selectedFieldValues.indexOf(targetElementValue);
    dependentField.setAttribute('min', dependentFieldValues[index]);
  }

  function sync(evt, logicFunc, selectedFieldValues, dependentFieldValues, dependentField) {
    logicFunc(evt, selectedFieldValues, dependentFieldValues, dependentField);
  }

  function synchronizeFieldsTimeIn(evt) {
    sync(evt, searchValueForTimeEvt, noticeTimeInValues, noticeTimeOutValues, noticeTimeOut);
  }

  function synchronizeFieldsTimeOut(evt) {
    sync(evt, searchValueForTimeEvt, noticeTimeOutValues, noticeTimeInValues, noticeTimeIn);
  }

  function synchronizeFieldsSetMinPrice(evt) {
    sync(evt, setValueForMinPriceEvt, types, minPrices, noticePrice);
  }

  function synchronizeFieldsMinPrice(evt) {
    sync(evt, searchValueForMinPriceEvt, types, minPrices, noticePrice);
  }


  // function searchValueWithoutEvt(targetElementValue, selectedFieldValues, dependentFieldValues, dependentField) {
  //   var index = selectedFieldValues.indexOf(targetElementValue);
  //   dependentField.value = dependentFieldValues[index];
  // }
  //
  // function searchValueForTimeEvt(evt, selectedFieldValues, dependentFieldValues, dependentField, useFunction) {
  //   var targetElementValue = evt.target.value;
  //   useFunction(targetElementValue, selectedFieldValues, dependentFieldValues, dependentField);
  // }
  // function synchronizeFieldsTimeIn(evt) {
  //   searchValueForTimeEvt(evt, noticeTimeInValues, noticeTimeOutValues, noticeTimeOut, searchValueWithoutEvt);
  // }
  //
  // function synchronizeFieldsTimeOut(evt) {
  //   searchValueForTimeEvt(evt, noticeTimeOutValues, noticeTimeInValues, noticeTimeIn, searchValueWithoutEvt);
  // }
  // function synchronizeFieldsSetMinPrice(evt) {
  //   setValueForMinPriceEvt(evt, types, minPrices, noticePrice);
  // }
  // function synchronizeFieldsMinPrice(evt) {
  //   searchValueForMinPriceEvt(evt, types, minPrices, noticePrice);
  // }
})();
