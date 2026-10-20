// Optional build helper: requires Playwright and a local Chrome installation.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  try {
    const page = await browser.newPage({viewport: {width:256,height:256},deviceScaleFactor:1});
    await page.setContent('<style>body{margin:0;background:transparent}svg{display:block}</style>' + fs.readFileSync(path.join(__dirname,'../assets/icon.svg'),'utf8'));
    await page.locator('svg').screenshot({path:path.join(__dirname,'../assets/icon.png'),omitBackground:true});
    console.log('Built 256px marketplace icon.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
