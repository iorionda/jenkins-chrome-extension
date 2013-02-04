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
      alert('markDirty');
      showSaveStatus(false);
    },

    init : function () {
      jenkinsUrlTextbox = document.getElementById("jenkins-url");
      pollIntervallTextbox = document.getElementById("poll-intervall");
      saveButton = document.getElementById("save-button");
      saveStatus = document.getElementById("save-status");

      display();
    }
  };
}(jenkins.conf);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('body').addEventListener('load', jenkins.options.init(), false);
  // document.getElementById('save-button').addEventListener('click', jenkins.options.save(), false);
  // document.getElementById('cancel-button').addEventListener('click', jenkins.options.init(), false);
  // document.getElementById('jenkins-url').addEventListener('input', jenkins.options.markDirty(), false);
  // document.getElementById('poll-intervall').addEventListener('input', jenkins.options.markDirty(), false);
  // document.getElementById('small').addEventListener('change', jenkins.options.markDirty(), false);
  // document.getElementById('medium').addEventListener('click', jenkins.options.markDirty(), false);
  // document.getElementById('large').addEventListener('click', jenkins.options.markDirty(), false);
  // document.getElementById('blue').addEventListener('click', jenkins.options.markDirty(), false);
  // document.getElementById('green').addEventListener('click', jenkins.options.markDirty(), false);
}, false);


