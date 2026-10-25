# dsh-ascii-sharks

把 `ascii-sharks-main/ascii-sharks.html` 里的鲨鱼引擎嵌进 DeepSeek Harness Web UI，作为一个轻量背景插件。

## 它做了什么

- 把 `ascii-sharks.html` 的内联引擎原样打包进 `lib/client.js`，只改最后一行：不再自己抓页面上的第一个 `<canvas>`，而是把 `OceanEngine` 暴露给插件。
- 在 DSH 的 frame 里插入一个全屏 `<canvas>`：
  - `pointer-events: none`，不挡点击；
  - `z-index: 10`，在正文之上、`shell.overlay`（20）之下；
  - `mix-blend-mode: screen`，黑色背景透明，只留下发光的鲨鱼/网格；
  - 左侧渐隐 + 中央椭圆遮罩，避开侧栏和正文阅读区；
  - 暗色主题透明度 `0.14`，亮色 `0.04`。
- **不改 DSH 的布局、列、侧栏、主题 token**。这是刻意的：上一版为了把 canvas 塞到内容背后去抬列层级，把界面弄空过。现在只用一层带遮罩的 screen 混合，视觉上像背景，但不会参与布局。
- 卸载插件时删除 canvas、销毁引擎（`engine.destroy()`）、移除 `theme/change` 监听。

## 安装

已经在 `desktop` profile 里安装并启用。重新安装：

```text
plugin_manager install_bundle
target: D:\deepseek_work\dsh-ascii-sharks
```

## 调参

都在 `lib/client.js` 的 `Backdrop` 里：

```js
'opacity:0.14;filter:saturate(0.60) brightness(1.08);'
```

- 想让鲨鱼更明显：把 `0.14` 调到 `0.20` 左右；
- 想更淡：`0.08`；
- 中央遮罩在 `radial-gradient(ellipse 68% 58% at 48% 48%, ...)`，把 `transparent 46%` 调大，正文区就更干净；
- 左侧遮罩 `linear-gradient(90deg, transparent 0, transparent 236px, #000 326px)` 对应侧栏宽度。

改完在插件管理器里关/开一次 `ASCII 鲨鱼 · 深海背景`，或重装 bundle，即可重新挂载。

## 卸载

插件管理器里停用，或：

```text
plugin_manager remove_bundle
target: dsh-ascii-sharks
```

## 备注

- 鲨鱼引擎来自本地 `ascii-sharks-main/ascii-sharks.html`，本包只做嵌入与降噪，不修改原仓库。
- 引擎自己处理 DPR 上限 2、`prefers-reduced-motion`、窗口 blur 和可见性；插件只负责画布生命周期。
- 现在的效果是“边缘可见的深海微光”，不是原 HTML 那种满屏高对比度鲨鱼。原因是它叠在真实 DSH 界面之上，必须优先保证正文可读。
