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
  const led_spacing_x = 5 * led_width;
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
      const x = led_start_x + (rowIndex * (led_width + led_spacing_x));
      const y = led_start_y + (columnIndex * (led_height + led_spacing_y));
      svgBuilder.push(`<rect x="${x}" y="${y}" width="${led_width}" height="${led_height}" class="microbit-led led_${brightness}" />`);
    }

    rowIndex++;
  }
  
  /*
  for (let row = 0; row < 5; row++) {
    svgBuilder.push(`<!-- ${row} -->`);
    for (let column = 0; column < 5; column++) {
      const x = led_start_x + (row * (led_width + led_spacing_x));
      const y = led_start_y + (column * (led_height + led_spacing_y));
      svgBuilder.push(`<rect x="${x}" y="${y}" width="${led_width}" height="${led_height}" class="microbit-led" />`);
    }
  }
  */
    
  /* for (let row = 0; row < 5; row++) {
    svgBuilder.push(`<!-- ${row} -->`);
    for (let column = 0; column < 5; column++) {
      const x = led_start_x + (row * (led_width + led_spacing_x));
      const y = led_start_y + (column * (led_height + led_spacing_y));
      svgBuilder.push(`<rect x="${x}" y="${y}" width="${led_width}" height="${led_height}" class="microbit-led" />`);
    }
  }
*/
  
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
  
  svgBuilder.push("</svg");
  svgBuilder.push("/figure>");
  
  return svgBuilder.join("\n");
}
