import { addMonths, getDaysInMonth, subMonths } from "date-fns";
import { Date as TableDate, DateViewRow, DateViewData } from "@/components/ui/dateTableView/src/type";

const TABLE_ROW_NUMBER = 5;
const TABLE_COL_NUMBER = 7;

const creatDate = (date: number): TableDate => {
  return {
    year: 0,
    month: 0,
    date: date,
    day: 0,
    isToday: false
  };
};

/**
 * 初始化一个月的所有天
 *
 * @param date 这个月所在的天
 */
const createMonth = (date: Date): Array<TableDate> => {
  const solution = [...Array<number>(getDaysInMonth(date) + 1).keys()].slice(1).map(dateIndex => {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: dateIndex,
      day: (date.getDay() - (date.getDate() - dateIndex) % TABLE_COL_NUMBER + TABLE_COL_NUMBER) % TABLE_COL_NUMBER,
      isToday: dateIndex === date.getDate()
    } as TableDate;
  });
  const lastMonthDate = subMonths(date, 1);
  const dayNumOfLastMonth = getDaysInMonth(lastMonthDate);
  const firstDay = solution[0].day;
  for (let day = 0; day < firstDay; day++) {
    solution.unshift({
      year: lastMonthDate.getFullYear(),
      month: lastMonthDate.getMonth() + 1,
      date: dayNumOfLastMonth - day,
      day: firstDay - day - 1,
      isToday: false
    } as TableDate);
  }
  const nextMonthDate = addMonths(date, 1);
  const nextMonthDayNumber = TABLE_ROW_NUMBER * TABLE_COL_NUMBER - solution.length;
  const lastDay = solution[solution.length - 1].day;
  for (let dateIndex = 0; dateIndex < nextMonthDayNumber; dateIndex++) {
    solution.push({
      year: nextMonthDate.getFullYear(),
      month: nextMonthDate.getMonth() + 1,
      date: dateIndex + 1,
      day: (lastDay + dateIndex + 1) % TABLE_COL_NUMBER,
      isToday: false
    } as TableDate);
  }
  return solution;
};

/**
 * 生成一个月的数据
 *
 * @param date 当前日期
 */
export const initTableContent = (date: Date = new Date()): DateViewData => {
  const monthDataList: Array<TableDate> = createMonth(date);
  const solution = new Array<DateViewRow>();
  let rowNumber = 0;
  for (let index = 0; index < monthDataList.length; index += TABLE_COL_NUMBER) {
    solution.push({
      rowNumber: rowNumber++,
      rowContent: monthDataList.slice(index, index + TABLE_COL_NUMBER)
    } as DateViewRow);
  }
  return {
    activeMonth: date.getMonth() + 1,
    dateContent: solution
  } as DateViewData;
};

export const wheelUp = (tableData: DateViewData): void => {
  const tableContent: Array<DateViewRow> = tableData.dateContent;
  const lastIndexOfContent = tableContent[TABLE_ROW_NUMBER - 1].rowContent[TABLE_COL_NUMBER - 1].date;
  const currentRow = new Array<TableDate>(TABLE_COL_NUMBER);
  for (let col = 0; col < TABLE_COL_NUMBER; col++) {
    currentRow[col] = creatDate(lastIndexOfContent + col + 1);
    currentRow[col].day = col;
  }
  tableContent.push({
    rowNumber: tableContent[TABLE_ROW_NUMBER - 1].rowNumber + 1,
    rowContent: currentRow
  } as DateViewRow);
  tableContent.shift();
};

export const wheelDown = (tableData: DateViewData): void => {
  const tableContent: Array<DateViewRow> = tableData.dateContent;
  const firstIndexOfContent = tableContent[0].rowContent[0].date;
  const currentRow = new Array<TableDate>(TABLE_COL_NUMBER);
  for (let col = 0; col < TABLE_COL_NUMBER; col++) {
    currentRow[col] = creatDate(firstIndexOfContent + col - TABLE_COL_NUMBER);
    currentRow[col].day = col;
  }
  tableContent.unshift({
    rowNumber: tableContent[0].rowNumber - 1,
    rowContent: currentRow
  } as DateViewRow);
  tableContent.pop();
};
