export interface Date {
  year: number,
  month: number,
  date: number,
  day: number,
  isToday: boolean
}

export interface DateViewItem {
  colNumber: number,
  date: Date
}

export interface DateViewRow {
  rowNumber: number,
  rowContent: Array<DateViewItem>
}

export interface DateViewData {
  activeMonth: number,
  dateContent: Array<DateViewRow>
}
