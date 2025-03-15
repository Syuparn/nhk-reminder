export type CalendarEvent = {
  title: string
  startDate: Date
  endDate: Date
  options: {
    description: string
  }
}


export function selectEvents(events: CalendarEvent[], keywords: string[]): CalendarEvent[] {
  return events.filter((e: CalendarEvent) => {
    return keywords.some((k: string) => containsKeyword(e, k));
  });
}

function containsKeyword(event: CalendarEvent, keyword: string): boolean {
  return event.title.includes(keyword) || event.options.description.includes(keyword);
}
