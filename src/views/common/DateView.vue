<template>
  <div id="date-box" class="date-box">
    <div class="date-function-container">
      <d-date-picker-pro v-model="selectedMonth" type="month" />
    </div>
    <div class="date-table-view-container">
      <DateTableView/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import DateTableView from "@/components/ui/dateTableView";

const selectedMonth = ref<string>("");
</script>

<style lang="scss" scoped>
$function-container-height: 50px;

.date-box {
  width: 100%;
  height: 100%;
  display: flex;
  padding: var(--tm-article-padding);
  flex-direction: column;
  justify-content: space-between;

  .date-function-container, .date-table-view-container {
    flex-shrink: 0;
    flex-grow: 0;
  }

  .date-function-container {
    height: $function-container-height;
  }

  .date-table-view-container {
    height: calc(100% - $function-container-height - var(--tm-article-padding));
  }
}
</style>
