/* eslint-disable */
function setup() {
	createCanvas(windowWidth, windowHeight);
	
	textSize(100);
	textAlign(CENTER, CENTER); 
	textFont('Arial'); 
  textStyle(BOLD); 
}

let frame = 1; // or 2 
let alpha = 255;
let fadeAmount = -2;

function draw() {

	background(255);
	
	const line1 = 150;
	const line2 = 300;
	const centreLine = windowWidth / 2;

	fill(0, 0, 0, 255);
	textAlign(RIGHT);
	text("Move", centreLine, line1);
	text("And Break", centreLine, line2)

	fill(0, 0, 0, alpha);
	textAlign(LEFT);
	
	if (frame === 1) {
		text(" Fast", centreLine, line1);
		text(" Things", centreLine, line2);
	} else {
		text(" Things...", centreLine, line1);
		text("fast...", centreLine, line2);
	}

	alpha += fadeAmount;
	
	if (alpha <= 0 || alpha >= 255) {
		// reverse direction
		fadeAmount = - fadeAmount;
	}
	
	if (alpha <= 0) {
		if (frame === 1) {
			frame = 2;
		} else {
			frame = 1;
		}
	}
}
