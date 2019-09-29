import moment from 'moment';

// save website to local storage
export default function saveBehaviorInStorage(domain, usageBehavior) {
  let today = moment().format('YYYY-MM-DD');
  let websites = JSON.parse(localStorage.getItem(today));

  if (websites) {
    for (let i = 0; i < websites.length; i++) {
      // when domain in storage equal to previos domain
      // add data
      if (websites[i].domain === domain && usageBehavior) {
        websites[i].clicks += usageBehavior.clicks;
        websites[i].scroll += usageBehavior.scroll;
      }
    }

    // when time and counter is set, save websites in local storage
    localStorage.setItem(today, JSON.stringify(websites));
  }
}
