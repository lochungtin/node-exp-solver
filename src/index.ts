import { Aux } from "./aux";

class Solver {

    static tokenize = (eq: string): Array<string> => {
        let res: Array<string> = [];
        let term: string = '';

        eq.split('').forEach((ch: string, index: number) => {
            switch(true) {
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
        return [];
    }

    static solve = (rpn: Array<string>): number => {
        return 0;
    }

    // private methods
}

export = Solver;
