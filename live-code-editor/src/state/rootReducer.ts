import { combineReducers } from "@reduxjs/toolkit";
import cellsReducer from "./cells/cells-reducer";
import bundleReucer from "./bundle/bundle-reducer";

const rootReducer = combineReducers({
  cells: cellsReducer,
  bundle: bundleReucer,
});

export default rootReducer;
