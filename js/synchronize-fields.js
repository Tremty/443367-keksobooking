'use strict';

(function () {
  var notice = document.querySelector('.notice');
  var noticeTimeIn = notice.querySelector('#timein');
  var noticeTimeOut = notice.querySelector('#timeout');
  var noticeType = notice.querySelector('#type');
  var noticePrice = notice.querySelector('#price');
  var noticeData = {
    noticeTimeInValues: ['12:00', '13:00', '14:00'],
    noticeTimeOutValues: ['12:00', '13:00', '14:00'],
    minPrices: [0, 1000, 5000, 10000],
    types: ['bungalo', 'flat', 'house', 'palace']
  };

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

  function synchronizeFields(evt, logicFunc, selectedFieldValues, dependentFieldValues, dependentField) {
    logicFunc(evt, selectedFieldValues, dependentFieldValues, dependentField);
  }

  function synchronizeFieldsTimeIn(evt) {
    synchronizeFields(evt, searchValueForTimeEvt, noticeData.noticeTimeInValues, noticeData.noticeTimeOutValues, noticeTimeOut);
  }

  function synchronizeFieldsTimeOut(evt) {
    synchronizeFields(evt, searchValueForTimeEvt, noticeData.noticeTimeOutValues, noticeData.noticeTimeInValues, noticeTimeIn);
  }

  function synchronizeFieldsSetMinPrice(evt) {
    synchronizeFields(evt, setValueForMinPriceEvt, noticeData.types, noticeData.minPrices, noticePrice);
  }

  function synchronizeFieldsMinPrice(evt) {
    synchronizeFields(evt, searchValueForMinPriceEvt, noticeData.types, noticeData.minPrices, noticePrice);
  }
})();
