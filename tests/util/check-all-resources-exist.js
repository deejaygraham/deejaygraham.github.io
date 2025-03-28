import checkResourceExists from './check-resource-exists.js';

export default async function (page, urls) {
  for (const url of urls) {
    await checkResourceExists(page, url);
  }
}
