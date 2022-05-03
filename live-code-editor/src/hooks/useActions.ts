import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useMemo } from "react";
import * as CellAction from "../state/cells/cells-actions";
import * as BundleAction from "../state/bundle/bundle-actions";

export const useCellActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(CellAction, dispatch);
};

export const useBundleActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(BundleAction, dispatch), [dispatch]);
};
