# 第三方来源与许可 / THIRD PARTY NOTICES

本仓库是 `dsh-ascii-sharks` 的**二次开发版**。下面把「哪些不是我们写的」一条条列清楚，
发布、转载或以任何形式分发时请连同本文件一起保留。

---

## 一、引擎：ascii-sharks（上游，MIT）

- **项目**：<https://github.com/stackedlol/ascii-sharks>
- **许可**：**MIT**。`LICENSE` 原文第一行署名 `Copyright (c) 2026 drewdi`
  （原文已随本仓库放在 `vendor/ascii-sharks/LICENSE`，本机克隆副本在
  `D:/deepseek_work/ascii-sharks-upstream`）。上游仓库信息（2026-10-26 核对）：
  `name: ascii-sharks`、`version 0.1.0`、`private: true`、`license: MIT`、
  `main: src/index.ts`，TypeScript + Vite。
- **这份源码是哪里来的**：不是我们直接从 GitHub 拷的，而是从
  `dsh-ascii-whales` 项目的 `vendor/ascii-sharks/` 拷过来的（见第二节）。
  拷过来后与那一份逐字节比对：**只有 `engine.ts` 与 `renderer.ts` 不同，差异全是我们打的补丁**
  （比对方法与结果见 `docs/validation.md`）。
- **怎么进到插件里**：`scripts/build-engine.mjs` 用 esbuild 把 `vendor/ascii-sharks`
  编成一个 IIFE，内联进 `lib/client.js` 的 `// @engine:start` 与 `// @engine:end`
  之间，注册为 `window.__DSH_ASCII_SHARKS_ENGINE__`，由插件外壳挂到自己的画布上。
  **我们不发布 vendor 源码，发布的是这份编译产物**；`package.json` 的 `files`
  因此仍然只列运行时要用的文件。
- **我们打的补丁**（`engine.ts` 里是 `[dsh-ascii-sharks 补]`，`renderer.ts` 里是
  `[patch:original-color]`，每处都标明）：
  **框架（`vendor/ascii-sharks/engine.ts`）三处：**
  1. 第 94 行：画布像素密度上限由硬编码的 `Math.min(devicePixelRatio, 2)`
     改成读 `window.__DSH_SHARKS_DPR__ ?? 2`（可由外壳热改，默认 1.25）。
  2. 第 24–28 行：新增 `minFrameMs = 0` 与 `private lastPaint = 0`。
  3. 第 120–124 行：`schedule()` 里加「到点才 `render()`」的闸门——
     上游每个 rAF 都整屏重画（240Hz 屏就是每秒 240 次），我们卡到 30。
  **配色（`vendor/ascii-sharks/renderer.ts`）四处，目的只有一个：把颜色还原成
  最初那版引擎的观感。**
  4. `DOT_RGB`（第 19–24 行）还原成最初的五色（蓝紫 / 绿 / 红 / 冰蓝 / 青）。
     上游这一版把它换成了主题色的五个蓝调，整幅背景因此发蓝。
  5. `paintGrid`（第 258 行）：深色底下的网格线由 `rgba(140,165,255,…)` 还原成白色。
  6. `setTheme`（第 361–368 行）：小鱼固定冰白 `(230,238,255)`、海底尘埃用 `DOT_RGB`
     原色，不再从主题色派生。
  7. `bodyColor`（第 371–377 行）：身体底色还原成「亮度 × 体型色调」的灰阶，
     不再从主题色往白 / 蓝推。
  除了这些，**算法、世界模拟、体型表一个字没动**。
- **引擎里本来就有的东西**：十种体型 `whale | orca | classic | hammerhead | zebra |
  tiger | greathammer | mako | thresher | nurse`（`world.ts` 第 21 行）、
  五种小鱼 sardine / anchovy / silverside / mackerel / goby（`species.ts`）、
  自适应大小的 `IntersectionObserver` 可见性处理与 `prefers-reduced-motion`。
- **换引擎后丢掉的一样东西**：旧版内嵌的那份打包产物里有两种我们后加的小鱼
  （needlefish 针鱼、lanternfish 灯笼鱼），**在这份上游源码里没有**，
  换成源码引擎之后就没有了。这是有意的取舍（换来的是可调的体型与小鱼密度）。

## 二、中间层：dsh-ascii-whales（Chael-Chael，MIT，附条件）

- **项目**：`dsh-ascii-whales`（本机副本 `D:/deepseek_work/dsh-ascii-whales-main`，
  npm 上 0.1.5）。它的仓库里 vendor 了上游 ascii-sharks 的**源码**（不是打包产物），
  我们用的就是它 vendor 的那一份——也就是第一节说的「这份源码是哪里来的」。
- **它自己的许可**（原文保留在 `vendor/LICENSE.dsh-ascii-whales`）：MIT，
  **只覆盖它原创的 DSH 集成、配置、构建与测试脚本、文档**；并明文写着
  **「vendor 进来的上游源码保留上游作者与条款，本许可不重新授权那份源码」**。
- **这意味着什么（我们如实说明，不回避）**：它 `renderer.ts` 里为鲸鱼、虎鲸、
  笔画明暗分层所做的改造，性质上是**对上游源码的二次开发**，
  而它的许可文字没有把这段改造的归属写死。我们沿用了这段改造，因此在这里注明：
  **`vendor/ascii-sharks/` 里除了我们那几处补丁之外的内容，代码与改造均出自
  上游 drewdi 的 ascii-sharks 与 Chael-Chael 的 dsh-ascii-whales，不是我们写的**；
  上游 MIT 的版权声明按要求保留在 `vendor/ascii-sharks/LICENSE`。
- **想走「最干净署名链」的另一条路**：把我们自己从 GitHub 直接 vendor 上游原版
  （只有八个鲨鱼形状，没有鲸鱼/虎鲸），代价是丢掉这两种体型。**这条路我们没走**，
  并把这条取舍写在这里，供后来者判断。

## 三、Kanji 部分：ascii-kanji-sharks（michikusa404，MIT）

- **内容**：`vendor/ascii-kanji-sharks/`（`painter.js`、`glyphs.js`、`util.js` 与
  它自己的 `LICENSE`）。它也来自 `dsh-ascii-whales` 的 vendor 目录，逐字节相同。
- **用在哪**：引擎第 4 行 `import { Painter } from "../ascii-kanji-sharks/painter.js"`，
  供引擎的 `glyphMode: 'hanzi'` 字形模式使用（鲸鱼/虎鲸身上还会出现一个
  笔画拼成的「目」字作为彩蛋）。
- **当前状态**：设置页只开了 ASCII 模式，hanzi 还没接到界面上；但它的代码已经在
  我们发布的编译产物里（约 10KB 压缩后体积），所以这里必须署名。

## 四、上游：dsh-ascii-sharks 原版插件外壳（作者与许可未声明）

- **内容**：插件骨架（`index.js`、`cordis.patch.yml`、`locale/`、`icon.svg`）
  与本仓库最初的 `README.md` 原文。
- **来源**：随 DeepSeek Harness 的插件安装包取得（本机 2026-10-22 安装；
  原样备份见 `D:/deepseek_work/dsh-ascii-sharks-orig-20261025`）。
- **作者**：未在任何文件里声明作者、仓库地址或许可证；`package.json` 里
  没有 `author` / `license` / `repository` 字段，包内也没有 LICENSE 文件。
  **注意：它和第一节的 ascii-sharks 是两个不同的上游。**
- **许可**：**未声明**。因此本项目只对「自己新增与修改的部分」按 MIT 释出
  （见 `LICENSE`），对这部分上游不授予许可、也不主张权利。
  **若上游作者看到本仓库并提出署名或许可要求，我们照办或直接撤下。**

## 五、参考过（本仓库当前**不含**其代码）

- `ascii-magic-art`（MIT）：参考过它水母/金鱼的画法思路（伞盖分层、触须摆动、
  球面高光、场景层）。当前版本**不包含**它的任何代码；曾经试验性接入过一件
  作品（Swimming Whale），已于 2026-10-26 回滚，存档在 tag
  `rollback-safety-20261026`，未随本版本发布。
- `dsh-ascii-scene`（`D:/deepseek_work/dsh-ascii-scene/`）：本项目 10-24 做的一个
  半成品，世界模拟与绘制与 `dsh-ascii-whales` 逐字节相同，发现撞车后停用。
  它的**十种体型中英文案**、**参数取舍（dpr 1.5 / fishCount 40 / wake .6）**与
  **测试写法**被我们参考吸收；引擎代码没有取用。

## 六、本项目自己写的部分

见 `README.md` 的「二次开发」一节：遮罩系统（空白态椭圆 / 对话态竖条、按 DSH
正文列宽换算、窄窗口兜底）、帧率上限与像素密度上限两个阀门、**进对话也一直有鱼**
（不采用中间件「hero 之外销毁引擎」的做法）、十种体型的选择界面、每种体型各自
记条数、小鱼密度旋钮（0–1000，默认 170）、运行时诊断旋钮、
`scripts/build-engine.mjs` 构建脚本、`tests/` 与 `scripts/browser-check.mjs`
两个验收脚本、以及本文档。这部分按 MIT 释出（见 `LICENSE`）。