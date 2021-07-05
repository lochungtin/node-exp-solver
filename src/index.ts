import { Aux } from "./aux";

interface precMapType {
    [key: string]: number,
}

const precMap: precMapType = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
}

class Solver {

    static tokenize = (eq: string): Array<string> => {
        let res: Array<string> = [];
        let term: string = '';

        eq.split('').forEach((ch: string, index: number) => {
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

    static toRPN = (eq: Array<string>): Array<string> => {
        let outStack: Array<string> = [];
        let opStack: Array<string> = [];

        while (eq.length > 0) {
            let head: string = eq.splice(0, 1)[0];

            switch (true) {
                case Aux.isPA(head):
                    if (head === '(')
                        opStack.push(head);
                    else {
                        while (opStack[opStack.length - 1] !== '(')
                            outStack.push(opStack.pop() || '');

                        opStack.pop();
                    }
                    break;
                case Aux.isOP(head):
                    while (opStack.length > 0 && precMap[opStack[opStack.length - 1]] > precMap[head])
                        outStack.push(opStack.pop() || '');

                    opStack.push(head);
                    break;

                default:
                    outStack.push(head);
            }
        }

        while (opStack.length > 0)
            outStack.push(opStack.pop() || '');

        return outStack;
    }

    static solve = (eq: Array<string>): number => Solver.solveRec(Solver.toRPN(eq));

    // private methods

    static solveRec = (rpn: Array<string>, stack: Array<number> = []): number => {
        if (rpn.length === 0)
            return stack[0];
        else {
            let head: string = rpn.splice(0, 1)[0];
            
            if (Aux.isOP(head)) {
                let num1: number = stack.splice(stack.length - 1, 1)[0];
                let num2: number = stack.splice(stack.length - 1, 1)[0];

                switch (head) {
                    case '+':
                        return Solver.solveRec(rpn, [...stack, num2 + num1]);
                    case '-':
                        return Solver.solveRec(rpn, [...stack, num2 - num1]);
                    case '*':
                        return Solver.solveRec(rpn, [...stack, num2 * num1]);
                    case '/':
                        return Solver.solveRec(rpn, [...stack, num2 / num1]);
                }
            }
            return Solver.solveRec(rpn, [...stack, parseFloat(head)]);
        }
    }
}

export = Solver;
