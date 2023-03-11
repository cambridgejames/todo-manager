export interface Date {
  year: number,
  month: number,
  date: number,
  day: number,
  isToday: boolean
}

export interface DateViewRow {
  rowNumber: number,
  rowContent: Array<Date>
}

export interface DateViewData {
  activeMonth: number,
  dateContent: Array<DateViewRow>
}
