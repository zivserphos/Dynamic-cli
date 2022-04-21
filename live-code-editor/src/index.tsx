import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";
// import CodeCell from "./components/code-cell/code-cell";
import TextEditor from "./components/text-editor/textEditor";

const App = () => {
  return (
    <div>
      <TextEditor></TextEditor>
    </div>
  );
};
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as Element);

root.render(<App />);
