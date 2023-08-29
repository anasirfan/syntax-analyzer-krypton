class Literal {
    constructor() {
        this.integerRegex = /^[0-9]+$/;
        this.floatingPointRegex = /^[0-9]+\.[0-9]+$/;
        // this.stringRegex = /^(['"])(?:\\\1|(?!\1)[\s\S])*\1$/;
        this.stringRegex = /^(.*[\\][trn].*)*$/;
        this.BoolRegex= /^(true|false)$/;



    }

    isIntegerLiteral(lexeme) {
        return this.integerRegex.test(lexeme);
    }
    isBoolLiteral(lexeme) {
        return this.BoolRegex.test(lexeme);
    }

    isFloatingPointLiteral(lexeme) {
        return this.floatingPointRegex.test(lexeme);
    }

    isStringLiteral(lexeme) {
        return this.stringRegex.test(lexeme);
    }
}

export default Literal;
