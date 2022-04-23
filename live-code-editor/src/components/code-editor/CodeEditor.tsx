import { useEffect, useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import codeshift from "jscodeshift"; // responsible for parsing all the js code we write and finding all the segments of jsx, props ,etc
import HighLighter from "monaco-jsx-highlighter"; // apply highlighting to the editor
import prettier from "prettier";
import parser from "prettier/parser-babel";
import "./code-editor.scss";
import "./syntax.scss";

const CodeEditor: React.FC<codeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);
  const isCtrlPressed = useRef<boolean>(false);

  // Initiall setup in order to allow access to the data in the editor (the monaco components does not have onChange property)
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => onChange(getValue()));
    monacoEditor.getModel()?.updateOptions({ tabSize: 3 });
    const highlighter = new HighLighter(
      ///@ts-ignore
      window.monaco,
      codeshift, // tells the highlighter the segments of the jsx elements to be highlight
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      // prevents unnecessary logs to the console by make empty arrow functions insted of default
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.code === "ControlRight" || event.code === "ControlLeft")
        isCtrlPressed.current = false;
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  useEffect(() => {
    const handlekeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && !isCtrlPressed.current) isCtrlPressed.current = true;
      if (isCtrlPressed.current && event.code === "KeyS") {
        event.preventDefault();
        formatCode();
      }
    };
    window.addEventListener("keydown", handlekeyDown);
    return () => window.removeEventListener("keydown", handlekeyDown);
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
        // no onChange in this Component, built in the function above
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
        height="100%"
        theme="dark"
        line={5}
      />
    </div>
  );
};

export default CodeEditor;
