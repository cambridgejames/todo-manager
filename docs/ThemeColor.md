# 一、默认颜色值

```scss
// 基础变量
$devui-global-bg: var(--devui-global-bg, #f3f6f8);                   // 全局带底色背景
$devui-global-bg-normal: var(--devui-global-bg-normal, #ffffff);     // 全局白色背景
$devui-base-bg: var(--devui-base-bg, #ffffff);                       // 基础区块背景白色
$devui-base-bg-dark: var(--devui-base-bg-dark, #333854);             // 基础区块背景深色(固定)
$devui-brand: var(--devui-brand, #5e7ce0);                           // 品牌色
$devui-brand-foil: var(--devui-brand-foil, #859bff);                 // 品牌色辅助色、正衬色
$devui-brand-hover: var(--devui-brand-hover, #7693f5);               // 品牌色高亮色（加亮）
$devui-brand-active: var(--devui-brand-active, #526ecc);             // 品牌色激活色（加深）
$devui-brand-active-focus: var(--devui-brand-active-focus, #344899); // 品牌色焦点色（重度加深）
$devui-contrast: var(--devui-contrast, #c7000b);                     // 品牌色撞色、对比色、反衬色、第二品牌色
$devui-text: var(--devui-text, #252b3a);                             // 正文文本
$devui-text-weak: var(--devui-text-weak, #575d6c);                   // 弱化的正文信息（手风琴子项，表头）
$devui-aide-text: var(--devui-aide-text, #8a8e99);                   // 辅助文本、帮助信息（面包屑）
$devui-aide-text-stress: var(--devui-aide-text-stress, #575d6c);     // 辅助文本、帮助信息里的强调色
$devui-placeholder: var(--devui-placeholder, #8a8e99);               // 占位符
$devui-light-text: var(--devui-light-text, #ffffff);                 // 有色深色背景下字体颜色（固定）
$devui-dark-text: var(--devui-dark-text, #252b3a);                   // 有色浅色背景下字体颜色（固定）
$devui-link: var(--devui-link, #526ecc);                             // 链接文本颜色
$devui-link-active: var(--devui-link-active, #344899);               // 链接文本悬停/激活颜色
$devui-link-light: var(--devui-link-light, #96adfa);                 // 深色背景下链接文本颜色
$devui-link-light-active: var(--devui-link-light-active, #beccfa);   // 深色背景下链接文本悬停/激活颜色
$devui-line: var(--devui-line, #adb0b8);                             // 边框分割线，仅用于边框
$devui-dividing-line: var(--devui-dividing-line, #dfe1e6);           // 内容分割线，用于内容之间的分割
$devui-block: var(--devui-block, #ffffff);                           // 大面积的不可折叠区块的背景色（例如顶部导航背景色）
$devui-area: var(--devui-area, #f8f8f8);                             // 可折叠区块的背景色（展开区域颜色）
$devui-danger: var(--devui-danger, #f66f6a);                         // 失败、错误、告警
$devui-warning: var(--devui-warning, #fac20a);                       // 警告、需注意类型提示
$devui-waiting: var(--devui-waiting, #9faad7);                       // 等待中
$devui-success: var(--devui-success, #50d4ab);                       // 成功、正确
$devui-info: var(--devui-info, #5e7ce0);                             // 通知、一般提示、执行中
$devui-initial: var(--devui-initial, #e9edfa);                       // 初始化、未执行
$devui-unavailable: var(--devui-unavailable, #f5f5f6);               // 不可用、禁用状态
$devui-shadow: var(--devui-shadow, rgba(0, 0, 0, 0.2));              // 阴影色
$devui-light-shadow: var(--devui-light-shadow, rgba(0, 0, 0, 0.1));  // 弱化阴影色

// 图标
$devui-icon-text: var(--devui-icon-text, #252b3a);                           // 文字图标颜色，同 正文颜色
$devui-icon-bg: var(--devui-icon-bg, #ffffff);                               // svg图标 背景色
$devui-icon-fill: var(--devui-icon-fill, #d3d5d9);                           // svg图标 灰色填充色
$devui-icon-fill-hover: var(--devui-icon-fill-hover, #adb5ce);               // svg图标 灰色填充色悬停反馈色
$devui-icon-fill-active: var(--devui-icon-fill-active, #5e7ce0);             // svg图标 高亮填充色（激活状态）
$devui-icon-fill-active-hover: var(--devui-icon-fill-active-hover, #526ecc); // svg图标 高亮填充色悬停反馈色
// 表单
$devui-form-control-line: var(--devui-form-control-line, #adb0b8);                           // 表单控件边框色，同 边框分割线
$devui-form-control-line-hover: var(--devui-form-control-line-hover, #575d6c);               // 表单控件边框悬停反馈色
$devui-form-control-line-active: var(--devui-form-control-line-active, #5e7ce0);             // 表单控件边框激活色，用于获得焦点
$devui-form-control-line-active-hover: var(--devui-form-control-line-active-hover, #344899); // 表单控件边框激活色，用于获得焦点且悬停
// 列表
$devui-list-item-active-bg: var(--devui-list-item-active-bg, #5e7ce0);                       // 列表类型单选选中背景
$devui-list-item-active-text: var(--devui-list-item-active-text, #ffffff);                   // 列表类型单选选中背景搭配文本，同 有色深色背景下字体颜色（固定）
$devui-list-item-active-hover-bg: var(--devui-list-item-active-hover-bg, #526ecc);           // 列表类型单选选中背景悬停反馈色（仅用于分页等）
$devui-list-item-hover-bg: var(--devui-list-item-hover-bg, #f2f5fc);                         // 列表类型普通选项悬停背景
$devui-list-item-hover-text: var(--devui-list-item-hover-text, #526ecc);                     // 列表类型普通选项悬停背景搭配文本
$devui-list-item-selected-bg: var(--devui-list-item-selected-bg, #e9edfa);                   // 列表类型多选被选中的行色，仅用于表格类
$devui-list-item-strip-bg: var(--devui-list-item-strip-bg, #f2f5fc);                         // 列表类型斑马纹色，仅用于表格类
// 禁用
$devui-disabled-bg: var(--devui-disabled-bg, #f5f5f6);     // disabled背景颜色
$devui-disabled-line: var(--devui-disabled-line, #dfe1e6); // disabled边框颜色
$devui-disabled-text: var(--devui-disabled-text, #adb0b8); // disabled文字颜色
$devui-primary-disabled: var(--devui-primary-disabled, #beccfa); //主要按钮disabled状态文字颜色
$devui-icon-fill-active-disabled: var(--devui-icon-fill-active-disabled, #beccfa);  // svg图标激活状态禁用色
// 特殊背景色
$devui-label-bg: var(--devui-label-bg, #eef0f5);                             // 默认标签化选项背景色
$devui-connected-overlay-bg: var(--devui-connected-overlay-bg, #ffffff);     // 有连接点的弹出菜单层背景色
$devui-connected-overlay-line: var(--devui-connected-overlay-line, #526ecc); // 有连接点的弹出菜单层边框色
$devui-fullscreen-overlay-bg: var(--devui-fullscreen-overlay-bg, #ffffff);   // 全屏类型的弹出内容层背景色（模态弹窗）
$devui-feedback-overlay-bg: var(--devui-feedback-overlay-bg, #464d6e);       // 信息提示反馈类型的漂浮层背景色（toast、popover）
$devui-feedback-overlay-text: var(--devui-feedback-overlay-text, #dfe1e6);   // 信息提示反馈类型的漂浮层背景色搭配文本色
$devui-embed-search-bg: var(--devui-embed-search-bg, #f2f5fc);               // 被嵌套的无边框搜索框背景色
$devui-embed-search-bg-hover: var(--devui-embed-search-bg-hover, #eef0f5);   // 被嵌套的无边框搜索框背景色
$devui-float-block-shadow: var(--devui-float-block-shadow, rgba(94, 124, 224, 0.3));  // 特殊浮层背景色（待修正）
$devui-highlight-overlay: var(--devui-highlight-overlay, rgba(255, 255, 255, 0.8)); // 局部半透明全局浮层背景色（比如底部）
$devui-range-item-hover-bg: var(--devui-range-item-hover-bg, #e9edfa); // datepicker范围中的日期hover的反馈背景色

// 按钮
$devui-primary: var(--devui-primary, #5e7ce0);                // 主要按钮，同品牌色
$devui-primary-hover: var(--devui-primary-hover, #7693f5);    // 主要按钮悬停
$devui-primary-active: var(--devui-primary-active, #344899);  // 主要按钮激活

$devui-contrast-hover: var(--devui-contrast-hover, #d64a52);  // 突出按钮悬停
$devui-contrast-active: var(--devui-contrast-active, #b12220);// 突出按钮激活

// 状态
$devui-danger-line: var(--devui-danger-line, #f66f6a);  // 失败边框
$devui-danger-bg: var(--devui-danger-bg, #ffeeed);      // 失败底色

$devui-warning-line: var(--devui-warning-line, #fa9841);// 警告边框
$devui-warning-bg: var(--devui-warning-bg, #fff3e8);    // 警告底色

$devui-info-line: var(--devui-info-line, #5e7ce0);      // 通知边框
$devui-info-bg: var(--devui-info-bg, #f2f5fc);          // 通知底色

$devui-success-line: var(--devui-success-line, #50d4ab);// 成功边框
$devui-success-bg: var(--devui-success-bg, #edfff9);    // 成功底色
$devui-primary-line: var(--devui-primary-line, #5e7ce0);// 主要边框
$devui-primary-bg: var(--devui-primary-bg, #f2f5fc);    // 主要底色

$devui-default-line: var(--devui-default-line, #5e7ce0);// 默认边框
$devui-default-bg: var(--devui-default-bg, #f3f6f8);    // 默认底色
```

# 二、亮色主题

```TypeScript
let data = {
  "devui-global-bg": "#f3f6f8",
  "devui-global-bg-normal": "#ffffff",
  "devui-base-bg": "#ffffff",
  "devui-base-bg-dark": "#333854",
  "devui-brand": "#5e7ce0",
  "devui-brand-foil": "#859bff",
  "devui-brand-hover": "#7693f5",
  "devui-brand-active": "#526ecc",
  "devui-brand-active-focus": "#344899",
  "devui-contrast": "#c7000b",
  "devui-text": "#252b3a",
  "devui-text-weak": "#575d6c",
  "devui-aide-text": "#8a8e99",
  "devui-aide-text-stress": "#575d6c",
  "devui-placeholder": "#8a8e99",
  "devui-light-text": "#ffffff",
  "devui-dark-text": "#252b3a",
  "devui-link": "#526ecc",
  "devui-link-active": "#526ecc",
  "devui-link-light": "#96adfa",
  "devui-link-light-active": "#beccfa",
  "devui-line": "#adb0b8",
  "devui-dividing-line": "#dfe1e6",
  "devui-block": "#ffffff",
  "devui-area": "#f8f8f8",
  "devui-danger": "#f66f6a",
  "devui-warning": "#fac20a",
  "devui-waiting": "#9faad7",
  "devui-success": "#50d4ab",
  "devui-info": "#5e7ce0",
  "devui-initial": "#e9edfa",
  "devui-unavailable": "#f5f5f6",
  "devui-icon-text": "#252b3a",
  "devui-icon-bg": "#ffffff",
  "devui-icon-fill": "#71757f",
  "devui-icon-fill-hover": "#252b3a",
  "devui-icon-fill-active": "#252b3a",
  "devui-icon-fill-active-hover": "#526ecc",
  "devui-form-control-line": "#adb0b8",
  "devui-form-control-line-hover": "#575d6c",
  "devui-form-control-line-active": "#5e7ce0",
  "devui-form-control-line-active-hover": "#344899",
  "devui-list-item-active-bg": "#5e7ce0",
  "devui-list-item-active-text": "#ffffff",
  "devui-list-item-active-hover-bg": "#526ecc",
  "devui-list-item-hover-bg": "#f2f5fc",
  "devui-list-item-hover-text": "#526ecc",
  "devui-list-item-selected-bg": "#e9edfa",
  "devui-list-item-strip-bg": "#f2f5fc",
  "devui-disabled-bg": "#f5f5f6",
  "devui-disabled-line": "#dfe1e6",
  "devui-disabled-text": "#adb0b8",
  "devui-primary-disabled": "#beccfa",
  "devui-icon-fill-active-disabled": "#beccfa",
  "devui-label-bg": "#eef0f5",
  "devui-connected-overlay-bg": "#ffffff",
  "devui-connected-overlay-line": "#526ecc",
  "devui-fullscreen-overlay-bg": "#ffffff",
  "devui-feedback-overlay-bg": "#464d6e",
  "devui-feedback-overlay-text": "#dfe1e6",
  "devui-embed-search-bg": "#f2f5fc",
  "devui-embed-search-bg-hover": "#eef0f5",
  "devui-float-block-shadow": "rgba(94, 124, 224, 0.3)",
  "devui-highlight-overlay": "rgba(255, 255, 255, 0.8)",
  "devui-range-item-hover-bg": "#e9edfa",
  "devui-primary": "#5e7ce0",
  "devui-primary-hover": "#7693f5",
  "devui-primary-active": "#344899",
  "devui-contrast-hover": "#d64a52",
  "devui-contrast-active": "#b12220",
  "devui-danger-line": "#f66f6a",
  "devui-danger-bg": "#ffeeed",
  "devui-warning-line": "#fa9841",
  "devui-warning-bg": "#fff3e8",
  "devui-info-line": "#5e7ce0",
  "devui-info-bg": "#f2f5fc",
  "devui-success-line": "#50d4ab",
  "devui-success-bg": "#edfff9",
  "devui-primary-line": "#5e7ce0",
  "devui-primary-bg": "#f2f5fc",
  "devui-default-line": "#5e7ce0",
  "devui-default-bg": "#f3f6f8",
  "devui-menu-item": "#252b3a",
  "devui-menu-item-sub": "#6C6C6C",
  "devui-menu-item-hover": "#0f0f0f",
  "devui-menu-disabled": "#919191"
};
```

# 三、暗色主题

```TypeScript
let data = {
  "devui-global-bg": "#202124",
  "devui-global-bg-normal": "#202124",
  "devui-base-bg": "#2E2F31",
  "devui-base-bg-dark": "#2e2f31",
  "devui-brand": "#5e7ce0",
  "devui-brand-foil": "#313a61",
  "devui-brand-hover": "#425288",
  "devui-brand-active": "#526ecc",
  "devui-brand-active-focus": "#344899",
  "devui-contrast": "#C7000B",
  "devui-text": "#E8E8E8",
  "devui-text-weak": "#A0A0A0",
  "devui-aide-text": "#909090",
  "devui-aide-text-stress": "#A0A0A0",
  "devui-placeholder": "#8A8A8A",
  "devui-light-text": "#ffffff",
  "devui-dark-text": "#252b3a",
  "devui-link": "#526ECC",
  "devui-link-active": "#344899",
  "devui-link-light": "#96adfa",
  "devui-link-light-active": "#beccfa",
  "devui-line": "#505153",
  "devui-dividing-line": "#3D3E40",
  "devui-block": "#606061",
  "devui-area": "#34363A",
  "devui-danger": "#f66f6a",
  "devui-warning": "#fac20a",
  "devui-waiting": "#5e6580",
  "devui-success": "#50d4ab",
  "devui-info": "#5e7ce0",
  "devui-initial": "#64676e",
  "devui-unavailable": "#5b5b5c",
  "devui-shadow": "rgba(17, 18, 19, 0.4)",
  "devui-light-shadow": "rgba(17, 18, 19, 0.5)",
  "devui-icon-text": "#E8E8E8",
  "devui-icon-bg": "#2E2F31",
  "devui-icon-fill": "#606061",
  "devui-icon-fill-hover": "#73788a",
  "devui-icon-fill-active": "#5e7ce0",
  "devui-icon-fill-active-hover": "#526ecc",
  "devui-form-control-line": "#505153",
  "devui-form-control-line-hover": "#909090",
  "devui-form-control-line-active": "#5e7ce0",
  "devui-form-control-line-active-hover": "#344899",
  "devui-list-item-active-bg": "#5e7ce0",
  "devui-list-item-active-text": "#ffffff",
  "devui-list-item-active-hover-bg": "#526ecc",
  "devui-list-item-hover-bg": "#383838",
  "devui-list-item-hover-text": "#526ecc",
  "devui-list-item-selected-bg": "#454545",
  "devui-list-item-strip-bg": "#383838",
  "devui-disabled-bg": "#3D3E44",
  "devui-disabled-line": "#505153",
  "devui-disabled-text": "#7D7D7D",
  "devui-primary-disabled": "#2B3458",
  "devui-icon-fill-active-disabled": "#2B3458",
  "devui-label-bg": "#46443F",
  "devui-connected-overlay-bg": "#2F2F2F",
  "devui-connected-overlay-line": "#526ecc",
  "devui-fullscreen-overlay-bg": "#2E2F31",
  "devui-feedback-overlay-bg": "#4C4C4C",
  "devui-feedback-overlay-text": "#DFE1E6",
  "devui-embed-search-bg": "#383838",
  "devui-embed-search-bg-hover": "#3D3E40",
  "devui-float-block-shadow": "rgba(94, 124, 224, 0.3)",
  "devui-highlight-overlay": "rgba(255, 255, 255, 0.1)",
  "devui-range-item-hover-bg": "#454545",
  "devui-primary": "#5e7ce0",
  "devui-primary-hover": "#425288",
  "devui-primary-active": "#344899",
  "devui-contrast-hover": "#D64A52",
  "devui-contrast-active": "#B12220",
  "devui-danger-line": "#985C5A",
  "devui-danger-bg": "#4B3A39",
  "devui-warning-line": "#8D6138",
  "devui-warning-bg": "#554434",
  "devui-info-line": "#546BB7",
  "devui-info-bg": "#383D4F",
  "devui-success-line": "#5D887D",
  "devui-success-bg": "#304642",
  "devui-primary-line": "#546BB7",
  "devui-primary-bg": "#383D4F",
  "devui-default-line": "#5e7ce0",
  "devui-default-bg": "#383838",
  "devui-menu-item": "#dcdcdc",
  "devui-menu-item-sub": "#c6c6c6",
  "devui-menu-item-hover": "#fff",
  "devui-menu-disabled": "#919191"
};
```
