// news-image-20261118 — "The World in One Day", Wednesday 18 November 2026.
//
// The entry image is entry.png, shipped beside this file in the repository.
// This program copies it into the grader's output directory. It uses only
// the Node 22 standard library, makes no network calls, and writes the same
// bytes on every run.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(here, 'entry.png');
if (!existsSync(source)) {
  throw new Error(`news-image-20261118: entry image missing: ${source}`);
}

const target = join(outDir, 'entry.png');
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Verify the copy byte-for-byte: a truncated or corrupted write must fail
// loudly here instead of silently shipping bad bytes to the judge.
const digest = (path: string) =>
  createHash('sha256').update(readFileSync(path)).digest('hex');
if (digest(source) !== digest(target)) {
  throw new Error('news-image-20261118: copied image failed its SHA-256 integrity check');
}
