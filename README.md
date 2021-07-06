# Node Expression Solver

Mathematical expression solver / Reverse Polish Notation calculator for NodeJS

**Features**

- Solve infix-notated mathematical expressions
- Solve RPN expressions
- Converts infix-notated expressions to RPN
- Tokenize infix-notated expressions
    - From string to array
    - Able to handle negative numbers
    - Spacing independent

## Install

With NPM:
```
npm install --save @enigmaoffline/node-exp-solver
```

## Usage

```js
const Solver = require('@enigmaoffline/node-exp-solver');

// Tokenization
console.log(Solver.tokenize('-1+2*(3-4)/5+(-6+-7)'));
// => [ '-1', '+', '2', '*', '(', '3', '-', '4', ')', '/', '5', '+', '(', '-6', '+', '-7', ')' ]
console.log(Solver.tokenize('1*2^3+3'));
// => [ '1', '*', '2', '^', '3', '+', '3' ]


// Infix to RPN
console.log(Solver.toRPN(Solver.tokenize('1+2*3')));
// => [ '1', '2', '3', '*', '+' ]


// Basic Solve
console.log(Solver.solve(Solver.tokenize('1+2*3')));
// => 7

// Solve RPN
console.log(Solver.solveRPN(Solver.toRPN(Solver.tokenize('-2+3^2+1'))));
// => 8

```

## Next Steps

1. Ability to handle Min / Max functions
2. Ability to handle trig functions
3. Ability to handle log functions

<a href="https://github.com/lochungtin/node-exp-solver/blob/master/LICENSE">LICENSE - MIT - Lo Chung Tin</a>
