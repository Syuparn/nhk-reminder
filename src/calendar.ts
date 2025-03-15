export type CalenderEvent = {
  title: string
  startDate: Date
  endDate: Date
  options: {
    description: string
  }
}


export function selectEvents(events: CalenderEvent[], keywords: string[]): CalenderEvent[] {
  return events.filter((e: CalenderEvent) => {
    return keywords.some((k: string) => containsKeyword(e, k));
  });
}

function containsKeyword(event: CalenderEvent, keyword: string): boolean {
  return event.title.includes(keyword) || event.options.description.includes(keyword);
}
