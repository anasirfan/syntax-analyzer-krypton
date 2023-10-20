// Assume Grammar is properly implemented and provides firstSets and followSets
import Grammar from "./Grammar";

class Parser {
  constructor(lexer) {
    console.log(lexer);

    this.lexer = lexer;
    this.currentIndex = 0;
    this.currentToken = this.lexer[this.currentIndex];
    this.firstSets = new Grammar().firstSets;
    this.followSets = new Grammar().followSets;
  }

  match(tokenType) {
    console.log("match");
    if (this.currentToken.type === tokenType) {
      console.log("if");
       this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      console.log("next token : " + this.currentToken);
    } else {
      console.error(
        `Unexpected token. Expected ${tokenType}, but got ${this.currentToken.type}`
      );
    }
  }

  parseS() {
    if (this.currentToken && this.currentToken.type) {
      console.log("type:" + this.currentToken.type);

      if (
        this.firstSets.SST.has(this.currentToken.class) ||
        this.firstSets.SST.has(this.currentToken.lexeme) ||
        this.firstSets.SST.has(this.currentToken.type)
      ) {
        this.parseSST();
      } else if (this.currentToken.type === "class") {
        this.parseClass();
      } else if (this.currentToken.type === "abstract") {
        this.parseAbstract();
      } else if (this.currentToken.type === "interface") {
        this.parseInterface();
      } else {
        console.log(this.currentToken);
        if (this.currentToken && this.currentToken.type) {
          console.log(
            "error parsing from structure on :" + this.currentToken.type
          );
        }
      }
    }
  }

  // Parser   for SST
  parseSST() {
    if (this.currentToken.class === "CREATE") {
      console.log("create found! ");
       this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if( this.parseDeclaration()){
        return true;
      }
     
    } else if (this.parseDeclaration()) {
      return true;
    }
    // while (this.currentToken.type !== 'EOF') {
    //   if (this.firstSets.SST.has(this.currentToken.class)) {
    //     console.log('true');
    //     if (this.firstSets.create.has(this.currentToken.class)) {
    //       console.log("create keyword found!");
    //       this.parseCreate();
    //     } else if (this.firstSets.loop.has(this.currentToken.class)) {
    //       this.parseCycleLoop();
    //     } else if (this.firstSets.if_else.has(this.currentToken.class)) {
    //       this.parseIfElse();
    //     } else if (this.firstSets.return.has(this.currentToken.class)) {
    //       this.parseReturn();
    //     }
    //     else if (this.firstSets.break.has(this.currentToken.lexeme)) {
    //       this.parseList();
    //     }
    //     else if (this.firstSets.continue.has(this.currentToken.lexeme)) {
    //       this.parseList();
    //     }
    //     else if (this.firstSets.create.has(this.currentToken.lexeme)) {
    //       this.parseList();
    //     }

    //     // Add more conditions based on your grammar rules
    //   } else {
    //     console.error(`Unexpected token for SST: ${this.currentToken.type}`);
    //   }
    //    this.currentIndex += 1;
    this.currentToken = this.lexer[this.currentIndex];
    //   this.currentToken = this.lexer[this.currentIndex];
    // }
  }
  parseCreate() {
    this.parseDeclaration();
  }
  parseInit() {
    if (this.currentToken.lexeme === "=") {
      console.log("assignment operator found! ");
       this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.Expression()) {
        console.log("Expression completed! ");
      }
    } else if (this.currentToken.lexeme === "++") {
      return true;
    } else if (this.currentToken.lexeme === ",") {
      return true;
    } else {
      return false;
    }
  }
  parseInitList() {
    if (this.currentToken.lexeme === ",") {
       this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.currentToken.class === "VARIABLE") {
        if (this.parseInit()) {
          if (this.parseInitList()) {
            return true;
          }
        }
      }
    }
  }

  // Parser   for Declaration
  parseDeclaration() {
    if (this.currentToken.class === "DataTypes") {
      console.log("data type found!");
       this.currentIndex += 1;

      this.currentToken = this.lexer[this.currentIndex];
      if (this.currentToken.class === "VARIABLE") {
         this.currentIndex += 1;
        this.currentToken = this.lexer[this.currentIndex];
        console.log("var found!");
     
        if (this.parseInit()) {
          console.log("init parsing found!");

          if (this.parseInitList()) {
            console.log("init parsing list found!");

            return true;
          }
        }
        else if(this.currentToken.lexeme === ";"){
           console.log("semi colon found!");
         }
         else{
           console.log("semi colon not found!");
         }
      }
    }

    // if (this.firstSets.declaration.has(this.currentToken.class) || this.firstSets.declaration.has(this.currentToken.lexeme) || this.firstSets.declaration.has(this.currentToken.type)) {
    //   console.log("current lexeme : " + this.currentToken.lexeme + " " + this.currentIndex);
    //   // Example: If Declaration starts with DataType, call parseDataType
    //   if (this.currentToken.class === 'DataTypes') {
    //     this. parseVarDec();
    //   } else if (this.currentToken.type === 'Operator') {
    //     this.parseOperator();
    //   } else if (this.currentToken.type === 'Variable') {

    //     console.log('variable success!');
    //   } else if (this.currentToken.type === 'Punctuator') {
    //     if (this.firstSets.declaration.has(this.currentToken.class)) {
    //       console.log('punctuator success!');
    //     } else {
    //       console.error(`Unexpected token for Declaration: ${this.currentToken.lexeme}`);
    //     }
    //   }
    //   else if (this.currentToken.class === 'INTEGER') {

    //     console.log('integer success!');
    //   }
    //   else if (this.currentToken.class === 'FLOATING_POINT') {

    //     console.log('FLOATING_POINT success!');
    //   }
    //   else if (this.currentToken.class === 'BOOLEAN') {

    //     console.log('BOOLEAN success!');
    //   }
    //   else if (this.currentToken.class === 'STRING') {

    //     console.log('STRING success!');
    //   }

    //   // Add more conditions based on your grammar rules
    // } else {
    //   console.error(`Unexpected token for Declaration: ${this.currentToken.type}`);
    // }
    //  this.currentIndex += 1;
    this.currentToken = this.lexer[this.currentIndex];
    // this.currentToken = this.lexer[this.currentIndex];
  }
  parseList() {
    while (this.currentToken.lexeme === "]") {
      if (
        this.followSets.list.has(this.currentToken.class) ||
        this.followSets.list.has(this.currentToken.lexeme)
      ) {
        this.parseOE();
      } else {
        console.error(
          `Unexpected token for DataType: ${this.currentToken.type}`
        );
      }
       this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
    }
  }

  parseOperator() {
    if (this.firstSets.oe.has(this.currentToken.class)) {
      console.log("parseOperator()");
    } else {
      console.error(`Unexpected token for DataType: ${this.currentToken.type}`);
    }
  }

  // Parser   for DataType
  parseDataType() {
    if (this.currentToken.type === "DataType") {
      console.log("parseDataType()");
      this.match("DataType");
    } else {
      console.error(`Unexpected token for DataType: ${this.currentToken.type}`);
    }
  }

  parseMST() {
    if (this.firstSets.MST.has(this.currentToken.type)) {
      // Example: If MST starts with 'return', call parseReturn
      if (this.currentToken.type === "return") {
        this.parseReturn();
      }
      // Add more conditions based on your grammar rules
    } else {
      console.error(`Unexpected token for MST: ${this.currentToken.type}`);
    }
  }

  // Parser   for Return
  parseReturn() {
    if (this.currentToken.type === "return") {
      console.log("return success");
       this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      // Assuming 'return' is always followed by an expression
      this.parseOE();
    } else {
      console.error(`Unexpected token for Return: ${this.currentToken.type}`);
    }
  }

  // // Parser   for OE
  // parseOE() {

  //     if (
  //       this.firstSets.oe.has(this.currentToken.class) ||
  //       this.firstSets.oe.has(this.currentToken.lexeme) ||
  //       this.followSets.oe.has(this.currentToken.class) ||
  //       this.followSets.oe.has(this.currentToken.lexeme)
  //     ) {
  //       if()
  //       // Example: If OE starts with '(', call parseF2
  //       if (this.currentToken.lexeme === "(") {
  //         this.parseF2();
  //       } else if (this.currentToken.lexeme === "VARIABLE") {
  //         this.parseF2();
  //         console.log("variable success!");
  //       } else if (this.currentToken.lexeme === "ASSIGNMENT_EQUAL") {
  //         console.log("assignment equal success!");
  //       } else if (this.currentToken.lexeme === "INTEGER") {
  //         console.log("INTEGER success!");
  //       } else if (this.currentToken.lexeme === "]") {
  //         return;
  //       } else {
  //         console.log(this.currentToken.lexeme + " success!");
  //       }
  //       // Add more conditions based on your grammar rules
  //     } else {
  //       console.error(`Unexpected token for OE: ${this.currentToken.type}`);
  //     }
  //      this.currentIndex += 1;
  //     this.currentToken = this.lexer[this.currentIndex];
  //     this.currentToken = this.lexer[this.currentIndex];

  // }
  Expression() {
    if (this.compound_Ass()) {
      if (this.Expression1()) {
        return true;
      }
    }else{    return false; }
  }

  Expression1() {
    // follow set included
    if (this.currentToken.type === "Operator") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.compound_Ass()) {
        if (this.Expression1()) {
          return true;
        }
      }
    } else if (this.currentToken.lexeme === ")") {
      return true;
    } else if (this.currentToken.lexeme === "]") {
      return true;
    } else if (this.currentToken.lexeme === ",") {
      return true;
    } else if (this.currentToken.lexeme === ";") {
      return true;
    } else if (this.currentToken.lexeme === ":") {
      return true;
    }
    return false;
  }

  compound_Ass() {
    if (this.Assignment_opt()) {
      if (this.compound_Ass1()) {
        return true;
      }
    }else{

    return false;
    }
  }

  compound_Ass1() {
    if (this.currentToken.class === "ASSIGNMENT_EQUAL") {
      
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.Assignment_opt()) {
        if (this.compound_Ass1()) {
          return true;
        }
      }
    } else if (this.currentToken.type === "Operator") {
      return true;
    }
    return false;
  }

  Assignment_opt() {

    if (this.NOT()) {
      if (this.Assignment_opt1()) {
        return true;
      }
    }
    return false;
  }

  Assignment_opt1() {
    if (this.currentToken.class === "Not") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.NOT()) {
        if (this.Assignment_opt1()) {
          return true;
        }
      }
    } else if (this.currentToken.class === "assignment_operator") {
      return true;
    }
    return false;
  }

  NOT() {
    if (this.OR()) {
      if (this.NOT1()) {
        return true;
      }
    }
    return false;
  }

  NOT1() {
    if (this.currentToken.class === "OR") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.OR()) {
        if (this.NOT1()) {
          return true;
        }
      }
    } else if (this.currentToken.class === "NOT") {
      return true;
    }
    return false;
  }

  OR() {
    if (this.AND()) {
      if (this.OR1()) {
        return true;
      }
    }
    return false;
  }

  OR1() {
    if (this.currentToken.class === "AND") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.AND()) {
        if (this.OR1()) {
          return true;
        }
      }
    } else if (this.currentToken.class === "OR") {
      return true;
    }
    return false;
  }

  AND() {
    if (this.ROP()) {
      if (this.AND1()) {
        return true;
      }
    }
    return false;
  }

  AND1() {
    if (this.currentToken.class === "ROP") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.ROP()) {
        if (this.AND1()) {
          return true;
        }
      }
    } else if (this.currentToken.class === "AND") {
      return true;
    }
    return false;
  }

  ROP() {
   
    if (this.PM()) {

      if (this.ROP1()) {
        return true;
      }
    }
    return false;
  }

  ROP1() {
    if (this.currentToken.class === "PM") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.PM()) {
        if (this.ROP1()) {
          return true;
        }
      }
    } else if (this.currentToken.class === "ROP") {
      return true;
    }
    return false;
  }

  PM() {
    if (this.MDM()) {
      if (this.PM1()) {
        return true;
      }
    }
    return false;
  }

  PM1() {
    if (this.currentToken.class === "MDM") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.MDM()) {
        if (this.PM1()) {
          return true;
        }
      }
    } else if (this.currentToken.class === "PM") {
      return true;
    }
    return false;
  }

  MDM() {
    if (this.P()) {
      if (this.MDM1()) {
        return true;
      }
    }
    return false;
  }

  MDM1() {
    if (this.currentToken.class === "P") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.P()) {
        if (this.MDM1()) {
          return true;
        }
      }
    } else if (this.currentToken.class === "MDM") {
      return true;
    }
    return false;
  }

  P() {
    if (this.Dec()) {
      if (this.P1()) {
        return true;
      }
    }
    return false;
  }

  P1() {
    if (this.currentToken.class === "--") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.Dec()) {
        if (this.P1()) {
          return true;
        }
      }
    } else if (this.currentToken.class === "P") {
      return true;
    }
    return false;
  }

  Dec() {
    if (this.F()) {
      if (this.Dec1()) {
        return true;
      }
    }
    return false;
  }

  Dec1() {
    if (this.currentToken.class === "++") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.F()) {
        if (this.Dec1()) {
          return true;
        }
      }
    } else if (this.currentToken.class === "--") {
      return true;
    }
    return false;
  }

  const() {
    if (this.currentToken.class === "INTEGER") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      console.log("integer found !");
    } else if (this.currentToken.class === "BOOLEAN") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      console.log("BOOLEAN found !");

      return true;
    } else if (this.currentToken.class === "STRING") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      console.log("STRING found !");

      return true;
    } else if (this.currentToken.class === "FLOATING_NUMBER") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      console.log("FLOATING_NUMBER found !");

      return true;
    }
  }

  F() {
   
    if (this.const()) {
      return true;
    } else if (this.currentToken.lexeme === "(") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.Expression()) {
        if (this.currentToken.lexeme === ")") {
          this.currentIndex += 1;
          this.currentToken = this.lexer[this.currentIndex];
          return true;
        }
      }
    } else if (this.currentToken.lexeme === "!") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.F()) {
        return true;
      }
    } else if (this.currentToken.class === "VARIABLE") {
      this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
      if (this.F2()) {
        return true;
      }
    }
    return false;
  }

  F2() {
    if (this.object_call()) {
      return true;
    } else if (this.inc_dec()) {
      return true;
    } else if (this.Array_def()) {
      return true;
    } else if (this.Arr_func()) {
      return true;
    } else if (this.Array_call()) {
      return true;
    } else if (this.func_call()) {
      return true;
    } else if (this.currentToken.lexeme === "++") {
      return true;
    }
  }

  // Parser   for F2
  parseF2() {
    if (this.currentToken.type === "(") {
      this.match("(");
      // Assuming F2 is always followed by a valid expression
      this.parseOE();
      this.match(")");
    } else {
      console.error(`Unexpected token for F2: ${this.currentToken.type}`);
    }
  }

  // Parser   for CycleLoop
  parseCycleLoop() {
    while (this.currentToken.lexeme === "}") {
      if (this.currentToken.class === "CYCLE") {
        this.firstSets.loop.has(this.currentToken.class);
      } else {
        console.error(
          `Unexpected token for CycleLoop: ${this.currentToken.type}`
        );
      }
       this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
    }
  }

  // Parser   for IfElse
  parseIfElse() {
    while (this.currentToken.lexeme === "end") {
      if (this.currentToken.class === "(") {
        this.parseOE();
      } else if (this.currentToken.class === "{") {
        this.parseSST();
      } else if (this.currentToken.class === "{") {
         this.currentIndex += 1;
        this.currentToken = this.lexer[this.currentIndex];
        this.currentToken = this.lexer[this.currentIndex];
        break;
      } else {
        console.error(`Unexpected token for IfElse: ${this.currentToken.type}`);
      }
       this.currentIndex += 1;
      this.currentToken = this.lexer[this.currentIndex];
    }
  }

  parseAbstract() {
    if (this.firstSets.abs_class.has(this.currentToken.type)) {
      this.match("abstract");
      // Assuming the rest of the abstract class definition follows your grammar rules
    } else {
      console.error(`Unexpected token for Abstract: ${this.currentToken.type}`);
    }
  }

  // Parser   for
  parse() {
    if (this.firstSets.func_def.has(this.currentToken.type)) {
      this.match("DataType"); // Assuming return type, adjust as needed
      this.match("ID"); // Assuming   name, adjust as needed
      // Assuming the rest of the   definition follows your grammar rules
    } else {
      console.error(`Unexpected token for  : ${this.currentToken.type}`);
    }
  }

  // Parser   for Cases
  parseCases() {
    if (this.firstSets.cases.has(this.currentToken.type)) {
      this.parseOE(); // Assuming OE is the expression inside cases
      // Assuming the rest of the cases statement follows your grammar rules
    } else {
      console.error(`Unexpected token for Cases: ${this.currentToken.type}`);
    }
  }

  // Parser   for Array
  parseArray() {
    if (this.firstSets.array.has(this.currentToken.type)) {
      this.match("[");
      // Assuming the rest of the array definition follows your grammar rules
    } else {
      console.error(`Unexpected token for Array: ${this.currentToken.type}`);
    }
  }

  // Parser   for Objects
  parseObjects() {
    // Assuming objects can be a list of key-value pairs, adjust as needed
    while (this.firstSets.obj_dec.has(this.currentToken.type)) {
      this.parseObjDec();
    }
  }
  parseObjRef() {
    if (this.firstSets.obj_ref.has(this.currentToken.lexeme)) {
      if (this.currentToken.lexeme === "=") {
        // Handle object assignment
        this.match("=");
        this.parseObject();
      } else if (this.currentToken.lexeme === "(") {
        // Handle   call
        this.parseFunctionCall();
      } else if (this.currentToken.lexeme === "[") {
        // Handle array element access
        this.parseArrayAccess();
      } else if (this.currentToken.lexeme === ".") {
        // Handle property access
        this.parsePropertyAccess();
      } else if (this.currentToken.lexeme === "null") {
        // Handle null assignment
        this.match("null");
      }
    } else {
      console.error(
        `Unexpected token for Object Reference: ${this.currentToken.lexeme}`
      );
    }
  }

  parseObjDec() {
    // Implement parsing of object declarations
    // Example: key1: value1, key2: value2, ...
    if (this.currentToken.type === "Variable") {
      this.match("Variable");
      this.match(":");
      this.parseValue();
      if (this.currentToken.lexeme === ",") {
        this.match(",");
        this.parseObjDec();
      }
    } else {
      console.error(
        `Unexpected token for Object Declaration: ${this.currentToken.lexeme}`
      );
    }
  }
  parseExpression() {
    this.parseEOE();
  }

  parseEOE() {
    this.parseCompAss();
    this.parseOEPrime();
  }

  parseOEPrime() {
    if (this.currentToken.type === "OR") {
      this.match("OR");
      this.parseCompAss();
      this.parseOEPrime();
    }
  }

  parseCompAss() {
    this.parseAssOpr();
    this.parseCompAssPrime();
  }

  parseCompAssPrime() {
    if (this.currentToken.type === "ASSIGNMENT_EQUAL") {
      this.match("ASSIGNMENT_EQUAL");
      this.parseAssOpr();
      this.parseCompAssPrime();
    }
  }

  parseAssOpr() {
    if (this.currentToken.type === "OR") {
      this.match("OR");
      this.parseAssOprPrime();
    }
  }

  parseAssOprPrime() {
    if (this.currentToken.type === "OR") {
      this.match("OR");
      this.parseAssOpr();
    }
  }

  parseValue() {
    // Implement parsing of values within key-value pairs
    // Example: value1, value2, ...
    if (this.firstSets.value.has(this.currentToken.type)) {
      // Handle parsing of values based on your language's syntax rules.
      // For example, if you expect literals, variables, or   calls as values.
      // You'll need to define the specifics based on your language's grammar.
    } else {
      console.error(`Unexpected token for Value: ${this.currentToken.lexeme}`);
    }
  }

  parseFunctionCall() {
    // Implement   call parsing
    // Example:  _name(arguments)
    if (this.currentToken.lexeme === "(") {
      this.match("(");
      this.parseArguments();
      this.match(")");
    } else {
      console.error(`Unexpected token for   Call: ${this.currentToken.lexeme}`);
    }
  }

  parseObject() {
    // Implement object parsing
    // Example: { key1: value1, key2: value2 }
    if (this.currentToken.lexeme === "{") {
      this.match("{");
      // Parse key-value pairs
      while (this.currentToken.lexeme !== "}") {
        this.parseKeyValuePair();
        if (this.currentToken.lexeme === ",") {
          this.match(",");
        }
      }
      this.match("}");
    } else {
      console.error(`Unexpected token for Object: ${this.currentToken.lexeme}`);
    }
  }

  parseKeyValuePair() {
    // Implement parsing of key-value pairs within an object
    // Example: key: value
    if (this.currentToken.type === "Variable") {
      this.match("Variable");
      this.match(":");
      this.parseValue();
    } else {
      console.error(
        `Unexpected token for Key-Value Pair: ${this.currentToken.lexeme}`
      );
    }
  }
  parsePropertyAccess() {
    // Implement property access parsing
    // Example: object.property
    if (this.currentToken.lexeme === ".") {
      this.match(".");
      if (this.currentToken.type === "Variable") {
        this.match("Variable");
      } else {
        console.error(
          `Unexpected token for Property Access: ${this.currentToken.lexeme}`
        );
      }
    } else {
      console.error(
        `Unexpected token for Property Access: ${this.currentToken.lexeme}`
      );
    }
  }
  parseAccessModifier() {
    // Implement access modifier parsing
    // Example: public, private, protected
    if (
      this.currentToken.lexeme === "public" ||
      this.currentToken.lexeme === "private" ||
      this.currentToken.lexeme === "protected"
    ) {
      this.match(this.currentToken.lexeme);
    } else {
      console.error(
        `Unexpected token for Access Modifier: ${this.currentToken.lexeme}`
      );
    }
  }
  parseInterface() {
    if (this.firstSets.init_interface.has(this.currentToken.lexeme)) {
      // Handle interface parsing
      // You'll need to define the syntax for your language's interfaces.
    } else {
      console.error(
        `Unexpected token for Interface: ${this.currentToken.lexeme}`
      );
    }
  }

  // Add more parser  s for other non-terminals based on your grammar rules

  // Entry point for parsing
  parse() {
    if (!this.lexer || !Array.isArray(this.lexer) || this.lexer.length === 0) {
      console.error("Invalid lexer or tokens provided for parsing.");
      return;
    }

    // Initialize the current token
    this.currentToken = this.lexer[this.currentIndex];
    console.log(this.currentToken);

    this.parseS();

    // // Check if there are any remaining tokens
    // if (this.currentToken.type !== 'EOF') {
    //   console.error(`Unexpected token: ${this.currentToken.type}`);
    // }
  }
}

export default Parser;