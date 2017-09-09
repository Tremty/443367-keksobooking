'use strict';

(function () {
  window.showAdvertisement = function (selectedArray) {
    var dialogPanel = document.querySelector('.dialog__panel');
    dialogPanel.parentElement.replaceChild(window.createAdvertisement(selectedArray), dialogPanel);

    var dialogTitle = document.querySelector('.dialog__title');
    var dialogPanelAvatar = dialogTitle.querySelector('img');
    dialogPanelAvatar.src = selectedArray.author.avatar;
  };
})();
