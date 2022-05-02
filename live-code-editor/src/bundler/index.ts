/* eslint-disable import/no-anonymous-default-export */
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: esbuild.Service;
const bundle = async (rawCode: string): Promise<BundleOutput> => {
  if (!service) {
    // initial setup for es build (resposible for the bundle process in the browser)
    service = await esbuild.startService({
      worker: true,
      // fetch this web assembly bundle binary
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }
  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: { "process.env.NODE_ENV": '"production"', global: "window" },
    });

    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (err: any) {
    return {
      code: "",
      err: err.message,
    };
  }
};

export default bundle;
