class Token {
    constructor(type, lexeme, lineNumber, tokenClass) {
        this.type = type;
        this.lexeme = lexeme;
        this.lineNumber = lineNumber;
        this.class = tokenClass;
    }

    toString() {
        return `Type: ${this.type}, Lexeme: ${this.lexeme}, Line: ${this.lineNumber}, Class: ${this.class}`;
    }
}

export default Token;
