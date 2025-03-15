import { selectEvents } from "./calendar";
import { getAdvanceDays, getNHKAPIKey, getProgramKeywords } from "./config";
import { registerEvent } from "./googleCalendar";
import { fetchNHKPrograms } from "./nhk";

function handler() {
  const apiKey = getNHKAPIKey();
  const keywords = getProgramKeywords();

  const advanceDays = getAdvanceDays();
  const date = new Date();
  date.setDate(date.getDate() + advanceDays);

  const programs = fetchNHKPrograms(date, apiKey);

  console.log(`keywords: ${keywords}`);
  const selectedPrograms = selectEvents(programs, keywords);
  console.log(selectedPrograms);

  selectedPrograms.forEach(registerEvent);
}

// HACK: enable to execute handler from GAS
//
// Since functions in bundled file are wrapped by IIFE, handler() cannot be called even though it is exported.
// By using esbuild-gas-plugin, it can be referred as global's property.
// ref: https://tech.smarthr.jp/entry/2022/07/01/132343 (in Japanese)
//
declare let global: any;
global.handler = handler;
