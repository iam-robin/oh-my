import getTabInfo from './functions/getTabInfo';
import saveWebsiteToStorage from './functions/saveWebsiteToStorage';
import saveTimeInStorage from './functions/saveTimeInStorage';

// ================================================================================
// VARIABLES
// ================================================================================

let startTime = 0;
let websiteInfo;

let colorTable = [
  { name: 'cyan', hex: '#5BB2F0' },
  { name: 'blue', hex: '#5E89EC' },
  { name: 'purple', hex: '#B578F0' },
  { name: 'pink', hex: '#F277A2' },
  { name: 'coral', hex: '#FC656D' },
  { name: 'red', hex: '#F0485E' },
  { name: 'orange', hex: '#FDA35B' },
  { name: 'yellow', hex: '#FFD152' },
  { name: 'green', hex: '#59DE9B' },
  { name: 'teal', hex: '#4EC7C7' },
  { name: 'black', hex: '#35495D' },
  { name: 'grey', hex: '#B2BEC3' }
];

// ================================================================================
// EVENTS
// ================================================================================

// on tab switch
chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
  getTabInfo(function(result) {
    websiteInfo = result;
    let time = measureUsageTime();
    saveWebsiteToStorage(result, colorTable).then(() => {
      saveTimeInStorage(result.prevDomain, time);
    });
  });
});

// on tab update
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // only fire once when site is loaded
  if (changeInfo.status === 'complete') {
    getTabInfo(function(result) {
      websiteInfo = result;
      let time = measureUsageTime();
      saveWebsiteToStorage(result, colorTable).then(() => {
        saveTimeInStorage(result.prevDomain, time);
      });
    });
  }
});

// check if chrome window is in focus or idle
chrome.windows.onFocusChanged.addListener(function(window) {
  if (window === chrome.windows.WINDOW_ID_NONE) {
    // browser lost focus
    // get current usageTime and save it to storage
    console.log('browser lost focus');
    let time = measureUsageTime();
    if (websiteInfo) {
      saveTimeInStorage(websiteInfo.domain, time);
    }
    startTime = 0;
  } else {
    // browser get focus
    // restart usageTime tracker
    console.log('browser get focus');
    measureUsageTime();
  }
});

// get message from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.idle === 'true') {
    // get current usageTime and save it to storage
    console.log(sender.tab ? 'idle:' + sender.tab.url : 'from the extension');
    let time = measureUsageTime();
    saveTimeInStorage(websiteInfo.domain, time);
    startTime = 0;
  } else if (request.idle === 'false') {
    // restart usageTime tracker
    console.log(sender.tab ? 'active:' + sender.tab.url : 'from the extension');
    measureUsageTime();
  }
});

// ================================================================================
// FUNCTIONS
// ================================================================================

function measureUsageTime() {
  let endTime;
  let usageTime = 0;

  // if there is a start time track the end of the time and calc the usageTime
  if (startTime !== 0) {
    endTime = Date.now();
    usageTime = endTime - startTime;
  }
  startTime = Date.now();
  return usageTime;
}
