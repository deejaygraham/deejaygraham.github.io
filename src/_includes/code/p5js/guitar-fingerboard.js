const FRET_COUNT = 20;
const STRING_COUNT = 6;

// String numbers run from 1 (thin/top) to 6 (thick/bottom).
// Fret numbers identify the space in which the marker is centred.
const fingerboardMarkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  noLoop();

  // Example markers. Add as many as required, or remove these examples.
  addMarker(6, 3, "G", "#d95d39");
  //addMarker(5, 2, "1", "#287271");
  addMarker(1, 3, "G", "#6c5ce7");
}

function draw() {
  background(247, 244, 236);

  const board = getBoardBounds();
  drawFingerboard(board);
}

function getBoardBounds() {
  const marginX = max(34, width * 0.07);
  const boardWidth = width - marginX * 2;
  const boardHeight = min(300, max(150, height * 0.42));
  const top = height / 2 - boardHeight / 2;

  return {
    left: marginX,
    right: marginX + boardWidth,
    top,
    bottom: top + boardHeight,
    width: boardWidth,
    height: boardHeight
  };
}

function drawFingerboard(board) {
  // Fingerboard outline
  noFill();
  stroke(32, 35, 32);
  strokeWeight(2);
  rect(board.left, board.top, board.width, board.height);

  const fretPositions = [];
  for (let fret = 0; fret <= FRET_COUNT; fret += 1) {
    fretPositions.push(fretX(fret, board));
  }

  drawFrets(board, fretPositions);
  drawPositionMarkers(board, fretPositions);
  drawStrings(board);
  drawFingerboardMarkers(board, fretPositions);
}

function fretX(fret, board) {
  // Real fretboards shorten by the twelfth root of two at each fret.
  // The final scale normalizes that spacing to fill the available canvas.
  const rawPosition = 1 - pow(2, -fret / 12);
  const finalPosition = 1 - pow(2, -FRET_COUNT / 12);
  return board.left + (rawPosition / finalPosition) * board.width;
}

function drawFrets(board, fretPositions) {
  const nutWidth = 6;
  const fretWidth = 2;
  for (let fret = 0; fret <= FRET_COUNT; fret += 1) {
    const x = fretPositions[fret];
    stroke(32, 35, 32, fret === 0 ? 255 : 165);
    strokeWeight(fret === 0 ? nutWidth : fretWidth);
    line(x, board.top, x, board.bottom);
  }
}

function drawStrings(board) {
  const stringGap = board.height / STRING_COUNT;
  const startingPosition = board.top + (stringGap * 0.5);
	
  for (let stringIndex = 0; stringIndex < STRING_COUNT; stringIndex += 1) {
    const y = startingPosition + stringGap * stringIndex;
    const thickness = map(stringIndex, 0, STRING_COUNT - 1, 0.8, 4.2);

    stroke(32, 35, 32);
    strokeWeight(thickness);
    line(board.left, y, board.right, y);
  }
}

function addMarker(stringNumber, fretNumber, text, blockColor = "#d95d39", textColor = "#ffffff") {
  if (stringNumber < 1 || stringNumber > STRING_COUNT) {
    console.warn(`Marker string must be between 1 and ${STRING_COUNT}.`);
    return;
  }

  if (fretNumber < 1 || fretNumber > FRET_COUNT) {
    console.warn(`Marker fret must be between 1 and ${FRET_COUNT}.`);
    return;
  }

  fingerboardMarkers.push({
    stringNumber,
    fretNumber,
    text: String(text),
    blockColor,
    textColor
  });

  redraw();
}

function clearMarkers() {
  fingerboardMarkers.length = 0;
  redraw();
}

function drawFingerboardMarkers(board, fretPositions) {
  const stringGap = board.height / STRING_COUNT;
  const startingPosition = board.top + (stringGap * 0.5);

  fingerboardMarkers.forEach((marker) => {
    const leftFret = fretPositions[marker.fretNumber - 1];
    const rightFret = fretPositions[marker.fretNumber];
    const fretWidth = rightFret - leftFret;
    const markerSize = min(stringGap * 0.68, fretWidth * 0.72);
    const x = (leftFret + rightFret) / 2;
    const y = startingPosition + stringGap * (marker.stringNumber - 1);

    rectMode(CENTER);
    noStroke();
    fill(marker.blockColor);
    rect(x, y, markerSize, markerSize, markerSize * 0.12);

    fill(marker.textColor);
    textFont("Arial");
    textStyle(BOLD);
    textSize(markerSize * 0.48);
    textAlign(CENTER, CENTER);
    text(marker.text, x, y + markerSize * 0.02);
  });

  rectMode(CORNER);
}

function drawPositionMarkers(board, fretPositions) {
  const singleMarkers = [3, 5, 7, 9, 15, 17, 19];

  noStroke();
  fill(32, 35, 32, 42);

  singleMarkers.forEach((fret) => {
    const x = (fretPositions[fret - 1] + fretPositions[fret]) / 2;
    circle(x, board.top + board.height / 2, 11);
  });

  const twelfthX = (fretPositions[11] + fretPositions[12]) / 2;
  circle(twelfthX, board.top + board.height * 0.36, 10);
  circle(twelfthX, board.top + board.height * 0.64, 10);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
