import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";
import { store } from "./state/store";
import { Provider } from "react-redux";
import CellList from "./components/cell-list/CellList";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList></CellList>
      </div>
    </Provider>
  );
};
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as Element);

root.render(<App />);
