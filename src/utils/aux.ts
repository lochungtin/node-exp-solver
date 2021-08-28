interface OpMapType {
    [key: string]: number,
}

export class Aux {

    static precMap: OpMapType = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3,
    }

    static assoMap: OpMapType = {
        '+': 0,
        '-': 0,
        '*': 0,
        '/': 0,
        '^': 1,
    }

    static funcMap: OpMapType = {
        'sin': 0,
        'cos': 0,
        'tan': 0,
        'max': 0,
        'min': 0,
        'ln': 0,
    }

    // operator checker
    static isOP = (op: string): boolean => ['+', '-', '*', '/', '^'].indexOf(op) !== -1;

    // function checker
    static isFN = (fn: string): boolean => ['sin', 'cos', 'tan', 'max', 'min', 'ln'].indexOf(fn) !== -1;

    // association checker
    static isLA = (op: string): boolean => ['+', '-', '*', '/'].indexOf(op) !== -1;

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