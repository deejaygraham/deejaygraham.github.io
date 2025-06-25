// write out a simplified microbit image with a customised display
// similar to https://microbit.org/design-your-microbit/v2/

const width = 721;
const height = 565;
const corner = 50; // px

export default function () {
  // add support for display image
  const svgBuilder = []

  // wrap it in a figure...
  svgBuilder.push('<figure class="image">');
  
  // start svg
  
  svgBuilder.push(`<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img">`);
  // add styling...
  svgBuilder.push("<style>");
  svgBuilder.push(".microbit-body { fill: black; } ");
  svgBuilder.push(".microbit-led { fill: red; } ");
  svgBuilder.push(".button-body { fill: grey; } ");
  svgBuilder.push(".button-actuator { fill: black; } ");
  svgBuilder.push(".edge-connector { fill: gold; } ");
  svgBuilder.push("</style>");

  svgBuilder.push("<!-- body -->");
  svgBuilder.push(`<rect width="${width}" height="${height}" rx="${corner}" class="microbit-body" />`);

  const half_width = Math.floor(width / 2);
  const half_height = Math.floor(height / 2);

  // render led matrix
  svgBuilder.push("<!-- led matrix -->");
  const led_width = Math.floor(width / 60);
  const led_height = 2 * led_width;
  const led_spacing_x = 5 * led_width;
  const led_spacing_y = 2 * led_height;
  
  const led_start_x = half_width - (2 * led_spacing_x) - Math.floor(2.5 * led_width);
  const led_start_y = half_height - (2 * led_spacing_y) - Math.floor(2.5 * led_height);

  svgBuilder.push(`<!-- centre="${half_width}, ${half_height}" width="${led_width}" height="${led_height}" start="${led_start_x}, ${led_start_y}" spacing="${led_spacing_x}, ${led_spacing_y}" -->`);
  
  for (let column = 0; column < 5; column++) {
    for (let row = 0; row < 5; row++) {
      const x = led_start_x + (row * led_spacing_x);
      const y = led_start_y + (column * led_spacing_y);
      svgBuilder.push(`<!-- ${row} -->`);
      svgBuilder.push(`<rect x="${x}" y="${y}" width="${led_width}" height="${led_height}" class="microbit-led" />`);
    }
  }

  // a and b buttons
  const button_width = Math.floor(width / 11);
  const button_height = button_width;
  const button_spacing = button_width * 8;
  
  svgBuilder.push("<!-- buttons -->");
  const button_y = half_height - Math.floor(button_height / 2);
  
  const button_a_x = half_width - Math.floor(button_spacing / 2) - button_width;
  const button_a_cx = button_a_x + Math.floor(button_width / 2);
  const button_a_cy = button_y + Math.floor(button_height / 2);
  const button_b_x = half_width + Math.floor(button_spacing / 2);
  const button_b_cx = button_b_x + Math.floor(button_width / 2);
  const button_b_cy = button_y + Math.floor(button_height / 2);
  const button_radius = Math.floor(button_width / 4);
  
  svgBuilder.push("<!-- a -->");
  svgBuilder.push(`<rect x="${button_a_x}" y="${button_y}" width="${button_width}" height="${button_height}" class="button-body" />`);
  svgBuilder.push(`<circle cx="${button_a_cx}" cy="${button_a_cy}" r="${button_radius}" class="button-actuator"/>`);
  svgBuilder.push("<!-- b -->");
  svgBuilder.push(`<rect x="${button_b_x}" y="${button_y}" width="${button_width}" height="${button_height}" class="button-body" />`);
  svgBuilder.push(`<circle cx="${button_b_cx}" cy="${button_b_cy}" r="${button_radius}" class="button-actuator"/>`);
  
  // add gold edge connector
  const edge_connector_height = Math.floor(height / 8);
  svgBuilder.push("<!-- edge connector -->");
  svgBuilder.push(`<rect y="${height - edge_connector_height + 1}" width="${width}" height="${edge_connector_height}" class="edge-connector" />`);
  
  svgBuilder.push("</svg");
  svgBuilder.push("/figure>");
  
  return svgBuilder.join("\n");
}
