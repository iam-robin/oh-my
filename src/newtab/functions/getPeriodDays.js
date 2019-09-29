import cloneDeep from 'lodash/cloneDeep';

export default function getPeriodDays(currentDate, activePeriod, firstDay) {
  let date = cloneDeep(currentDate);
  let period = activePeriod;
  let startOfPeriod;
  let endOfPeriod;
  let currentPeriod = []; // complete period data in array

  if (period === 'day') {
    startOfPeriod = cloneDeep(date);
    endOfPeriod = cloneDeep(date);
  } else if (period === 'week') {
    startOfPeriod = cloneDeep(date).startOf('isoWeek');
    endOfPeriod = cloneDeep(date).endOf('isoWeek');
  } else if (period === 'month') {
    startOfPeriod = cloneDeep(date).startOf('month');
    endOfPeriod = cloneDeep(date).endOf('month');
  } else if (period === 'total') {
    startOfPeriod = firstDay;
    endOfPeriod = cloneDeep(date).endOf('month');
  }

  let day = startOfPeriod;

  // get the period days
  while (day <= endOfPeriod) {
    currentPeriod.push(day.toDate());
    day = day.clone().add(1, 'd');
  }

  return currentPeriod;
}
