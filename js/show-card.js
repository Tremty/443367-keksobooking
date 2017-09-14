'use strict';

(function () {
  window.showAdvertisement = function (selectedArray) {
    var dialogPanel = document.querySelector('.dialog__panel');
    var dialogTitle = document.querySelector('.dialog__title');
    var dialogPanelAvatar = dialogTitle.querySelector('img');
    dialogPanel.parentElement.replaceChild(window.createAdvertisement(selectedArray), dialogPanel);
    dialogPanelAvatar.src = selectedArray.author.avatar;
  };
})();
