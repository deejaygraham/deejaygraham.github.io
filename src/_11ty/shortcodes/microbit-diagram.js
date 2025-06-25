// write out a simplified microbit image with a customised display
// similar to https://microbit.org/design-your-microbit/v2/

const width = 721;
const height = 565;
const corner = 50; // px

export default function (image) {
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
  svgBuilder.push(".led_0 { filter: brightness(0); } ");
  svgBuilder.push(".led_1 { filter: brightness(10%); } ");
  svgBuilder.push(".led_2 { filter: brightness(20%); } ");
  svgBuilder.push(".led_3 { filter: brightness(30%); } ");
  svgBuilder.push(".led_4 { filter: brightness(40%); } ");
  svgBuilder.push(".led_5 { filter: brightness(50%); } ");
  svgBuilder.push(".led_6 { filter: brightness(60%); } ");
  svgBuilder.push(".led_7 { filter: brightness(70%); } ");
  svgBuilder.push(".led_8 { filter: brightness(80%); } ");
  svgBuilder.push(".led_9 { filter: brightness(100%); } ");
  svgBuilder.push(".button-body { fill: grey; } ");
  svgBuilder.push(".button-actuator { fill: black; } ");
  svgBuilder.push(".edge-connector { fill: gold; } ");
  svgBuilder.push(".hole-ring { fill: gold; } ");
  svgBuilder.push(".hole { fill: white; } ");
  svgBuilder.push("</style>");

  svgBuilder.push("<!-- body -->");
  svgBuilder.push(`<rect width="${width}" height="${height}" rx="${corner}" class="microbit-body" />`);

  const centre_x = Math.floor(width / 2);
  const centre_y = Math.floor(height / 2);

  // debug
  //svgBuilder.push(`<line x1="${centre_x}" x2="${centre_x}" y1="0" y2="${height}" stroke="orange" stroke-width="5"/>`);
  //svgBuilder.push(`<line x1="0" x2="${width}" y1="${centre_y}" y2="${centre_y}" stroke="orange" stroke-width="5"/>`);
  
  // render led matrix
  svgBuilder.push("<!-- led matrix -->");
  const led_width = Math.floor(width / 60);
  const led_height = 2 * led_width;
  const led_spacing_x = 4 * led_width;
  const led_spacing_y = led_height;
  
  const led_start_x = centre_x - (2 * led_spacing_x) - Math.floor(2.5 * led_width);
  const led_start_y = centre_y - (2 * led_spacing_y) - Math.floor(2.5 * led_height);

  svgBuilder.push(`<!-- centre="${centre_x}, ${centre_y}" width="${led_width}" height="${led_height}" start="${led_start_x}, ${led_start_y}" spacing="${led_spacing_x}, ${led_spacing_y}" -->`);

  // go through image string and pull out brightness values for each led element
  const brightnessValues = image || '99999:99999:99999:99999:99999';
  // if image is less than 5 * 5 + 4 delimiters...
  // if row is shorter
  
  const rows = brightnessValues.split(":");

  let rowIndex = 0;
  for (const row of rows) { 
    svgBuilder.push(`<!-- ${rowIndex} -->`);
    for(let columnIndex = 0; columnIndex < 5; columnIndex++) {
      const brightness = row[columnIndex];
      const x = led_start_x + (columnIndex  * (led_width + led_spacing_x));
      const y = led_start_y + (rowIndex * (led_height + led_spacing_y));
      svgBuilder.push(`<rect x="${x}" y="${y}" width="${led_width}" height="${led_height}" class="microbit-led led_${brightness}" />`);
    }

    rowIndex++;
  }
  
  // a and b buttons
  const button_width = Math.floor(width / 11);
  const button_height = button_width;
  const button_spacing = button_width * 8;
  
  svgBuilder.push("<!-- buttons -->");
  const button_y = centre_y - Math.floor(button_height / 2);
  
  const button_a_x = centre_x - Math.floor(button_spacing / 2) - button_width;
  const button_a_cx = button_a_x + Math.floor(button_width / 2);
  const button_a_cy = button_y + Math.floor(button_height / 2);
  const button_b_x = centre_x + Math.floor(button_spacing / 2);
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

  // holes above edge connector
  const hole_count = 5;
  const hole_radius = Math.floor(width / 30);
  const hole_ring_radius = Math.floor(hole_radius * 1.5);
  const hole_spacing = Math.floor((width - (hole_count * hole_radius)) / (hole_count - 0.5));
  const hole_cy = height - edge_connector_height - hole_radius;
  const button_start_cx = centre_x - (hole_spacing * 2) - (hole_radius * 2);

  let hole_cx = button_start_cx;
  svgBuilder.push(`<!-- centre="${centre_x}, ${centre_y}" width="${hole_radius}" start="${button_start_cx}" spacing="${hole_spacing}" -->`);

  for(let holeIndex = 0; holeIndex < hole_count; holeIndex++) {
    svgBuilder.push(`<circle cx="${hole_cx}" cy="${hole_cy}" r="${hole_ring_radius}" class="hole-ring"/>`);
    svgBuilder.push(`<circle cx="${hole_cx}" cy="${hole_cy}" r="${hole_radius}" class="hole"/>`);
    hole_cx += hole_spacing + (hole_radius * 2);
  }
  
  svgBuilder.push("</svg");
  svgBuilder.push("/figure>");
  
  return svgBuilder.join("\n");
}
