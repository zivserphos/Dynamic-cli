import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./text-editor.scss";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const [source, setSource] = useState<string>("Header");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const editingOutOfFocus = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as HTMLElement))
        setEditing(false);
      setSource("kooshomo");
    };
    document.addEventListener("click", editingOutOfFocus, { capture: true });
    return () =>
      document.removeEventListener("click", editingOutOfFocus, {
        capture: true,
      });
  }, []);

  return editing ? (
    <div ref={ref} className="text-editor">
      <MDEditor style={{ backgroundColor: "goldenrod" }} />
    </div>
  ) : (
    <div onClick={() => setEditing(true)} className="text-editor">
      <MDEditor.Markdown source={`# ${source}`} />
    </div>
  );
};

export default TextEditor;
