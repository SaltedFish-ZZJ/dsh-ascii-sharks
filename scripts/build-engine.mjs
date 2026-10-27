// 把 vendor/ 里的上游引擎源码编成一段 IIFE，内联进 lib/client.js。
//
//   node scripts/build-engine.mjs            编译 + 写回 lib/client.js
//   node scripts/build-engine.mjs --dry-run  只编译，打印结果，不碰 client.js
//
// 为什么要这一步：以前 lib/client.js 第 11 行是上游的压缩产物（29204 字符），
// 我们没有源码，只能在外壳上做文章。现在 vendor/ 里放着可读的 TypeScript，
// 改完源码跑这个脚本重编，别再手改 client.js 里那坨机器码。
//
// 上游：stackedlol/ascii-sharks（MIT，drewdi），快照取自 dsh-ascii-whales 0.1.5。
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ENTRY = join(ROOT, 'engine-entry.ts');
const OUT = join(ROOT, 'build', 'engine.iife.js');
const TARGET = join(ROOT, 'lib', 'client.js');
const DRY = process.argv.includes('--dry-run');

const START = '    // @engine:start';
const END = '    // @engine:end';
const NEEDLE = '__DSH_ASCII_SHARKS_ENGINE__';

// 本机没有 npm 依赖（插件不带 node_modules），所以按现成的位置找编译器。
function findEsbuild() {
  const candidates = [
    process.env.ESBUILD_BINARY_PATH,
    join(ROOT, 'node_modules', '@esbuild', 'win32-x64', 'esbuild.exe'),
    'D:/deepseek_work/dsh-ascii-scene/node_modules/@esbuild/win32-x64/esbuild.exe',
    'D:/deepseek_work/dsh-ascii-scene/node_modules/esbuild/bin/esbuild',
  ].filter(Boolean);
  return candidates.find((p) => existsSync(p)) || null;
}

const esbuild = findEsbuild();
if (!esbuild) {
  console.error('找不到 esbuild。装一个，或设 ESBUILD_BINARY_PATH 指过去。');
  process.exit(2);
}

mkdirSync(dirname(OUT), { recursive: true });
const built = spawnSync(esbuild, [
  ENTRY,
  '--bundle',
  '--format=iife',
  '--minify',
  '--target=es2020',
  '--charset=utf8',
  '--legal-comments=none',
  '--outfile=' + OUT,
], { encoding: 'utf8' });

if (built.status !== 0) {
  console.error('esbuild 编译失败：');
  console.error(built.stderr || built.stdout || '(没有输出)');
  process.exit(1);
}

const bundle = readFileSync(OUT, 'utf8').trim();
if (!bundle.includes(NEEDLE)) {
  console.error('编出来的东西里没有 ' + NEEDLE + '，入口大概没接对。');
  process.exit(1);
}
if (bundle.includes('@engine:end') || bundle.includes('@engine:start')) {
  console.error('产物里出现了标记字符串，换个标记再试。');
  process.exit(1);
}

const block = [START, bundle, END].join('\n');
const src = readFileSync(TARGET, 'utf8');
const marked = /\/\/ @engine:start[\s\S]*?\/\/ @engine:end/;

let next;
let how;
if (marked.test(src)) {
  next = src.replace(marked, block);
  how = '替换标记之间那段';
} else {
  // 第一次跑：client.js 里还是上游的压缩产物，占一整行，以 "use strict" 开头。
  const lines = src.split('\n');
  const at = lines.findIndex((l) => /^"use strict"/.test(l) && l.length > 5000);
  if (at === -1) {
    console.error('client.js 里既没有 @engine 标记，也没找到那一整行的旧引擎产物。');
    process.exit(1);
  }
  const oldLen = lines[at].length;
  lines.splice(at, 1, block);
  next = lines.join('\n');
  how = `换掉第 ${at + 1} 行的旧产物（${oldLen} 字符）`;
}

console.log(`esbuild:  ${esbuild}`);
console.log(`产物:     ${bundle.length} 字符 → ${OUT}`);
if (DRY) {
  console.log('--dry-run：没改 client.js。');
  process.exit(0);
}
writeFileSync(TARGET, next);
console.log(`client.js: ${how}，${src.length} → ${next.length} 字符`);