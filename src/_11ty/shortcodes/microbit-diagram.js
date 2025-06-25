// write out a simplified microbit image with a customised display
// similar to https://microbit.org/design-your-microbit/v2/

const width = 721;
const height = 565;
const corner = 15; // px
const microbit = `<rect width="${width}" height="${height}" rx="${corner}" class="microbit-body" />`;

const styleBlock = "<style>.microbit-body { fill: black; } </style>";

export default function () {
  // add support for display image
  const svgBuilder = []

  svgBuilder.push(`<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`);
  svgBuilder.push("<style>");
  svgBuilder.push(".microbit-body { fill: black; } ");
  svgBuilder.push(".microbit-led { fill: red; } ");
  svgBuilder.push(".edge-connector { fill: gold; } ");
  svgBuilder.push("</style>");
  svgBuilder.push(microbit);

  const led_start_x = 200;
  const led_start_y = 200;
  const led_width = 10;
  const led_height = 10;
  const led_spacing_x = 50;
  const led_spacing_y = 60;
  
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      const x = led_start_x + (row * led_spacing_x);
      const y = led_start_y + (column * led_spacing_y);
      svgBuilder.push(`<rect x="${x}" y="${y}" width="${led_width}" height="${led_height}" class="microbit-led" />`);
    }
  }

  // add gold edge connector
  const edge_connector_height = 100;
  svgBuilder.push(`<rect y="${height - edge_connector_height}" width="${width}" height="${edge_connector_height}" class="edge-connector" />`);
  
  svgBuilder.push("</svg");
  
  return svgBuilder.join("\n");
}
