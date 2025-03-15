import { CalendarEvent } from "./calendar";
import { getNHKAreaID } from "./config";

// サービスID
const serviceIDSougou = "g1"; // NHK総合
const serviceIDETV = "e1"; // Eテレ

export function fetchNHKPrograms(date: Date, apiKey: string): CalendarEvent[] {
  // NHK番組表API https://api-portal.nhk.or.jp/ のURL
  // NHK総合
  const urlSougou = fetchNHKProgramsURL({
    areaID: getNHKAreaID(),
    serviceID: serviceIDSougou,
    date: date,
    apiKey: apiKey,
  })
  // Eテレ
  const urlETV = fetchNHKProgramsURL({
    areaID: getNHKAreaID(),
    serviceID: serviceIDETV,
    date: date,
    apiKey: apiKey,
  }) 

  const bodySougou = UrlFetchApp.fetch(urlSougou).getContentText();
  Utilities.sleep(3000) // サーバーへ負荷がかからないよう3秒待機
  const bodyETV = UrlFetchApp.fetch(urlETV).getContentText();

  return [...toCalendarEvents(bodySougou, serviceIDSougou), ...toCalendarEvents(bodyETV, serviceIDETV)];
}

function fetchNHKProgramsURL({areaID, serviceID, date, apiKey}: {areaID: string, serviceID: string, date: Date, apiKey: string}): string {
  // YYYY-MM-DD
  const formattedDate = date.toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-');

  // NHK番組表API https://api-portal.nhk.or.jp/
  return `https://api.nhk.or.jp/v2/pg/list/${areaID}/${serviceID}/${formattedDate}.json?key=${apiKey}`
}

function toCalendarEvents(body: string, serviceID: string): CalendarEvent[] {
  const obj = JSON.parse(body)
  const programs = obj["list"][serviceID]

  return programs.map((p: any) => {
    return {
      title: p["title"],
      startDate: new Date(p["start_time"]),
      endDate: new Date(p["end_time"]),
      options: {
        description: p["content"]
      }
    }
  })
}
