// make.fun news-image-20261119 entry (Node, standard library only, no network).
// The image is entry.png beside this file, rendered from src/news.html by render.mjs;
// this program copies it byte for byte to $MAKEFUN_OUTPUT_DIR/entry.png (default /output).
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync(
  new URL('./entry.png', import.meta.url),
  join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'),
);
