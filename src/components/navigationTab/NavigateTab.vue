<template>
  <div id="navigate-tab-box" class="navigate-tab-box">
    <div class="button-group-top">
      <button v-for="(item, index) in topViewBtn" :key="index"
              :class="['button-group-btn', { 'selected': item.enable }]">
        <d-icon :name="item.icon" :size="iconSize" @click="gotoPath(item.url)"></d-icon>
      </button>
    </div>
    <div class="button-group-bottom">
      <button v-for="(item, index) in bottomViewBtn" :key="index"
              :class="['button-group-btn', { 'selected': item.enable }]">
        <d-icon :name="item.icon" :size="iconSize" @click="gotoPath(item.url)"></d-icon>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { NavigateTabItem } from "./ts/NavigateTabItem";
import { NavigateTabItemEx, initTabItem, isEnable } from "./ts/NavigateUtil";

const props = defineProps({
  topBtn: {
    type: Array as PropType<NavigateTabItem[]>,
    require: false,
    default: [] as NavigateTabItem[]
  },
  bottomBtn: {
    type: Array as PropType<NavigateTabItem[]>,
    require: false,
    default: [] as NavigateTabItem[]
  }
});

const iconSize = "22px";
const router = useRouter();
const topViewBtn = ref<Array<NavigateTabItemEx>>([]);
const bottomViewBtn = ref<Array<NavigateTabItemEx>>([]);

const gotoPath = (target: string): void => {
  router.push({ path: target });
};

const updateEnableSign = (): void => {
  let isFound: boolean = false;
  for (const topViewBtnItem of topViewBtn.value) {
    const currentSign: boolean = !isFound && isEnable(topViewBtnItem, router);
    topViewBtnItem.enable = currentSign;
    isFound = isFound || currentSign;
  }
  for (const bottomViewBtnItem of bottomViewBtn.value) {
    const currentSign: boolean = !isFound && isEnable(bottomViewBtnItem, router);
    bottomViewBtnItem.enable = currentSign;
    isFound = isFound || currentSign;
  }
};

const initBtnList = (): void => {
  for (const topBtnItem of props.topBtn) {
    topViewBtn.value.push(initTabItem(topBtnItem));
  }
  for (const bottomBtnItem of props.bottomBtn) {
    bottomViewBtn.value.push(initTabItem(bottomBtnItem));
  }
  updateEnableSign();
};

/**
 * 监听Path变化
 */
watch(() => router.currentRoute.value.path, updateEnableSign, { immediate: true, deep: true });

/**
 * 初始化组件
 */
onMounted(() => {
  initBtnList();
});

</script>

<style scoped lang="scss">
@use "~@/assets/css/constants";

.navigate-tab-box {
  width: constants.$main-asside-width;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--devui-global-bg-normal);

  %btn-group {
    width: 100%;
    overflow: hidden;
    cursor: pointer;

    .button-group-btn {
      width: 100%;
      height: constants.$main-asside-width;
      position: relative;

      &[class*="selected"]:before {
        content: " ";
        width: calc(constants.$main-asside-width - 20px);
        height: calc(constants.$main-asside-width - 20px);
        position: absolute;
        top: 10px;
        left: 10px;
        border-radius: 5px;
        background-color: red;
      }
    }
  }

  .button-group-top {
    height: 100%;
    @extend %btn-group;
  }

  .button-group-bottom {
    height: max-content;
    @extend %btn-group;
  }
}
</style>
