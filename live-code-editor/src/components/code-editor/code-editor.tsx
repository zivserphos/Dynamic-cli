import { useEffect, useRef, useState } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import codeshift from "jscodeshift";
import HighLighter from "monaco-jsx-highlighter";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import "./code-editor.scss";

const CodeEditor: React.FC<codeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);
  const isCtrlPressed = useRef<boolean>(false);

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => onChange(getValue()));
    monacoEditor.getModel()?.updateOptions({ tabSize: 3 });
    const highlighter = new HighLighter(
      // @ts-ignore
      window.monaco,
      codeshift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      // prevents unnecessary logs to the console by make empty arrow functions
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.ctrlKey && !isCtrlPressed.current) isCtrlPressed.current = true;

      if (isCtrlPressed.current && event.code === "KeyS") {
        event.preventDefault();
        formatCode();
      }
    });
    window.addEventListener("keyup", (event) => {
      event.preventDefault();
      if (event.code === "ControlRight" || event.code === "ControlLeft")
        isCtrlPressed.current = false;
    });
  }, []);

  const formatCode = () => {
    // get current value from the editor
    const unformatted = editorRef.current.getValue();
    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    // set the formmated value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={formatCode}
      >
        Format
      </button>
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
