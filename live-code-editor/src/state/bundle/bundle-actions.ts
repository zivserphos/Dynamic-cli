import { Dispatch } from "react";
import bundle from "../../bundler";
import * as bundleTypes from "./bundle-types";

export const bundleComplete =
  (cellId: string, input: string) =>
  async (dispatch: Dispatch<BundleAction>): Promise<BundleAction> => {
    const result = await bundle(input);
    return {
      type: bundleTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    };
  };

export const bundleStart = (
  cellId: string,
  bundle: { code: string; err: string }
): BundleAction => ({
  type: bundleTypes.BUNDLE_START,
  payload: {
    cellId,
    bundle,
  },
});
