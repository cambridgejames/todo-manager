export interface DateViewItem {
  colNumber: number,
  date: number
}

export interface DateViewRow {
  rowNumber: number,
  rowContent: Array<DateViewItem>
}
