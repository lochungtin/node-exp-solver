import { Aux } from "./aux";

interface OpMapType {
    [key: string]: number,
}

const precMap: OpMapType = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3,
}

const assoMap: OpMapType = {
    '+': 0,
    '-': 0,
    '*': 0,
    '/': 0,
    '^': 1,
}

class Solver {

    /**
     * Tokenize an infix-notated expression string
     * @param {string} exp      - mathematical expression
     * @returns {Array<string>} - tokenized expression
     */
    static tokenize = (exp: string): Array<string> => {
        let res: Array<string> = [];
        let term: string = '';

        exp
            .replace(/ /g, '')
            .split('')
            .forEach((ch: string, index: number) => {
                switch (true) {
                    // negative numbers
                    case ch === '-' && index === 0:
                    case ch === '-' && term === '' && Aux.isOP(res[res.length - 1]):
                    case ch === '-' && term === '' && res[res.length - 1] === '(':
                        term = '-';
                        break;
                    // operands
                    case Aux.isOP(ch):
                    case Aux.isPA(ch):
                        if (term !== '')
                            res.push(term);

                        res.push(ch);
                        term = '';
                        break;
                    // numbers
                    default:
                        term += ch;
                }
            });

        // push remaining term to result
        if (term !== '')
            res.push(term);

        return res;
    }

    /**
     * Converts an infix-notated expression to reverse polish notation
     * @param {Array<string>} exp   - tokenized infix-notated expression
     * @returns {Array<string>}     - converted RPN expression
     */
    static toRPN = (exp: Array<string>): Array<string> => {
        let outStack: Array<string> = [];
        let opStack: Array<string> = [];

        while (exp.length > 0) {
            let head: string = exp.splice(0, 1)[0];

            switch (true) {
                // handle parentheses
                case Aux.isPA(head):
                    if (head === '(')
                        opStack.push(head);
                    else {
                        while (opStack[opStack.length - 1] !== '(')
                            outStack.push(opStack.pop() || '');

                        opStack.pop();
                    }
                    break;
                // handle operand
                case Aux.isOP(head):
                    while (
                        opStack.length > 0 && (
                            precMap[opStack[opStack.length - 1]] > precMap[head] ||
                            (
                                precMap[opStack[opStack.length - 1]] === precMap[head] &&
                                assoMap[head] === 0
                            )
                        ))
                        outStack.push(opStack.pop() || '');

                    opStack.push(head);
                    break;
                // handle number
                default:
                    outStack.push(head);
            }
        }

        // push remaining
        while (opStack.length > 0)
            outStack.push(opStack.pop() || '');

        return outStack;
    }

    /**
     * Evaluates an infix-notated expression
     * @param {Array<string>} exp   - tokenzied infix-notated expression
     * @returns                     - evaluated value
     */
    static solve = (exp: Array<string>): number => Solver.solveRec(Solver.toRPN(exp));

    /**
     * Evaluates a reverse polish notated expression
     * @param {Array<string>} rpn   - tokenized rpn expression
     * @returns {number}            - evaluated value
     */
    static solveRPN = (rpn: Array<string>): number => Solver.solveRec(rpn);

    // private methods

    /**
     * Recursively solve an RPN expression
     * @param {Array<string>} rpn       - original RPN expression 
     * @param {Array<number>} stack     - memory stack used for recursive computation
     * @returns {number}                - evaluated value
     */
    private static solveRec = (rpn: Array<string>, stack: Array<number> = []): number => {
        if (rpn.length === 0)
            return stack[0];
        else {
            let head: string = rpn.splice(0, 1)[0];

            if (Aux.isOP(head)) {
                let num1: number = stack.splice(stack.length - 1, 1)[0];
                let num2: number = stack.splice(stack.length - 1, 1)[0];

                // recursive calculation
                switch (head) {
                    case '+':
                        return Solver.solveRec(rpn, [...stack, num2 + num1]);
                    case '-':
                        return Solver.solveRec(rpn, [...stack, num2 - num1]);
                    case '*':
                        return Solver.solveRec(rpn, [...stack, num2 * num1]);
                    case '/':
                        return Solver.solveRec(rpn, [...stack, num2 / num1]);
                    case '^':
                        return Solver.solveRec(rpn, [...stack, Math.pow(num2, num1)]);
                }
            }
            return Solver.solveRec(rpn, [...stack, parseFloat(head)]);
        }
    }
}

export = Solver;
