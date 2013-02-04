jenkins.options = function(conf) {
  var jenkinsUrlTextbox;
  var pollIntervallTextbox;
  var saveButton;
  var saveStatus;
  var iconSize;

  function showSaveStatus(show) {
    saveStatus.style.display = show ? '' : "none";
    saveButton.disabled = show;
  }

  function display() {
    jenkinsUrlTextbox.value = conf.jenkinsURL();
    pollIntervallTextbox.value = conf.pollIntervall();
    document.getElementById(conf.iconSize()).checked = true;
    document.getElementById(conf.successColor()).checked = true;
    saveButton.disabled = true;
  }

  function getIconSize() {
    if (document.optionForm.small.checked) {
      return document.optionForm.small.value;
    } if (document.optionForm.medium.checked) {
      return document.optionForm.medium.value;
    } if (document.optionForm.large.checked) {
      return document.optionForm.large.value;
    }
  }

  function getSuccessColor() {
    if (document.optionForm.blue.checked) {
      return document.optionForm.blue.value;
    } if (document.optionForm.green.checked) {
      return document.optionForm.green.value;
    }
  }

  return {
    save : function () {
      alert("save");
      conf.set({
        jenkinsURL : jenkinsUrlTextbox.value,
        pollIntervall: pollIntervallTextbox.value,
        iconSize: getIconSize(),
        successColor: getSuccessColor()
      });

      showSaveStatus(true);
      display();
      chrome.extension.getBackgroundPage().jenkins.init();
    },

    markDirty : function () {
      showSaveStatus(false);
    },

    init : function () {
      alert("init");
      jenkinsUrlTextbox = document.getElementById("jenkins-url");
      pollIntervallTextbox = document.getElementById("poll-intervall");
      saveButton = document.getElementById("save-button");
      saveStatus = document.getElementById("save-status");

      display();
    }
  };
}(jenkins.conf);

document.querySelector('body').addEventListener('load', jenkins.options.init());
document.getElementById('save-button').addEventListener('click', jenkins.options.save());
document.getElementById('cancel-button').addEventListener('click', jenkins.options.init());
document.getElementById('jenkins-url').addEventListener('input', jenkins.options.markDirty());
document.getElementById('poll-intervall').addEventListener('input', jenkins.options.markDirty());
document.getElementById('small').addEventListener('change', jenkins.options.markDirty());
document.getElementById('medium').addEventListener('change', jenkins.options.markDirty());
document.getElementById('large').addEventListener('change', jenkins.options.markDirty());
document.getElementById('blue').addEventListener('change', jenkins.options.markDirty());
document.getElementById('green').addEventListener('change', jenkins.options.markDirty());
