// Optional: NODE_PATH must include an installed playwright package.
const { chromium } = require('playwright');
const { readFileSync } = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: process.env.SPOOKY_BROWSER || 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1536, height: 850 } });
    await page.setContent(`<html class="dark"><head><style>
      :root { --background:#070707; --color-brand-500:97 82 223; }
      body { margin:0; color:white; font-family:Arial; background:var(--background); }
      aside { width:72px; height:100vh; position:fixed; }
      main { margin-left:96px; padding:30px; }
      .UI-VerticalMenu__item { padding:12px; margin:15px; display:block; }
      [data-episode-card-image-container] { width:350px;height:180px;background:#252525;border-radius:12px; }
      [data-media-page-header] { position:relative; height:340px; }
    </style></head><body>
      <aside class="UI-AppLayoutSidebar__root"><a class="UI-VerticalMenu__item" data-current="true">Home</a></aside>
      <main class="UI-AppLayoutContent__root"><section data-media-page-header><div data-media-page-header-details-container><h1>PSYREN</h1><button role="tab" data-state="active">Online streaming</button></div></section>
      <h2>Continue watching</h2><div data-episode-card><div data-episode-card-image-container></div></div>
      <div data-schedule-calendar><div data-schedule-calendar-header>October 2026</div><div data-schedule-calendar-day-item>19</div></div>
      </main></body></html>`);
    // Simulate the DOM transport, with real browser elements and CSS parsing.
    await page.evaluate(() => {
      window.spookyHandlers = {};
      const wrap = el => el && ({
        setAttribute: (k,v) => el.setAttribute(k,v), setText: text => {el.textContent = text;},
        addClass: cls => el.classList.add(cls), append: child => el.appendChild(child.el),
        remove: () => el.remove(), el
      });
      const tray = { text() {}, button() {}, render(fn) { this.fn=fn; fn(); }, update() { this.fn(); } };
      window.$ui = { register(fn) { fn({
        dom: { queryOne: async s => wrap(document.querySelector(s)), createElement: async t => wrap(document.createElement(t)),
          onReady: fn => {window.spookyReady=fn;} },
        screen: { onNavigate(fn) {window.spookyNav=fn;}, loadCurrent() {window.spookyNav();} },
        newTray: () => tray, eventHandler: (key, fn) => {window.spookyHandlers[key]=fn; return key;},
        toast: {error: message => {throw Error(message);}}
      }); } };
    });
    await page.addScriptTag({ content: readFileSync(require('node:path').join(__dirname, '../dist/seanime-spooky.js'), 'utf8') + '\ninit();' });
    await page.waitForSelector('[data-seanime-spooky-overlay]', {state:'attached'});
    await page.waitForFunction(() => getComputedStyle(document.querySelector('[data-episode-card-image-container]')).boxShadow.includes('233, 110, 40'));
    const style = await page.evaluate(() => ({
      brand: getComputedStyle(document.documentElement).getPropertyValue('--color-brand-500').trim(),
      pointer: getComputedStyle(document.querySelector('[data-seanime-spooky-overlay]')).pointerEvents,
      border: getComputedStyle(document.querySelector('[data-episode-card-image-container]')).boxShadow,
      rules: document.querySelector('[data-seanime-spooky-style]').sheet.cssRules.length,
      scene: getComputedStyle(document.querySelector('[data-seanime-spooky-overlay]'), '::after').backgroundImage
    }));
    assert.equal(style.brand, '249 115 22');
    assert.equal(style.pointer, 'none');
    assert.match(style.border, /233, 110, 40/);
    assert.ok(style.rules > 25);
    assert.match(style.scene, /data:image\/svg\+xml/);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('.spooky-leaf').first().evaluate(e => getComputedStyle(e).display), 'none');
    await page.evaluate(() => document.body.appendChild(document.createElement('video')));
    assert.equal(await page.locator('[data-seanime-spooky-overlay]').evaluate(e => getComputedStyle(e).display), 'none');
    await page.evaluate(() => window.spookyHandlers['spooky-theme']());
    await page.waitForSelector('[data-seanime-spooky-style]', {state:'detached'});
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--color-brand-500').trim()), '97 82 223');
    console.log('Browser smoke passed: real CSS parsing, orange branding, click-through decorations, reduced motion, video suppression, theme restoration.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode=1; });
