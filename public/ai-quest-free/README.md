# AI Quest (free, embeddable)

A self-contained pixel RPG where every duel is an AI trivia battle. The whole game is free: no payments, no email capture, no analytics, no network calls.

No build step and no npm packages. Phaser is bundled in `vendor/`, and every path is relative, so the folder works from any URL.

## Add it to a site

1. Copy this whole folder into your site's static/public directory, e.g. `public/ai-quest/`.
2. Open it at `/ai-quest/index.html` (or `/ai-quest/` if your host serves `index.html` for folders).

The game uses ES modules, so it must be served over `http(s)://`. Opening `index.html` straight from disk (`file://`) won't work. To try it locally, run `python3 -m http.server` in this folder.

### Embedding in a blog post

Link to the page, or embed it with an iframe:

```html
<iframe
  src="/ai-quest/index.html"
  title="AI Quest"
  style="width: 100%; height: 640px; border: 0;"
  loading="lazy"></iframe>
```

On phones the on-screen D-pad appears under the game, so give the iframe more height there (about 760px). In an iframe, keyboard controls start working after the player clicks the game once.

## Contents

- `index.html`: the page, including styles and the mobile touch controls
- `src/`: game code (native ES modules)
- `assets/`: sprite sheets and the Silkscreen pixel font (OFL licence in `assets/fonts/OFL.txt`)
- `vendor/phaser.min.js`: Phaser 3.90.0

Progress is saved in the player's browser (`localStorage`).
