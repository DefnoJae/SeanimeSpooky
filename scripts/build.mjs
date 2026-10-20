import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let css = readFileSync(resolve(root, 'src/theme.css'), 'utf8');
const variables = ['web', 'pumpkin', 'leaf', 'scene', 'graveyard', 'bats'].map(name => {
  const svg = readFileSync(resolve(root, `assets/${name}.svg`), 'utf8');
  return `--spooky-${name}: url("data:image/svg+xml,${encodeURIComponent(svg)}");`;
}).join('\n');
css = `:root {\n${variables}\n}\n${css}`;
const template = readFileSync(resolve(root, 'src/plugin.js'), 'utf8');
const plugin = template.replace('/*__THEME_CSS__*/', () => JSON.stringify(css));
mkdirSync(resolve(root, 'dist'), { recursive: true });
writeFileSync(resolve(root, 'dist/seanime-spooky.js'), plugin);
const manifest = {
  id: 'seanime-spooky', name: 'Seanime Spooky', version: '1.1.0',
  manifestURI: 'https://raw.githubusercontent.com/DefnoJae/SeanimeSpooky/main/seanime-spooky.json',
  language: 'javascript', type: 'plugin',
  description: 'Halloween theme with pumpkin-orange controls, cobwebs, a haunted moon, pumpkins, and falling leaves.',
  author: 'DefnoJae', lang: 'multi',
  icon: 'https://raw.githubusercontent.com/DefnoJae/SeanimeSpooky/main/assets/pumpkin.svg',
  website: 'https://github.com/DefnoJae/SeanimeSpooky',
  readme: 'https://raw.githubusercontent.com/DefnoJae/SeanimeSpooky/main/README.md',
  payloadURI: 'https://raw.githubusercontent.com/DefnoJae/SeanimeSpooky/main/dist/seanime-spooky.js',
  plugin: { version: '1', permissions: {} }
};
for (const name of ['seanime-spooky.json', 'Manifest.json']) {
  writeFileSync(resolve(root, name), JSON.stringify(manifest, null, 2) + '\n');
}
console.log('Built plugin and install manifests.');
