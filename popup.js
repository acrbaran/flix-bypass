
const COOKIE_NAME = 'SecureNetflixId';
const NEW_COOKIE_VALUE = 'SecureNetflixId1';

const autoModeButton = document.getElementById('autoModeButton');
const buttonText = document.getElementById('buttonText');
const statusDiv = document.getElementById('status');
const cookieStateDiv = document.getElementById('cookieState');

function showStatus(message, type = 'success') {
  statusDiv.textContent = message;
  statusDiv.className = 'status show ' + type;
  setTimeout(() => {
    statusDiv.classList.remove('show');
  }, 3000);
}

function updateCookieState(state) {
  cookieStateDiv.textContent = state.toUpperCase();
}

async function toggleAutoMode() {
  const result = await chrome.storage.local.get(['autoMode']);
  const isAutoModeActive = result.autoMode || false;

  if (isAutoModeActive) {
    await chrome.storage.local.set({
      autoMode: false,
      autoCookieName: null,
      autoNewValue: null
    });
    buttonText.textContent = 'Activate Bypass';
    autoModeButton.classList.remove('active');
    updateCookieState('Ready');
    showStatus('Bypass deactivated', 'error');
  } else {
    await chrome.storage.local.set({
      autoMode: true,
      autoCookieName: COOKIE_NAME,
      autoNewValue: NEW_COOKIE_VALUE
    });
    buttonText.textContent = 'Deactivate Bypass';
    autoModeButton.classList.add('active');
    updateCookieState('Active');
    showStatus('Bypass activated successfully!', 'success');
  }
}

autoModeButton.addEventListener('click', toggleAutoMode);

document.addEventListener('DOMContentLoaded', async () => {
  chrome.storage.local.get(['autoMode'], (result) => {
    if (result.autoMode) {
      buttonText.textContent = 'Deactivate Bypass';
      autoModeButton.classList.add('active');
      updateCookieState('Active');
    } else {
      buttonText.textContent = 'Activate Bypass';
      autoModeButton.classList.remove('active');
      updateCookieState('Ready');
    }
  });
});
