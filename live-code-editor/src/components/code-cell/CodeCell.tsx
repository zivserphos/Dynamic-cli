import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useRef, useState } from "react";
import CodeEditor from "../code-editor/CodeEditor";
import Preview from "../preview/Preview";
import bundler from "../../bundler";
import Resizable from "../resizble/Resizble";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  let timer = useRef<ReturnType<typeof setTimeout>>();

  const handleTyping = (input: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setInput(input), 1000);
  };

  useEffect(() => {
    const setOutput = async () => {
      const output = await bundler(input);
      setCode(output.code);
      setErr(output.err);
    };
    setOutput();
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 5;"
            onChange={(value) => handleTyping(value)}
          />
        </Resizable>
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} err={err}></Preview>
      </div>
    </Resizable>
  );
};

export default CodeCell;
