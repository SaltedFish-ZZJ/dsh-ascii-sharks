# 第三方来源与许可 / THIRD PARTY NOTICES

本仓库是 `dsh-ascii-sharks` 的**二次开发版**。下面把「哪些不是我们写的」一条条列清楚，
发布、转载或以任何形式分发时请连同本文件一起保留。

## 一、上游：dsh-ascii-sharks 原版插件

- **内容**：插件骨架（`index.js`、`cordis.patch.yml`、`locale/`、`icon.svg`）、
  内嵌的 ASCII 鲨鱼引擎（在 `lib/client.js` 顶部，与 `ascii-sharks.html` 里的
  内联脚本同一份）、本仓库的历史版本的 `README.md` 原文。
- **作者**：上游未在任何文件里声明作者、仓库地址或许可证；`package.json` 里
  没有 `author` / `license` / `repository` 字段，包内也没有 LICENSE 文件。
- **来源**：随 DeepSeek Harness 的插件安装包取得（本机 2026-10-22 安装；
  原样备份见 `D:/deepseek_work/dsh-ascii-sharks-orig-20261025`）。
- **许可**：**未声明**。因此本项目只对「自己新增与修改的部分」按 MIT 释出
  （见 `LICENSE`），对上游部分不授予许可、也不主张权利。
  **若上游作者看到本仓库并提出署名或许可要求，我们照办或直接撤下。**

## 二、上游：ASCII 鲨鱼引擎（ascii-sharks.html）

- 上游 README 的原话是：引擎来自 `ascii-sharks-main/ascii-sharks.html`，
  原版插件「只做嵌入与降噪，不修改原仓库」。本仓库沿用这份引擎，未作算法改动。
- 引擎内含八种鲨鱼体型（classic / hammerhead / tiger / zebra / greathammer /
  mako / thresher / nurse）、七种小鱼（sardine / anchovy / silverside /
  mackerel / goby / needlefish / lanternfish）、以及自带的
  `prefers-reduced-motion`、`IntersectionObserver` 可见性处理与 DPR 上限 2。
- **作者与许可：未声明，原始出处未能确认**（2026-10-26 查 npm 无同名包，
  网上检索也未定位到原项目）。如有知情者，请告知，我们补上署名。

## 三、参考过（本仓库当前**不含**其代码）

- `dsh-ascii-whales-main`：参考过它的鲸鱼体型参数表。这是一个独立的第三方项目
  （仓库自带 `THIRD_PARTY_NOTICES`）。本仓库没有搬运它的代码。
- `ascii-magic-art`（MIT）：参考过它水母/金鱼的画法思路（伞盖分层、触须摆动、
  球面高光、场景层）。当前版本**不包含**它的任何代码；曾经试验性接入过一件
  作品（Swimming Whale），已于 2026-10-26 回滚，存档在 tag
  `rollback-safety-20261026`，未随本版本发布。

## 四、本项目自己写的部分

见 `README.md` 的「二次开发」一节：遮罩系统（空白态椭圆 / 对话态竖条、按 DSH
正文列宽换算、窄窗口兜底）、帧率上限、进入对话时真正停帧、画布像素密度上限、
鱼种字形区分、新增两种小鱼、无遮罩模式，以及各项运行时旋钮。
这部分按 MIT 释出（见 `LICENSE`）。