/**
 * 引擎入口 —— 只做一件事：把 vendor 进来的上游引擎类注册到 window。
 *
 * 上游：stackedlol/ascii-sharks（MIT，Copyright (c) 2026 drewdi），
 *       快照取自 dsh-ascii-whales 0.1.5 的 vendor/ascii-sharks/（Chael-Chael 的集成）。
 * 我方改动只有两处，都在 vendor/ascii-sharks/engine.ts 里、带「[dsh-ascii-sharks 补]」
 * 注释：① dpr 上限读 window.__DSH_SHARKS_DPR__；② minFrameMs 画帧上限。
 *
 * 编译方式见 scripts/build-engine.mjs：编成 IIFE 后内联进 lib/client.js。
 */
import { OceanEngine } from "./vendor/ascii-sharks/index";

(window as any).__DSH_ASCII_SHARKS_ENGINE__ = OceanEngine;