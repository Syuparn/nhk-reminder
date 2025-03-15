import { getNHKAPIKey } from "./config";
import { fetchNHKPrograms } from "./nhk";

function handler() {
  const apiKey = getNHKAPIKey();
  const programs = fetchNHKPrograms(new Date(), apiKey);
  console.log(programs);
}

// HACK: enable to execute handler from GAS
//
// Since functions in bundled file are wrapped by IIFE, handler() cannot be called even though it is exported.
// By using esbuild-gas-plugin, it can be referred as global's property.
// ref: https://tech.smarthr.jp/entry/2022/07/01/132343 (in Japanese)
//
declare let global: any;
global.handler = handler;
