'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 1000;
  var lastTimeout;

  function debounce(updateAdvertisements) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(updateAdvertisements, DEBOUNCE_INTERVAL);
  }

  window.debounce = debounce;
})();
