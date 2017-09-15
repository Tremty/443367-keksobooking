'use strict';

(function () {
  function showAdvertisement(selectedArray) {
    var modalDialog = document.querySelector('.dialog');
    var dialogPanel = modalDialog.querySelector('.dialog__panel');
    var dialogTitle = modalDialog.querySelector('.dialog__title');
    var dialogPanelAvatar = dialogTitle.querySelector('img');
    dialogPanel.parentElement.replaceChild(window.createAdvertisement(selectedArray), dialogPanel);
    dialogPanelAvatar.src = selectedArray.author.avatar;
  }

  window.showAdvertisement = showAdvertisement;
})();
