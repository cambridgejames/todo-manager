<template>
  <div id="navigate-tab-box" class="navigate-tab-box">
    <div class="button-group-top">
      <div v-for="(item, index) in topViewBtn" :key="index" class="button-group-div">
        <button :class="['button-group-btn', { 'selected': item.enable }]" @click.stop="gotoPath(item.url)">
          <d-icon :name="item.icon" :size="iconSize"/>
        </button>
      </div>
    </div>
    <div class="button-group-bottom">
      <div v-for="(item, index) in bottomViewBtn" :key="index" class="button-group-div">
        <button :class="['button-group-btn', { 'selected': item.enable }]" @click.stop="gotoPath(item.url)">
          <d-icon :name="item.icon" :size="iconSize"/>
        </button>
      </div>
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

$button-group-btn-padding: 6px;
$button-group-btn-radius: 8px;
$button-group-btn-inner-padding: 8px;

.navigate-tab-box {
  width: constants.$main-asside-width;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--devui-global-bg-normal);

  %btn-group {
    width: 100%;
    overflow: hidden;

    .button-group-div {
      width: 100%;
      height: constants.$main-asside-width;
      position: relative;

      .button-group-btn {
        position: absolute;
        top: $button-group-btn-padding;
        left: $button-group-btn-padding;
        width: calc(constants.$main-asside-width - 2 * $button-group-btn-padding);
        height: calc(constants.$main-asside-width - 2 * $button-group-btn-padding);
        border-radius: $button-group-btn-radius;
        padding: $button-group-btn-inner-padding;

        &[class*="selected"] {
          background-color: var(--devui-primary);
        }
      }
    }
  }

  .button-group-top {
    height: 100%;
    @extend %btn-group;
  }

  .button-group-bottom {
    flex-shrink: 0;
    height: max-content;
    @extend %btn-group;
  }
}
</style>
