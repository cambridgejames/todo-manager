<template>
  <ckeditor :editor="ClassicEditor" v-model="editorData" :config="editorConfig"></ckeditor>
</template>

<script lang="ts" setup>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ref } from "vue";

const editorData = ref("");
const editorConfig = {
  toolbar: {
    items: [
      "undo", "redo",
      "|",
      "findAndReplace", "selectAll",
      "|",
      "heading",
      "|",
      "removeFormat", "bold", "italic", "strikethrough", "underline", "code", "subscript", "superscript",
      "|",
      "specialCharacters", "horizontalLine", "pageBreak",
      "|",
      "-",
      "highlight", "fontSize", "fontFamily", "fontColor", "fontBackgroundColor",
      "|",
      "link", "blockQuote", "insertTable", "uploadImage", "codeBlock", "htmlEmbed",
      "|",
      "bulletedList", "numberedList", "todoList",
      "|",
      "outdent", "indent", "alignment",
      "|",
      "textPartLanguage",
      "|",
      "sourceEditing"
    ],
    shouldNotGroupWhenFull: true
  }
};
</script>

<style scoped>

</style>
