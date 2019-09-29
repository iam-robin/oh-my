import extractRootDomain from './extractRootDomain';
let prevDomain = '';

// get the url and favicon of current tab
export default function getTabInfo(callback) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
    let url = tabs[0].url;
    let rootDomain = extractRootDomain(url);
    let favicon = tabs[0].favIconUrl;

    let websiteInfo = {
      domain: rootDomain,
      favicon: favicon,
      prevDomain: prevDomain,
    };

    // return the websiteInfo object
    callback(websiteInfo);

    // save previous domain to compare with current one (count)
    prevDomain = extractRootDomain(url);
  });
}
