import { configureStore } from "@reduxjs/toolkit";
import * as ActionTypes from "./cells/actions-types";
import rootReducer from "./rootReducer";

export const store = configureStore({ reducer: rootReducer });

store.dispatch({
  type: ActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
  },
});
