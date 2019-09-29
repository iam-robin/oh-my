import moment from 'moment';

// send message to content.js if current tab reached the limit
export default function sendLimitToContent(result) {
  let today = moment().format('YYYY-MM-DD');
  let websites = JSON.parse(localStorage.getItem(today));
  let limits = JSON.parse(localStorage.getItem('limits'));

  if (websites && limits) {
    for (let i = 0; i < websites.length; i++) {
      for (let x = 0; x < limits.length; x++) {
        if (websites[i].domain === limits[x].domain && limits[x].domain === result.domain) {
          let usageTime = websites[i].time;
          let limitTime = limits[x].timeLimit * 60 * 1000;
          let timePercentage = (100 / limitTime) * usageTime;

          if (timePercentage >= 100) {
            // send message
            console.log('time limit reached for: ' + websites[i].domain);
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, { timeLimitReached: 'true' });
            });
          }

          let siteViews = websites[i].count;
          let limitViews = limits[x].viewsLimit;
          let viewsPercentage = (100 / limitViews) * siteViews;

          if (viewsPercentage >= 100) {
            // send message
            console.log('views limit reached for: ' + websites[i].domain);
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, { viewsLimitReached: 'true' });
            });
          }
        }
      }
    }
  }
}
