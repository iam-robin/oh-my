let usageBehavior = {
  clicks: 0,
  scroll: 0,
};

let totalScrollOffset = 0;
let currScrollOffset = window.pageYOffset;

export default function detectUsageBehavior() {
  // detect click event
  document.onclick = function() {
    usageBehavior.clicks++;
    sendBehaviorToBackground();
  };

  // detect scroll event
  window.addEventListener(
    'scroll',
    () => {
      let addedOffset = Math.abs(currScrollOffset - window.pageYOffset);
      totalScrollOffset += addedOffset;
      currScrollOffset = window.pageYOffset;
      usageBehavior.scroll = totalScrollOffset;
      sendBehaviorToBackground();
    },
    false
  );
}

// debounce function (max one message each xx ms)
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// send each xxx ms a new message to background
let sendBehaviorToBackground = debounce(function() {
  chrome.runtime.sendMessage({ usageBehavior: usageBehavior }, function(response) {
    // resetData();
  });
  resetData();
}, 250);

function resetData() {
  usageBehavior.scroll = 0;
  usageBehavior.clicks = 0;
  totalScrollOffset = 0;
  currScrollOffset = window.pageYOffset;
}
