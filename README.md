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

console.log(Solver.tokenize('-1+2*(3-4)/5+(-6+-7)'));
// => [ '-1', '+', '2', '*', '(', '3', '-', '4', ')', '/', '5', '+', '(', '-6', '+', '-7', ')' ]

console.log(Solver.toRPN('1+2*3'.split('')));
// => [ '1', '2', '3', '*', '+' ]

console.log(console.log(Solver.solve('1+2*3'.split(''))));
// => 7
```

## Next Step

1. Ability to handle power functions
    1. Power functions
    2. Root functions
2. Ability to handle trig functions
3. Ability to handle log functions

<a href="https://github.com/lochungtin/node-exp-solver/blob/master/LICENSE">LICENSE - MIT - Lo Chung Tin</a>
