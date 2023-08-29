import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-text'; // Import the appropriate language mode
import 'ace-builds/src-noconflict/theme-monokai'; // Import the desired theme
import Keyword from '../lexemes/Keyword'; // Import the specific lexeme class
import DataType from '../lexemes/DataType'; // Import the specific lexeme class
import Operator from '../lexemes/Operator'; // Import the specific lexeme class
import Punctuator from '../lexemes/Punctuator';

const Editor = ({ code, setCode }) => {
    const [editorWidth, setEditorWidth] = useState(window.innerWidth);
    const dataTypeInstance = new DataType();
    const keywordInstance = new Keyword();
    const operatorInstance = new Operator();
    const punctuatorInstance = new Punctuator();

    useEffect(() => {
        const handleResize = () => {
            setEditorWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    return (
        <div className="editor">

            <AceEditor
                value={code}
                onChange={handleCodeChange}
                mode="text" // Change this to your language mode
                theme="monokai" // Change this to the theme you want
                fontSize={14}
                width={`${editorWidth}px`} // Set the width using the state value
                height="300px" // Set your desired height
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />
        </div>
    );
};

export default Editor;
