# dsh-ascii-sharks（二次开发版）

把 ASCII 鲨鱼引擎嵌进 DeepSeek Harness 的 Web UI，当作一块会动的深海背景。

> **这是一个二次开发版**，不是从零写的作品：引擎、插件骨架都来自上游项目，
> 我们做的是遮罩、性能与鱼种这几块。哪些是上游的、哪些是我们改的，
> 见下面「二次开发」与「来源与许可」两节。站在巨人的肩膀上。

## 它做了什么

- 把上游 `ascii-sharks.html` 的内联引擎原样打包进 `lib/client.js`，只改最后一行：
  不再自己抓页面上的第一个 `<canvas>`，而是把 `OceanEngine` 交给插件。
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

1. **遮罩重写**：空白态（DSH 的 `hero` 阶段）用居中椭圆，一有消息自动换成竖条。
   净空不再按屏幕百分比估，而是读 DSH 自己的正文列宽常量
   （`--dsh-chat-content-width: min(calc(100% - 32px), 920px)`、
   `--dsh-composer-card-max-width: min(calc(100% - 16px), 952px)`），
   窗口、侧栏、阶段一变就重算。形状靠会话容器的 `data-content-phase` 判断。
2. **窄窗口兜底**：净空外面至少留出一段「看得见鱼」的带宽
   （`minBand`，默认按窗口宽的 13%，夹在 48–190px；竖向 `minBandV`）；
   净空被挤到不足正文宽六成时，整层再按 `dimCrushed`（0.7）压暗一档，
   保证正文仍然读得清。原版在窄窗口会把整个窗口都挖掉，一条鱼都看不见。
3. **帧率上限**：引擎原本挂在 `requestAnimationFrame` 上、跟着屏幕刷新率跑——
   240Hz 屏就是每秒 240 次整屏重画（约 7400 个格子逐个 `fillText`，折算约
   每秒 180 万次字符绘制），这是风扇狂转和页面卡死的根源。现在 `fpsCap` 默认 30。
4. **画布像素密度上限**：`dpr` 默认 1（引擎自带上限是 2）。ASCII 不需要 2x。
5. **进对话时真正停帧**：不是把透明度设 0（鱼还在画），而是把 canvas 设成
   `display: none`——引擎自带的 `IntersectionObserver` 一看元素不在视口里
   就停止排帧，聊天的这段时间开销是零。由 `showInChat` 控制。
6. **鱼种字形区分**：原先五个鱼种画出来全是同一个 `-`；现在每种鱼有自己的字符，
   另加两种新小鱼（针鱼 `|` 冲刺、灯笼鱼 `o` 慢游打转）。
7. **无遮罩模式**：`maskMode: 'none'` 时不做任何遮罩，全局可见，只留亮度一个旋钮。
   好处是插件不再依赖 DSH 的内部 DOM，宿主改版也不会失效。
8. **诊断与运行时旋钮**：`window.__DSH_SHARKS_MASK__`（改参数）与
   `__DSH_SHARKS_MASK_INFO__`（看当前这一帧的实际数值）。

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
| `dpr` | `1` | 画布像素密度上限 |

运行时想现场试数，在 DevTools 里改 `window.__DSH_SHARKS_MASK__`（约 0.7s 生效）：

```js
window.__DSH_SHARKS_MASK__.maskMode = 'none'      // 换成无遮罩
window.__DSH_SHARKS_MASK__.fpsCap = 60            // 限帧
window.__DSH_SHARKS_MASK__.darkOpacity = 0.18     // 亮度
window.__DSH_SHARKS_MASK__.showInChat = false     // 进对话就真停
window.__DSH_SHARKS_MASK_INFO__                   // 看当前实际数值（含两侧可见鱼带宽）
```

改完 `lib/client.js` 后要重启 DSH：服务端按文件内容算哈希，源码一变旧地址就 404。

## 卸载

删掉 `bundles` 里那一行（并可移除 `dependencies` 里的链接），重启 DSH。

## 来源与许可

- **上游插件 `dsh-ascii-sharks`**：插件骨架（`index.js`、`cordis.patch.yml`、
  `locale/`、`icon.svg`）与内嵌引擎来自它。**上游没有声明作者、仓库地址与许可**
  （`package.json` 里没有 `author` / `license` / `repository`，包内也没有 LICENSE）。
- **上游引擎 `ascii-sharks.html`**：上游 README 说它来自
  `ascii-sharks-main/ascii-sharks.html`，原样嵌入、不改算法。作者与许可同样未声明，
  原始出处未能确认。
- **本仓库自己写的部分**（遮罩系统、帧率上限、停帧、DPR 上限、鱼种字形、
  无遮罩模式、本文档）按 **MIT** 释出，见 [LICENSE](LICENSE)。
- 免责与维护承诺：本项目对上游部分不主张权利；上游作者若提出署名或许可要求，
  我们照办，或直接撤下。详细清单见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
- 参考过、但当前版本**不含**其代码：`dsh-ascii-whales-main`（鲸鱼体型参数）、
  `ascii-magic-art`（MIT，水母/金鱼的画法思路）。

## 备注

- 引擎自带 `prefers-reduced-motion`、`IntersectionObserver` 可见性处理与 DPR 上限 2；
  插件只负责画布生命周期与遮罩。
- 现在的效果是「边缘可见的深海微光」，不是原 HTML 那种满屏高对比度的鲨鱼。
  原因是它叠在真实 DSH 界面之上，必须优先保证正文可读——这一点上游作者也是这么写的。
- 曾经试过把 `ascii-magic-art` 的现成作品（Swimming Whale 等整幅场景）当背景：
  它是按固定网格逐格算噪声的整幅不透明画面，跟本插件的自适应尺寸 + 正文挖空
  冲突，已于 2026-10-26 回滚，代码存档在 git tag `rollback-safety-20261026`，
  未随本版本发布。