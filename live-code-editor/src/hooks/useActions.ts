import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as CellAction from "../state/cells/cells-actions";

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(CellAction, dispatch);
};

export default useActions;
