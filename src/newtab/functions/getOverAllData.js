export default function getOverAllData() {
  let storageKeys = Object.keys(localStorage);
  let overAllData = [];
  for (let i = 0; i < storageKeys.length; i++) {
    let key = storageKeys[i];
    let websites;
    if (key !== 'limits') {
      websites = JSON.parse(localStorage.getItem(key));
      let object = {
        date: key,
        websites: websites,
      };
      overAllData.push(object);
    }
  }

  return overAllData;
}
