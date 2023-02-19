<template>
  <ckeditor :editor="ClassicEditor" v-model="editorData" :config="editorConfig"></ckeditor>
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

<style scoped>

</style>
