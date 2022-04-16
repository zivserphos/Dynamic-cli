import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({ name: "filecache" });

export const unpkgPathPlugin = () => {
  console.log("asasas");
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => ({
        path: "index.js",
        namespace: "a",
      }));
      // Handle realtive paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => ({
        namespace: "a",
        path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
          .href,
      }));
      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
