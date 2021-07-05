export class Aux {

    static isOP = (op: string): boolean => ['+', '-', '*', '/'].indexOf(op) !== -1;

    static isPA = (op: string): boolean => op === '(' || op === ')';

    static validate = (tokens: Array<string>): boolean => {
        let stack: Array<string> = [];

        for (let i = 0; i < tokens.length; ++i) {
            let token = tokens[i];
            if (token === '(')
                stack.push('(');
            if (token === ')') {
                if (stack.length === 0) 
                    return false;
                stack.pop();
            }
        }
    
        return stack.length === 0;
    }
}