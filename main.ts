// make.fun news-image-20261119 entry (Node, standard library only, no network).
// The image is entry.png beside this file, rendered from src/news.html by render.mjs.
// Before copying, the program checks that it is a whole PNG within the contest limits, and
// exits with a clear message if not. The copy is byte for byte, so every run is identical.
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1024 * 1024; // 1 MiB
const MAX_SIDE = 1024;
const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function fail(msg: string): never {
  console.error(`error: entry.png ${msg}`);
  process.exit(1);
}

const src = new URL('./entry.png', import.meta.url);
let png: Buffer;
try {
  png = readFileSync(src);
} catch (e) {
  fail(`cannot be read (${(e as Error).message})`);
}

if (png.length > MAX_BYTES) fail(`is ${png.length} bytes, over the ${MAX_BYTES} byte (1 MiB) limit`);
if (png.length < SIGNATURE.length + 12 || !png.subarray(0, 8).equals(SIGNATURE)) {
  fail('does not start with the PNG signature');
}

// Walk every chunk: length, type, data, CRC. The first must be IHDR, the last IEND.
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c;
}
function crc32(buf: Buffer): number {
  let c = -1;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

let pos = 8;
let first = true;
let sawIdat = false;
let sawIend = false;
let width = 0;
let height = 0;
while (pos < png.length) {
  if (sawIend) fail('has data after the IEND chunk');
  if (pos + 12 > png.length) fail('is truncated inside a chunk header');
  const len = png.readUInt32BE(pos);
  const type = png.toString('latin1', pos + 4, pos + 8);
  const end = pos + 12 + len;
  if (end > png.length) fail(`is truncated inside its ${type} chunk`);
  const crc = png.readUInt32BE(end - 4);
  if (crc32(png.subarray(pos + 4, end - 4)) !== crc) fail(`has a bad checksum in its ${type} chunk`);
  if (first) {
    if (type !== 'IHDR' || len !== 13) fail('does not begin with a valid IHDR chunk');
    width = png.readUInt32BE(pos + 8);
    height = png.readUInt32BE(pos + 12);
    first = false;
  }
  if (type === 'IDAT') sawIdat = true;
  if (type === 'IEND') sawIend = true;
  pos = end;
}
if (!sawIdat) fail('has no IDAT image data');
if (!sawIend) fail('is missing its IEND chunk (incomplete PNG)');
if (width < 1 || height < 1) fail(`has invalid dimensions ${width}x${height}`);
if (width > MAX_SIDE || height > MAX_SIDE) {
  fail(`is ${width}x${height}, over the ${MAX_SIDE}x${MAX_SIDE} limit`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
try {
  writeFileSync(join(outDir, 'entry.png'), png);
} catch (e) {
  console.error(`error: cannot write ${join(outDir, 'entry.png')} (${(e as Error).message})`);
  process.exit(1);
}
console.log(`ok: wrote ${join(outDir, 'entry.png')} (${png.length} bytes, ${width}x${height})`);
