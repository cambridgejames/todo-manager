<template>
  <div ref="dateTableViewRef" class="date-table-view-box" @wheel.prevent.stop="onWheel">
    <div v-for="itemRow in tableContent" class="day-box-row" :key="`${itemRow.rowNumber}`">
      <div v-for="itemCol in itemRow.rowContent" class="day-box" :key="`${itemRow.rowNumber}-${itemCol.colNumber}`">
        {{ itemCol.date }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface DateViewItem {
  colNumber: number,
  date: number
}

interface DateViewRow {
  rowNumber: number,
  rowContent: Array<DateViewItem>
}

const tableContent = ref<Array<DateViewRow>>([] as Array<DateViewRow>);

for (let row = 0; row < 5; row++) {
  const currentRow = new Array<DateViewItem>(7);
  for (let col = 0; col < 7; col++) {
    currentRow[col] = {
      colNumber: col,
      date: row * 7 + col + 1
    };
  }
  tableContent.value.push({
    rowNumber: row,
    rowContent: currentRow
  });
}

const onWheel = (event: WheelEvent): void => {
  const tableContentValue = tableContent.value;
  if (event.deltaY > 0) {
    const lastIndexOfContent = tableContentValue[4].rowContent[6].date;
    const currentRow = new Array<DateViewItem>(7);
    for (let col = 0; col < 7; col++) {
      currentRow[col] = {
        colNumber: col,
        date: lastIndexOfContent + col + 1
      };
    }
    tableContentValue.push({
      rowNumber: tableContentValue[4].rowNumber + 1,
      rowContent: currentRow
    });
    tableContentValue.shift();
  } else {
    const firstIndexOfContent = tableContentValue[0].rowContent[0].date;
    const currentRow = new Array<DateViewItem>(7);
    for (let col = 0; col < 7; col++) {
      currentRow[col] = {
        colNumber: col,
        date: firstIndexOfContent + col - 7
      };
    }
    tableContentValue.unshift({
      rowNumber: tableContentValue[0].rowNumber - 1,
      rowContent: currentRow
    });
    tableContentValue.pop();
  }
};
</script>

<style lang="scss" scoped>
.date-table-view-box {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .day-box-row {
    width: 100%;
    height: calc((100% - var(--tm-article-padding) * 4) / 5);
    margin-bottom: var(--tm-article-padding);
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: var(--tm-article-padding);

    &:last-child {
      margin-bottom: 0;
    }

    .day-box {
      padding: 5px;
      border-radius: var(--tm-article-padding);
      background-color: var(--devui-base-bg);
      text-align: right;
    }
  }
}
</style>
