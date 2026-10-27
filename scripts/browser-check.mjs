// 真浏览器验收 —— 起一个自己的无头 Chrome，连 CDP，逐条断言后自动关掉。
//
// 抄的是 dsh-ascii-whales 的 scripts/browser-check.mjs 那个套路（Playwright +
// 帧指纹 + pageerror 收集），但换成零依赖的 CDP 直连：我们这台机器上已经用这套
// 点过好几轮验收，比装 Playwright 便宜。
//
//   node scripts/browser-check.mjs --url="http://127.0.0.1:1977/?token=..."
//   （token 每次重启会变，从 DSH 启动脚本的日志里拿）
//
// 只看运行时状态，不去点 UI：设置页里的点击（React 事件）另有专门的 UI 验收脚本。
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith('--' + name + '='));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const URL_ = arg('url', process.env.DSH_URL || '');
const PORT = Number(arg('port', '9335'));
const TIMEOUT = Number(arg('timeout', '45000'));
const SCALE = arg('scale', '');
const HEADED = process.argv.includes('--headed');
const DPR_ONLY = process.argv.includes('--dpr-only');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

if (!URL_) {
  console.log('NOT_RUN 缺少 --url=<实例地址>（带 token）');
  process.exit(2);
}

function findChrome() {
  const env = process.env;
  const list = [
    env.CHROME_PATH,
    join(env.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe'),
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ].filter(Boolean);
  return list.find((p) => existsSync(p)) || null;
}

const chrome = findChrome();
if (!chrome) {
  console.log('NOT_RUN 找不到 Chrome / Edge');
  process.exit(2);
}

const profile = mkdtempSync(join(tmpdir(), 'dsh-ascii-sharks-check-'));
const child = spawn(chrome, [
  ...(HEADED ? [] : ['--headless=new']),
  '--remote-debugging-port=' + PORT,
  '--user-data-dir=' + profile,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-extensions',
  '--window-size=1600,900',
  ...(SCALE ? ['--force-device-scale-factor=' + SCALE] : []),
  URL_,
], { stdio: 'ignore' });

const results = [];
const check = (ok, name, detail) => {
  results.push({ ok, name, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? '  — ' + detail : ''}`);
};

let ws;
const cleanup = () => {
  try { ws && ws.close(); } catch {}
  if (child.pid) { try { process.kill(child.pid); } catch {} }
};
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); process.exit(130); });

// ── 等 CDP 起来，找到页面 target ──────────────────────────────────────────────
const deadline = Date.now() + TIMEOUT;
let page = null;
while (Date.now() < deadline) {
  try {
    const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    page = targets.find((t) => t.type === 'page' && t.url.startsWith('http'));
    if (page && page.webSocketDebuggerUrl) break;
  } catch { /* 还没起来 */ }
  await sleep(300);
}
if (!page) {
  console.log('FAIL 连不上 CDP / 没找到页面 target');
  cleanup();
  process.exit(1);
}

ws = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let id = 0;
const errors = [];
ws.onmessage = (evt) => {
  const m = JSON.parse(evt.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Runtime.exceptionThrown') {
    errors.push('EXCEPTION: ' + (m.params.exceptionDetails?.exception?.description
      || m.params.exceptionDetails?.text || '').split('\n')[0]);
  }
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
    const text = (m.params.args || []).map((a) => a.value ?? a.description ?? '').join(' ');
    if (!/\[diag\]/.test(text)) errors.push('console.error: ' + text.slice(0, 160));
  }
};
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

const send = (method, params = {}) => new Promise((res) => {
  const i = ++id;
  pending.set(i, res);
  ws.send(JSON.stringify({ id: i, method, params }));
});
const ev = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) {
    return 'EXC: ' + (r.result.exceptionDetails.exception?.description || '').split('\n')[0];
  }
  return r.result?.result?.value;
};
const waitFor = async (expr, ms) => {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) { const v = await ev(expr); if (v) return v; await sleep(250); }
  return null;
};

await send('Runtime.enable');
await send('Page.enable');

const booted = await waitFor('!!window.__DSH_ASCII_SHARKS_ENGINE__', TIMEOUT);
check(!!booted, '插件已装载（引擎类已注册）');

const mounted = await waitFor('!!window.__DSH_SHARKS_ENGINE_INSTANCE__', TIMEOUT);
check(!!mounted, '背景已挂到画布上（引擎实例存在）');
if (!mounted) { cleanup(); process.exit(1); }

check(!!(await ev('!!document.querySelector("canvas[data-dsh-ascii-sharks]")')),
  '画布在页面里');

const info = await ev(`(() => {
  const eng = window.__DSH_SHARKS_ENGINE_INSTANCE__;
  const c = document.querySelector('canvas[data-dsh-ascii-sharks]');
  const m = window.__DSH_SHARKS_MASK_INFO__ || {};
  const t = window.__DSH_SHARKS_TEST__ || {};
  return JSON.stringify({
    canvas: c ? [c.width, c.height, c.parentElement ? c.parentElement.clientWidth : 0] : null,
    dpr: window.__DSH_SHARKS_DPR__,
    fpsCap: m.fpsCap, shape: m.shape, shown: m.shown, phase: m.phase,
    defaultCount: t.DEFAULT_COUNT, maxCount: t.MAX_COUNT,
    kinds: (t.SHARK_SPECIES || []).map((s) => s.kind),
    engineFish: eng.world && eng.world.fish ? eng.world.fish.length : null,
    engineSharks: eng.world && eng.world.sharks ? eng.world.sharks.map((s) => s.kind) : null,
  });
})()`);
const S = JSON.parse(info);
check(Number(S.dpr) === 1.25, `像素密度上限 = ${S.dpr}`);
const dprInfo = JSON.parse(await ev(`(() => {
  const eng = window.__DSH_SHARKS_ENGINE_INSTANCE__;
  return JSON.stringify({
    device: window.devicePixelRatio,
    cap: window.__DSH_SHARKS_DPR__,
    effective: eng && eng.renderer ? eng.renderer.dpr : null,
  });
})()`));
const wantDpr = Math.min(dprInfo.device, dprInfo.cap);
check(dprInfo.effective === wantDpr,
  `像素密度真落地：设备 ${dprInfo.device} × 上限 ${dprInfo.cap} → 画 ${dprInfo.effective}（期望 ${wantDpr}）`);
check(S.canvas && Math.abs(S.canvas[0] - Math.round(S.canvas[2] * wantDpr)) <= 2,
  `画布 ${S.canvas?.[0]}px = 容器 ${S.canvas?.[2]}px × ${wantDpr}`);
if (DPR_ONLY) {
  console.log(`INFO devicePixelRatio=${dprInfo.device} cap=${dprInfo.cap} effective=${dprInfo.effective}`);
  cleanup();
  process.exit(0);
}
check(S.fpsCap <= 30, `帧率上限 = ${S.fpsCap}`);
check(S.defaultCount === 2, `默认条数 = ${S.defaultCount}`);
check(!!S.shown || S.phase === 'hero', `遮罩信息在报（phase=${S.phase} shape=${S.shape} shown=${S.shown}）`);

// 帧率上限真的落在画布上：引擎每画一帧就往画布上 blit 一次（renderer.ts 的 ctx.drawImage(bg)）。
// 数 1.5 秒内这个调用发生几次 = 真实绘制帧率。这是我们给上游引擎打的 minFrameMs 补丁的验收：
// 上游原版每个 rAF 都画（240Hz 屏就是 240 次/秒），我们卡在 30。
const paintsPerSec = await ev(`(async () => {
  const c = document.querySelector('canvas[data-dsh-ascii-sharks]');
  const ctx = c.getContext('2d');
  const proto = Object.getPrototypeOf(ctx);
  const orig = proto.drawImage;
  let n = 0;
  proto.drawImage = function () { n++; return orig.apply(this, arguments); };
  await new Promise((r) => setTimeout(r, 1500));
  proto.drawImage = orig;
  return Math.round(n / 1.5);
})()`);
check(typeof paintsPerSec === 'number' && paintsPerSec >= 18 && paintsPerSec <= 40,
  '实际绘制帧率卡在 30 上下（minFrameMs 真生效）', `${paintsPerSec} 帧/秒`);

// 逐个种类切一遍：引擎里真画出来的必须跟 store 说的一致
let eachKind = true;
const kindsDetail = [];
for (const kind of S.kinds) {
  const one = await ev(`(() => {
    const sp = window.__DSH_SHARKS_SPECIES__;
    sp.clear();            // 先收掉，免得第一次点到的正好是当前那个（点=切换）
    sp.select('${kind}');
    return 'ok';
  })()`);
  await sleep(250);
  const got = await ev(`(() => {
    const sp = window.__DSH_SHARKS_SPECIES__;
    const eng = window.__DSH_SHARKS_ENGINE_INSTANCE__;
    const drawn = eng && eng.world && eng.world.sharks ? eng.world.sharks.map((s) => s.kind) : null;
    return JSON.stringify({ want: sp.state.kind, n: sp.count('${kind}'), drawn: drawn });
  })()`);
  const g = JSON.parse(got);
  const ok = one === 'ok' && g.want === kind && Array.isArray(g.drawn)
    && g.drawn.length === g.n && g.drawn.every((k) => k === kind);
  if (!ok) eachKind = false;
  kindsDetail.push(`${kind}:${g.drawn ? g.drawn.length : 'null'}${ok ? '' : '(期望 ' + g.n + ')'}`);
}
check(eachKind, `每种体型都能单独上屏（${S.kinds.length} 种）`, kindsDetail.join(' '));

// 一次只显示一种：挑一种，确认不会同时出现
await ev(`(() => {
  const sp = window.__DSH_SHARKS_SPECIES__;
  sp.select('${S.kinds[0]}'); sp.setCount('${S.kinds[0]}', 3);
  return 'ok';
})()`);
// 换体型/条数是 100ms 防抖重建（拖滑块时不重复建引擎），所以等它落定再读。
// 这里必须等：不等的话读到的是上一个状态留下的引擎。
await sleep(300);
const mixed = JSON.parse(await ev(`JSON.stringify(
  (window.__DSH_SHARKS_ENGINE_INSTANCE__.world.sharks || []).map((s) => s.kind))`));
check(mixed.length === 3 && mixed.every((k) => k === S.kinds[0]),
  '一次只显示一种（3 条同一种）', mixed.join(','));
await ev(`window.__DSH_SHARKS_SPECIES__.clear()`);
await sleep(300);
check((await ev('window.__DSH_SHARKS_ENGINE_INSTANCE__.world.sharks.length')) === 0,
  '收掉后引擎里一条鲨鱼都不剩');
check((await ev('window.__DSH_SHARKS_ENGINE_INSTANCE__.world.fish.length')) > 0,
  '收掉鲨鱼后小鱼还在');

// 小鱼数量：这是换引擎之后才拿得到的旋钮（旧压缩引擎的 World 收不到 fishCount，
// 永远按窗口面积算 85–340 条）。改设置 → 引擎重建 → 鱼群数量跟着走。
const fishAt = async (n) => {
  await ev(`window.__DSH_SHARKS_SPECIES__.setFish(${n})`);
  await sleep(300);
  return ev('window.__DSH_SHARKS_ENGINE_INSTANCE__.world.fish.length');
};
const f0 = await fishAt(0);
const f400 = await fishAt(400);
const fDefault = await fishAt(170);
check(f0 === 0, '小鱼数量调到 0 → 引擎里一条小鱼都不剩', String(f0));
check(f400 >= 380 && f400 <= 400, '小鱼数量调到 400 → 鱼群跟着走', String(f400));
check(fDefault >= 160 && fDefault <= 170, '调回默认 170 → 鱼群又回来', String(fDefault));

// 帧指纹：隔一会儿再取一次，两次不一样 = 真的在动
const fp = () => ev(`(() => {
  const c = document.querySelector('canvas[data-dsh-ascii-sharks]');
  const d = c.toDataURL('image/png');
  let h = 2166136261;
  for (let i = 0; i < d.length; i += 7) { h ^= d.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h;
})()`);
const f1 = await fp();
await sleep(1200);
const f2 = await fp();
check(f1 !== f2, '画面在动（两次帧指纹不同）', `${f1} → ${f2}`);
check(f1 !== 'EXC' && f2 !== 'EXC', '帧指纹取得到（画布可读）');

// 把状态放回默认，别把测试留下的样子留在存档里
await ev(`window.__DSH_SHARKS_SPECIES__.setState({ kind: 'classic', counts: {} })`);
await sleep(200);

check(errors.length === 0, '页面没有报错', errors.slice(0, 3).join(' | '));

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} 通过`);
cleanup();
process.exit(failed.length ? 1 : 0);