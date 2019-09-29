import 'core-js';
import extractHostname from './extractHostname';

// get the root domain of an URL
export default function extractRootDomain(url) {
  let domain = extractHostname(url);

  let splitArr = domain.split('.');

  let arrLen = splitArr.length;

  // extracting the root domain here
  // if there is a subdomain
  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
      // this is using a ccTLD
      domain = splitArr[arrLen - 3] + '.' + domain;
    }
  }
  return domain;
}
