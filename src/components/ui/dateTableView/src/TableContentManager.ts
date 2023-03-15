import { addDays, addMonths, getDaysInMonth, subDays, subMonths } from "date-fns";
import { getLunar } from "chinese-lunar-calendar";
import { Date as TableDate, DateViewRow, DateViewData, Lunar } from "@/components/ui/dateTableView/src/type";

const TABLE_ROW_NUMBER = 5;
const TABLE_COL_NUMBER = 7;

/**
 * 初始化一个月的所有天
 *
 * @param date 这个月所在的天
 * @param monthDate 月份日期
 */
const createMonth = (date: Date, monthDate: Date = date): Array<TableDate> => {
  const solution = [...Array<number>(getDaysInMonth(monthDate) + 1).keys()].slice(1).map(dateIndex => {
    return {
      lunar: getLunar(monthDate.getFullYear(), monthDate.getMonth() + 1, dateIndex) as Lunar,
      year: monthDate.getFullYear(),
      month: monthDate.getMonth() + 1,
      date: dateIndex,
      day: (monthDate.getDay() - (monthDate.getDate() - dateIndex) % TABLE_COL_NUMBER + TABLE_COL_NUMBER) % TABLE_COL_NUMBER,
      isToday: dateIndex === date.getDate()
    } as TableDate;
  });
  const lastMonthDate = subMonths(monthDate, 1);
  const dayNumOfLastMonth = getDaysInMonth(lastMonthDate);
  const firstDay = solution[0].day;
  for (let day = 0; day < firstDay; day++) {
    solution.unshift({
      lunar: getLunar(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, dayNumOfLastMonth - day) as Lunar,
      year: lastMonthDate.getFullYear(),
      month: lastMonthDate.getMonth() + 1,
      date: dayNumOfLastMonth - day,
      day: firstDay - day - 1,
      isToday: dayNumOfLastMonth - day === date.getDate()
    } as TableDate);
  }
  const nextMonthDate = addMonths(monthDate, 1);
  const nextMonthDayNumber = TABLE_ROW_NUMBER * TABLE_COL_NUMBER - solution.length;
  const lastDay = solution[solution.length - 1].day;
  for (let dateIndex = 0; dateIndex < nextMonthDayNumber; dateIndex++) {
    solution.push({
      lunar: getLunar(nextMonthDate.getFullYear(), nextMonthDate.getMonth() + 1, dateIndex + 1) as Lunar,
      year: nextMonthDate.getFullYear(),
      month: nextMonthDate.getMonth() + 1,
      date: dateIndex + 1,
      day: (lastDay + dateIndex + 1) % TABLE_COL_NUMBER,
      isToday: dateIndex + 1 === date.getDate()
    } as TableDate);
  }
  return solution;
};

/**
 * 生成一个月的数据
 *
 * @param date 当前日期
 * @param monthDate 月份日期
 */
export const initTableContent = (date: Date = new Date(), monthDate: Date = date): DateViewData => {
  const monthDataList: Array<TableDate> = createMonth(date, monthDate);
  const solution = new Array<DateViewRow>();
  let rowNumber = 0;
  for (let index = 0; index < monthDataList.length; index += TABLE_COL_NUMBER) {
    solution.push({
      rowNumber: rowNumber++,
      rowContent: monthDataList.slice(index, index + TABLE_COL_NUMBER)
    } as DateViewRow);
  }
  return {
    activeMonth: monthDate.getMonth() + 1,
    dateContent: solution
  } as DateViewData;
};

const creatDate = (date: Date): TableDate => {
  return {
    lunar: getLunar(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()) as Lunar,
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    date: date.getUTCDate(),
    day: date.getUTCDay(),
    isToday: false
  };
};

const refreshCurrentMonth = (tableData: DateViewData): void => {
  const numberMap = new Map<number, number>();
  for (const dataRow of tableData.dateContent) {
    for (const dataItem of dataRow.rowContent) {
      const value = numberMap.get(dataItem.month);
      numberMap.set(dataItem.month, value ? value + 1 : 1);
    }
  }
  let maxNumber = 0;
  let solutionMonth = 1;
  numberMap.forEach((number, month) => {
    if (number > maxNumber) {
      solutionMonth = month;
      maxNumber = number;
    }
  });
  tableData.activeMonth = solutionMonth;
};

export const wheelUp = (tableData: DateViewData, date: Date = new Date()): void => {
  const tableContent: Array<DateViewRow> = tableData.dateContent;
  const lastDateOfContent = tableContent[TABLE_ROW_NUMBER - 1].rowContent[TABLE_COL_NUMBER - 1];
  let currentDateOfContent = new Date(Date.UTC(lastDateOfContent.year, lastDateOfContent.month - 1,
    lastDateOfContent.date, 0, 0, 0));
  const currentRow = new Array<TableDate>();
  for (let col = 0; col < TABLE_COL_NUMBER; col++) {
    currentDateOfContent = addDays(currentDateOfContent, 1);
    const tableDate = creatDate(currentDateOfContent);
    tableDate.isToday = tableDate.date === date.getDate();
    currentRow.push(tableDate);
  }
  tableContent.push({
    rowNumber: tableContent[TABLE_ROW_NUMBER - 1].rowNumber + 1,
    rowContent: currentRow
  } as DateViewRow);
  tableContent.shift();
  refreshCurrentMonth(tableData);
};

export const wheelDown = (tableData: DateViewData, date: Date = new Date()): void => {
  const tableContent: Array<DateViewRow> = tableData.dateContent;
  const firstDateOfContent = tableContent[0].rowContent[0];
  let currentDateOfContent = new Date(Date.UTC(firstDateOfContent.year, firstDateOfContent.month - 1,
    firstDateOfContent.date, 0, 0, 0));
  const currentRow = new Array<TableDate>();
  for (let col = 0; col < TABLE_COL_NUMBER; col++) {
    currentDateOfContent = subDays(currentDateOfContent, 1);
    const tableDate = creatDate(currentDateOfContent);
    tableDate.isToday = tableDate.date === date.getDate();
    currentRow.unshift(tableDate);
  }
  tableContent.unshift({
    rowNumber: tableContent[0].rowNumber - 1,
    rowContent: currentRow
  } as DateViewRow);
  tableContent.pop();
  refreshCurrentMonth(tableData);
};

/**
 * 获取activeMonth对应的月份日期
 *
 * @param tableData 一个月的数据
 */
export const getActiveMonthDate = (tableData: DateViewData): Date => {
  let currentDate: TableDate = tableData.dateContent[0].rowContent[0];
  for (const dateViewRow of tableData.dateContent) {
    currentDate = dateViewRow.rowContent[0];
    if (currentDate.month === tableData.activeMonth) {
      break;
    }
  }
  return new Date(currentDate.year, currentDate.month - 1, 1, 0, 0, 0);
};
