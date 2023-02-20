<template>
  <div id="navigate-tab-box" class="navigate-tab-box">
    <div class="button-group-top">
      <div v-for="(item, index) in topViewBtn" :key="index" class="button-group-div">
        <button :class="['button-group-btn', { 'selected': item.enable }]" @click.stop="gotoPath(item.url)">
          <d-icon :name="item.icon" :size="iconSize"/>
          <div class="btn-tip-box">{{ $t(item.name) }}</div>
        </button>
      </div>
    </div>
    <div class="button-group-bottom">
      <div v-for="(item, index) in bottomViewBtn" :key="index" class="button-group-div">
        <button :class="['button-group-btn', { 'selected': item.enable }]" @click.stop="gotoPath(item.url)">
          <d-icon :name="item.icon" :size="iconSize"/>
          <div class="btn-tip-box">{{ $t(item.name) }}</div>
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

const iconSize = "20px";
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
@use "~@/assets/css/constants.scss";

$button-group-btn-padding: 5px;
$button-group-btn-radius: 8px;
$button-group-btn-inner-padding: 5px;
$button-group-btn-tip-outer-padding: 0px;
$button-group-btn-tip-inner-radius: 4px;
$button-group-btn-tip-inner-padding: 8px;

.navigate-tab-box {
  width: constants.$main-asside-width;
  height: 100%;
  padding: calc(var(--tm-article-padding) - $button-group-btn-padding) 0;
  display: flex;
  flex-direction: column;
  background-color: var(--devui-global-bg);
  user-select: none;

  %btn-group {
    width: 100%;

    .button-group-div {
      width: 100%;
      height: constants.$main-asside-width;
      padding: $button-group-btn-padding;

      .button-group-btn {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: $button-group-btn-radius;
        padding: $button-group-btn-inner-padding;

        .btn-tip-box {
          display: none;
          position: absolute;
          height: calc(100% - $button-group-btn-tip-outer-padding * 2);
          width: max-content;
          top: $button-group-btn-tip-outer-padding;
          left: calc(100% + $button-group-btn-inner-padding + $button-group-btn-tip-outer-padding);
          padding: 0 $button-group-btn-tip-inner-padding;
          font-size: var(--devui-font-size);
          line-height: var(--devui-font-size);
          vertical-align: middle;
          text-align: center;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--tm-primary-border);
          border-radius: $button-group-btn-tip-inner-radius;
          color: var(--devui-icon-fill);
          background-color: var(--tm-primary-hover);
          z-index: 200;
        }

        .devui-icon__container {
          color: var(--devui-icon-fill);

          :deep(.icon) {
            transition: none !important;
          }
        }

        &:hover {
          background-color: var(--tm-primary-hover);
          .btn-tip-box {
            display: flex;
          }
        }

        &.selected {
          background-color: var(--devui-primary);

          .devui-icon__container {
            color: var(--devui-icon-fill-active);
          }
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
