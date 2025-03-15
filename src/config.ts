const properties: Readonly<GoogleAppsScript.Properties.Properties> = PropertiesService.getScriptProperties();

export function getProgramKeywords(): string[] {
  const keywords = properties.getProperty("KEYWORDS") || "";
  return keywords.split(",");
}

export function getNHKAPIKey(): string {
  const key = properties.getProperty("NHK_API_KEY")
  if (key === null) {
    throw "$NHK_API_KEY is not defined";
  }
  return key;
}

export function getNHKAreaID(): string {
  // default area: Tokyo
  const tokyoAreaID = "130"

  return properties.getProperty("NHK_AREA_ID") || tokyoAreaID
}

export function getAdvanceDays(): number {
  // default: 1 day
  return parseInt(properties.getProperty("ADVANCE_DAYS") || "1")
}
