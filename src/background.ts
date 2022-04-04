type Stats = {
  messages: number;
  minutesWatched: number;
};

const defaultVal: Stats = {
  messages: 0,
  minutesWatched: 0,
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'messageSent') {
    const { channel } = request;
    chrome.storage.sync.get([channel], (res) => {
      const stats = res[channel] || defaultVal;
      stats.messages++;
      chrome.storage.sync.set({ [channel]: stats });
    });
  } else if (request.message === 'addWatchTime') {
    const { channel, minutes } = request;
    chrome.storage.sync.get([channel], (res) => {
      const stats = res[channel] || defaultVal;
      stats.minutesWatched += minutes;
      chrome.storage.sync.set({ [channel]: stats });
    });
  }
  sendResponse();
});
