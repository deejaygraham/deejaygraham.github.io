// write out a simplified microbit image with a customised display
// similar to https://microbit.org/design-your-microbit/v2/

const width = 220;
const height = 100;
const corner = 15; // px
const microbit = `<rect width="${wjdth}" height="${height}" rx="${corner}" />`;
const svgContent = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${microbit}</svg>`;

export default function (content) {
  // add support for display image
  return svgContent;
}
