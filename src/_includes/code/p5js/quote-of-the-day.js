/* eslint-disable */
const QUOTES = [
    {
        quote: "Always wanted to travel back in time to try fighting a younger version of yourself? Software development is the career for you!",
        author: "@Loh"
    },
    {
        quote: "The two hardest problems in Computer Science are: Human communication; Getting people in tech to believe that human communication is important",
        author: "Hazel Weakly"
    },
    {
        quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
        author: "Harold Abelson"
    },
    {
        quote: "First, solve the problem. Then, write the code.",
        author: "John Johnson"
    },
    {
        quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author: "Martin Fowler"
    },
    {
        quote: "Premature optimisation is the root of all evil.",
        author: "Donald Knuth"
    },
    {
        quote: "Deleted code is debugged code.",
        author: "Jeff Sickel"
    },
    {
        quote: "Code never lies, comments sometimes do.",
        author: "Ron Jeffries"
    },
    {
        quote: "Simplicity is prerequisite for reliability.",
        author: "Edsger Dijkstra"
    },
    {
        quote: "Controlling complexity is the essence of computer programming.",
        author: "Brian Kernighan"
    },
    {
        quote: "The best code is no code at all.",
        author: "Jeff Atwood"
    },
    {
        quote: "Weeks of coding can save you hours of planning.",
        author: "Unknown"
    },
    {
        quote: "The most disastrous thing that you can ever learn is your first programming language.",
        author: "Alan Kay"
    },
    {
        quote: "Every system is perfectly designed to get the results it gets.",
        author: "W. Edwards Deming"
    },
    {
        quote: "Architecture represents the significant design decisions that shape a system.",
        author: "Grady Booch"
    },
    {
        quote: "Make it work, make it right, make it fast.",
        author: "Kent Beck"
    },
    {
        quote: "There are two ways of constructing software: one way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies. The first method is far more difficult.",
        author: "C.A.R. Hoare"
    },
	{
		quote: "Adding manpower to a late software project, makes it later.",
		author: "Frederick Brooks"
	},
	{
		quote: "It is in the doing of the work that we discover the work that we must do. Doing exposes reality.",
		author: "Woody Zuill"
	}
];

const PAPER = "#eee9df";
const INK = "#18252b";

let selectedQuote;
let reveal = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  selectedQuote = random(QUOTES);
}

function draw() {
  background(PAPER);
  drawQuote();

  reveal = min(1, reveal + 0.025);
  if (reveal === 1) {
    noLoop();
  }
}

function drawQuote() {
  const margin = pageMargin();
  const maxWidth = width - margin * 2;
  let fontSize = width < 620
    ? min(48, width * 0.105, height * 0.11)
    : min(84, width * 0.063, height * 0.11);
  const maximumLines = width < 620 ? 6 : 4;

  textFont("Georgia");
  textStyle(NORMAL);

  let lines;
  do {
    textSize(fontSize);
    lines = wrapText(selectedQuote.quote, maxWidth * (width < 620 ? 1 : 0.88));
    fontSize -= 1;
  } while (lines.length > maximumLines && fontSize > 30);

  fontSize += 1;
  textSize(fontSize);
  const leading = fontSize * 1.02;
  const blockHeight = lines.length * leading;
  const startY = height * 0.48 - blockHeight / 2;
  const eased = 1 - pow(1 - reveal, 3);
  const rise = (1 - eased) * 22;

  noStroke();
  fill(24, 37, 43, 255 * eased);
  textAlign(LEFT, TOP);
  lines.forEach((line, index) => {
    text(line, margin, startY + index * leading + rise);
  });

  const authorY = height - 105;
  textFont("Arial");
  textStyle(BOLD);
  textSize(width < 620 ? 11 : 12);
  textAlign(LEFT, TOP);
  fill(24, 37, 43, 180 * eased);
  text(`—  ${selectedQuote.author.toUpperCase()}`, margin, authorY + rise);

  textStyle(NORMAL);
  textAlign(RIGHT, TOP);
  fill(24, 37, 43, 110 * eased);
  const quoteNumber = String(QUOTES.indexOf(selectedQuote) + 1).padStart(2, "0");
  text(`${quoteNumber} / ${String(QUOTES.length).padStart(2, "0")}`, width - margin, authorY + rise);
}

function wrapText(value, maxWidth) {
  const words = value.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (textWidth(testLine) > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

function pageMargin() {
  return width < 620 ? 24 : min(76, width * 0.05);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  makeTexture();
  reveal = 1;
  loop();
}
