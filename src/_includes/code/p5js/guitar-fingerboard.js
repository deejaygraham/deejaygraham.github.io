let fingerboard;

class Fingerboard {
  constructor(fretCount = 20, stringCount = 6) {
    this.fretCount = fretCount;
    this.stringCount = stringCount;
    this.markers = [];
  }

  addMarker(stringNumber, fretNumber, text, blockColor = "#d95d39", textColor = "#ffffff") {
    if (stringNumber < 1 || stringNumber > this.stringCount) {
      console.warn(`Marker string must be between 1 and ${this.stringCount}.`);
      return;
    }

    if (fretNumber < 1 || fretNumber > this.fretCount) {
      console.warn(`Marker fret must be between 1 and ${this.fretCount}.`);
      return;
    }

    this.markers.push({
      stringNumber,
      fretNumber,
      text: String(text),
      blockColor,
      textColor
    });

    redraw();
  }

  clearMarkers() {
    this.markers.length = 0;
    redraw();
  }

  draw() {
    background(247, 244, 236);

    const board = this.getBounds();
    const fretPositions = this.getFretPositions(board);

    this.drawOutline(board);
    this.drawFrets(board, fretPositions);
    this.drawPositionMarkers(board, fretPositions);
    this.drawStrings(board);
    this.drawMarkers(board, fretPositions);
  }

  getBounds() {
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

  getFretPositions(board) {
    const positions = [];
    for (let fret = 0; fret <= this.fretCount; fret += 1) {
      positions.push(this.getFretX(fret, board));
    }
    return positions;
  }

  getFretX(fret, board) {
    // Real fretboards shorten by the twelfth root of two at each fret.
    // The final scale normalizes that spacing to fill the available canvas.
    const rawPosition = 1 - pow(2, -fret / 12);
    const finalPosition = 1 - pow(2, -this.fretCount / 12);
    return board.left + (rawPosition / finalPosition) * board.width;
  }

  drawOutline(board) {
    noFill();
    stroke(32, 35, 32);
    strokeWeight(2);
    rectMode(CORNER);
    rect(board.left, board.top, board.width, board.height);
  }

  drawFrets(board, fretPositions) {
    const nutWidth = 6;
    const fretWidth = 2;

    for (let fret = 0; fret <= this.fretCount; fret += 1) {
      const x = fretPositions[fret];
      stroke(32, 35, 32, fret === 0 ? 255 : 165);
      strokeWeight(fret === 0 ? nutWidth : fretWidth);
      line(x, board.top, x, board.bottom);
    }
  }

  drawStrings(board) {
    const stringGap = board.height / this.stringCount;
    const startingPosition = board.top + stringGap * 0.5;

    for (let stringIndex = 0; stringIndex < this.stringCount; stringIndex += 1) {
      const y = startingPosition + stringGap * stringIndex;
      const thickness = map(stringIndex, 0, this.stringCount - 1, 0.8, 4.2);

      stroke(32, 35, 32);
      strokeWeight(thickness);
      line(board.left, y, board.right, y);
    }
  }

  drawMarkers(board, fretPositions) {
    const stringGap = board.height / this.stringCount;
    const startingPosition = board.top + stringGap * 0.5;

    this.markers.forEach((marker) => {
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

  drawPositionMarkers(board, fretPositions) {
    const singleMarkers = [3, 5, 7, 9, 15, 17, 19]
      .filter((fret) => fret <= this.fretCount);

    noStroke();
    fill(32, 35, 32, 42);

    singleMarkers.forEach((fret) => {
      const x = (fretPositions[fret - 1] + fretPositions[fret]) / 2;
      circle(x, board.top + board.height / 2, 11);
    });

    if (this.fretCount >= 12) {
      const twelfthX = (fretPositions[11] + fretPositions[12]) / 2;
      circle(twelfthX, board.top + board.height * 0.36, 10);
      circle(twelfthX, board.top + board.height * 0.64, 10);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  noLoop();

  const frets = 20;
  const strings = 6;
  fingerboard = new Fingerboard(frets, strings);

  // Example markers. String 1 is thin/top; string 6 is thick/bottom.
  //fingerboard.addMarker(6, 3, "G", "#d95d39");
  //fingerboard.addMarker(5, 2, "1", "#287271");
  //fingerboard.addMarker(4, 5, "C", "#6c5ce7");
}

function draw() {
  fingerboard.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
