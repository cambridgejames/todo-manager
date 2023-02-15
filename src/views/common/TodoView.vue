<template>
  <div id="date-box" class="date-box">
    <tm-split-panel direction="row">
      <template #first>
        <div class="todo-view-content todo-list-content">
          todo
        </div>
      </template>
      <template #second>
        <div class="todo-view-content todo-editor-content">
          <div ref="editorRef"></div>
        </div>
      </template>
    </tm-split-panel>
  </div>
</template>

<script lang="ts" setup>
import TmSplitPanel from "@/components/ui/tmSplitPanel/TmSplitPanel.vue";
</script>

<style lang="scss" scoped>
.date-box {
  width: 100%;
  height: 100%;

  .todo-view-content {
    width: 100%;
    height: 100%;
  }

  .todo-list-content {
    padding: var(--tm-article-padding);
  }
}
</style>
