const BACKGROUND_COLOUR = "#191919";
const VISITED_CELL_COLOUR = "#2D3746";
const MAZE_WALL_COLOUR = "#50DCFF";
const GENERATOR_COLOUR = "#FFAA28";
const START_COLOUR = "#32D264";
const END_COLOUR = "#EB4646";
const SOLVER_COLOUR = "#FF911E";
const SOLVER_COMPLETE_COLOUR = "#FFE132";

const CELL_SIZE = 24;
const SOLVER_MOVE_DELAY = 250;

let cols;
let rows;
let grid = [];

// Maze generation
let generationStack = [];
let current;
let generationComplete = false;

// Maze solving
let solver;
let solverStack = [];
let solverVisited = new Set();
let solverStarted = false;
let solverComplete = false;
let lastSolverMove = 0;

function setup() {
  createCanvas(720, 720);
  frameRate(60);
  generateNewMaze();
}

function draw() {
  background(BACKGROUND_COLOUR);

  for (const cell of grid) {
    cell.show();
  }

  drawStartAndEnd();

  if (!generationComplete) {
    generateMazeStep();
  } else {
    solveMazeStep();
    drawSolver();
  }
}

function generateNewMaze() {
  cols = floor(width / CELL_SIZE);
  rows = floor(height / CELL_SIZE);

  grid = [];
  generationStack = [];
  generationComplete = false;

  solver = undefined;
  solverStack = [];
  solverVisited = new Set();
  solverStarted = false;
  solverComplete = false;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < cols; column++) {
      grid.push(new Cell(column, row));
    }
  }

  current = grid[0];
}

function generateMazeStep() {
  current.visited = true;
  current.highlight();

  const next = current.getRandomUnvisitedNeighbour();

  if (next) {
    next.visited = true;
    generationStack.push(current);

    removeWalls(current, next);
    current = next;
  } else if (generationStack.length > 0) {
    current = generationStack.pop();
  } else {
    generationComplete = true;
    startSolver();
  }
}

function startSolver() {
  solver = grid[0];
  solverStack = [solver];
  solverVisited = new Set([solver.index]);
  solverStarted = true;
  solverComplete = false;
  lastSolverMove = millis();
}

function solveMazeStep() {
  if (!solverStarted || solverComplete) {
    return;
  }

  if (millis() - lastSolverMove < SOLVER_MOVE_DELAY) {
    return;
  }

  lastSolverMove = millis();

  if (solver.column === cols - 1 && solver.row === rows - 1) {
    solverComplete = true;
    return;
  }

  const availableMoves = solver
    .getAccessibleNeighbours()
    .filter(cell => !solverVisited.has(cell.index));

  if (availableMoves.length > 0) {
    const next = availableMoves[0];

    solverVisited.add(next.index);
    solverStack.push(next);
    solver = next;
  } else if (solverStack.length > 1) {
    // Return along the current route after reaching a dead end.
    solverStack.pop();
    solver = solverStack[solverStack.length - 1];
  }

  if (solver.column === cols - 1 && solver.row === rows - 1) {
    solverComplete = true;
  }
}

function drawStartAndEnd() {
  noStroke();

  // Start
  fill(START_COLOUR);
  rect(4, 4, CELL_SIZE - 8, CELL_SIZE - 8, 4);

  // Exit
  fill(END_COLOUR);
  rect(
    (cols - 1) * CELL_SIZE + 4,
    (rows - 1) * CELL_SIZE + 4,
    CELL_SIZE - 8,
    CELL_SIZE - 8,
    4
  );
}

function drawSolver() {
  if (!solver) {
    return;
  }

  const x = solver.column * CELL_SIZE;
  const y = solver.row * CELL_SIZE;

  noStroke();
  fill(solverComplete ? SOLVER_COMPLETE_COLOUR : SOLVER_COLOUR);
  rect(x + 5, y + 5, CELL_SIZE - 10, CELL_SIZE - 10, 3);
}

function removeWalls(first, second) {
  const horizontalDifference = first.column - second.column;
  const verticalDifference = first.row - second.row;

  if (horizontalDifference === 1) {
    first.walls.left = false;
    second.walls.right = false;
  } else if (horizontalDifference === -1) {
    first.walls.right = false;
    second.walls.left = false;
  }

  if (verticalDifference === 1) {
    first.walls.top = false;
    second.walls.bottom = false;
  } else if (verticalDifference === -1) {
    first.walls.bottom = false;
    second.walls.top = false;
  }
}

function getCell(column, row) {
  if (column < 0 || row < 0 || column >= cols || row >= rows) {
    return undefined;
  }

  return grid[column + row * cols];
}

class Cell {
  constructor(column, row) {
    this.column = column;
    this.row = row;
    this.index = column + row * cols;
    this.visited = false;

    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
  }

  getRandomUnvisitedNeighbour() {
    const neighbours = [
      getCell(this.column, this.row - 1),
      getCell(this.column + 1, this.row),
      getCell(this.column, this.row + 1),
      getCell(this.column - 1, this.row)
    ].filter(cell => cell && !cell.visited);

    return neighbours.length > 0 ? random(neighbours) : undefined;
  }

  getAccessibleNeighbours() {
    const neighbours = [];

    if (!this.walls.top) {
      neighbours.push(getCell(this.column, this.row - 1));
    }

    if (!this.walls.right) {
      neighbours.push(getCell(this.column + 1, this.row));
    }

    if (!this.walls.bottom) {
      neighbours.push(getCell(this.column, this.row + 1));
    }

    if (!this.walls.left) {
      neighbours.push(getCell(this.column - 1, this.row));
    }

    return neighbours.filter(Boolean);
  }

  highlight() {
    noStroke();
    fill(GENERATOR_COLOUR);
    rect(
      this.column * CELL_SIZE,
      this.row * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }

  show() {
    const x = this.column * CELL_SIZE;
    const y = this.row * CELL_SIZE;

    if (this.visited) {
      noStroke();
      fill(VISITED_CELL_COLOUR);
      rect(x, y, CELL_SIZE, CELL_SIZE);
    }

    stroke(MAZE_WALL_COLOUR);
    strokeWeight(2);

    if (this.walls.top) {
      line(x, y, x + CELL_SIZE, y);
    }

    if (this.walls.right) {
      line(x + CELL_SIZE, y, x + CELL_SIZE, y + CELL_SIZE);
    }

    if (this.walls.bottom) {
      line(x + CELL_SIZE, y + CELL_SIZE, x, y + CELL_SIZE);
    }

    if (this.walls.left) {
      line(x, y + CELL_SIZE, x, y);
    }
  }
}

function mousePressed() {
  generateNewMaze();
}
