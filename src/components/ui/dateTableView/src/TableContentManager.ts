import { DateViewItem, DateViewRow } from "@/components/ui/dateTableView/src/type";

const TABLE_ROW_NUMBER = 5;
const TABLE_COL_NUMBER = 7;

export const initTableContent = (): Array<DateViewRow> => {
  const solution = new Array<DateViewRow>(TABLE_ROW_NUMBER);
  for (let row = 0; row < TABLE_ROW_NUMBER; row++) {
    const currentRow = new Array<DateViewItem>(TABLE_COL_NUMBER);
    for (let col = 0; col < TABLE_COL_NUMBER; col++) {
      currentRow[col] = {
        colNumber: col,
        date: row * TABLE_COL_NUMBER + col + 1
      };
    }
    solution[row] = {
      rowNumber: row,
      rowContent: currentRow
    };
  }
  return solution;
};

export const wheelUp = (tableContent: Array<DateViewRow>): void => {
  const lastIndexOfContent = tableContent[TABLE_ROW_NUMBER - 1].rowContent[TABLE_COL_NUMBER - 1].date;
  const currentRow = new Array<DateViewItem>(TABLE_COL_NUMBER);
  for (let col = 0; col < TABLE_COL_NUMBER; col++) {
    currentRow[col] = {
      colNumber: col,
      date: lastIndexOfContent + col + 1
    };
  }
  tableContent.push({
    rowNumber: tableContent[TABLE_ROW_NUMBER - 1].rowNumber + 1,
    rowContent: currentRow
  });
  tableContent.shift();
};

export const wheelDown = (tableContent: Array<DateViewRow>): void => {
  const firstIndexOfContent = tableContent[0].rowContent[0].date;
  const currentRow = new Array<DateViewItem>(TABLE_COL_NUMBER);
  for (let col = 0; col < TABLE_COL_NUMBER; col++) {
    currentRow[col] = {
      colNumber: col,
      date: firstIndexOfContent + col - TABLE_COL_NUMBER
    };
  }
  tableContent.unshift({
    rowNumber: tableContent[0].rowNumber - 1,
    rowContent: currentRow
  });
  tableContent.pop();
};
