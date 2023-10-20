import Token from './Token'; 
import Keyword from '../lexemes/Keyword'; 
import DataType from '../lexemes/DataType'; 
import Operator from '../lexemes/Operator'; 
import Punctuator from '../lexemes/Punctuator'; 
import WordBreaker from '../lexemes/WordBreaker';
import Literal from '../lexemes/Literal';
import Grammar from './Grammar';

class Lexer {
    constructor(code) {
        this.code = code;
        this.keywords = new Keyword(); 
        this.dataTypes = new DataType(); 
        this.operators = new Operator(); 
        this.punctuators = new Punctuator(); 
        this.wordBreaker = new WordBreaker();
        this.literal = new Literal();
        this.grammar = new Grammar();
        this.lineNumber = 1;
    }

    tokenize() {
        const lexemes = this.wordBreaker.splitCode(this.code);
        const tokens = [];
    
        // console.log('lexems: ' + lexemes);
    
        let i = 0;
        while (i < lexemes.length) {
            const lexeme = lexemes[i];
    
            if (lexeme === '\n') {
                this.lineNumber++;
                i++;
                continue;
            }
    
            const token = this.getTokenType(lexeme);
            console.log("lexeme: " + lexeme + " token: " + token);
    
            if (token) {
                tokens.push(new Token(token.type, lexeme, this.lineNumber, token.class));
    
                // Example: Check if the current lexeme is in the first set of a non-terminal
                if (this.checkFirstSet(lexeme, 'statement')) {
                    // Do something specific for statements
                    console.log(`Lexeme ${lexeme} is in the first set of 'statement'`);
                }
    
                // Example: Check if the current lexeme is in the follow set of a non-terminal
                if (this.checkFollowSet(lexeme, 'statement')) {
                    // Do something specific for statements
                    console.log(`Lexeme ${lexeme} is in the follow set of 'statement'`);
                }
    
                // // Assuming 'IF' is a keyword
                // if (token.type === 'Keyword' && token.class === 'IF') {
                //     // Check if the next lexeme is '('
                //     const nextLexeme = lexemes[i + 1];
                //     if (nextLexeme === '(') {
                //         // Proceed with parsing the condition
                //         // (you can call a separate function to handle if-else conditions)
                //         this.parseIfElseCondition(lexemes, i + 2, tokens);
                //     } else {
                //         throw new Error(`Unexpected token after 'IF': ${nextLexeme}`);
                //     }
                // }
            }
    
            i++;
        }
        tokens.push(new Token('EOF', 'EOF', -1, 'EOF'));
    
        // console.log(tokens);
    
        return tokens;
    }
     // Helper function to check if a lexeme is in the first set of a non-terminal
     checkFirstSet(lexeme, nonTerminal) {
        const firstSet = this.grammar.getFirstSet(nonTerminal);
        return firstSet.has(lexeme);
      }

     // Helper function to check if a lexeme is in the follow set of a non-terminal
  checkFollowSet(lexeme, nonTerminal) {
    const followSet = this.grammar.getFollowSet(nonTerminal);
    return followSet.has(lexeme);
  }

//   parseIfElseCondition(lexemes, startIndex, tokens) {
//     // Implement logic to parse the condition and statements
//     // Modify tokens array accordingly
//     // Update the line number as needed
// }

    getTokenType(lexeme) {

          if (this.keywords.isKeyword(lexeme)) {
            return { type: 'Keyword', class: this.keywords.getClass(lexeme) };
        } else if (this.dataTypes.isDataType(lexeme)) {
            return { type: 'DataType', class: this.dataTypes.getClass(lexeme) };
        } else if (this.operators.isOperator(lexeme)) {
            return { type: 'Operator', class: this.operators.getClass(lexeme) };
        } else if (this.punctuators.isPunctuator(lexeme)) {
            return { type: 'Punctuator', class: this.punctuators.getClass(lexeme) };
        } else if (this.literal.isIntegerLiteral(lexeme)) {
            return { type: 'IntegerLiteral', class: 'INTEGER' };
        } else if (this.literal.isFloatingPointLiteral(lexeme)) {
            return { type: 'FloatingPointLiteral', class: 'FLOATING_POINT' };
        }
        else if(this.literal.isBoolLiteral(lexeme)){
            return{type: "booleanLiteral",class:'BOOLEAN'}
        }
         else if (this.literal.isStringLiteral(lexeme)) {
            return { type: 'StringLiteral', class: 'STRING' };
        } else if (this.wordBreaker.isVariable(lexeme)) {
            return { type: 'Variable' , class: 'VARIABLE'};
        } else {
            return { type: 'Unknown' };
        }
    }
}

export default Lexer;
