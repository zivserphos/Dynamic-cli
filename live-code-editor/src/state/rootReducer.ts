import { combineReducers } from "@reduxjs/toolkit";
import cellsReducer from "./cells/cells-reducer";

const rootReducer = combineReducers({
  cells: cellsReducer,
});

export default rootReducer;
