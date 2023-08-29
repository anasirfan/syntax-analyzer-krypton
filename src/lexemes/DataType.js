class DataType {
    constructor() {
        this.dataTypeMappings = {
            'num': 'DataTypes',
            'string': 'DataTypes',
            'dec': 'DataTypes',
            'bool': 'DataTypes',
            // ... other data types ...
        };
    }

    isDataType(lexeme) {
        return this.dataTypeMappings[lexeme] || null;
    }
    getClass(lexeme) {
        return this.dataTypeMappings[lexeme];
    }
}

export default DataType;