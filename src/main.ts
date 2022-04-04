const INPUT_SELECTOR = '[data-test-selector="chat-input"]';
const BUTTON_SELECTOR = '[data-a-target="chat-send-button"]';
const VIDEO_SELECTOR = 'video';

function getChannelName() {
  const path = window.location.pathname;
  const channelName = path.substring(path.lastIndexOf('/') + 1);
  return channelName;
}

function onMessageSent() {
  const channelName = getChannelName();
  const payload = {
    message: 'messageSent',
    channel: channelName,
  };
  chrome.runtime.sendMessage(payload);
}

function initInput(inputElement: Element) {
  inputElement.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') onMessageSent();
  });
  console.debug('Initialized input listener');
}

function initButton(buttonElement: Element) {
  buttonElement.addEventListener('click', onMessageSent);
  console.debug('Initialized button listener');
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const el = node as Element;

      const input = el.querySelector(INPUT_SELECTOR);
      if (input) initInput(input);

      const button = el.querySelector(BUTTON_SELECTOR);
      if (button) initButton(button);
    });
  });
});

(() => {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  setInterval(() => {
    const video = document.querySelector<HTMLVideoElement>(VIDEO_SELECTOR);
    if (!video || !video.hasAttribute('src') || video.paused) return;
    const payload = {
      message: 'addWatchTime',
      channel: getChannelName(),
      minutes: 1,
    };
    chrome.runtime.sendMessage(payload);
  }, 1000 * 60);
})();
