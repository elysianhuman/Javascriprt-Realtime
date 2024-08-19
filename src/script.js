require.config({
  paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor/min/vs" },
});

require(["vs/editor/editor.main"], function () {
  const editor = monaco.editor.create(document.getElementById("container"), {
    value: "console.log('Hello, Monaco!');",
    language: "javascript",
    theme: "vs-dark",
  });

  monaco.languages.registerCompletionItemProvider("javascript", {
    provideCompletionItems: () => {
      return [
        {
          label: "clg",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'console.log(${1:""})',
          detail: "Log to console",
        },
      ];
    },
  });

  function lintCode() {
    const code = editor.getValue();
    try {
      const eslint = new window.ESLint(); // Adjust if necessary
      eslint.lintText(code).then((results) => {
        console.log(results[0].messages);
      });
    } catch (error) {
      console.error("ESLint error:", error);
    }
  }

  editor.onDidChangeModelContent(() => {
    lintCode();
  });
});
