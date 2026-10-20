/* The entire UI callback is self-contained: Seanime isolates this runtime. */
function init() {
  $ui.register(function (ctx) {
    var themeCSS = ":root {\n--spooky-web: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20180%20180%22%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%23ba581a%22%20stroke-width%3D%221.1%22%20opacity%3D%22.8%22%3E%3Cpath%20d%3D%22M0%200v180M0%200h180M0%200l164%2070M0%200l126%20126M0%200l70%20164%22%2F%3E%3Cpath%20d%3D%22M0%2028q11-2%2013-16%203%209%2015-12M0%2056q22-4%2025-31%209%2017%2031-25M0%2088q34-6%2039-49%2015%2027%2049-39M0%20122q47-8%2054-68%2020%2038%2068-54M0%20158q61-11%2070-88%2026%2049%2088-70M13%2030q0%2013%2017%200M25%2059q1%2026%2034%200M39%2092q1%2040%2053%200M54%20127q1%2055%2073%200M70%20165q2%2072%2095%200%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A\");\n--spooky-pumpkin: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%3E%3Cdefs%3E%3CradialGradient%20id%3D%22p%22%3E%3Cstop%20stop-color%3D%22%23ffac32%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%239d2e06%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3Cpath%20d%3D%22M58%2026q-5-19%2012-21l-3%2011q-9%200-6%2014%22%20fill%3D%22%23735126%22%2F%3E%3Cpath%20d%3D%22M61%2030C16%2012%205%2049%2013%2078q12%2038%2048%2024%2036%2014%2048-24c8-29-3-66-48-48%22%20fill%3D%22url(%23p)%22%20stroke%3D%22%23ec7016%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M54%2033q-16%2025-6%2063m20-63q16%2025%206%2063%22%20fill%3D%22none%22%20stroke%3D%22%239a3509%22%20stroke-width%3D%223%22%20opacity%3D%22.6%22%2F%3E%3Cpath%20d%3D%22m30%2061%2018-16%203%2020zm40%204%203-20%2018%2016zM59%2063l-7%2012h14zM29%2078l13%207%208-4%209%208%209-8%209%204%2015-8q-7%2027-32%2022T29%2078%22%20fill%3D%22%23ffdc64%22%2F%3E%3C%2Fsvg%3E%0A\");\n--spooky-leaf: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2056%22%3E%3Cpath%20fill%3D%22%23d96b1b%22%20d%3D%22m24%200%205%2014%209-6-1%2013%2011%202-10%2010%205%207-17%201-2%2015-2-15-17-1%205-7L0%2023l11-2-1-13%209%206z%22%2F%3E%3Cpath%20d%3D%22M24%2013v30M13%2027l11%207%2012-7%22%20stroke%3D%22%237e300a%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E%0A\");\n--spooky-scene: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20340%20480%22%3E%3Cdefs%3E%3CradialGradient%20id%3D%22moon%22%3E%3Cstop%20stop-color%3D%22%23ffd280%22%2F%3E%3Cstop%20offset%3D%22.8%22%20stop-color%3D%22%23ff8a22%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e9530b%22%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D%22haze%22%3E%3Cstop%20stop-color%3D%22%23f8711644%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23f8711600%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3Cellipse%20cx%3D%22235%22%20cy%3D%22190%22%20rx%3D%22105%22%20ry%3D%22190%22%20fill%3D%22url(%23haze)%22%2F%3E%3Ccircle%20cx%3D%22250%22%20cy%3D%2295%22%20r%3D%2268%22%20fill%3D%22url(%23moon)%22%2F%3E%3Cg%20fill%3D%22%238e3b13%22%20opacity%3D%22.22%22%3E%3Ccircle%20cx%3D%22225%22%20cy%3D%2264%22%20r%3D%2217%22%2F%3E%3Ccircle%20cx%3D%22270%22%20cy%3D%22120%22%20r%3D%2221%22%2F%3E%3Ccircle%20cx%3D%22279%22%20cy%3D%2256%22%20r%3D%229%22%2F%3E%3C%2Fg%3E%3Cg%20fill%3D%22%23120905%22%3E%3Cpath%20d%3D%22m188%2096%2018%206%208-12%208%2012%2018-6-10%2016-10-3-6%208-6-8-10%203zM278%2047l12%204%206-8%206%208%2012-4-7%2011-7-2-4%206-4-6-7%202zM141%20148l17%204%207-10%207%2010%2017-4-10%2014-9-3-5%207-5-7-9%203z%22%2F%3E%3Cpath%20d%3D%22M250%20470V211l-22-1%2029-51%2029%2051-18%201v57h30v-55l-12-1%2022-35%2022%2035-12%201v257zM186%20470V314l-13-1%2032-61%2031%2061-13%201v156zM157%20470V359l-13-1%2029-47%2029%2047-13%201v111z%22%2F%3E%3Cpath%20d%3D%22M115%20480%20108%20302l-37-43%205-8%2030%2029-3-79%208%201%206%2066%2030-36%206%206-36%2048%207%20194zM108%20241l-27-26-5-27%206-2%205%2024%2020%2018M119%20324l30-27%209-30%207%203-9%2033-35%2034%22%2F%3E%3C%2Fg%3E%3Cg%20fill%3D%22%23f8a329%22%3E%3Cpath%20d%3D%22M250%20220h8v19h-8zM250%20252h8v19h-8zM304%20233h6v14h-6zM201%20323h8v18h-8zM167%20368h8v15h-8zM246%20304q12-18%2023%200v31h-23z%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M19%20475q130-61%20321-23v28H19%22%20fill%3D%22%23140904%22%2F%3E%3C%2Fsvg%3E%0A\");\n}\n/* All rules disappear when the plugin is disabled. Never filter posters or video. */\nhtml:root, html.dark, html[data-mode=\"dark\"] {\n  --color-brand-50: 255 247 237 !important;\n  --color-brand-100: 255 237 213 !important;\n  --color-brand-200: 254 215 170 !important;\n  --color-brand-300: 253 186 116 !important;\n  --color-brand-400: 251 146 60 !important;\n  --color-brand-500: 249 115 22 !important;\n  --color-brand-600: 234 88 12 !important;\n  --color-brand-700: 194 65 12 !important;\n  --color-brand-800: 154 52 18 !important;\n  --color-brand-900: 124 45 18 !important;\n  --color-brand-950: 67 20 7 !important;\n  --color-brand-default: 249 115 22 !important;\n  --background: #090604 !important;\n  --foreground: #f4e9df !important;\n  --paper: #100b08 !important;\n  --paper-lighter: #1a100a !important;\n  --border: rgb(249 115 22 / .22) !important;\n  --ring: #fb923c !important;\n  --brand: #fdba74 !important;\n  --muted: #b2a49b !important;\n  --muted-highlight: #d3bba8 !important;\n  --subtle: rgb(249 115 22 / .05) !important;\n  --subtle-highlight: rgb(249 115 22 / .12) !important;\n  --media-card-popup-background: #140d08 !important;\n  --hover-from-background-color: #1a100a !important;\n}\nhtml { scrollbar-color: #8b431d #100b08; }\n::selection { background: #c2410c; color: white; }\n.UI-AppLayoutSidebar__root {\n  background: linear-gradient(180deg, #0c0806f5, #160c05f5) !important;\n  border-right: 1px solid #a94b1d45 !important;\n}\n.UI-AppLayoutSidebar__root .UI-VerticalMenu__item { color: #f5a064; }\n.UI-AppLayoutSidebar__root [data-current=\"true\"] {\n  color: #fff1dd !important;\n  background: #6e290c55 !important;\n  box-shadow: inset 0 0 0 1px #f97316, 0 0 12px #ea580c65;\n  border-radius: 14px;\n}\n.UI-AppLayoutContent__root { background-color: transparent !important; }\n.UI-Button__root:not(:disabled):hover, button:not(:disabled):focus-visible, a:focus-visible {\n  outline-color: #fb923c !important;\n}\n.UI-Button__root:not(:disabled):hover { box-shadow: 0 0 12px #ea580c40; }\n[role=\"tab\"][data-state=\"active\"], [role=\"tab\"][aria-selected=\"true\"] {\n  background: linear-gradient(#682909, #2d1308) !important;\n  color: #fff2e5 !important;\n  box-shadow: inset 0 0 0 1px #f97316, 0 0 10px #f9731630;\n}\n[role=\"switch\"][data-state=\"checked\"], [role=\"checkbox\"][data-state=\"checked\"],\n[role=\"progressbar\"] > div { background-color: #f97316 !important; }\ninput:not([type=\"range\"]), textarea, [role=\"combobox\"] {\n  border-color: #a54e265c !important;\n}\ninput:focus-visible, textarea:focus-visible, [role=\"combobox\"]:focus-visible {\n  outline: 2px solid #fb923c !important;\n  outline-offset: 2px;\n}\n[data-episode-card-image-container] {\n  box-shadow: 0 0 0 1px #e96e2860;\n  transition: box-shadow .18s ease;\n}\n[data-episode-card]:hover [data-episode-card-image-container] {\n  box-shadow: 0 0 0 1px #fb923c, 0 0 16px #ea580c40;\n}\n[data-media-entry-card-body] {\n  box-shadow: 0 0 0 1px #e96e2860;\n}\n[data-media-entry-card-container]:hover [data-media-entry-card-body] {\n  box-shadow: 0 0 0 1px #fb923c, 0 0 16px #ea580c40;\n}\n[data-media-entry-card-body-progress-bar], [data-media-entry-card-hover-popup-banner-progress-bar] {\n  background-color: #f97316 !important;\n}\n[data-episode-card-title], [data-media-page-header-entry-details-title-container] h1 {\n  text-shadow: 0 1px 8px #e85b1230;\n}\n[data-episode-card-progress-bar-container] [class*=\"bg-brand\"] {\n  background-color: #f97316 !important;\n}\n[data-schedule-calendar] {\n  border-color: #b6532655 !important;\n  background-color: #0c0805 !important;\n}\n[data-schedule-calendar-header] {\n  background: linear-gradient(100deg, #221006, #100a06 65%);\n}\n[data-schedule-calendar-day-item] { box-shadow: inset 0 0 0 1px #b653262b; }\n[data-schedule-calendar-day-item]:hover { box-shadow: inset 0 0 0 1px #fb923c; }\n[data-schedule-calendar-day-date].bg-brand-500 { background: #f97316 !important; }\n[data-media-player], media-controller { --media-accent-color: #fb923c; }\n\n/* Decorative layer is inert and restricted to margins. No JavaScript in the app DOM. */\n[data-seanime-spooky-overlay] {\n  position: fixed; inset: 0; z-index: 15;\n  pointer-events: none !important; user-select: none;\n  overflow: hidden; contain: strict;\n}\n[data-seanime-spooky-overlay]::before {\n  content: \"\"; position: absolute; inset: 0;\n  background-image: var(--spooky-web), var(--spooky-web), var(--spooky-pumpkin);\n  background-position: 72px 0, right bottom, 7px calc(100% - 8px);\n  background-size: 145px 145px, 130px 130px, 64px 64px;\n  background-repeat: no-repeat;\n  opacity: .75;\n}\n[data-seanime-spooky-overlay]::after {\n  content: \"\"; position: absolute; top: 28px; right: 22px;\n  width: min(19vw, 290px); height: min(27vw, 390px);\n  background: var(--spooky-scene) right top / contain no-repeat;\n  opacity: .7;\n  mask-image: linear-gradient(#000 55%, transparent);\n}\n[data-media-page-header] { isolation: isolate; }\n[data-media-page-header]::after {\n  content: \"\"; position: absolute; inset: 0; z-index: 0; pointer-events: none;\n  background: radial-gradient(ellipse at 90% 22%, #f9731635, transparent 55%);\n}\n[data-media-page-header-details-container] { position: relative; z-index: 1; }\n[data-seanime-spooky-overlay] .spooky-leaf {\n  position: absolute; width: 18px; height: 22px;\n  background: var(--spooky-leaf) center / contain no-repeat;\n  opacity: .55; top: -30px;\n  animation: spooky-fall 22s linear infinite;\n}\n[data-seanime-spooky-overlay] .spooky-leaf:nth-child(1) { left: 4.5%; animation-delay: -3s; }\n[data-seanime-spooky-overlay] .spooky-leaf:nth-child(2) { right: .8%; animation-delay: -13s; animation-duration: 27s; }\n[data-seanime-spooky-overlay] .spooky-leaf:nth-child(3) { left: 6%; animation-delay: -19s; animation-duration: 31s; }\n[data-seanime-spooky-overlay] .spooky-leaf:nth-child(4) { right: 2%; animation-delay: -7s; animation-duration: 24s; }\n@keyframes spooky-fall {\n  0% { transform: translate(0, -30px) rotate(0); }\n  50% { transform: translate(14px, 52vh) rotate(170deg); }\n  100% { transform: translate(-5px, 110vh) rotate(330deg); }\n}\n/* Hide ALL ornaments for active players/readers and fullscreen. */\nbody:has(video) [data-seanime-spooky-overlay],\nbody:has([data-media-player]) [data-seanime-spooky-overlay],\nbody:has([data-vc-element=\"drawer-content\"]) [data-seanime-spooky-overlay],\nbody:has([data-manga-reader]) [data-seanime-spooky-overlay],\nhtml:has(:fullscreen) [data-seanime-spooky-overlay] { display: none !important; }\n@media (max-width: 900px) {\n  [data-seanime-spooky-overlay]::after { display: none; }\n  [data-seanime-spooky-overlay]::before { background-size: 80px, 70px, 38px; opacity: .45; }\n  [data-seanime-spooky-overlay] .spooky-leaf { display: none; }\n}\n@media (prefers-reduced-motion: reduce) {\n  [data-seanime-spooky-overlay] .spooky-leaf { display: none; animation: none; }\n  [data-episode-card-image-container] { transition: none; }\n}\n[data-seanime-spooky-overlay][data-motion=\"off\"] .spooky-leaf { display: none; animation: none; }\n@media print { [data-seanime-spooky-overlay] { display: none; } }\n";
    var style = null;
    var overlay = null;
    var enabled = true;
    var decorations = true;
    var motion = true;
    var pending = Promise.resolve();

    // Serialize updates so ready/navigation/toggle events never create duplicate layers.
    function schedule() {
      pending = pending.then(apply).catch(function (error) {
        console.error("Seanime Spooky: " + error);
        ctx.toast.error("Seanime Spooky could not apply the theme. Toggle it to retry.");
      });
      return pending;
    }
    async function apply() {
      var head = await ctx.dom.queryOne("head");
      var body = await ctx.dom.queryOne("body");
      if (!head || !body) return;
      style = await ctx.dom.queryOne("[data-seanime-spooky-style]");
      overlay = await ctx.dom.queryOne("[data-seanime-spooky-overlay]");
      if (!enabled) {
        if (overlay) { overlay.remove(); overlay = null; }
        if (style) { style.remove(); style = null; }
        return;
      }
      // Requery because another browser tab may have become the main tab.
      if (!style) {
        style = await ctx.dom.createElement("style");
        style.setAttribute("data-seanime-spooky-style", "1");
        style.setText(themeCSS);
        head.append(style);
      }
      if (!decorations) {
        if (overlay) { overlay.remove(); overlay = null; }
        return;
      }
      if (!overlay) {
        overlay = await ctx.dom.createElement("div");
        overlay.setAttribute("data-seanime-spooky-overlay", "1");
        overlay.setAttribute("aria-hidden", "true");
        overlay.setAttribute("inert", "");
        overlay.setAttribute("role", "presentation");
        for (var i = 0; i < 4; i++) {
          var leaf = await ctx.dom.createElement("span");
          leaf.addClass("spooky-leaf");
          overlay.append(leaf);
        }
        body.append(overlay);
      }
      overlay.setAttribute("data-motion", motion ? "on" : "off");
    }

    var tray = ctx.newTray({
      iconUrl: "https://raw.githubusercontent.com/DefnoJae/SeanimeSpooky/main/assets/pumpkin.svg",
      withContent: true,
      width: "300px"
    });
    var toggleTheme = ctx.eventHandler("spooky-theme", function () {
      enabled = !enabled; schedule(); tray.update();
    });
    var toggleDecorations = ctx.eventHandler("spooky-decorations", function () {
      decorations = !decorations; schedule(); tray.update();
    });
    var toggleMotion = ctx.eventHandler("spooky-motion", function () {
      motion = !motion; schedule(); tray.update();
    });
    tray.render(function () {
      tray.text("Seanime Spooky", { style: { fontWeight: "700", fontSize: "18px" } });
      tray.text("Pumpkin orange, haunted corners, and autumn leaves.");
      tray.button("Theme: " + (enabled ? "On" : "Off"), { onClick: toggleTheme });
      tray.button("Decorations: " + (decorations ? "On" : "Off"), { onClick: toggleDecorations });
      tray.button("Falling leaves: " + (motion ? "On" : "Off"), { onClick: toggleMotion });
      tray.text("Decorations hide during video playback. Reduced motion is respected. Disable the plugin to restore your theme.");
    });
    ctx.dom.onReady(schedule);
    if (ctx.dom.onMainTabReady) ctx.dom.onMainTabReady(schedule);
    ctx.screen.onNavigate(schedule);
    ctx.screen.loadCurrent();
  });
}
