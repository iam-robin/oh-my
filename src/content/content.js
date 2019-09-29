
// ================================================================================
// VARIABLES
// ================================================================================

let timeout;
let idleDuration = 120000; // in ms
let isIdle = false;


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
