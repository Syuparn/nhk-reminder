import { CalendarEvent } from "./calendar";

export function registerEvent(event: CalendarEvent): GoogleAppsScript.Calendar.CalendarEvent {
  return CalendarApp.getDefaultCalendar().createEvent(
    event.title,
    event.startDate,
    event.endDate,
    event.options,
  )
}
