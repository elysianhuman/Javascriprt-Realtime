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
      console.log = (msg) => log.push(msg);
      eval(code);
      console.log = originalConsoleLog;
      setOutput(log.join("\n"));
    } catch (error) {
      setOutput(error.toString());
    }
  };

  return (
    <div className="container">
      <div className="editor-container">
        <Editor
          height="100%"
          language="javascript"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      </div>
      <div className="output-container">
        <h3>Output:</h3>
        <pre style={{ margin: 0 }}>{output}</pre>
      </div>
    </div>
  );
}

export default App;
