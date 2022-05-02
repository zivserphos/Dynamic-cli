import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CodeEditor from "../code-editor/CodeEditor";
import Preview from "../preview/Preview";
import Resizable from "../resizble/Resizble";
import { useCellActions, useBundleActions } from "../../hooks/useActions";

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // const [code, setCode] = useState("");
  // const [err, setErr] = useState("");
  const bundle = useSelector((state: CombinedState) => state.bundle);
  console.log(bundle);

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
        {/* <Preview code={code} err={err}></Preview> */}
      </div>
    </Resizable>
  );
};

export default CodeCell;
