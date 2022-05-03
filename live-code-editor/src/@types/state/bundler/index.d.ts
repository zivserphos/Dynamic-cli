interface BundleAction {
  type: "BUNDLE_START" | "BUNDLE_COMPLETE";
  payload: {
    cellId: string;
    bundle?: {
      code: string;
      err: string;
    };
  };
}

interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

interface BundleOutput {
  err: string;
  code: string;
}
