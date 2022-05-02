import { Dispatch } from "react";
import bundle from "../../bundler";
import * as bundleTypes from "./bundle-types";

export const createBundle =
  (cellId: string, input: string) =>
  async (dispatch: Dispatch<BundleAction>) => {
    dispatch({
      type: bundleTypes.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    dispatch({
      type: bundleTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: await bundle(input),
      },
    });
  };
