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

const drawBody = (ctx, element, radius) => {
  ctx.fillStyle = "black";
  roundedRect(ctx, 0, 0, element.width, element.height, radius);
}

const drawFlashes = (ctx, element, radius) => {
  // size of triangle sides (not hypotenuse)
  // flashes are drawn from right hand top, across to right 
  // angle corner, down to bottom, then back across hypotenuse
 ctx.fillStyle = randomColour();

  // small
  let sideLength = Math.floor(element.height / 12); 
  let x1 = 7 * sideLength;
  let y1  = 0;
  let x2 = x1 - sideLength;
  let y2 = 0;
  let x3 = x2;
  let y3 = sideLength;
  filledTriangle(ctx, x1, y1, x2, y2, x3, y3);

  // medium
  sideLength *= 2;
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
  x2 = radius;
  y2 = 0;
  x3 = radius;
  y3 = radius;
  //let x4 = 0;
  //let y4 = radius;
  let x5 = 0;
  let y5 = sideLength;

  // with rounded corner to match top left corner of microbit.
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.arc(x3, y3, radius + 1, Math.PI * 1.5, Math.PI, true);
  //ctx.lineTo(x3, y3);
  //ctx.lineTo(x4, y4);
  ctx.lineTo(x5, y5);
  ctx.lineTo(x1, y1);
  ctx.fill();
}

const drawLEDMatrix = (ctx, element, brightnessValues, centre_x, centre_y) => {
  const led_width = Math.floor(element.width / 60);
  const led_height = 2 * led_width;
  const led_spacing_x = 4 * led_width;
  const led_spacing_y = led_height;

  const led_start_x = centre_x - (2 * led_spacing_x) - Math.floor(2.5 * led_width);
  const led_start_y = centre_y - (2 * led_spacing_y) - Math.floor(2.5 * led_height);

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
}

const drawButtons = (ctx, element, centre_x, centre_y) => {
  const button_width = Math.floor(element.width / 11);
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
}

const drawEdgeConnector = (ctx, element) => {
  const edge_connector_height = Math.floor(element.height / 8);
  ctx.fillStyle = "gold";
  ctx.fillRect(0, element.height - edge_connector_height + 1, element.width, edge_connector_height);
}

const drawMicrobit = (microbit) => {
  const canvas = document.getElementById(microbit.id);
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");

    const cornerRadius = canvas.width / 10;
    const centre_x = Math.floor(canvas.width / 2);
    const centre_y = Math.floor(canvas.height / 2);

    if (microbit.rendered === false) {
      drawBody(ctx, canvas, cornerRadius);
      drawFlashes(ctx, canvas, cornerRadius);

      drawButtons(ctx, canvas, centre_x, centre_y);
      drawEdgeConnector(ctx, canvas);
      
      microbit.rendered = true;
    }

    // do animation here ...
    drawLEDMatrix(ctx, canvas, canvas.dataset.microbit, centre_x, centre_y);
  }
}

const microbits = []

const drawMicrobits = () => {
  microbits.forEach((m) => {
    //const element = document.getElementById(m.id);
    drawMicrobit(m);
  });

  window.requestAnimationFrame(drawMicrobits)
}

/* eslint-disable-next-line */
const renderMicrobits = () => {
  const elements = document.querySelectorAll("[data-microbit]");
  
  elements.forEach((e) => {
    microbits.push({
      id: e.id,
      rendered: false,
      frame: 0,
      frames: e.dataset.microbit
      });

    window.requestAnimationFrame(drawMicrobits);
  });
}

