import detectUsageBehavior from './functions/detectUsageBehavior';

// ================================================================================
// VARIABLES
// ================================================================================

let timeout;
let idleDuration = 120000; // in ms
let isIdle = false;

// ================================================================================
// FUNCTIONS
// ================================================================================

detectUsageBehavior();

// ================================================================================
// EVENTS
// ================================================================================

// detect if html video is playing
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function() {
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  },
});

// check if browser is in focus -> start timout
document.onmousemove = function() {
  if (isIdle) {
    isIdle = false;
    chrome.runtime.sendMessage({ idle: 'false' }, function(response) {
      console.log('active');
    });
  }
  clearTimeout(timeout);
  // if there is no mousemove for 'idleDuration' ->
  // send message to measureUsageTime.js
  timeout = setTimeout(function() {
    // check if video is playing right now
    if (document.querySelector('video') && document.querySelector('video').playing) {
      console.log('video playing');
    } else {
      isIdle = true;
      // send message
      chrome.runtime.sendMessage({ idle: 'true' }, function(response) {
        console.log('idle');
      });
    }
  }, idleDuration);
};

// get limit reached message from background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.timeLimitReached === 'true' || request.viewsLimitReached === 'true') {
    let html = document.getElementsByTagName('html')[0];
    let body = document.getElementsByTagName('body')[0];

    Object.assign(html.style, {
      filter: 'grayscale(100%)',
    });

    // popup
    let popup = document.createElement('div');
    body.appendChild(popup);
    Object.assign(popup.style, {
      position: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: '0',
      left: '0',
      height: '80px',
      width: '100vw',
      backgroundColor: '#fff',
      borderTop: '3px solid #000',
      zIndex: '99999',
    });

    // headline
    let message = document.createElement('h1');
    message.innerHTML = 'limit reached';
    popup.appendChild(message);
    Object.assign(message.style, {
      color: '#000',
      fontFamily: 'monospace',
      fontSize: '16px',
    });

    let closeButton = document.createElement('div');
    popup.appendChild(closeButton);
    closeButton.innerHTML = 'x';
    Object.assign(closeButton.style, {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      right: '40px',
      top: '32px',
      height: '16px',
      width: '16px',
      fontSize: '16px',
      fontWeight: '800',
      cursor: 'pointer',
    });

    closeButton.addEventListener('click', function() {
      Object.assign(popup.style, {
        display: 'none',
      });
    });
  }
});
