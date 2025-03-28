// @ts-check
import checkResourceExists from "./check-resource-exists.js";

export default async function (page, imgTag) {
  const url = await imgTag.getAttribute("src");
  checkResourceExists(page, url);
}
