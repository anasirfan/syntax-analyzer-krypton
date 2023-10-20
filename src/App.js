import React, { useState } from 'react';
import './App.css';
import Editor from './components/Editor';
import Lexer from '../src/lexicalAnalyzer/Lexer'; // Adjust the path accordingly
import Parser from './lexicalAnalyzer/Parser';

function App() {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [tokens, setTokens] = useState([]);

    const executeCode = () => {
        const lexer = new Lexer(code);
        const parsedTokens = lexer.tokenize();
       
        // console.log('tokens : ', parsedTokens);
        const parser = new Parser(parsedTokens);

        const result = parser.parse();

        // console.log(result);


        setTokens(parsedTokens);

        // TODO: Process the tokens and generate the output
        const generatedOutput = generateOutput(parsedTokens);
        setOutput(generatedOutput);
    };

    const generateOutput = (tokens) => {
        // TODO: Implement your logic to generate output based on tokens
        return 'Generated output goes here';
    };

    const saveTokensToFile = () => {
        // Convert tokens array to JSON
        const tokensJSON = JSON.stringify(tokens, null, 2);

        console.log(tokensJSON);

        // Create a Blob object and save it as a file
        const blob = new Blob([tokensJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tokens.json';
        a.click();

        // Clean up the URL and anchor element
        URL.revokeObjectURL(url);
        a.remove();
    };

    return (
        <div className="app">
            <h1 className="text-3xl text-center font-bold">"Krypton Online Compiler"</h1>
          
            <div className="flex flex-col h-screen">
                <div className="mb-2 p-2">
                    <Editor code={code} setCode={setCode} />
                </div>
                <div className="flex-none text-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={executeCode}
                    >
                        Run
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
                        onClick={saveTokensToFile}
                        disabled={tokens.length === 0}
                    >
                        Save Tokens File
                    </button>
                </div>
                <div className="output">
                    <h2>Output:</h2>
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    );
}

export default App;
