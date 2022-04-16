import * as esbuild from "esbuild-wasm";
import localforage from "localforage";
import axios from "axios";

const fileCache = localforage.createInstance({ name: "filecache" });
export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        const catchedResult: esbuild.OnLoadResult | null =
          await fileCache.getItem(args.path);
        if (catchedResult) return catchedResult;

        const { data, request } = await axios.get(args.path);
        const newCatchedResult: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, newCatchedResult);
        return newCatchedResult;
      });
    },
  };
};
