export interface Lunar {
  lunarMonth: number,
  lunarDate: number,
  isLeap: boolean,
  solarTerm: string | null,
  lunarYear: string,
  zodiac: string,
  dateStr: string
}

export interface Date {
  lunar: Lunar,
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
