# 验收记录 / Validation

换引擎（2026-10-26）之后跑的全部验收。**这份记录只写跑出来的数字，不写"应该没问题"。**

隔离实例：`web` profile（软链指向本仓库），端口 1977，
启动脚本 `D:/DSH-Home/bot/workspace/_start_1977.cmd`。
验收命令（token 每次重启都变，从日志里取）：

```bash
cd D:/deepseek_work/dsh-ascii-sharks-web
npm test                                     # 单元用例
npm run browser-check -- --url="http://127.0.0.1:1977/?token=..."
npm run browser-check -- --url="..." --scale=2   # 模拟 2x 屏
```

---

## 一、单元用例：13 / 13 通过

```
$ node --test tests/species.test.mjs
ℹ tests 13   ℹ pass 13   ℹ fail 0   ℹ duration_ms 98
```

覆盖：模块注册名与槽位、默认条数 2、体型表 10 种（8 鲨 + 座头鲸/虎鲸）、
小鱼数量（默认 170 / 范围 0–1000 / 脏输入夹取 / 0 不被当成缺省）、
小鱼写进存档且换体型不丢、`clampCount`、`normalizeState`（含旧格式迁移：
数组按第一类出现的次数记条数，不再拿总长度当条数）、
`specsFromState` 的尺寸递减、一次只显示一种、坏存档不炸、订阅会通知重建。

测试怎么跑起来的：`tests/species.test.mjs` 用
`new Function('window','document','location', SRC)` 把 `lib/client.js` 装进一个假沙箱，
从 `window.__DSH_SHARKS_TEST__` 取纯函数——不依赖 React、不依赖浏览器、不启 DSH。

## 二、浏览器验收：20 / 20 通过

**场景 A（设备像素比 1）：**

```
PASS 插件已装载（引擎类已注册）
PASS 背景已挂到画布上（引擎实例存在）
PASS 画布在页面里
PASS 像素密度上限 = 1.25
PASS 像素密度真落地：设备 1 × 上限 1.25 → 画 1（期望 1）
PASS 画布 1584px = 容器 1584px × 1
PASS 帧率上限 = 30
PASS 默认条数 = 2
PASS 遮罩信息在报（phase=hero shape=ellipse shown=true）
PASS 每种体型都能单独上屏（10 种） — whale:2 orca:2 classic:2 hammerhead:2 greathammer:2 zebra:2 tiger:2 mako:2 thresher:2 nurse:2
PASS 一次只显示一种（3 条同一种） — whale,whale,whale
PASS 收掉后引擎里一条鲨鱼都不剩
PASS 收掉鲨鱼后小鱼还在
PASS 小鱼数量调到 0 → 引擎里一条小鱼都不剩 — 0
PASS 小鱼数量调到 400 → 鱼群跟着走 — 400
PASS 调回默认 170 → 鱼群又回来 — 170
PASS 画面在动（两次帧指纹不同）
PASS 帧指纹取得到（画布可读）
PASS 页面没有报错
→ 19/19（场景 A 当时还没加"实际绘制帧率"这一项）
```

**场景 B（模拟 2x 屏，`--scale=2`）：20 / 20**

```
PASS 像素密度真落地：设备 2 × 上限 1.25 → 画 1.25（期望 1.25）
PASS 画布 1980px = 容器 1584px × 1.25
PASS 实际绘制帧率卡在 30 上下（minFrameMs 真生效） — 25 帧/秒
…（其余同上）
→ 20/20
```

### 这几项各自证明了什么

| 项 | 证明的是什么 | 数字 |
| --- | --- | --- |
| 像素密度真落地 | 我们那处 `dpr` 补丁在**新引擎**上真生效（不是只在旧产物上） | 设备 2 × 上限 1.25 → 画 1.25；画布 1980px = 容器 1584px × 1.25 |
| 实际绘制帧率 | `minFrameMs` 补丁真生效：数 1.5 秒内画布上的 `drawImage`（`renderer.ts:437` 每画一帧调一次） | 25 帧/秒（上游原版是每个 rAF 都画，240Hz 屏就是 240 次/秒） |
| 十种体型逐个上屏 | vendor 的引擎真认得鲸鱼/虎鲸，且每种体型都能单独画出来 | 10 种各 2 条，一条不多一条不少 |
| 小鱼数量 0 / 400 / 170 | **换引擎才拿得到的旋钮**：旧压缩产物的 `World` 收不到 `fishCount`，永远按窗口面积算 85–340 | 引擎 `world.fish.length` = 0 / 400 / 170 |
| 帧指纹 | 画面真的在动（不是一张静止的画） | 两次取画布 PNG 的哈希不同 |
| 页面没有报错 | 没有未捕获异常、没有 `console.error` | 0 条 |

### 一次踩坑记录（留给后来者）

第一次跑时「一次只显示一种（3 条同一种）」**FAIL，读出来只有 2 条**。
原因不是引擎，是**验收脚本的时序假设**：它在同一个 `Runtime.evaluate` 里
`select + setCount` 然后立刻读 `engine.world.sharks`——这在旧版（订阅同步重建）成立，
换成 100ms 防抖重建之后读到的是**上一个状态留下的引擎**。
把"改状态"和"读结果"拆开、中间等 300ms 之后就对了。
所以：**任何验收脚本在改完状态后都要等重建落定（≥300ms）再读**。

## 三、引擎补丁的比对证据

`vendor/ascii-sharks/` 与来源（`dsh-ascii-whales` 的 vendor）逐字节比对，
**只有 `engine.ts` 与 `renderer.ts` 不同**，差异就是下面这些（`diff` 原文；
`renderer.ts` 那几处是后来「把颜色还原成最初那版」时加的）：

```diff
23a24,28
>   // [dsh-ascii-sharks 补] 画帧上限：上游每帧都重绘（跟着屏幕刷新率跑，240Hz 屏
>   // 就是每秒 240 次整屏重画）。这里只给「画」限速，「算」仍按固定步长走；
>   // 外壳写 engine.minFrameMs = 1000 / fpsCap。
>   minFrameMs = 0;
>   private lastPaint = 0;
89c94
<     const dpr = Math.min(window.devicePixelRatio || 1, 2);
---
>     const dpr = Math.min(window.devicePixelRatio || 1, (window as any).__DSH_SHARKS_DPR__ ?? 2); // [dsh-ascii-sharks 补] 上限可热改，上游硬编码 2
115c120,124
<     this.render(dt * this.speed);
---
>     // [dsh-ascii-sharks 补] 到点才画
>     if (now - this.lastPaint >= this.minFrameMs) {
>       this.lastPaint = now;
>       this.render(dt * this.speed);
>     }
```

```diff
# vendor/ascii-sharks/renderer.ts —— 配色还原为最初那版引擎（[patch:original-color]）
19,25c
< DOT_RGB = 主题色的五个蓝调 [77,107,254] [65,91,218] [110,148,255] [160,186,255] [88,141,255]
---
> DOT_RGB = 最初那版的五色 [48,52,235] [52,205,60] [228,50,44] [190,212,255] [110,230,255]
258c
< g.strokeStyle = dark ? `rgba(140,165,255,${opacity})` : `rgba(77,107,254,${opacity})`;
---
> g.strokeStyle = dark ? `rgba(255,255,255,${opacity})` : `rgba(77,107,254,${opacity})`;
359,364c
< const fish = this.rgb.map(c => Math.round(dark ? c * .6 + 102 : c * .7));
< this.fishStyles = FISH_ALPHAS.map(a => `rgba(${fish.join(',')},${a})`);
< this.dotStyles.push(`rgba(${fish.join(',')},${a.toFixed(3)})`);
---
> this.fishStyles = FISH_ALPHAS.map(a => `rgba(230,238,255,${a})`);
> this.dotStyles.push(`rgba(${DOT_RGB[c].join(',')},${a.toFixed(3)})`);
368c
< private bodyColor(level: number) { …从 this.rgb 往白 / 蓝推… }
---
> private bodyColor(level: number, tint: [number, number, number] = [1, 1, 1]) {
>   const [tr, tg, tb] = tint;   // 最初那版：亮度 × 体型色调的灰阶，上限约 226
>   return `rgb(${Math.min(255, Math.round(level * tr))},${Math.min(255, Math.round(level * tg))},${Math.min(255, Math.round(level * tb + 6))})`;
> }
```

这四处只改常量与取色，不碰几何与算法。改完重跑验收仍是 **20/20 通过**（含帧率、
像素密度、十种体型、小鱼数量四条），单测 13/13。**配色好不好看仍要用户自己看。**

另：我们往 `vendor/ascii-sharks/` 补了上游的 `LICENSE`（MIT，`Copyright (c) 2026 drewdi`），
那份是从本机克隆副本 `D:/deepseek_work/ascii-sharks-upstream/LICENSE` 原样拷进去的
（来源 vendor 目录里没有这个文件）。除此之外没有任何新增或删除的文件。

## 四、这一轮**没有**验证到的（别当成已验）

- **好不好看**：我看不了图。所有观感判断（鱼的比例、笔画明暗、1.25 倍像素是否够清、
  亮色主题下的观感）**一律要用户在自己屏幕上确认**，这份记录里没有任何观感结论。
- **真机 240Hz 面板上的帧率**：验收跑在无头 Chrome 里（25 帧/秒是在无头环境的 rAF 节奏下
  数出来的）。真机是 240Hz，`minFrameMs = 1000/30` 的结论应当一致，但没有实测。
- **亮色主题、窄窗口兜底、无遮罩模式**：这一轮没跑（沿用的是换引擎之前的行为，
  代码未被这次改动碰过）。
- **hanzi（汉字）模式**：引擎里能跑（`glyphMode: 'hanzi'`，鲸鱼身上还有个"目"字彩蛋），
  但设置页没接，未做验收。
- **进对话之后的表现**：验收只跑到了 hero 态。`showInChat: true` 时进对话是否照常出鱼，
  要在真机上看。

## 五、回滚

- 换引擎只改隔离副本 `D:/deepseek_work/dsh-ascii-sharks-web/`，
  源仓库 `D:/deepseek_work/dsh-ascii-sharks/`（桌面软链指向它）一行没动。
- 出事就把 `web` profile 的软链指回源仓库、重启，就回到换引擎之前的样子。
- 另有一个 git tag `rollback-safety-20261026`（更早那次"整幅作品"试验的回滚点）。