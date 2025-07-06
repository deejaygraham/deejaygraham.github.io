// write out a simplified microbit image with a customised display
// similar to https://microbit.org/design-your-microbit/v2/

const width = 721;
const height = 565;
const corner = 50; // px

function toArray(input) {
  if (Array.isArray(input)) {
    return input;
  } else if (typeof input === 'string') {
    return [input];
  } else {
    throw new Error('Input must be a string or an array of strings');
  }
}

export default function (image) {
  const svgBuilder = []
	
  // wrap it in a figure...
  svgBuilder.push('<figure class="image" style="width=50%" >');
  
  // start svg
  
  svgBuilder.push(`<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img">`);
  // add styling...
  svgBuilder.push("<style>");
  svgBuilder.push(".microbit-body { fill: black; } ");
  svgBuilder.push(".microbit-led { fill: red; } ");
  svgBuilder.push(".led_0 { fill: #100; } ");
  svgBuilder.push(".led_1 { fill: #200; } ");
  svgBuilder.push(".led_2 { fill: #300; } ");
  svgBuilder.push(".led_3 { fill: #400; } ");
  svgBuilder.push(".led_4 { fill: #800; } ");
  svgBuilder.push(".led_5 { fill: #a00; } ");
  svgBuilder.push(".led_6 { fill: #b00; } ");
  svgBuilder.push(".led_7 { fill: #c00; } ");
  svgBuilder.push(".led_8 { fill: #d00; } ");
  svgBuilder.push(".led_9 { fill: #f00; } ");
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

  // animation handling here...
  // for each string in the array - write out a frame for the display

  const frames = toArray(image);
  const frameCount = frames.length;
  
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];

    if (frameCount > 1) {
      const frameId = `frame${i}`;
      // first style is inline, further frames are none.
      const frameStyle = i == 0 ? 'inline' : 'none';
      svgBuilder.push(`<g id="${frameId}" style="display:${frameStyle}">`);
    }
	
    // go through image string and pull out brightness values for each led element
    const brightnessValues = frame || '99999:99999:99999:99999:99999';

    if (brightnessValues.length < 29) {
      throw new Error("image must be 5x5");
    }

    const rows = brightnessValues.split(":");

    let rowIndex = 0;
    for (const row of rows) { 
      if (row.length < 5) {
        throw new Error(`${rowIndex} must be 5 characters`);
      }
      svgBuilder.push(`<!-- ${rowIndex} -->`);
      for(let columnIndex = 0; columnIndex < 5; columnIndex++) {
        const brightness = row[columnIndex];
        const x = led_start_x + (columnIndex  * (led_width + led_spacing_x));
        const y = led_start_y + (rowIndex * (led_height + led_spacing_y));
        svgBuilder.push(`<rect x="${x}" y="${y}" width="${led_width}" height="${led_height}" class="led_${brightness}" />`);
      }

      rowIndex++;
    }

    if (frameCount > 1) {	  
      svgBuilder.push('</g>');
    }
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
  svgBuilder.push(`<circle cx="${button_a_cx}" cy="${button_a_cy}" r="${button_radius}" class="button-actuator" />`);
  svgBuilder.push("<!-- b -->");
  svgBuilder.push(`<rect x="${button_b_x}" y="${button_y}" width="${button_width}" height="${button_height}" class="button-body" />`);
  svgBuilder.push(`<circle cx="${button_b_cx}" cy="${button_b_cy}" r="${button_radius}" class="button-actuator" />`);
  
  // add gold edge connector
  const edge_connector_height = Math.floor(height / 8);
  svgBuilder.push("<!-- edge connector -->");
  svgBuilder.push(`<rect y="${height - edge_connector_height + 1}" width="${width}" height="${edge_connector_height}" class="edge-connector" />`);

  if (frameCount > 1) {
     // write out animation code
     const frameRate = 500;
     svgBuilder.push('<script type="application/ecmascript"><![CDATA[');
     svgBuilder.push(`\tconst frameCount = ${frameCount};`);
     svgBuilder.push('\tlet current = 0;');
     svgBuilder.push('\tsetInterval(() => {');
     svgBuilder.push('\t\tfor (let i = 0; i < frameCount; i++) {');
     svgBuilder.push('\t\t\tdocument.getElementById("frame" + i).style.display = (i === current) ? "inline" : "none"; ');
     svgBuilder.push('\t\t}');
     svgBuilder.push('\t\tcurrent = (current + 1) % frameCount;');
     svgBuilder.push(`\t}, ${frameRate});`);
     svgBuilder.push(']]></script>');
  }
	
  svgBuilder.push("</svg>");
  svgBuilder.push("</figure>");
  
  return svgBuilder.join("\n");
}
