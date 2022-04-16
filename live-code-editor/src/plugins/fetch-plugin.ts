import * as esbuild from "esbuild-wasm";
import localforage from "localforage";
import axios from "axios";
import escapedString from "../utils/escaped";

const fileCache = localforage.createInstance({ name: "filecache" });

// This plugin is responsible for load the files from unpkg.com/
export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Initiall check if the required file is already located in the IndexDB cache
        const catchedResult: esbuild.OnLoadResult | null =
          await fileCache.getItem(args.path);
        if (catchedResult) return catchedResult;
      });
      build.onLoad({ filter: /(^index\.js$)/ }, () => ({
        // load and serve index.js files
        loader: "jsx",
        contents: inputCode,
      }));

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // Handle load of css files by converting to jsx
        const { data, request } = await axios.get(args.path);
        const escaped = escapedString(data);
        const contents = `const style = document.createElement('style');
        style.innerText = '${escaped}'
        document.head.appendChild(style);
        `;

        const newCatchedResult: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, newCatchedResult);
        return newCatchedResult;
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Handle load files that are located on a subdirectory
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
