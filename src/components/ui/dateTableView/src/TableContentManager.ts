import { Date, DateViewItem, DateViewRow, DateViewData } from "@/components/ui/dateTableView/src/type";

const TABLE_ROW_NUMBER = 5;
const TABLE_COL_NUMBER = 7;

const creatDate = (date: number): Date => {
  return {
    year: 0,
    month: 0,
    date: date,
    day: 0,
    isToday: false
  };
};

export const initTableContent = (): DateViewData => {
  const solution = new Array<DateViewRow>(TABLE_ROW_NUMBER);
  for (let row = 0; row < TABLE_ROW_NUMBER; row++) {
    const currentRow = new Array<DateViewItem>(TABLE_COL_NUMBER);
    for (let col = 0; col < TABLE_COL_NUMBER; col++) {
      currentRow[col] = {
        colNumber: col,
        date: creatDate(row * TABLE_COL_NUMBER + col + 1)
      } as DateViewItem;
    }
    solution[row] = {
      rowNumber: row,
      rowContent: currentRow
    } as DateViewRow;
  }
  return {
    activeMonth: 0,
    dateContent: solution
  } as DateViewData;
};

export const wheelUp = (tableData: DateViewData): void => {
  const tableContent: Array<DateViewRow> = tableData.dateContent;
  const lastIndexOfContent = tableContent[TABLE_ROW_NUMBER - 1].rowContent[TABLE_COL_NUMBER - 1].date.date;
  const currentRow = new Array<DateViewItem>(TABLE_COL_NUMBER);
  for (let col = 0; col < TABLE_COL_NUMBER; col++) {
    currentRow[col] = {
      colNumber: col,
      date: creatDate(lastIndexOfContent + col + 1)
    } as DateViewItem;
  }
  tableContent.push({
    rowNumber: tableContent[TABLE_ROW_NUMBER - 1].rowNumber + 1,
    rowContent: currentRow
  } as DateViewRow);
  tableContent.shift();
};

export const wheelDown = (tableData: DateViewData): void => {
  const tableContent: Array<DateViewRow> = tableData.dateContent;
  const firstIndexOfContent = tableContent[0].rowContent[0].date.date;
  const currentRow = new Array<DateViewItem>(TABLE_COL_NUMBER);
  for (let col = 0; col < TABLE_COL_NUMBER; col++) {
    currentRow[col] = {
      colNumber: col,
      date: creatDate(firstIndexOfContent + col - TABLE_COL_NUMBER)
    } as DateViewItem;
  }
  tableContent.unshift({
    rowNumber: tableContent[0].rowNumber - 1,
    rowContent: currentRow
  } as DateViewRow);
  tableContent.pop();
};
