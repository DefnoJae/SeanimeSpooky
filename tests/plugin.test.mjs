import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const code = readFileSync(new URL('../dist/seanime-spooky.js', import.meta.url), 'utf8');

function harness() {
  const elements = new Set();
  const handlers = new Map();
  const hooks = {};
  const errors = [];
  let render;
  function element(tag) {
    const el = { tag, attrs: {}, children: [], text: '',
      setAttribute(k, v) { this.attrs[k] = v; },
      setText(v) { this.text = v; },
      // Reproduce the user's Goja bridge failure instead of masking it with a browser implementation.
      addClass() { throw new TypeError('could not convert function call parameter 0 to goja.FunctionCall'); },
      append(child) { this.children.push(child); elements.add(child); },
      remove() { elements.delete(this); for (const child of this.children) child.remove(); }
    };
    return el;
  }
  const head = element('head'), body = element('body');
  const tray = { text() {}, button() {}, render(fn) { render = fn; fn(); }, update() { render(); } };
  const ctx = {
    dom: {
      async queryOne(selector) {
        if (selector === 'head') return head;
        if (selector === 'body') return body;
        return [...elements].find(e => Object.hasOwn(e.attrs, selector.slice(1, -1))) || null;
      },
      async createElement(tag) { return element(tag); },
      onReady(fn) { hooks.ready = fn; },
      onMainTabReady(fn) { hooks.main = fn; }
    },
    screen: { onNavigate(fn) { hooks.navigate = fn; }, loadCurrent() { hooks.navigate(); } },
    newTray() { return tray; },
    eventHandler(key, fn) { handlers.set(key, fn); return key; },
    toast: { error(message) { errors.push(message); } }
  };
  const sandbox = { $ui: { register(fn) { fn(ctx); } }, console: { error(e) { errors.push(e); } } };
  vm.runInNewContext(code, sandbox);
  sandbox.init();
  hooks.ready();
  const settle = () => new Promise(resolve => setImmediate(resolve));
  const find = attr => [...elements].filter(e => Object.hasOwn(e.attrs, attr));
  return { elements, handlers, hooks, errors, settle, find, head, body };
}
test('loads through isolated UI callback and deduplicates simultaneous lifecycle events', async () => {
  const h = harness();
  h.hooks.ready(); h.hooks.ready(); h.hooks.main();
  await h.settle();
  assert.equal(h.find('data-seanime-spooky-style').length, 1);
  const [overlay] = h.find('data-seanime-spooky-overlay');
  assert.equal(overlay.attrs['aria-hidden'], 'true');
  assert.equal(overlay.attrs.inert, '');
  assert.equal(overlay.children.length, 11);
  assert.deepEqual(overlay.children.map(e => e.attrs.class), [
    'spooky-pumpkins', 'spooky-bats', 'spooky-ghost', 'spooky-spider',
    'spooky-lanterns', 'spooky-fog', 'spooky-embers',
    'spooky-leaf', 'spooky-leaf', 'spooky-leaf', 'spooky-leaf'
  ]);
  assert.equal(overlay.attrs['data-haunt'], 'full');
  assert.equal(h.hooks.navigate, undefined, 'route changes must not trigger backend DOM requests');
  assert.equal(h.errors.length, 0);
});
test('toggles restore style and remove all decoration nodes without duplication', async () => {
  const h = harness(); await h.settle();
  h.handlers.get('spooky-theme')(); await h.settle();
  assert.equal(h.elements.size, 0);
  h.hooks.main(); await h.settle();
  assert.equal(h.elements.size, 0);
  h.handlers.get('spooky-theme')(); await h.settle();
  assert.equal(h.find('data-seanime-spooky-style').length, 1);
  h.handlers.get('spooky-decorations')(); await h.settle();
  assert.equal(h.find('data-seanime-spooky-overlay').length, 0);
  assert.equal(h.elements.size, 1);
  h.handlers.get('spooky-decorations')(); await h.settle();
  h.handlers.get('spooky-motion')(); await h.settle();
  assert.equal(h.find('data-seanime-spooky-overlay')[0].attrs['data-motion'], 'off');
  h.handlers.get('spooky-haunt')(); await h.settle();
  assert.equal(h.find('data-seanime-spooky-overlay')[0].attrs['data-haunt'], 'classic');
  assert.equal(h.find('data-seanime-spooky-overlay').length, 1);
  assert.equal(h.errors.length, 0);
});
test('manifests point to public packaged payload with no privileged permissions', () => {
  const manifest = JSON.parse(readFileSync(new URL('../seanime-spooky.json', import.meta.url)));
  const compatibility = JSON.parse(readFileSync(new URL('../Manifest.json', import.meta.url)));
  assert.deepEqual(manifest, compatibility);
  assert.equal(manifest.language, 'javascript');
  assert.equal(manifest.type, 'plugin');
  assert.deepEqual(manifest.plugin.permissions, {});
  assert.match(manifest.payloadURI, /\/main\/dist\/seanime-spooky\.js$/);
  assert.ok(!code.includes('/*__THEME_CSS__*/'));
});
