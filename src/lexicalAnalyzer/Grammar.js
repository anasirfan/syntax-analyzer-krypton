// Grammar.js

class Grammar {
    constructor() {
      this.firstSets = {};
      this.followSets = {};
      this.initFirstSets();
      this.initFollowSets();
    }
  
    initFirstSets() {
      this.firstSets.return = new Set(['RETURN']);
      this.firstSets.cases = new Set(['(']);
      this.firstSets.MST = new Set(['RETURN', 'CONTINUE', 'BREAK', 'CYCLE', 'TRY', 'IF', 'THIS', 'SUPER', 'NOT NULL']);
      this.firstSets.class = new Set(['AM', 'CLASS']);
      this.firstSets.body = new Set(['{']);
      this.firstSets.opt_Imp = new Set(['IMPLEMENTS']);
      this.firstSets.init_interface = new Set(['INTERFACE']);
      this.firstSets.int_body = new Set(['DATATYPES']);
      this.firstSets.c_var_dec = new Set(['CREATE']);
      this.firstSets.abs_class = new Set(['AM', 'ABSTRACT']);
      this.firstSets.abs_body = new Set(['CREATE']);
      this.firstSets.create = new Set(['CREATE']);
      this.firstSets.expression = new Set(['(','INTEGER', 'FLOATING_POINT', 'BOOLEAN', 'STRING','VARIABLE', '!']);
      this.firstSets.func_types = new Set(['DATATYPES', 'AM', 'STATIC']);
      this.firstSets.SST = new Set(['DataType', 'CYCLE', 'IF', 'TRY', 'RETURN', 'LIST', 'VARIABLE', 'CREATE', 'BREAK', 'CONTINUE']);
      this.firstSets.declaration = new Set(['DATATYPES', 'OPERATOR', 'INTEGER', 'VARIABLE', 'c', 'E', ';', 'COMMA']);
      this.firstSets.CSST = new Set(['CREATE', 'AM', 'STATIC', 'DATATYPES', 'VARIABLE', 'NULL']);
      this.firstSets.CMST = new Set(['RETURN', 'CONTINUE', 'BREAK', 'CYCLE', 'TRY', 'CREATE', 'E']);
      this.firstSets.constructor = new Set(['AM', 'VARIABLE']);
      this.firstSets.const_body = new Set(['CREATE', 'NULL', 'E']);
      this.firstSets.if_else = new Set(['IF']);
      this.firstSets.if_body = new Set(['{', 'RETURN', 'CONTINUE', 'BREAK', 'CYCLE', 'TRY', 'IF', 'THIS', 'SUPER', 'NOT NULL']);
      this.firstSets.loop = new Set(['CYCLE']);
      this.firstSets.c_var_dec = new Set(['AM', 'STATIC', 'DATATYPES']);
      this.firstSets.c_func_def = new Set(['AM', 'STATIC', 'DATATYPES']);
      this.firstSets.oe = new Set(['(', 'CONSTANTS', '!', 'VARIABLE', 'ASSIGNMENT_EQUAL']);
      this.firstSets.array = new Set(['[']);
      this.firstSets.obj_ref = new Set(['=', '(', '[', '.', 'NULL']);
      // Add more as needed
  }
  
  initFollowSets() {
      // Define and initialize follow sets for your non-terminals
      this.followSets.init = new Set([',', '++']);
      this.followSets.list = this.followSets.var_dec;
      this.followSets.var_dec = this.followSets.declaration;
      this.followSets.declaration = this.followSets.oe;
      this.followSets.SST = new Set(['$', 'VARIABLE', '}', 'ELSE', 'BREAK', 'CONTINUE', 'CREATE', 'VARIABLE', 'LIST', 'RETURN', 'TRY', 'IF', 'CYCLE', 'DATATYPES', 'AM', 'CLASS', 'INTERFACE', 'ABSTRACT', 'TRY', 'EXCEPT']);
      this.followSets.return = this.followSets.cases;
      this.followSets.cases = new Set(['$', 'VARIABLE', '}', 'ELSE', 'BREAK', 'CONTINUE', 'CREATE', 'VARIABLE', 'LIST', 'RETURN', 'TRY', 'IF', 'CYCLE', 'DATATYPES', 'AM', 'CLASS', 'INTERFACE', 'ABSTRACT']);
      this.followSets.oe = new Set(['$', '}', ']', ')', 'ELSE', 'BREAK', 'CONTINUE', 'CREATE', 'VARIABLE', 'LIST', 'RETURN', 'TRY', 'IF', 'CYCLE', 'DATATYPES', 'AM', 'CLASS', 'INTERFACE', 'ABSTRACT', ',', '.', '++']);
      this.followSets.array = new Set(['>', '}', 'ELSE', 'BREAK', 'CONTINUE', 'CREATE', 'VARIABLE', 'LIST', 'RETURN', 'TRY', 'IF', 'CYCLE', 'DATATYPES', 'AM', 'CLASS', 'INTERFACE', 'ABSTRACT']);
      this.followSets.CSST = new Set(['}', 'ELSE', 'BREAK', 'CONTINUE', 'CREATE', 'VARIABLE', 'LIST', 'RETURN', 'TRY', 'IF', 'CYCLE', 'DATATYPES', 'AM', 'CLASS', 'INTERFACE', 'ABSTRACT']);
      this.followSets.constructor = this.followSets.CSST;
      this.followSets.TS = new Set(['THIS', 'SUPER', '(']);
    this.followSets.f = new Set(['++']);
    this.followSets.insVariablee_body = new Set(['}', ']']);
    this.followSets.a = this.followSets.insVariablee_body;
    }
  
    getFirstSet(nonTerminal) {
        return this.firstSets[nonTerminal] || new Set();
    }
  
    getFollowSet(nonTerminal) {
      return this.followSets[nonTerminal] || new Set();
    }
  }
  
  export default Grammar;
