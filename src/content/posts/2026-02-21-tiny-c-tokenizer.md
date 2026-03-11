---
title: Tiny C Tokenizer
tags: [code, javscript]
---

I had an idea for a p5js project but it requires a way to make sense of some early version of C code. Specifically [K&R style C code](https://en.wikipedia.org/wiki/The_C_Programming_Language)
from way back in the dawn of time.

For this project, I only need to know the type of tokens in the source code - what is a keyword, what is a comment etc. For this, then, I built a tiny tokenizer similar to the kind of thing 
you would see in the front end of a language compiler or interpreter. Here then is the code and some tests that run against it.

## Example

Example code of the kind you might see in K&R:

```cpp
#include <stdio.h>
/* Count lines in stdin */
main()
{
    int c, nl;
    nl = 0;
    while ((c = getchar()) != EOF)
        if (c == '\n')
            nl = nl + 1;
    printf("%d\n", nl);
}
```

## Code

### tokenizer.js

```js
export const KEYWORDS = new Set([
  "auto","break","case","char","continue","default","do","double","else","enum",
  "extern","float","for","goto","if","int","long","register","return","short",
  "sizeof","static","struct","switch","typedef","union","unsigned","void","while"
]);

const MULTI_OPS = [
  ">>=", "<<=", "->", "++", "--", "&&", "||", "<=", ">=", "==", "!=",
  "+=", "-=", "*=", "/=", "%=", "&=", "^=", "|=", "<<", ">>"
];

const SINGLE_OPS = new Set([
  "{","}","(",")","[","]",
  ".", ",", ";", "?",
  ":", "~", "!", "^",
  "&", "|", "+", "-",
  "*", "/", "%", "=",
  "<", ">", "#"
]);

export default function tokenize(input) {
  const tokens = [];
  let i = 0, line = 1, col = 1;
  let atBOL = true;
  const N = input.length;

  const peek = (n = 0) => (i + n < N ? input[i + n] : "");
  const next = () => {
    const ch = i < N ? input[i++] : "";
    if (ch === "\n") { line += 1; col = 1; atBOL = true; }
    else { col += 1; atBOL = false; }
    return ch;
  };
  const add = (type, value, startIdx, startLine, startCol) =>
    tokens.push({ type, value, start: startIdx, end: i, line: startLine, col: startCol });

  const isIdentStart = ch => /[A-Za-z_]/.test(ch);
  const isIdentPart  = ch => /[A-Za-z0-9_]/.test(ch);
  const isDecDigit   = ch => ch >= "0" && ch <= "9";
  const isHexDigit   = ch => /[0-9A-Fa-f]/.test(ch);

  function consumeWhitespaceOrNewlines() {
    const startIdx = i, startLine = line, startCol = col;
    let sawNewline = false, s = "";
    while (i < N) {
      const ch = peek();
      if (ch === " " || ch === "\t" || ch === "\r") { s += next(); continue; }
      if (ch === "\n") { s += next(); sawNewline = true; continue; }
      break;
    }
    if (!s) return false;
    add(sawNewline ? "newline" : "whitespace", s, startIdx, startLine, startCol);
    return true;
  }

  function consumeCommentOrSlash() {
    const startIdx = i, startLine = line, startCol = col;
    if (peek() !== "/") return false;
  
    // Lookahead without consuming to decide the case
    const ch1 = peek(1);
  
    if (ch1 === "*") {
      // block comment: consume '/' then '*'
      next(); next();
      let s = "/*";
      while (i < N) {
        const c = next();
        s += c;
        if (c === "*" && peek() === "/") {
          s += next(); // '/'
          break;
        }
      }
      add("comment", s, startIdx, startLine, startCol);
      return true;
    }

    if (ch1 === "=") {
      // '/=' compound operator
      next(); // '/'
      next(); // '='
      add("operator", "/=", startIdx, startLine, startCol);
      return true;
    }
  
    // K&R mode: '//' is NOT a comment — treat as two operators.
    next(); // just '/'
    add("operator", "/", startIdx, startLine, startCol);
    return true;
  }

  function consumeStringLiteral() {
    const startIdx = i, startLine = line, startCol = col;
    if (peek() !== '"') return false;
    let s = next();
    while (i < N) {
      const c = next();
      s += c;
      if (c === "\\") { if (i < N) s += next(); continue; }
      if (c === '"') break;
      if (c === "\n") break; // tolerant
    }
    add("string", s, startIdx, startLine, startCol);
    return true;
  }

  function consumeCharLiteral() {
    const startIdx = i, startLine = line, startCol = col;
    if (peek() !== "'") return false;
    let s = next();
    while (i < N) {
      const c = next();
      s += c;
      if (c === "\\") { if (i < N) s += next(); continue; }
      if (c === "'") break;
      if (c === "\n") break;
    }
    add("char", s, startIdx, startLine, startCol);
    return true;
  }

  function consumeNumber() {
    const startIdx = i, startLine = line, startCol = col;
    let s = "";

    // Hex integer: 0x...
    if (peek() === "0" && (peek(1) === "x" || peek(1) === "X")) {
      s += next(); s += next();
      while (isHexDigit(peek())) s += next();
      add("number", s, startIdx, startLine, startCol);
      return true;
    }

    // decimal / octal / float
    if (isDecDigit(peek())) {
      while (isDecDigit(peek())) s += next();

      if (peek() === "." && isDecDigit(peek(1))) {
        s += next();
        while (isDecDigit(peek())) s += next();
      }

      if (peek() === "e" || peek() === "E") {
        const saveI = i, saveLine = line, saveCol = col;
        let t = next();
        let t2 = "";
        if (peek() === "+" || peek() === "-") t2 += next();
        if (isDecDigit(peek())) {
          t2 += next();
          while (isDecDigit(peek())) t2 += next();
          s += t + t2;
        } else {
          i = saveI; line = saveLine; col = saveCol;
        }
      }

      add("number", s, startIdx, startLine, startCol);
      return true;
    }

    // .5 style
    if (peek() === "." && isDecDigit(peek(1))) {
      s += next();
      while (isDecDigit(peek())) s += next();

      if (peek() === "e" || peek() === "E") {
        const saveI = i, saveLine = line, saveCol = col;
        let t = next(), t2 = "";
        if (peek() === "+" || peek() === "-") t2 += next();
        if (isDecDigit(peek())) {
          t2 += next();
          while (isDecDigit(peek())) t2 += next();
          s += t + t2;
        } else {
          i = saveI; line = saveLine; col = saveCol;
        }
      }

      add("number", s, startIdx, startLine, startCol);
      return true;
    }

    return false;
  }

  function consumeIdentifierOrKeyword() {
    const startIdx = i, startLine = line, startCol = col;
    if (!isIdentStart(peek())) return false;
    let s = next();
    while (isIdentPart(peek())) s += next();
    add(KEYWORDS.has(s) ? "keyword" : "identifier", s, startIdx, startLine, startCol);
    return true;
  }

  function consumePreprocessorLine() {
    const startIdx = i, startLine = line, startCol = col;
    if (peek() !== "#") return false;
    let s = "";
    while (i < N) {
      const ch = next();
      s += ch;
      if (ch === "\n") break;
    }
    add("preprocessor", s, startIdx, startLine, startCol);
    return true;
  }

  function consumeOperatorOrPunctuator() {
    const startIdx = i, startLine = line, startCol = col;

    for (const op of MULTI_OPS) {
      let ok = true;
      for (let k = 0; k < op.length; k++) {
        if (peek(k) !== op[k]) { ok = false; break; }
      }
      if (ok) {
        for (let k = 0; k < op.length; k++) next();
        add("operator", op, startIdx, startLine, startCol);
        return true;
      }
    }

    const ch = peek();
    if (SINGLE_OPS.has(ch)) {
      const v = next();
      const punct = (v === "." || v === "," || v === ";" || v === "{" || v === "}" ||
                     v === "(" || v === ")" || v === "[" || v === "]" || v === "?" || v === ":");
      add(punct ? "punctuator" : "operator", v, startIdx, startLine, startCol);
      return true;
    }
    return false;
  }

  while (i < N) {
    if (consumeWhitespaceOrNewlines()) continue;
    if (atBOL && peek() === "#") { if (consumePreprocessorLine()) continue; }
    if (peek() === "/") { if (consumeCommentOrSlash()) continue; }
    if (consumeStringLiteral()) continue;
    if (consumeCharLiteral()) continue;
    if (consumeNumber()) continue;
    if (consumeIdentifierOrKeyword()) continue;
    if (consumeOperatorOrPunctuator()) continue;

    const startIdx = i, startLine = line, startCol = col;
    add("unknown", next(), startIdx, startLine, startCol);
  }

  return tokens;
}

```

### tests/tokenizer.test.js

Run using ```node --test tests/tokenizer.test.js```

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import tokenize from '../tokenizer.js';

function tmap(source) {
  const toks = tokenize(source);
  // Return a light-weight view for assertions
  return toks.map(t => ({ type: t.type, value: t.value }));
}

test('whitespace and newlines are preserved as tokens', () => {
  const src = "int  x;\n\nchar\t*y;";
  const toks = tokenize(src);
  assert.ok(toks.some(t => t.type === 'whitespace'), 'expected whitespace token');
  assert.ok(toks.some(t => t.type === 'newline'), 'expected newline token');
});

test('block comments are recognized; // is NOT a comment', () => {
  const src = [
    "int x; /* comment */ x = 1;",
    "y = 2; // not a comment in K&R mode"
  ].join("\n");

  const toks = tokenize(src);

  // 1) The block comment on line 1 must be a 'comment' token.
  const hasBlockComment = toks.some(t => t.type === 'comment' && t.value.startsWith('/*') && t.line === 1);
  assert.ok(hasBlockComment, 'expected a block comment token on line 1');

  // 2) On line 2, ensure there is NO comment token and that '//' are two operators.
  const line2 = toks.filter(t => t.line === 2);

  const anyCommentOnLine2 = line2.some(t => t.type === 'comment');
  assert.equal(anyCommentOnLine2, false, 'line 2 should not contain a comment token');

  // Find consecutive '/' operator tokens on line 2
  let slashPairs = 0;
  for (let i = 0; i < line2.length - 1; i++) {
    if (line2[i].type === 'operator' && line2[i].value === '/' &&
        line2[i+1].type === 'operator' && line2[i+1].value === '/') {
      slashPairs++;
    }
  }
  assert.ok(slashPairs >= 1, 'expected // to appear as two operator tokens on line 2');
});

test('preprocessor line only at BOL; consumes to end of physical line', () => {
  const src = [
    "#include <stdio.h>",
    "  #notPreprocBecauseNotBOL",
    "int main() {",
    "  # inside code but not at BOL",
    "  return 0;",
    "}"
  ].join("\n");

  const toks = tokenize(src);

  // 1) Line 1 is a single preprocessor token
  const line1 = toks.filter(t => t.line === 1);
  assert.ok(line1.some(t => t.type === 'preprocessor'), 'line 1 should be a preprocessor line');

  // 2) Line 2: no preprocessor token; '#' should be an operator
  const line2 = toks.filter(t => t.line === 2);
  assert.equal(line2.some(t => t.type === 'preprocessor'), false, 'line 2 must NOT be preprocessor');

  const hash2 = line2.find(t => t.value === '#');
  assert.ok(hash2, 'expected a # token on line 2');
  assert.equal(hash2.type, 'operator', 'indented # must be operator');

  // Optional: the word after '#' is an identifier (your minimal lexer)
  const ident2 = line2.find(t => t.type === 'identifier' && t.value === 'notPreprocBecauseNotBOL');
  assert.ok(ident2, 'expected identifier after # on line 2');

  // 3) Line 4: '#' inside code is also not preprocessor
  const line4 = toks.filter(t => t.line === 4);
  assert.equal(line4.some(t => t.type === 'preprocessor'), false, 'line 4 must NOT be preprocessor');

  const hash4 = line4.find(t => t.value === '#');
  assert.ok(hash4, 'expected a # token on line 4');
  assert.equal(hash4.type, 'operator', 'inline # must be operator');
});

test('identifiers vs keywords', () => {
  const src = "int main() { int returnx = 0; return returnx; }";
  const simple = tmap(src);
  const intTok = simple.find(t => t.value === 'int');
  const returnTok = simple.find(t => t.value === 'return');
  const returnxTok = simple.find(t => t.value === 'returnx');
  assert.equal(intTok.type, 'keyword');
  assert.equal(returnTok.type, 'keyword');
  assert.equal(returnxTok.type, 'identifier');
});

test('strings and chars with escapes', () => {
  const src = [
    "char c = '\\n';",
    "char *s = \"Hello\\tWorld\";"
  ].join("\n");
  const toks = tmap(src);
  assert.ok(toks.find(t => t.type === 'char' && t.value.includes("\\n")), 'char with escape not recognized');
  assert.ok(toks.find(t => t.type === 'string' && t.value.includes("\\t")), 'string with escape not recognized');
});

test('unterminated string/char are tolerated until newline', () => {
  const src = [
    "char *s = \"oops",
    "char c = 'x",
  ].join("\n");
  const toks = tokenize(src);
  // Expect a string token on line 1 and a char token on line 2 despite being unterminated
  const strTok = toks.find(t => t.type === 'string');
  const charTok = toks.find(t => t.type === 'char');
  assert.ok(strTok, 'unterminated string should still produce a string token');
  assert.ok(charTok, 'unterminated char should still produce a char token');
});

test('numbers: decimal, octal, hex, floats with exponents', () => {
  const src = [
    "int a = 0;",
    "int b = 0755;",      // octal
    "int c = 0xFF;",      // hex
    "double d = 1.25e-3;",// float with exponent
    "double e = .5;",     // leading dot
  ].join("\n");
  const toks = tmap(src).filter(t => t.type === 'number').map(t => t.value);
  assert.ok(toks.includes("0"), 'decimal 0 missing');
  assert.ok(toks.includes("0755"), 'octal missing');
  assert.ok(toks.includes("0xFF"), 'hex missing');
  assert.ok(toks.includes("1.25e-3"), 'float with exponent missing');
  assert.ok(toks.includes(".5"), 'leading-dot float missing');
});

test('operators: greedy multi-char recognition and singles', () => {
  const src = [
    // include <<= and >>= (compound)
    "a>>=1; b<<=2; c->d; ++i; --j;",
    // include &&, ||, and compound assignment ops
    "if (a && b || c) x += 1; y *= 2; z /= 3; w %= 4; v ^= 1; u |= 2;",
    // add plain shift operators here
    "m = p << 2; n = q >> 3;"
  ].join("\n");

  const toks = tokenize(src)
    .filter(t => t.type === 'operator')
    .map(t => t.value);

  // Multi-char operators we expect to see
  for (const op of [
    ">>=", "<<=", "->", "++", "--", "&&", "||",
    "+=", "*=", "/=", "%=", "^=", "|=",
    "<<", ">>"          // now present in the source
  ]) {
    assert.ok(toks.includes(op), `missing operator ${op}`);
  }
});

test('punctuation vs operator classification', () => {
  const src = "f(a, b); a ? b : c; struct S { int x; };";
  const tokens = tokenize(src);
  // ensure '?', ':' are punctuators, not operators
  const q = tokens.find(t => t.value === '?');
  const colon = tokens.find(t => t.value === ':');
  assert.equal(q.type, 'punctuator', '?: question mark should be punctuator');
  assert.equal(colon.type, 'punctuator', '?: colon should be punctuator');
  // braces/parentheses/commas/semicolons are punctuators
  for (const ch of ['{','}','(',')',',',';']) {
    const tok = tokens.find(t => t.value === ch);
    assert.ok(tok && tok.type === 'punctuator', `expected punctuator for ${ch}`);
  }
});

test('preprocessor line consumes to end-of-line only (no backslash continuations)', () => {
  const src = [
    "#define X 1 \\",
    "2",
    "X"
  ].join("\n");
  const toks = tokenize(src);
  // The first line should be one preprocessor token ending at the newline,
  // the '\' at end does NOT continue the directive in this minimal lexer.
  const pp = toks.find(t => t.type === 'preprocessor');
  assert.ok(pp, 'missing preprocessor token');
  assert.ok(!pp.value.includes("2"), 'preprocessor should not include following line');
  // The "2" should appear as a separate number on the next line
  assert.ok(toks.some(t => t.type === 'number' && t.value === '2'), 'expected separate number token "2"');
});

test('hash not at beginning-of-line is not preprocessor', () => {
  const src = "int x = 1; # not a preprocessor";
  const toks = tokenize(src);
  const hashTok = toks.find(t => t.value === '#');
  assert.ok(hashTok, 'should see # as a token');
  assert.equal(hashTok.type, 'operator', 'hash mid-line should be operator');
});

```
