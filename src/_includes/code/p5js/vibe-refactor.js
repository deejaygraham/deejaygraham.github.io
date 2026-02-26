/* eslint-disable */
let code = [
'#include <stdio.h>',
'/* cat: concatenate files, version 2',
'from page 145 of The C Programming Language',
'by Kernighan and Ritchie',
'*/',
'main(int argc, char *argv[])',
'{',
'  FILE *fp;',
'  void filecopy(FILE *, FILE *);',
'  char *prog = argv[0]; /* program name for errors */',
' ',
'  if (argc == 1 ) /* no args; copy standard input */',
'    filecopy(stdin, stdout);',
'  else',
'    while (--argc > 0)',
'      if ((fp = fopen(*++argv, "r")) == NULL) {',
'        fprintf(stderr, "%s: cannot open %s\n", prog, *argv);',
'        exit(1);',
'      } else {',
'        filecopy(fp, stdout);',
'        fclose(fp);',
'      }',
' ',
'  if (ferror(stdout)) {',
'    fprintf(stderr, "%s: error writing stdout\n", prog);',
'    exit(2);',
'  }',
' ',
'  exit(0);',
'}'
];

const editorParams = {
	backgroundColour: 'black',
	fontColour: 'rgb(0, 255, 0)',
	fontName: "Courier New",
	fontSize: 16,
	// everything else depends on font size
	characterSpacing: 10,
	characterWidth: 10,
	lineSpacing: 20,
	leftMargin: 10,
	topMargin: 20,
	refreshSpeed: 10,
	caret: {
		width: 1,
		height: 13,
		descent: 3,
		refreshSpeed: 10,
	}
};

const caret = {
	column: 0,
	row: 0,
	shown: true,
	count: 0
};

let action = 'thinking';
let thinkingTime = 20;
let thinkingCount = 0;
let oldCharacter = null;

const destination = {
	column: 0,
	row: 0,
	set: false
}

function setup() {
	createCanvas(windowWidth, windowHeight).parent("vibe-refactor");
	textFont(editorParams.fontName);
	textSize(editorParams.fontSize);
	frameRate(editorParams.refreshSpeed);
}

function draw() {

	// editing fsm
	if (action === 'thinking') {
		// wait for a random amount of time ...
		thinkingCount++;

		if (thinkingCount > thinkingTime) {
			action = 'picking';
			thinkingCount = 0;
			thinkingTime = 0;
		}
	} else if (action === 'picking') {
		const pick = pickAnEditPlace(code);
		destination.row = pick.row;
		destination.column = pick.column;
		destination.set = true;
		action = 'navigating';
	} else if (action === 'navigating') {
		if ((caret.row === destination.row) && (caret.column === destination.column)) {
			action = 'delete';
		}
		else {
			// move to the right place
			if (caret.row < destination.row) {
				moveCaretDown(caret, code);
			} else if (caret.row > destination.row) {
				moveCaretUp(caret, code);
			} else if (caret.column < destination.column) {
				moveCaretRight(caret, code);
			} else {
				moveCaretLeft(caret, code);
			}
		}
	} else if (action === 'delete') {
		// more realistic to delete, move cursor, then add and move
		// cursor back
		oldCharacter = getCurrentCharacter(caret, code);

		if (oldCharacter === ' ') {
			action = 'thinking';
			thinkingCount = 0;
			thinkingTime = 0;
		} else {
			code[caret.row] = removeCharacterAt(code[caret.row], caret.column);
			moveCaretLeft(caret, code);	
			action = 'pause';
			thinkingCount = 0;
			thinkingTime = int(random(2, 10));
		}
	} else if (action === 'pause') {
		thinkingCount++;

		if (thinkingCount > thinkingTime) {
			action = 'insert';
			thinkingCount = 0;
			thinkingTime = 0;
		}
	} else if (action === 'insert') {
		const newCharacter = decideOnReplacementCharacter(oldCharacter);
		code[caret.row] = insertCharacterAt(code[caret.row], caret.column + 1, newCharacter);
		moveCaretRight(caret, code);
		
		action = 'thinking';
		thinkingCount = 0;
		thinkingTime = int(random(5, 50));
	}
	
	background(editorParams.backgroundColour);
	fill(editorParams.fontColour);
	
	let x = editorParams.leftMargin;
	let y = editorParams.topMargin;

	let columnNumber = 0;
	let rowNumber = 0;
	
	for (const codeLine of code) {
		columnNumber = 0;
		x = editorParams.leftMargin;
		
		for (const letter of codeLine) {
			noStroke();
			text(letter, x, y);

			if ((rowNumber === caret.row) && (columnNumber === caret.column)) {
				drawCaret(caret, x, y);
			}
			
			x += editorParams.characterSpacing;
			columnNumber++;
		}
		y += editorParams.lineSpacing;
		rowNumber++;
	}
}

function keyPressed() {
	// move the caret
	if (keyCode === UP_ARROW) {
		moveCaretUp(caret, code);
	} else if (keyCode === DOWN_ARROW) {
		moveCaretDown(caret, code); 
	} else if (keyCode === LEFT_ARROW) {
		moveCaretLeft(caret, code);
	} else if (keyCode === RIGHT_ARROW) {
		moveCaretRight(caret, code);
	}
}

function moveCaretLeft(caret, code) {
	if (caret.column > 0) {
		caret.column--;
	}
}

function moveCaretRight(caret, code) {
	const maxColumn = code[caret.row].length - 1;

	if (caret.column < maxColumn) {
		caret.column++;
	}
}

function moveCaretUp(caret, code) {
	if (caret.row > 0) {
		caret.row--;
	}
	
	const maxColumn = code[caret.row].length - 1;
	if (caret.column > maxColumn) {
		caret.column = maxColumn;
	}
}
	
function moveCaretDown(caret, code) {
	const maxRow = code.length - 1;
	if (caret.row < maxRow ) {
		caret.row++
	}

	// make sure it doesn't go over the end of next line
	const maxColumn = code[caret.row].length - 1;
	if (caret.column > maxColumn) {
		caret.column = maxColumn;
	}
}

function drawCaret(caret, x, y) {
	strokeWeight(editorParams.caret.width);
	if (caret.shown) {
		stroke(editorParams.fontColour);
	} else {
		stroke(editorParams.backgroundColour);
	}

	// animate caret
	// at a slower speed than the screen refresh
	caret.count++;

	if (caret.count > editorParams.caret.refreshSpeed) {
		caret.count = 0;
	}
	caret.shown = caret.count <= (editorParams.caret.refreshSpeed / 2);
	
	const lineHorizontal = x + editorParams.characterWidth;
	const lineStart = y + editorParams.caret.descent;
	const lineStop =  y - editorParams.caret.height;
	line(lineHorizontal, lineStart, lineHorizontal, lineStop);
}

function pickAnEditPlace(code) {
	const whichLine = int(random(0, code.length));
	const whichColumn = int(random(0, code[whichLine].length));
	return { 
		row: whichLine, 
		column: whichColumn
	};
}

function replaceCharacterAt(str, index, replacement) {
	if (index < 0 || index >= str.length) {
		throw new RangeError("index out of bounds");
	}
	if (replacement.length !== 1) {
		throw new Error("replacement must be a single character");
	}

	return str.slice(0, index) + replacement + str.slice(index + 1);
}

function removeCharacterAt(str, index) {
	if (index < 0 || index >= str.length) {
		throw new RangeError("index out of bounds");
	}

	return str.slice(0, index) + str.slice(index + 1);
}

function insertCharacterAt(str, index, replacement) {
	if (index < 0) {
		throw new RangeError("index out of bounds");
   }
	if (replacement.length !== 1) {
		throw new Error("replacement must be a single character");
   }

	if (str.length === 0) {
		return replacement;
	}

	return str.slice(0, index) + replacement + str.slice(index);
}

const isAlpha = ch => /\p{L}/u.test(ch);

const isNumeric = ch => /\p{Nd}/u.test(ch);

const isUpper = ch => /\p{Lu}/u.test(ch);

const isLower = ch => /\p{Ll}/u.test(ch);

const isPunctuation = ch => /\p{P}/u.test(ch);

function getCurrentCharacter(caret, code) {
	return code[caret.row][caret.column];
}

function makeEdit(caret, code, row, column) {
	const oldCharacter = getCurrentCharacter(caret, code);
	const newCharacter = decideOnReplacementCharacter(oldCharacter);
	
	return replaceCharacterAt(code[caret.row], caret.column, newCharacter);
}

function decideOnReplacementCharacter(oldCharacter) {
	let newCharacter = '';
	if (isAlpha(oldCharacter)) {
		const characters = "abcdefghijklmnopqrstuvwxyz";
		newCharacter = characters[int(random(0, characters.length))];

		if (isUpper(oldCharacter)) {
			newCharacter = newCharacter.toUpperCase();
		}
	} else if (isNumeric(oldCharacter)) {
		const characters = "1234567890";
		newCharacter = characters[int(random(0, characters.length))];
	} else if (isPunctuation(oldCharacter)) {
		const characters = ":?/{}[]!%&*+=|><#";
		newCharacter = characters[int(random(0, characters.length))];
	} else {
		newCharacter = ' ';
	}

	return newCharacter;
}
