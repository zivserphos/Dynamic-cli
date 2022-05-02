import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useCellActions } from "../../hooks/useActions";
import * as CellsAction from "../../state/cells/cells-actions";
import "./text-editor.scss";
import ActionBar from "../action-bar/ActionBar";

const TextEditor: React.FC<Text_Editor_Props> = ({ cell }) => {
  const [editing, setEditing] = useState<boolean>(false);
  // const [source, setSource] = useState<string>("# Header");
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useCellActions();

  const { content: source } = useSelector(
    (state: CombinedState) => state.cells.data[cell.id]
  );

  useEffect(() => {
    const editingOutOfFocus = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as HTMLElement))
        setEditing(false);
    };
    document.addEventListener("click", editingOutOfFocus, { capture: true });
    return () =>
      document.removeEventListener("click", editingOutOfFocus, {
        capture: true,
      });
  }, []);

  return editing ? (
    <div ref={ref} className="text-editor">
      <MDEditor
        style={{ backgroundColor: "goldenrod" }}
        value={source}
        onChange={(value) => updateCell(cell.id, value || "# Header")}
      />
    </div>
  ) : (
    <div onClick={() => setEditing(true)} className="text-editor card">
      <div className="card-content">
        {/* <ActionBar> */}
        <MDEditor.Markdown source={source} />
        {/* </ActionBar> */}
      </div>
    </div>
  );
};

export default TextEditor;
