# 第三方来源与许可 / THIRD PARTY NOTICES

本仓库是 `dsh-ascii-sharks` 的**二次开发版**。下面把「哪些不是我们写的」一条条列清楚，
发布、转载或以任何形式分发时请连同本文件一起保留。

## 一、上游：ASCII 鲨鱼引擎 —— ascii-sharks

- **项目**：<https://github.com/stackedlol/ascii-sharks>
- **许可**：**MIT**。`LICENSE` 原文第一行署名 `Copyright (c) 2026 drewdi`；
  本仓库按 MIT 的要求保留该版权声明（见 `LICENSE` 与本文件）。
- **仓库信息**（2026-10-26 核对）：`package.json` 为 `name: ascii-sharks`、
  `version 0.1.0`、`private: true`、`license: MIT`、`main: src/index.ts`，
  TypeScript + Vite；默认分支 `main`，提交历史 5 笔
  （`e34f391` first commit → `a0074c1` add MIT license，HEAD `a0074c1`）。
  本地克隆副本：`D:/deepseek_work/ascii-sharks-upstream`。
- **本仓库用到的那一份**：`lib/client.js` 顶部内嵌的打包产物
  （与 `ascii-sharks.html` 里那份同一份），**未作算法改动**。它的默认造型与
  上游 `src/world.ts` 一致——四条 `classic` 鲨鱼，尺寸 `1 / 0.7 / 0.84 / 0.77`；
  引擎本身支持八种鲨鱼体型（classic / hammerhead / tiger / zebra / greathammer /
  mako / thresher / nurse），以及自带的 `prefers-reduced-motion`、
  `IntersectionObserver` 可见性处理与 DPR 上限 2。
- **小鱼种类**：上游 `src/species.ts` 是五种（sardine / anchovy / silverside /
  mackerel / goby）；本仓库的打包产物里是七种，多出的 needlefish（针鱼）与
  lanternfish（灯笼鱼）是**本项目自己加的**（见第四节）。
- **上游 demo 的 `?sharks=` 参数**：在这份打包产物里被解析、但从未被使用——
  插件装载引擎时没有把体型表传进去，所以它不生效（本仓库沿用原样，未改动它的行为）。

## 二、上游：dsh-ascii-sharks 原版插件外壳

- **内容**：插件骨架（`index.js`、`cordis.patch.yml`、`locale/`、`icon.svg`）
  与本仓库最初的 `README.md` 原文。
- **来源**：随 DeepSeek Harness 的插件安装包取得（本机 2026-10-22 安装；
  原样备份见 `D:/deepseek_work/dsh-ascii-sharks-orig-20261025`）。
- **作者**：未在任何文件里声明作者、仓库地址或许可证；`package.json` 里
  没有 `author` / `license` / `repository` 字段，包内也没有 LICENSE 文件。
  **注意：它和第一节的 ascii-sharks 是两个不同的上游**——引擎来自
  stackedlol/ascii-sharks（MIT，drewdi），插件外壳的作者不明。
- **许可**：**未声明**。因此本项目只对「自己新增与修改的部分」按 MIT 释出
  （见 `LICENSE`），对这部分上游不授予许可、也不主张权利。
  **若上游作者看到本仓库并提出署名或许可要求，我们照办或直接撤下。**

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