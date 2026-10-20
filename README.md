# Seanime Spooky

## New in 1.2.0 — Full haunt

Floating ghosts, a swinging hanging spider, pumpkin lantern strings, drifting ground fog, rising embers, cobweb corners on anime/episode cards, a glowing logo, and a pumpkin calendar header join the existing moon, castle, bats, graveyard and leaves. Full haunt is enabled by default; the pumpkin tray's **Haunt level** button switches to Classic. **Animation** stops all movement; system reduced-motion does the same automatically. Narrow screens simplify the decorations. All ornaments remain click-through and use CSS animations, with no polling or animation timers.

A Halloween theme for Seanime inspired by the supplied orange-and-black references: pumpkin-orange controls, glowing selected navigation, warm dark surfaces, cobwebs, a haunted moon and castle, pumpkins, and optional falling autumn leaves.

Version 1.1.0 adds larger moon-and-castle scenery, pumpkin clusters, drifting bats, graveyard silhouettes in anime and library headers, and pumpkin section markers. It fixes decorations disappearing when hidden preview videos are mounted. DOM setup is coalesced and no longer repeats on every route change.

## Install

In Seanime, open **Extensions → Add extensions** and paste:

```
https://raw.githubusercontent.com/DefnoJae/SeanimeSpooky/main/seanime-spooky.json
```

Enable **Seanime Spooky**. Use its pumpkin tray icon to toggle the theme, decorations, or falling leaves. Options reset to On when the plugin reloads. Disable or uninstall the plugin to restore the previous theme; it does not write to your Seanime theme settings.

`Manifest.json` is a compatibility copy of the same manifest. Install one manifest only.

## Coverage

- Home and Continue Watching: orange accents, warm surfaces and episode outlines.
- Library: poster outlines, orange progress bars and hover highlights.
- Anime details and torrent episodes: warm banner glow, branded buttons and tabs.
- Online streaming: orange tabs and controls; decorations hide for active players and fullscreen. Hidden preview videos do not suppress the Halloween scenery.
- Extensions: shared orange branding, tabs, borders and form controls.
- Release schedule: warm header, calendar outlines, orange brand highlights.

Decorations sit in a non-interactive, accessibility-hidden layer around the screen edges. Anime posters, thumbnails, subtitles, and video are not recolored or replaced. Narrow screens use fewer decorations. System reduced-motion disables falling leaves. The scenery is bundled vector artwork, not a pixel-for-pixel recreation of the reference images.

## Development

Requires Node.js 18 or newer. No runtime packages, network calls, filesystem permissions, or unsafe script injection are required by the plugin.

```
npm run build
npm test
```

Edit `src/theme.css`, `src/plugin.js`, and `assets/*.svg`, then rebuild. Commit the generated `dist/seanime-spooky.js` and both manifests so Seanime can install and update directly from `main`. The UI callback is deliberately self-contained because Seanime isolates plugin runtimes.

Uses the documented Seanime `$ui.register`, `ctx.dom`, tray, and screen APIs. Created elements are owned and removed by Seanime when the plugin unloads. Selectors follow upstream Seanime data attributes; future Seanime layout changes may require theme updates.

## Validation

Automated checks cover isolated initialization, repeated navigation, duplicate prevention, theme/decorations/motion toggles, and manifest packaging. Browser smoke checks use an upstream-selector fixture. Live validation inside an installed Seanime session is still needed.
