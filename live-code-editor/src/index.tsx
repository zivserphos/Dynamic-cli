import ReactDOM from "react-dom/client";
import { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const showOutput = () => {
    console.log(input);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={showOutput}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

// const root = ReactDOM.createRoot(document.getElementById("root"));
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as Element);

root.render(<App />);
