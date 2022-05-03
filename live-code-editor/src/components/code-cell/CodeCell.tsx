/* eslint-disable react-hooks/exhaustive-deps */
import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CodeEditor from "../code-editor/CodeEditor";
import Preview from "../preview/Preview";
import Resizable from "../resizble/Resizble";
import { useCellActions, useBundleActions } from "../../hooks/useActions";
import "./code-cell.scss";

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const bundle = useSelector((state: CombinedState) => state.bundle[cell.id]);
  const { updateCell } = useCellActions();
  const { createBundle } = useBundleActions();

  let timer = useRef<ReturnType<typeof setTimeout>>();

  const handleTyping = (input: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => updateCell(cell.id, input), 1000);
  };

  useEffect(() => {
    const setOutput = async () => {
      createBundle(cell.id, cell.content);
    };
    setOutput();
  }, [cell.content, cell.id]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => handleTyping(value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {/* {bundle && !bundle.loading ? ( */}
          {bundle && !bundle.loading ? (
            <Preview code={bundle.code || ""} err={bundle.err || ""}></Preview>
          ) : (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading...
              </progress>
            </div>
          )}
          {/* ) : (
          <div className="progress-cover">
            <progress className="progress is-small is-primary" max="100">
              Loading...
            </progress>
          </div> */}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
