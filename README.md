# dsh-ascii-sharks（二次开发版）

把 ASCII 鲨鱼引擎嵌进 DeepSeek Harness 的 Web UI，当作一块会动的深海背景。

> **这是一个二次开发版**，不是从零写的作品：引擎、插件骨架都来自上游项目，
> 我们做的是遮罩、性能与鱼种这几块。哪些是上游的、哪些是我们改的，
> 见下面「二次开发」与「来源与许可」两节。站在巨人的肩膀上。

## 它做了什么

- 把上游 [ascii-sharks](https://github.com/stackedlol/ascii-sharks) 的**引擎源码**
  vendor 进 `vendor/ascii-sharks/`，用 `npm run build`（esbuild）编成一个 IIFE
  内联进 `lib/client.js`（`// @engine:start` … `// @engine:end` 之间），注册成
  `window.__DSH_ASCII_SHARKS_ENGINE__`，由插件挂到自己的画布上——
  不再吃别人打好的压缩产物（2026-10-26 换的引擎）。
- 给这颗引擎打了**三处最小补丁**（`vendor/ascii-sharks/engine.ts`，逐处标了
  `[dsh-ascii-sharks 补]`）：像素密度上限改由 `window.__DSH_SHARKS_DPR__` 控制、
  新增画帧上限 `minFrameMs`、`schedule()` 里加「到点才画」的闸门。
  **算法、世界模拟与绘制一个字没动**；出处与补丁清单见
  [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
- 在 DSH 的 frame 里插入一个全屏 `<canvas>`：
  - `pointer-events: none`，不挡点击；
  - `z-index: 10`，在正文之上、`shell.overlay`（20）之下；
  - `mix-blend-mode: screen`，黑色背景透明，只留下发光的鱼与网格；
  - `font-family` 用 Cascadia Mono 一系的等宽字体，`filter: saturate(0.85) brightness(1.06)`；
  - 遮罩避开侧栏与正文阅读区，暗色主题透明度 `0.32`，亮色 `0.10`。
- **不改 DSH 的布局、列、侧栏、主题 token**。这是刻意的：上一版为了把 canvas 塞到内容背后
  去抬列层级，把界面弄空过。现在只用一层带遮罩的 screen 混合，视觉上像背景，
  但不参与布局。
- 卸载插件时删除 canvas、销毁引擎（`engine.destroy()`）、移除 `theme/change` 监听。

## 二次开发：相对原版改了什么

1. **换引擎（2026-10-26）**：从「吃别人打好的压缩产物」换成「vendor 上游源码自己
   编译」。旧产物只能传 `{kind, size}` 两个参数，小鱼数量按窗口面积算死；
   现在型号、条数、小鱼密度都握在自己手里。换来的是**十种体型**
   （八种鲨鱼 + 座头鲸 + 虎鲸）与按笔画明暗分层的绘制；
   代价是旧产物里我们自己加的两种小鱼（针鱼 `|`、灯笼鱼 `o`）不在上游源码里，
   随之没有了。
2. **遮罩重写**：空白态（DSH 的 `hero` 阶段）用居中椭圆，一有消息自动换成竖条。
   净空不再按屏幕百分比估，而是读 DSH 自己的正文列宽常量
   （`--dsh-chat-content-width: min(calc(100% - 32px), 920px)`、
   `--dsh-composer-card-max-width: min(calc(100% - 16px), 952px)`），
   窗口、侧栏、阶段一变就重算。形状靠会话容器的 `data-content-phase` 判断。
3. **窄窗口兜底**：净空外面至少留出一段「看得见鱼」的带宽
   （`minBand`，默认按窗口宽的 13%，夹在 48–190px；竖向 `minBandV`）；
   净空被挤到不足正文宽六成时，整层再按 `dimCrushed`（0.7）压暗一档，
   保证正文仍然读得清。原版在窄窗口会把整个窗口都挖掉，一条鱼都看不见。
4. **帧率上限**：引擎原本挂在 `requestAnimationFrame` 上、跟着屏幕刷新率跑——
   240Hz 屏就是每秒 240 次整屏重画，这是风扇狂转和页面卡死的根源。
   现在 `fpsCap` 默认 30（实测绘制帧率 25–30 帧/秒，见 `docs/validation.md`）。
5. **画布像素密度上限**：`dpr` 默认 **1.25**（引擎自带上限是 2）。ASCII 不需要 2x，
   但 1 倍在 240Hz 高分屏上偏糊——1.25 是折中。
6. **进对话时真正停帧**：不是把透明度设 0（鱼还在画），而是把 canvas 设成
   `display: none`——引擎自带的 `IntersectionObserver` 一看元素不在视口里
   就停止排帧，那段时间开销是零。由 `showInChat` 控制；
   **注意默认是 `true`**——「进对话也一直看得见鱼」是本插件的差异点，
   我们没采用中间件「hero 之外直接销毁引擎」的做法。
7. **十种体型 + 每种各自记条数 + 小鱼密度**：设置页里可以逐个点心仪的体型
   （点当前这个 = 收掉，只剩小鱼），**每种体型各自记着自己的条数**（1–12，
   切走再切回来还是那个数），小鱼数量 0–1000（默认 170）单独一个滑块。
   这些偏好存在 `localStorage`（`dsh-ascii-sharks:species`），改完立刻重建引擎，
   不用重启。换体型与调小鱼都是**100ms 防抖重建**，拖滑块不会每格建一个引擎。
8. **无遮罩模式**：`maskMode: 'none'` 时不做任何遮罩，全局可见，只留亮度一个旋钮。
   好处是插件不再依赖 DSH 的内部 DOM，宿主改版也不会失效。
9. **诊断与运行时旋钮**：`window.__DSH_SHARKS_MASK__`（改参数）、
   `__DSH_SHARKS_MASK_INFO__`（看当前这一帧的实际数值）、
   `__DSH_SHARKS_SPECIES__`（读改体型与条数）、`__DSH_SHARKS_TEST__`（纯函数，供测试）。
10. **构建与验收**：`npm run build`（esbuild 编译引擎并内联）、
    `npm test`（13 个单元用例，假沙箱里加载 `lib/client.js`）、
    `npm run browser-check`（零依赖 CDP 浏览器验收：20 项，含真实绘制帧率、
    像素密度、十种体型逐个上屏、小鱼数量、帧指纹证明在动）。

## 安装

插件需要同时出现在 profile 的 `dependencies` 和 `dsh.profile.bundles` 里才会被加载。

```json
{
  "dependencies": {
    "dsh-ascii-sharks": "link:D:/deepseek_work/dsh-ascii-sharks"
  },
  "dsh": {
    "profile": {
      "bundles": ["...", "dsh-ascii-sharks"]
    }
  }
}
```

改完**重启 DSH** 才生效（插件列表在启动时读取）。也可以在插件管理器里安装 / 启停。

## 调参

源码里的默认值都在 `lib/client.js` 的 `MASK_DEFAULTS`：

| 键 | 默认 | 说明 |
| --- | --- | --- |
| `maskMode` | `'auto'` | `auto` = 空白态椭圆 / 有对话竖条；`none` = 不遮罩 |
| `ellipse` | `fit:'content', hole:0.20, pad:40, fade:0.55, aspect:0.48, nudge:0` | 空白态椭圆；`fit:'window'` 则改按屏宽比例 |
| `rect` | `fit:'content', hole:0.21, pad:40, fade:0.30, aspect:1.50, nudge:0` | 对话态竖条 |
| `sidebarPad` | `50` | 左侧渐隐从侧栏右边再往右让多少像素 |
| `maxHalf` | `0.45` | 净空半宽的上限（屏宽比） |
| `minBand` / `minBandV` | `0` / `0` | 0 = 自动（窗口宽 13% / 高 10%）；也可写死像素 |
| `dimCrushed` | `0.7` | 净空被窗口挤小时，整层压暗到几成 |
| `darkOpacity` / `lightOpacity` | `0.32` / `0.10` | 暗色 / 亮色主题下的透明度 |
| `showInChat` | `true` | 聊天时是否还显示（false = 进对话就 `display:none`、开销归零） |
| `fpsCap` | `30` | 每秒重画上限（60 更顺、24/15 更省电） |
| `dpr` | `1.25` | 画布像素密度上限（引擎真上限，可热改） |

运行时想现场试数，在 DevTools 里改 `window.__DSH_SHARKS_MASK__`（约 0.7s 生效）：

```js
window.__DSH_SHARKS_MASK__.maskMode = 'none'      // 换成无遮罩
window.__DSH_SHARKS_MASK__.fpsCap = 60            // 限帧
window.__DSH_SHARKS_MASK__.dpr = 1                // 像素密度（顺手调糊/调清）
window.__DSH_SHARKS_MASK__.darkOpacity = 0.18     // 亮度
window.__DSH_SHARKS_MASK__.showInChat = false     // 进对话就真停
window.__DSH_SHARKS_MASK_INFO__                   // 看当前实际数值（含两侧可见鱼带宽）
```

**鱼（体型 / 条数 / 小鱼密度）** 另走一套，存在 `localStorage` 的
`dsh-ascii-sharks:species` 键里，改完立刻重建引擎、不用重启：

```js
const sp = window.__DSH_SHARKS_SPECIES__;
sp.select('orca')          // 换成虎鲸（再点一次同一个 = 收掉，只剩小鱼）
sp.setCount('orca', 3)     // 虎鲸要 3 条（每种体型各自记着）
sp.setFish(170)            // 背后小鱼的密度，0–1000
sp.state                   // 当前状态；sp.count('orca') / sp.fish() 读单值
sp.clear()                 // 收掉大鱼
```

十种体型的 kind 分别是 `whale`（座头鲸）/ `orca`（虎鲸）/ `classic` / `hammerhead` /
`greathammer` / `zebra` / `tiger` / `mako` / `thresher` / `nurse`。

改完 `lib/client.js` **不必重启**：DSH 自带客户端插件热重载（`dsh-hmr` + `dsh-client-hmr`，
两个 profile 都装着），宿主发现插件文件变了会在 `/plugins/events` 上推一条 `rebuilt`，
开着的页面跟着换上新的产物——2026-10-27 在 web 与桌面两端实测，改完都收到了 `rebuilt`。
只有改 `dsh.profile.bundles`、装卸插件、改依赖这类**启动期才读**的东西才需要重启。

## 构建

`lib/client.js` 里的引擎是**编译产物**，改 `vendor/ascii-sharks/` 之后必须重编：

```bash
npm run build     # esbuild 把 vendor 编成 IIFE，替换 lib/client.js 里 @engine:start…@engine:end 之间的那一行
npm test          # 单元用例（假沙箱里加载 lib/client.js）
npm run browser-check -- --url="http://127.0.0.1:PORT/?token=..."   # 浏览器验收，20 项
```

`build` 会自己找 esbuild（本机在 `D:/deepseek_work/dsh-ascii-scene/node_modules/@esbuild/`），
也可以 `ESBUILD_BIN=<路径> npm run build` 指定。找不到就报错退出，不会写出半个产物。
验收记录见 `docs/validation.md`。

## 卸载

删掉 `bundles` 里那一行（并可移除 `dependencies` 里的链接），重启 DSH。

## 来源与许可

**站在巨人的肩膀上**——引擎不是我们写的：

- **ASCII 鲨鱼引擎**：来自
  [stackedlol/ascii-sharks](https://github.com/stackedlol/ascii-sharks)
  （**MIT**，`Copyright (c) 2026 drewdi`）。本仓库 vendor 的是它**源码**，
  编译后内联进 `lib/client.js`；上游 LICENSE 原文保留在
  `vendor/ascii-sharks/LICENSE`。
- **这份源码经由** `dsh-ascii-whales`（Chael-Chael，MIT）的 vendor 目录取得；
  它自己的许可只覆盖其原创集成，明文不重新授权 vendor 的上游源码。
  引擎里鲸鱼/虎鲸等改造的出处与取舍，我们在
  [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 第二节里如实写明。
- **Kanji 字形部分**：`ascii-kanji-sharks`（michikusa404，MIT），
  随引擎一起编入（当前界面未开放 hanzi 模式，但代码在产物里，故署名）。
- **插件外壳 `dsh-ascii-sharks`**：`index.js`、`cordis.patch.yml`、`locale/`、
  `icon.svg`、`ascii-sharks.html`（原版附带的一张独立演示页）与最初的 README 来自它。
  **该上游没有声明作者、仓库地址与许可**
  （`package.json` 里没有 `author` / `license` / `repository`，包内也没有 LICENSE）。
  它和上面那个 GitHub 项目是**两个不同的上游**。
- **本仓库自己写的部分**（外层引擎接线与三处补丁、遮罩系统、帧率上限、像素密度上限、
  停帧、十种体型的选择界面、每种体型各自条数、小鱼密度、无遮罩模式、构建与验收脚本、
  本文档）按 **MIT** 释出，见 [LICENSE](LICENSE)。
- 免责与维护承诺：本项目对未声明许可的那部分上游不主张权利；上游作者若提出署名
  或许可要求，我们照办，或直接撤下。逐条清单见
  [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
- 参考过、但当前版本**不含**其代码：`dsh-ascii-whales-main`（鲸鱼体型参数）、
  `ascii-magic-art`（MIT，水母/金鱼的画法思路）。

## 备注

- 引擎自带 `prefers-reduced-motion`、`IntersectionObserver` 可见性处理与 DPR 上限 2；
  插件只负责画布生命周期与遮罩。**「到点才画」的限帧闸门是我们加的补丁**
  （上游每个 rAF 都整屏重画），`vendor/ascii-sharks/engine.ts` 里那三处
  `[dsh-ascii-sharks 补]` 就是全部改动。
- 现在的效果是「边缘可见的深海微光」，不是原 HTML 那种满屏高对比度的鲨鱼。
  原因是它叠在真实 DSH 界面之上，必须优先保证正文可读——这一点上游作者也是这么写的。
- 曾经试过把 `ascii-magic-art` 的现成作品（Swimming Whale 等整幅场景）当背景：
  它是按固定网格逐格算噪声的整幅不透明画面，跟本插件的自适应尺寸 + 正文挖空
  冲突，已于 2026-10-26 回滚，代码存档在 git tag `rollback-safety-20261026`，
  未随本版本发布。