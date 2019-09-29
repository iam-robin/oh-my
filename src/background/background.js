import getTabInfo from './functions/getTabInfo';
import saveWebsiteToStorage from './functions/saveWebsiteToStorage';
import saveTimeInStorage from './functions/saveTimeInStorage';
import saveBehaviorInStorage from './functions/saveBehaviorInStorage';
import sendLimitToContent from './functions/sendLimitToContent';

// ================================================================================
// VARIABLES
// ================================================================================

let startTime = 0;
let websiteInfo;

// usage behavior
let usageBehaviorSum = {
  clicks: 0,
  scroll: 0,
};

let colorTable = [
  { name: 'darkblue', hex: '#4E8BD9' },
  { name: 'blue', hex: '#609DE9' },
  // { name: 'lightblue', hex: '#89BEFD' },
  { name: 'darkteal', hex: '#43AFD8' },
  { name: 'teal', hex: '#55C0E6' },
  // { name: 'lightteal', hex: '#8DDBF7' },
  { name: 'darkpurple', hex: '#967ED9' },
  // { name: 'purple', hex: '#AC94EA' },
  // { name: 'lightpurple', hex: '#CFBDFC' },
  { name: 'darkpink', hex: '#D672AC' },
  // { name: 'pink', hex: '#EA8ABF' },
  // { name: 'lightpink', hex: '#FDA9DA' },
  { name: 'darkred', hex: '#D84756' },
  { name: 'red', hex: '#EB5767' },
  // { name: 'lightred', hex: '#FD9BA5' },
  // { name: 'darkorange', hex: '#E75844' },
  { name: 'orange', hex: '#F96F57' },
  // { name: 'lightorange', hex: '#FDA695' },
  { name: 'darkyellow', hex: '#F5BA4F' },
  { name: 'yellow', hex: '#FECE60' },
  // { name: 'lightyellow', hex: '#FEDE91' },
  { name: 'darkgreen', hex: '#8EC059' },
  { name: 'green', hex: '#A1D36E' },
  // { name: 'lightgreen', hex: '#C2E699' },
  { name: 'darkmint', hex: '#3FBA9B' },
  { name: 'mint', hex: '#4FCEAE' },
  // { name: 'lightmint', hex: '#99E7D2' },
  { name: 'darkcyan', hex: '#47BEC3' },
  { name: 'cyan', hex: '#54CBD1' },
  // { name: 'black', hex: '#2C3135' },
  { name: 'darkgrey', hex: '#434A54' },
  // { name: 'grey', hex: '#AAB2BD' },
  // { name: 'lightgrey', hex: '#EDEFF3' },
  // { name: 'white', hex: '#FAFBFD' },
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
      saveBehaviorInStorage(result.prevDomain, usageBehaviorSum);
      sendLimitToContent(result);

      // reset usage behavior
      usageBehaviorSum.clicks = 0;
      usageBehaviorSum.scroll = 0;
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
        saveBehaviorInStorage(result.prevDomain, usageBehaviorSum);
        sendLimitToContent(result);

        // reset usage behavior
        usageBehaviorSum.clicks = 0;
        usageBehaviorSum.scroll = 0;
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

  // get usage Behavior message from content
  if (request.usageBehavior) {
    // add the values up
    usageBehaviorSum.clicks += request.usageBehavior.clicks;
    usageBehaviorSum.scroll += request.usageBehavior.scroll;
    console.log('clicks sum: ' + usageBehaviorSum.clicks);
    console.log('clicks added: ' + request.usageBehavior.clicks);
    console.log('scroll: ' + usageBehaviorSum.scroll);
    console.log('scroll added: ' + request.usageBehavior.scroll);
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
