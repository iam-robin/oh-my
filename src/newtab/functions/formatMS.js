export default function formatMS(ms, showSec) {
  let seconds = parseInt((ms / 1000) % 60);
  let minutes = parseInt((ms / (1000 * 60)) % 60);
  let hours = parseInt(ms / (1000 * 60 * 60));

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  if (hours !== '00') {
    // hours, minutes and seconds
    return hours + 'h ' + minutes + 'min ';
  } else if (hours === '00' && minutes !== '00') {
    // minutes and seconds
    return minutes + 'min ';
  } else if (seconds === '00') {
    // no time
    return '–';
  } else {
    // seconds
    if (showSec) {
      return seconds + 'sec ';
    } else {
      return '< 01min';
    }
  }
}
