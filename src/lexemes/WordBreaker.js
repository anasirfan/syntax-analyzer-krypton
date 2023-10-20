class WordBreaker {
    constructor() {
        this.wordBreakers = [' ', '\n', '\t', '\r', '.', '"', '\''];
        this.punctuatorMappings = {
            ":": true,
            ",": true,
            ".": true,
            "(": true,
            ")": true,
            "{": true,
            "}": true,
            "[": true,
            "]": true,
            ";": true,
        };
        this.operatorMappings = {
            "+=": true,
            "-=": true,
            "/=": true,
            "*=": true,
            "++": true,
            "--": true,
            "+": true,
            "-": true,
            "*": true,
            "/": true,
            "%": true,
            "&&": true,
            "||": true,
            "<=": true,
            ">=": true,
            "!=": true,
            "==": true,
            "!": true,
            ">": true,
            "<": true,
            "=": true,
        };
    }

    isVariable(lexeme) {
        return /^[a-zA-Z_]\w*$/.test(lexeme);
    }


    
    

    splitCode(code) {
        const lexemes = [];
        let currentLexeme = '';
        let inString = false;
        let inMultiLineComment=false;
    
        for (let i = 0; i < code.length; i++) {
            const char = code[i];
    
            if (char === '"' && (i === 0 || code[i - 1] !== '\\')) {
                inString = !inString;
            }
    
            if (inString) {
                currentLexeme += char;
                continue;
            }
            // if (char === '/' && code[i + 1] === '/') {
            //     // Handle "//" comment
            //     while (i < code.length && code[i] !== ';') {
            //         i++; // Move the index to the end of the comment
            //     }
            //     // No need to add anything to lexemes for comments
            // }

            if (char === '/' && code[i + 1] === '/') {
                // Handle single-line comment
                while (i < code.length && code[i] !== ';') {
                    i++; // Move the index to the end of the comment
                }
                continue; // Skip the rest of the loop for comments
            }
            if (char === '/' && code[i + 1] === '*' && !inString) {
                // Handle multi-line comment
                inMultiLineComment = true;
                i += 2; // Move the index past the '/*'
                continue; // Skip the rest of the loop for comments
            }
    
            if (char === '*' && code[i + 1] === '/' && inMultiLineComment) {
                // End of multi-line comment
                inMultiLineComment = false;
                i += 2; // Move the index past the '*/'
                continue; // Skip the rest of the loop for comments
            }
    
            if (inMultiLineComment) {
                continue; // Skip characters within a multi-line comment
            }

            
    
    
            if (this.operatorMappings[char]) {
                let combinedOperator = char;
                for (let j = i + 1; j < code.length; j++) {
                    const nextChar = code[j];
                    const combinedTest = combinedOperator + nextChar;
    
                    if (this.operatorMappings[combinedTest]) {
                        combinedOperator = combinedTest;
                        i = j; // Move the index to the last character of the combined operator
                    } else {
                        break;
                    }
                }
    
                if (currentLexeme !== '') {
                    lexemes.push(currentLexeme);
                    currentLexeme = '';
                }
    
                lexemes.push(combinedOperator);
            } else if (this.punctuatorMappings[char] || this.wordBreakers.includes(char)) {
                if (currentLexeme !== '') {
                    lexemes.push(currentLexeme);
                    currentLexeme = '';
                }
                if (char === '\n') {
                    lexemes.push('\n');
                } else if (this.punctuatorMappings[char]) {
                    lexemes.push(char);
                }
            } else {
                // Handle numeric literals (both integer and floating-point)
                if (/[0-9]/.test(char)) {
                    currentLexeme += char;
    
                    let isFloatingPoint = false;
                    for (let j = i + 1; j < code.length; j++) {
                        const nextChar = code[j];
                        if (nextChar === '.' && !isFloatingPoint) {
                            isFloatingPoint = true;
                            currentLexeme += nextChar;
                        } else if (/[0-9]/.test(nextChar)) {
                            currentLexeme += nextChar;
                        } else {
                            break;
                        }
                        i = j; // Move the index to the last character of the numeric literal
                    }
    
                    lexemes.push(currentLexeme);
                    currentLexeme = '';
                } else if (this.isVariableStart(char)) {
                    currentLexeme += char;
                    for (let j = i + 1; j < code.length; j++) {
                        const nextChar = code[j];
                        if (this.isVariablePart(nextChar)) {
                            currentLexeme += nextChar;
                        } else {
                            break;
                        }
                        i = j; // Move the index to the last character of the variable
                    }
                    lexemes.push(currentLexeme);
                    currentLexeme = '';
                } else {
                    currentLexeme += char;
                }
            }
        }
    
        if (currentLexeme !== '') {
            lexemes.push(currentLexeme);
        }
    
        return lexemes;
    }


  
    
 


    


    
    // Define the logic to check if the character is a valid starting character for a variable
    isVariableStart(char) {
        return /[a-zA-Z_]/.test(char);
    }

    // Define the logic to check if the character is a valid part of a variable name
    isVariablePart(char) {
        return /[a-zA-Z0-9_]/.test(char);
    }
}

export default WordBreaker;
