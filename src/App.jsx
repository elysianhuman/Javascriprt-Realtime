import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import './App.css';  // Import the CSS file

function App() {
  const [code, setCode] = useState("console.log('Hello, world!');");
  const [output, setOutput] = useState("");

  const handleEditorChange = (value) => {
    setCode(value);
    executeCode(value);
  };

  const executeCode = (code) => {
    try {
      const log = [];
      const originalConsoleLog = console.log;

      console.log = (...args) => {
        // Format each argument, preserving objects and arrays
        const formattedArgs = args.map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2); // Pretty print objects and arrays
            } catch {
              return String(arg); // Fallback if JSON.stringify fails
            }
          }
          return String(arg); // Convert non-objects to string
        });
        log.push(formattedArgs.join(' '));
      };

      eval(code);
      console.log = originalConsoleLog;

      // Join log entries with newlines
      setOutput(log.join("\n"));
    } catch (error) {
      setOutput(`Error: ${error.toString()}`);
    }
  };

  return (
    <div className="container">
      <div className="editor-container">
        <Editor
          language="javascript"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      </div>
      <div className="output-container">
        <h3>Output:</h3>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{output}</pre>
      </div>
    </div>
  );
}

export default App;
