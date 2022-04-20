import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState } from "react";
import CodeEditor from "../../components/code-editor/code-editor";
import Preview from "../../components/preview/preview";
import bundler from "../../bundler";
import Resizable from "../resizble/resizble";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical" width={Infinity} height={300}>
      <Resizable direction="horizontal" width={400} height={Infinity}>
        <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
          <CodeEditor
            initialValue="const a = 5;"
            onChange={(value) => setInput(value)}
          />

          {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
          <Preview code={code}></Preview>
        </div>
      </Resizable>
    </Resizable>
  );
};

export default CodeCell;
