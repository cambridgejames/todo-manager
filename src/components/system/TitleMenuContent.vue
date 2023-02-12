<template>
  <div data-tauri-drag-region id="title-menu-content" class="title-menu-content">
    <div class="title-icon"/>
    <div style="width: 100%"></div>
    <div style="width: 100%;"></div>
    <div style="width: 141px; flex-shrink: 0; display: flex; flex-direction: row;">
      <div class="system-button minimize">
        <div class="inner-icon"></div>
      </div>
      <div class="system-button maximize">
        <div class="inner-icon"></div>
      </div>
      <div class="system-button close">
        <div class="inner-icon"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.title-menu-content {
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-user-select: none;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  .title-icon {
    width: var(--tm-header-height);
    flex-shrink: 0;
    background-image: url("@/assets/img/icon.png");
    background-position: center;
    background-repeat: no-repeat;
  }

  .system-button {
    width: 100%;
    text-align: center;
    vertical-align: middle;
    padding: calc((#{var(--tm-header-height)} - 1px - 10px) / 2) 0;
    font-size: 0;
    -webkit-text-size-adjust:none;

    .inner-icon {
      display: inline-block;
      width: 10px;
      height: 10px;
      overflow: hidden;
      background-repeat: no-repeat;
    }

    &.minimize {
      .inner-icon {
        background-color: inherit;
        background-image: url("@/assets/img/button_title_function.png");
        background-position: 0 -20px;
      }

      &:hover {
        background-color: var(--tm-primary-hover);
      }
    }

    &.maximize {
      .inner-icon {
        background-color: inherit;
        background-image: url("@/assets/img/button_title_function.png");
        background-position: -10px -10px;
      }

      &:hover {
        background-color: var(--tm-primary-hover);
      }
    }

    &.close {
      .inner-icon {
        background-color: inherit;
        background-image: url("@/assets/img/button_title_function.png");
        background-position: 0 0;
      }

      &:hover {
        background-color: var(--tm-close-hover);

        .inner-icon {
          background-image: url("@/assets/img/button_title_function.png");
          background-position: -10px 0;
        }
      }

      &:active {
        background-color: var(--tm-close-active);

        .inner-icon {
          background-image: url("@/assets/img/button_title_function.png");
          background-position: -10px 0;
        }
      }
    }
  }
}
</style>
