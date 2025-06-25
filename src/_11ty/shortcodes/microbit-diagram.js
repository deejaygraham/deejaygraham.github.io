// write out a simplified microbit image with a customised display
// similar to https://microbit.org/design-your-microbit/v2/

const width = 721;
const height = 565;
const corner = 15; // px
const microbit = `<rect width="${width}" height="${height}" rx="${corner}" fill="black" />`;
//const svgContent = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${microbit}</svg>`;

export default function () {
  // add support for display image
  //const led_width = 5;
  //const led_height = 5;
  //const led_spacing = 50;

  //const displayMatrix = [];
  
  //for (let x = 0; x < 5; x++) {
    //for (let y = 0; y < 5; y++) {
      //const led = `<rect width="${led_width}" height="${led_height}" rx="1" fill="red" />`;
      //displayMatrix.push(led);
    //}
 //}

  // let content = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${microbit}</svg>`;;
}
