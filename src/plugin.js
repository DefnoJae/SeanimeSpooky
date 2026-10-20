/* The entire UI callback is self-contained: Seanime isolates this runtime. */
function init() {
  $ui.register(function (ctx) {
    var themeCSS = /*__THEME_CSS__*/;
    var style = null;
    var overlay = null;
    var enabled = true;
    var decorations = true;
    var motion = true;
    var fullHaunt = true;
    var pending = Promise.resolve();
    var scheduled = false;
    var dirty = false;

    // Serialize updates so ready/navigation/toggle events never create duplicate layers.
    function schedule() {
      dirty = true;
      if (scheduled) return pending;
      scheduled = true;
      pending = pending.then(async function () {
        while (dirty) { dirty = false; await apply(); }
      }).catch(function (error) {
        console.error("Seanime Spooky: " + error);
        ctx.toast.error("Seanime Spooky could not apply the theme. Toggle it to retry.");
      }).then(function () { scheduled = false; });
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
        var scenery = await ctx.dom.createElement("div");
        scenery.setAttribute("class", "spooky-pumpkins");
        overlay.append(scenery);
        var bats = await ctx.dom.createElement("div");
        bats.setAttribute("class", "spooky-bats");
        overlay.append(bats);
        // A fixed number of CSS-animated ornaments; no animation timers or polling.
        var ornaments = ["spooky-ghost", "spooky-spider", "spooky-lanterns", "spooky-fog", "spooky-embers"];
        for (var n = 0; n < ornaments.length; n++) {
          var ornament = await ctx.dom.createElement("div");
          ornament.setAttribute("class", ornaments[n]);
          overlay.append(ornament);
        }
        for (var i = 0; i < 4; i++) {
          var leaf = await ctx.dom.createElement("span");
          leaf.setAttribute("class", "spooky-leaf");
          overlay.append(leaf);
        }
        body.append(overlay);
      }
      overlay.setAttribute("data-motion", motion ? "on" : "off");
      overlay.setAttribute("data-haunt", fullHaunt ? "full" : "classic");
    }

    var tray = ctx.newTray({
      iconUrl: "https://raw.githubusercontent.com/DefnoJae/SeanimeSpooky/main/assets/icon.png",
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
    var toggleHaunt = ctx.eventHandler("spooky-haunt", function () {
      fullHaunt = !fullHaunt; schedule(); tray.update();
    });
    tray.render(function () {
      return tray.stack({ gap: 3, items: [
        tray.text("Seanime Spooky", { style: { fontWeight: "700", fontSize: "18px" } }),
        tray.text("Pumpkin orange, haunted corners, and autumn leaves."),
        tray.button("Theme: " + (enabled ? "On" : "Off"), { onClick: toggleTheme }),
        tray.button("Decorations: " + (decorations ? "On" : "Off"), { onClick: toggleDecorations }),
        tray.button("Animation: " + (motion ? "On" : "Off"), { onClick: toggleMotion }),
        tray.button("Haunt level: " + (fullHaunt ? "Full haunt" : "Classic"), { onClick: toggleHaunt }),
        tray.text("Decorations hide around active players. Reduced motion is respected.")
      ] });
    });
    ctx.dom.onReady(schedule);
    if (ctx.dom.onMainTabReady) ctx.dom.onMainTabReady(schedule);
    // Fixed CSS/layers survive route changes. Do not send DOM requests on every navigation.
  });
}
