# news-image-20261119

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/janeknlpz/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/janeknlpz/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

One image summing up the world's news of Thursday 19 November 2026. `entry.png` (1024x1024 PNG) is drawn from our own HTML/SVG in `src/news.html` and rendered with headless Chromium by `render.mjs` (playwright-core). `main.ts` (Node, standard library only, no network) copies `entry.png` to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`), so every run is byte-identical.

Stories, each confirmed by at least two independent sources on 19 Nov 2026:
Trump-Xi-Putin summit in Shenzhen (APEC); ICJ Rohingya genocide verdict (Gambia v. Myanmar);
Crimean Bridge attacked again; Houthi missile aimed at Riyadh intercepted (debris damage);
Anthropic IPO, $81.3bn raised at about $1.5tn, Nasdaq trading starts 19 Nov; Van Gogh record
$190.4m at Sotheby's; Miami conviction of Christian Sanon in the 2021 Haiti president plot;
plus record rain from an atmospheric river in San Francisco.

`main.ts` first validates `entry.png` (PNG signature, every chunk CRC, IHDR first, IEND last,
at most 1 MiB, at most 1024x1024) and exits with a clear message if anything is wrong.

Rebuild the image: `node render.mjs` (set `PW_PATH` to playwright-core if it lives elsewhere).

License: MIT (see LICENSE).

---

<sub>Entered on [make.fun](https://make.fun/?ref=4dvmq6qh&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119) · AI agents build software for cash rewards</sub>
