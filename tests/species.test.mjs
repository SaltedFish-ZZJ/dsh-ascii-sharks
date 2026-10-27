// 「背景鱼」状态机自测 —— 不需要浏览器、不需要 React。
//
// 做法（抄自 dsh-ascii-whales / dsh-ascii-scene 的 tests/，但更适合我们这份
// 手写壳）：lib/client.js 顶层就是一个 window.__ModuleLoader__.load({factory})
// 调用，我们用 new Function 给它一个假的 window/document/location 沙箱，只跑
// 模块体（注册 + 建 store + 挂纯函数），然后从 window.__DSH_SHARKS_TEST__ 和
// window.__DSH_SHARKS_SPECIES__ 上断言。
//
//   node --test tests/        或   npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SRC = readFileSync(join(ROOT, 'lib', 'client.js'), 'utf8');
const KEY = 'dsh-ascii-sharks:species';

// 旧版引擎（压缩产物）在模块体里就会读 location.search，所以 location 必须给。
function loadPlugin(seed = {}) {
  const kv = new Map(Object.entries(seed));
  const win = {};
  const location = { search: '' };
  const document = {
    querySelector: () => null,
    createElement: () => ({ dataset: {}, style: {}, setAttribute() {}, appendChild() {} }),
    head: { appendChild() {} },
  };
  let mod = null;
  win.__ModuleLoader__ = { load(m) { mod = m; } };
  win.localStorage = {
    getItem: (k) => (kv.has(k) ? kv.get(k) : null),
    setItem: (k, v) => kv.set(k, String(v)),
    removeItem: (k) => kv.delete(k),
  };
  new Function('window', 'document', 'location', SRC)(win, document, location);

  assert.ok(mod, 'client.js 没有调用 window.__ModuleLoader__.load({id, factory})');
  const plugin = mod.factory(function () { return {}; }); // react 只解构不调用
  const T = win.__DSH_SHARKS_TEST__;
  assert.ok(T, 'client.js 没有挂出 __DSH_SHARKS_TEST__（纯函数诊断面）');
  return { id: mod.id, mod, plugin, T, store: win.__DSH_SHARKS_SPECIES__, kv };
}

test('模块注册名与导出的槽位', () => {
  const { id, plugin } = loadPlugin();
  assert.equal(id, 'dsh-ascii-sharks');
  assert.deepEqual(plugin.inject, ['slots', 'theme']);
  assert.equal(typeof plugin.apply, 'function');
});

test('默认条数是 2（2026-10-26 用户要求：4 → 2）', () => {
  const { T, store } = loadPlugin();
  assert.equal(T.DEFAULT_COUNT, 2);
  assert.equal(T.MAX_COUNT, 12);
  assert.equal(store.count('classic'), 2, '没单独调过的种类取默认值');
});

test('体型表是 10 种：8 鲨 + 座头鲸/虎鲸（2026-10-26 换引擎后）', () => {
  const { T } = loadPlugin();
  assert.equal(T.SHARK_SPECIES.length, 10);
  const kinds = T.SHARK_SPECIES.map((s) => s.kind);
  assert.deepEqual(kinds.slice(0, 2), ['whale', 'orca'], '鲸类在前，引擎的 kind 就叫 whale / orca');
  for (const shark of ['classic', 'hammerhead', 'greathammer', 'zebra', 'tiger', 'mako', 'thresher', 'nurse']) {
    assert.ok(kinds.includes(shark), `八种鲨鱼一个都不能少：${shark} 没了`);
  }
});

test('小鱼数量：默认 170，0 合法，夹到 0–1000', () => {
  const { T, store } = loadPlugin();
  assert.equal(T.DEFAULT_FISH, 170);
  assert.equal(T.MAX_FISH, 1000);
  assert.equal(store.fish(), 170);

  const cases = [[0, 0], [10, 10], ['40', 40], [170, 170], [1000, 1000], [1200, 1000],
    [-5, 0], [33.4, 33], [undefined, 0], [NaN, 0], ['abc', 0]];
  for (const [input, want] of cases) {
    assert.equal(T.clampFish(input), want, `clampFish(${JSON.stringify(input)})`);
  }
  assert.equal(T.fishOf({}), 170, '状态里没有 fish 就用默认值');
  assert.equal(T.fishOf({ fish: 0 }), 0, '0 是要保留的，不算缺省');
});

test('store：小鱼数量写进存档、改它不动别的', () => {
  const { store, kv } = loadPlugin();
  store.setFish(400);
  assert.equal(store.fish(), 400);
  assert.equal(JSON.parse(kv.get(KEY)).fish, 400);
  store.select('mako');         // 换体型不该把小鱼的数换掉
  assert.equal(store.fish(), 400);
  store.clear();
  assert.equal(store.fish(), 400, '收掉大鱼也不动小鱼');

  const second = loadPlugin({ [KEY]: kv.get(KEY) });
  assert.equal(second.store.fish(), 400, '下次打开还认得');
});

test('clampCount 把所有脏输入夹到 1–12', () => {
  const { T } = loadPlugin();
  const cases = [[undefined, 1], [null, 1], [0, 1], [-5, 1], [1, 1], [3.6, 4], ['5', 5],
    [99, 12], [12, 12], [13, 12], [NaN, 1], ['abc', 1]];
  for (const [input, want] of cases) {
    assert.equal(T.clampCount(input), want, `clampCount(${JSON.stringify(input)})`);
  }
});

test('normalizeState：认得的种类、脏数据、旧格式', () => {
  const { T } = loadPlugin();
  const empty = { kind: null, counts: {}, fish: 170 };
  assert.deepEqual(T.normalizeState([]), empty);
  assert.deepEqual(T.normalizeState(undefined), empty);

  // 旧格式（八种各一条那套 kind 列表）→ 第一种 + 它真正出现的次数
  const old = T.normalizeState(['hammerhead', 'tiger', 'hammerhead']);
  assert.equal(old.kind, 'hammerhead');
  assert.equal(old.counts.hammerhead, 2, '不该拿总长度 3 当条数');
  assert.equal(old.fish, 170, '旧格式存档也得带上小鱼默认值');

  // 新格式：不认识的 kind / 条数被丢掉
  const next = T.normalizeState({ kind: 'nurse', counts: { nurse: 7, classic: 99, unicorn: 4 } });
  assert.equal(next.kind, 'nurse');
  assert.deepEqual(next.counts, { nurse: 7, classic: 12 });

  assert.deepEqual(T.normalizeState({ kind: 'unicorn' }), empty);
  assert.equal(T.normalizeState({ kind: 'orca', counts: {}, fish: 0 }).fish, 0, '0 不该被当成缺省');
  assert.equal(T.normalizeState({ kind: 'orca', counts: {}, fish: 'abc' }).fish, 0,
    'fish 是垃圾值 → 夹到 0（默认值只在字段整个缺失时才用）');
});

test('每条体型都能进状态机；编出来的种类会掉出去', () => {
  const { T } = loadPlugin();
  for (const item of T.SHARK_SPECIES) {
    const s = T.normalizeState({ kind: item.kind, counts: {} });
    assert.equal(s.kind, item.kind, `${item.kind} 应该是合法种类`);
    assert.ok(Array.isArray(item.label) === false && item.label.length > 0, `${item.kind} 要有中文名`);
  }
  assert.equal(T.normalizeState({ kind: 'unicorn' }).kind, null);
});

test('specsFromState：第一条最大，往后依次小下去；kind 为空就没鲨鱼', () => {
  const { T } = loadPlugin();
  assert.deepEqual(T.specsFromState({ kind: null, counts: {} }), []);

  const two = T.specsFromState({ kind: 'classic', counts: {} });
  assert.equal(two.length, 2, '默认 2 条');
  assert.deepEqual(two.map((s) => s.kind), ['classic', 'classic']);
  assert.equal(two[0].size, 1);
  assert.ok(two.every((s) => s.size > 0 && s.size <= 1));

  const one = T.specsFromState({ kind: 'mako', counts: { mako: 1 } });
  assert.deepEqual(one, [{ kind: 'mako', size: 1 }]);

  const many = T.specsFromState({ kind: 'tiger', counts: { tiger: 12 } });
  assert.equal(many.length, 12);
  assert.deepEqual([...many].map((s) => s.size).sort((a, b) => b - a), many.map((s) => s.size),
    '尺寸应当单调递减');

  // 同一种之外的种类不该混进来
  assert.ok(T.specsFromState({ kind: 'tiger', counts: { tiger: 3, nurse: 9 } })
    .every((s) => s.kind === 'tiger'));
});

test('store：一次只显示一种；条数记在各个种类自己头上', () => {
  const { store } = loadPlugin();
  assert.equal(store.state.kind, 'classic');
  assert.deepEqual(store.specs().map((s) => s.kind), ['classic', 'classic']);

  store.select('mako');
  assert.equal(store.state.kind, 'mako');
  assert.equal(store.count('mako'), 2, '第一次点它 = 默认 2 条');
  store.setCount('mako', 5);
  assert.equal(store.count('mako'), 5);

  store.select('classic');
  assert.equal(store.count('classic'), 2, '经典还是自己的默认 2 条');
  assert.equal(store.count('mako'), 5, '切走不丢 mako 的条数');

  store.select('classic'); // 换在经典身上再点一次 = 收掉
  assert.equal(store.state.kind, null);
  assert.equal(store.count('classic'), 2, '收掉也不丢它自己的条数');
  assert.deepEqual(store.specs(), []);

  store.select('mako'); // 再点回来，条数还是 5
  assert.equal(store.state.kind, 'mako');
  assert.equal(store.count('mako'), 5);

  store.clear();
  assert.equal(store.state.kind, null);
  assert.equal(store.count('mako'), 5, 'clear 只收掉当前的，不动记忆');
});

test('store：写进 localStorage，下次打开还认得', () => {
  const { store, kv } = loadPlugin();
  store.select('thresher');
  store.setCount('thresher', 9);
  const raw = JSON.parse(kv.get(KEY));
  assert.equal(raw.kind, 'thresher');
  assert.equal(raw.counts.thresher, 9);

  // 换个沙箱、把存下来的东西喂回去
  const second = loadPlugin({ [KEY]: kv.get(KEY) });
  assert.equal(second.store.state.kind, 'thresher');
  assert.equal(second.store.count('thresher'), 9);
});

test('store：坏存档不炸，退回默认', () => {
  const { store } = loadPlugin({ [KEY]: '{这不是 JSON' });
  assert.equal(store.state.kind, 'classic');
  assert.equal(store.count('classic'), 2);
});

test('订阅：点一下立刻通知背景重建', () => {
  const { store } = loadPlugin();
  const seen = [];
  const off = store.subscribe((s) => seen.push(s.kind));
  store.select('zebra');
  assert.deepEqual(seen, ['zebra']);
  off();
  store.select('nurse');
  assert.deepEqual(seen, ['zebra'], '退订后不再收到');
});