'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 30000;
  var lastTimeout;

  window.debounce = function (updateAdvertisements) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(updateAdvertisements, DEBOUNCE_INTERVAL);
  };
})();
