export default function mergeSameWebsitesInPeriod(periodData) {
  // bundle same domains inside the currentPeriodData and safe them in relevantData
  let mergedData = [];

  mergedData = Array.from(
    periodData.reduce((m, { websites }) => {
      websites.forEach(o => {
        var temp = m.get(o.domain);
        if (!temp) {
          m.set(o.domain, (temp = {}));
        }
        Object.entries(o).forEach(([k, v]) => {
          if (k === 'website') return;
          if (typeof v === 'number') {
            temp[k] = (temp[k] || 0) + v;
          } else {
            temp[k] = v;
          }
        });
      });
      return m;
    }, new Map()),
    ([domain, time]) => Object.assign({ domain }, time)
  );

  return mergedData;
}
