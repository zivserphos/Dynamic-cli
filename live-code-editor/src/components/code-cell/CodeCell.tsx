import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useRef, useState } from "react";
import CodeEditor from "../code-editor/CodeEditor";
import Preview from "../preview/Preview";
import bundler from "../../bundler";
import Resizable from "../resizble/Resizble";
import * as CellAction from "../../state/cells/cells-actions";
import ActionBar from "../action-bar/ActionBar";
import useActions from "../../hooks/useActions";

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  const { updateCell } = useActions();

  let timer = useRef<ReturnType<typeof setTimeout>>();

  const handleTyping = (input: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => updateCell(cell.id, input), 1000);
  };

  useEffect(() => {
    const setOutput = async () => {
      const output = await bundler(cell.content);
      setCode(output.code);
      setErr(output.err);
    };
    setOutput();
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => handleTyping(value)}
          />
        </Resizable>
        <Preview code={code} err={err}></Preview>
      </div>
    </Resizable>
  );
};

export default CodeCell;
