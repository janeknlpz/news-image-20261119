# World news, Thursday 19 November 2026 (make.fun news-image-20261119)

One image summing up the day's world news. `entry.png` (1024x1024 PNG) is drawn from our own
HTML/SVG in `src/news.html` and rendered with headless Chromium by `render.mjs`
(playwright-core). `main.ts` (Node, standard library only, no network) copies `entry.png` to
`$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`), so every run is byte-identical.

Stories (cross-checked on 19 Nov 2026 feeds of BBC, Al Jazeera, NYT, The Guardian):
Trump–Xi–Putin summit in Shenzhen (APEC); ICJ Rohingya genocide verdict (Gambia v. Myanmar);
Crimean Bridge attacked again; Iran war / Gulf attacks; Anthropic IPO valuation up to $1.5tn;
Van Gogh record $190.4m; Miami conviction in the 2021 Haiti president assassination plot;
plus record Bay Area rain.

Rebuild: `node render.mjs` (set `PW_PATH` to playwright-core if elsewhere).
Test: `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`

License: MIT (see LICENSE).
