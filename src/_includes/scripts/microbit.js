// canvas rendering of BBC microbit similar to earlier svg shortcode rendering.
// e.g. 
// <canvas id="mb1" width="721" height="565" data-microbit="05432:98765:99999:99999:99990"></canvas>
// <canvas id="mb2" width="360" height="282" data-microbit="22222:44444:66666:88888:99999"></canvas>

const randomColour = () => {
  const colours = [ "red", "blue", "gold", "green" ];
  const random = Math.floor(Math.random() * colours.length);
  return colours[random];
}

const roundedRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fill();
}

const filledCircle = (ctx, x, y, radius) => {
  ctx.beginPath();
  const startAngle = 0;
  const endAngle = Math.PI * 2;
  const counterclockwise = true;
  ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  ctx.fill();
}

const filledTriangle = (ctx, x1, y1, x2, y2, x3, y3) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.fill();
}

const mapBrightness = (brightness, in_min, in_max, out_min, out_max) => {
  return (brightness - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const draw = () => {
  const microbits = document.querySelectorAll("[data-microbit]");
  
  microbits.forEach((microbit) => {
    drawMicrobit(microbit);
  });
}

const drawMicrobit = (microbit) => {
  if (microbit.getContext) {
    const ctx = microbit.getContext("2d");
    const cornerRadius = microbit.width / 10;
    const centre_x = Math.floor(microbit.width / 2);
    const centre_y = Math.floor(microbit.height / 2);

    // body
    ctx.fillStyle = "black";
    roundedRect(ctx, 0, 0, microbit.width, microbit.height, cornerRadius);

    // triangle flashes
    const triangleFill = randomColour();
    ctx.fillStyle = triangleFill;

    let sideLength = Math.floor(microbit.height / 12); // size of triangle sides (not hypotenuse)

    // flashes are drawn from right hand top, across to right angle corner, down to bottom, then back across hypotenuse
    // small
    let x1 = 7 * sideLength;
    let y1  = 0;

    let x2 = x1 - sideLength;
    let y2 = 0;

    let x3 = x2;
    let y3 = sideLength;
    filledTriangle(ctx, x1, y1, x2, y2, x3, y3);

    sideLength *= 2;

    // medium
    x1 = x2;
    y1  = 0;

    x2 = x1 - sideLength;
    y2 = 0;

    x3 = x2;
    y3 = sideLength;
    filledTriangle(ctx, x1, y1, x2, y2, x3, y3);

    // large
    sideLength *= 2;

    x1 = x2;
    y1 = 0;

    x2 = cornerRadius;
    y2 = 0;

    x3 = cornerRadius;
    y3 = cornerRadius;

    let x4 = 0;
    let y4 = cornerRadius;

    let x5 = 0;
    let y5 = sideLength;

    // with rounded corner to match outside of microbit.
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.arc(x3, y3, cornerRadius + 1, Math.PI * 1.5, Math.PI, true);
    //ctx.lineTo(x3, y3);
    //ctx.lineTo(x4, y4);

    ctx.lineTo(x5, y5);
    ctx.lineTo(x1, y1);

    ctx.fill();

    // led matrix
    const led_width = Math.floor(microbit.width / 60);
    const led_height = 2 * led_width;
    const led_spacing_x = 4 * led_width;
    const led_spacing_y = led_height;

    const led_start_x = centre_x - (2 * led_spacing_x) - Math.floor(2.5 * led_width);
    const led_start_y = centre_y - (2 * led_spacing_y) - Math.floor(2.5 * led_height);

    const brightnessValues = microbit.dataset.microbit; // e.g. '99999:99999:99999:99999:99999'; // elem.getAttribute('data-microbit')
    const rows = brightnessValues.split(":");

    let rowIndex = 0;

    for (const row of rows) { 
      if (row.length < 5) {
        throw new Error(`${rowIndex} must be 5 characters`);
      }

      for(let columnIndex = 0; columnIndex < 5; columnIndex++) {
        const brightness = parseInt(row[columnIndex]);
        const opacity = mapBrightness(brightness, 0, 9, 0, 100);
        const x = led_start_x + (columnIndex  * (led_width + led_spacing_x));
        const y = led_start_y + (rowIndex * (led_height + led_spacing_y));

        ctx.fillStyle = `rgb(255 0  0 / ${opacity}%)`;
        ctx.fillRect(x, y, led_width, led_height);
      }

      rowIndex++;
    }

    // buttons
    const button_width = Math.floor(microbit.width / 11);
    const button_height = button_width;
    const button_spacing = button_width * 8;
    const button_y = centre_y - Math.floor(button_height / 2);
    const button_a_x = centre_x - Math.floor(button_spacing / 2) - button_width;
    const button_a_cx = button_a_x + Math.floor(button_width / 2);
    const button_a_cy = button_y + Math.floor(button_height / 2);
    const button_b_x = centre_x + Math.floor(button_spacing / 2);
    const button_b_cx = button_b_x + Math.floor(button_width / 2);
    const button_b_cy = button_y + Math.floor(button_height / 2);
    const button_radius = Math.floor(button_width / 4);

    // body
    ctx.fillStyle = "grey";
    ctx.fillRect(button_a_x, button_y, button_width, button_height);
    ctx.fillRect(button_b_x, button_y, button_width, button_height);
    // actuator
    ctx.fillStyle = "black";
    filledCircle(ctx, button_a_cx, button_a_cy, button_radius);
    filledCircle(ctx, button_b_cx, button_b_cy, button_radius);

      // edge connector
      const edge_connector_height = Math.floor(microbit.height / 8);
      ctx.fillStyle = "gold";
      ctx.fillRect(0, microbit.height - edge_connector_height + 1, microbit.width, edge_connector_height);
  }
}
