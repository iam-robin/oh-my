import moment from 'moment';

export default function getFirstDate() {
  let storageKeys = Object.keys(localStorage);
  let dates = [];
  storageKeys.forEach(element => {
    if (element !== 'limits') {
      dates.push(moment(element));
    }
  });
  let minDate = moment.min(dates);
  return moment(minDate);
}
