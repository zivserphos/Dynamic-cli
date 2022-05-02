import produce from "immer";
import * as ActionTypes from "./bundle-types";

const initialState: BundleState = {};

const reducer = produce(
  (state: BundleState = initialState, action: BundleAction): BundleState => {
    switch (action.type) {
      case ActionTypes.BUNDLE_COMPLETE: {
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle?.code || "",
          err: action.payload.bundle?.err || "",
        };
        return state;
      }
      case ActionTypes.BUNDLE_START: {
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          err: "",
        };
        return state;
      }
      default: {
        return state;
      }
    }
  }
);

export default reducer;
