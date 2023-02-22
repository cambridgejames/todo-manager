<template>
  <div class="markdown-editor-box">
    <div class="markdown-editor-top"></div>
    <div class="markdown-editor-main">
      <ckeditor :editor="ClassicEditor" v-model="editorData" :config="editorConfig"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ref } from "vue";

const editorData = ref("");
const editorConfig = {
  toolbar: {
    shouldNotGroupWhenFull: true
  }
};
</script>

<style lang="scss">
.markdown-editor-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: none;

  .markdown-editor-top {
    height: 40px;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: var(--devui-global-bg);
  }

  .markdown-editor-main {
    height: 100%;
    overflow: hidden auto;

    *::selection {
      background: var(--tm-text-select-bg);
    }

    .ck-editor {
      height: 100%;
      min-height: 100%;

      .ck-editor__top {
        display: none;
      }

      .ck-editor__main {
        height: 100%;
        min-height: 100%;
      }

      .ck-content {
        min-height: 100%;
      }

      .ck-toolbar, .ck-editor__editable_inline {
        border: none;
      }

      .ck-editor__editable.ck-focused {
        border: none;
        box-shadow: none;
      }
    }
  }
}
</style>
