import React, { useState } from "react";
import Editor from "@monaco-editor/react";

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div style={{ width: "50%", height: "100%" }}>
        <Editor
          height="100%"
          language="javascript"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
          padding: "10px",
          backgroundColor: "#282c34",
          color: "#ffffff",
          overflow: "auto",
        }}
      >
        <h3>Output:</h3>
        <pre style={{ margin: 0 }}>{output}</pre>
      </div>
    </div>
  );
}

export default App;
