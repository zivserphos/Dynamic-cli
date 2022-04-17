import { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

const CodeEditor: React.FC<codeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => onChange(getValue()));
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const formatCode = () => {
    // get current value from the editor
    const unformatted = editorRef.current.getValue();
    // format that value
    const formatted = prettier.format(unformatted, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    // set the formmated value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <button onClick={formatCode}> Format Code</button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          fontSize: 16,
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        language="javascript"
        height="300px"
        theme="dark"
        line={5}
      />
    </div>
  );
};

export default CodeEditor;
