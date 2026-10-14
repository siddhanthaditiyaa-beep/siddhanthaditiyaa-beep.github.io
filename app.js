(function () {
  "use strict";
  var S = window.SITE, P = window.PROJECTS, T = window.TOOLKIT, PATH = window.PATH;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isMac = /Mac|iPhone|iPad/.test(navigator.platform || "");
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var icon = function (n) { return '<svg aria-hidden="true"><use href="#i-' + n + '"/></svg>'; };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var fmtDate = function (iso) { try { return new Date(iso).toLocaleDateString("en", { month: "short", year: "numeric" }); } catch (e) { return iso; } };

  /* ---------- static text from SITE ---------- */
  $("#fullName").textContent = S.name;
  $("#college").textContent = S.college;
  $("#statusText").textContent = S.status;
  $("#loc").textContent = S.location;
  $("#ghBtn").href = "https://github.com/" + S.github;
  if (S.resume) { var cv = $("#cvBtn"); cv.href = S.resume; cv.hidden = false; }
  var mod = isMac ? "Cmd K" : "Ctrl K";
  $("#kbdHint").textContent = mod; $("#kbdHint2").textContent = mod;

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var saved = store.get("theme");
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function toggleTheme() {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next); store.set("theme", next);
  }
  $("#themeBtn").addEventListener("click", toggleTheme);

  /* ---------- generated covers ---------- */
  function rng(seed) { var a = seed; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var FONT = 'font-family="Hanken Grotesk, system-ui, sans-serif"';
  function wrapSvg(h, bg, inner, label) {
    return '<svg viewBox="0 0 400 ' + h + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + esc(label) + '"><rect width="400" height="' + h + '" fill="' + bg + '"/>' + inner + '</svg>';
  }
  var ART = {
    shelf: function (h) {
      var r = rng(11), s = "", rows = 4, rh = h / rows, cols = ["#F59E0B", "#38BDF8", "#F472B6", "#A3E635", "#FB7185", "#C084FC", "#FDE047"];
      for (var i = 0; i < rows; i++) {
        var y = i * rh + rh - 12;
        s += '<rect x="0" y="' + y + '" width="400" height="5" fill="#2E4468"/>';
        var x = 14;
        while (x < 360) {
          var w = 22 + Math.floor(r() * 26), ih = 30 + Math.floor(r() * 26), empty = r() < 0.17;
          if (empty) {
            s += '<rect x="' + x + '" y="' + (y - 58) + '" width="' + w + '" height="58" rx="3" fill="none" stroke="#F87171" stroke-width="1.5" stroke-dasharray="4 3"/>';
            if (w > 30) s += '<text x="' + (x + 4) + '" y="' + (y - 26) + '" font-size="9" fill="#FCA5A5" ' + FONT + '>empty</text>';
          } else {
            var c = cols[Math.floor(r() * cols.length)];
            s += '<rect x="' + x + '" y="' + (y - ih) + '" width="' + w + '" height="' + ih + '" rx="3" fill="' + c + '" opacity=".88"/>';
            if (r() < 0.3) {
              s += '<rect x="' + (x - 2) + '" y="' + (y - ih - 2) + '" width="' + (w + 4) + '" height="' + (ih + 4) + '" rx="3" fill="none" stroke="#22C55E" stroke-width="1.5"/>';
              s += '<rect x="' + (x - 2) + '" y="' + (y - ih - 14) + '" width="46" height="12" rx="2" fill="#22C55E"/><text x="' + (x + 2) + '" y="' + (y - ih - 5) + '" font-size="8.5" font-weight="700" fill="#06260F" ' + FONT + '>item 0.9' + (1 + Math.floor(r() * 8)) + '</text>';
            }
          }
          x += w + 8;
        }
      }
      return wrapSvg(h, "#12213A", s, "Generated artwork: shelf photo with YOLOv8 detection boxes");
    },
    notes: function (h) {
      var n = [[70, 70, 14, "Cell"], [190, 50, 10, "ATP"], [296, 92, 16, "Enzymes"], [118, 168, 9, "Membrane"], [230, 176, 13, "DNA"], [322, 214, 9, "Ribosome"], [58, 244, 11, "Quiz"], [176, h - 40, 8, "Flashcards"], [292, h - 28, 10, "Exam"]];
      var e = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 4], [4, 5], [3, 6], [4, 7], [6, 7], [7, 8], [5, 8], [2, 5]], s = "";
      e.forEach(function (p) { s += '<line x1="' + n[p[0]][0] + '" y1="' + n[p[0]][1] + '" x2="' + n[p[1]][0] + '" y2="' + n[p[1]][1] + '" stroke="#1B1B1F" stroke-width="1.6" opacity=".55"/>'; });
      n.forEach(function (d) {
        var w = d[3].length * 6.4 + 14;
        s += '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + d[2] + '" fill="#1B1B1F"/>';
        s += '<rect x="' + (d[0] + d[2] + 3) + '" y="' + (d[1] - 9) + '" width="' + w + '" height="18" rx="9" fill="#fff"/><text x="' + (d[0] + d[2] + 10) + '" y="' + (d[1] + 4) + '" font-size="10.5" font-weight="700" fill="#1B1B1F" ' + FONT + '>' + d[3] + '</text>';
      });
      return wrapSvg(h, "#F5D547", s, "Generated artwork: a knowledge graph of linked study concepts");
    },
    travel: function (h) {
      function node(x, y, label, stroke, fill) { return '<rect x="' + x + '" y="' + y + '" width="94" height="36" rx="8" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.8"/><text x="' + (x + 47) + '" y="' + (y + 22) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#E6FBFF" ' + FONT + '>' + label + '</text>'; }
      var s = "";
      s += '<line x1="110" y1="76" x2="150" y2="76" stroke="#FF6B6B" stroke-width="2.2" stroke-dasharray="4 3"/><text x="130" y="68" text-anchor="middle" font-size="13" font-weight="800" fill="#FF6B6B" ' + FONT + '>x</text>';
      s += '<line x1="244" y1="76" x2="284" y2="76" stroke="#FBBF24" stroke-width="2"/>';
      s += '<path d="M331 94 V150" stroke="#FBBF24" stroke-width="2" fill="none"/>';
      s += node(16, 58, "Flight AI-302", "#FF6B6B", "#3B1D24") + node(150, 58, "Airport transfer", "#FBBF24", "#2B2A1A") + node(284, 58, "Hotel check-in", "#FBBF24", "#2B2A1A") + node(284, 150, "City tour", "#FBBF24", "#2B2A1A");
      s += '<rect x="20" y="28" width="62" height="18" rx="9" fill="#FF6B6B"/><text x="51" y="40.5" text-anchor="middle" font-size="10.5" font-weight="800" fill="#2A0B0B" ' + FONT + '>+2h 10m</text>';
      s += '<text x="16" y="150" font-size="11" font-weight="700" fill="#7CE3F2" ' + FONT + '>Cascade found: 3 bookings at risk</text>';
      var labels = ["Budget", "Speed", "Comfort", "Balanced"], x = 16;
      for (var i = 0; i < 4; i++) {
        var w = labels[i].length * 6.6 + 18, sel = i === 3;
        s += '<rect x="' + x + '" y="' + (h - 44) + '" width="' + w + '" height="24" rx="12" fill="' + (sel ? "#7CE3F2" : "none") + '" stroke="#7CE3F2" stroke-width="1.3"/><text x="' + (x + w / 2) + '" y="' + (h - 28) + '" text-anchor="middle" font-size="10.5" font-weight="700" fill="' + (sel ? "#06303A" : "#7CE3F2") + '" ' + FONT + '>' + labels[i] + '</text>';
        x += w + 8;
      }
      return wrapSvg(h, "#0B3A44", s, "Generated artwork: a trip dependency graph with a delayed flight and recovery options");
    },
    learn: function (h) {
      var subj = ["Math", "Phy", "Chem", "CS", "Eng", "Bio"], hs = [150, 118, 66, 176, 108, 138], s = "", base = 262, pts = [];
      s += '<rect x="18" y="18" width="364" height="' + (h - 36) + '" rx="12" fill="#FFFFFF"/>';
      s += '<text x="38" y="52" font-size="14" font-weight="800" fill="#0F172A" ' + FONT + '>Next exam forecast</text>';
      s += '<rect x="258" y="34" width="106" height="24" rx="12" fill="#0F172A"/><text x="311" y="50" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fff" ' + FONT + '>Predicted 78%</text>';
      for (var i = 0; i < 6; i++) {
        var x = 44 + i * 52, bh = hs[i], weak = i === 2;
        s += '<rect x="' + x + '" y="' + (base - bh) + '" width="34" height="' + bh + '" rx="5" fill="' + (weak ? "#F59E0B" : "#16A34A") + '"/>';
        s += '<text x="' + (x + 17) + '" y="' + (base + 16) + '" text-anchor="middle" font-size="10.5" font-weight="600" fill="#475569" ' + FONT + '>' + subj[i] + '</text>';
        pts.push((x + 17) + "," + (base - bh - 14));
      }
      pts.push("372,86");
      s += '<polyline points="' + pts.join(" ") + '" fill="none" stroke="#0F172A" stroke-width="2" stroke-dasharray="5 4"/><circle cx="372" cy="86" r="5" fill="#0F172A"/>';
      s += '<rect x="' + (44 + 2 * 52 - 22) + '" y="' + (base - 66 - 38) + '" width="78" height="18" rx="4" fill="#FEF3C7"/><text x="' + (44 + 2 * 52 + 17) + '" y="' + (base - 66 - 25.5) + '" text-anchor="middle" font-size="10" font-weight="700" fill="#92400E" ' + FONT + '>weak area</text>';
      return wrapSvg(h, "#DDF3E6", s, "Generated artwork: subject scores with a predicted exam result and a flagged weak subject");
    },
    network: function (h) {
      var r = rng(5), s = "", g;
      for (g = 1; g < 5; g++) s += '<line x1="0" y1="' + (g * h / 5) + '" x2="400" y2="' + (g * h / 5) + '" stroke="#2A1A20" stroke-width="1"/>';
      s += '<rect x="214" y="30" width="110" height="' + (h - 60) + '" fill="#FF4D4D" opacity=".1"/><text x="219" y="' + (h - 40) + '" font-size="10" font-weight="600" fill="#FF8A8A" ' + FONT + '>forecast window</text>';
      var a = [], b = [], x, y;
      for (x = 0; x <= 400; x += 8) {
        var base = 190 + (r() - .5) * 22, k = 0;
        if (x > 214 && x < 330) k = Math.sin((x - 214) / 116 * Math.PI) * 120;
        y = base - k + (x > 214 ? (r() - .5) * 14 : 0);
        (x <= 216 ? a : b).push(x + "," + y.toFixed(1));
      }
      b.unshift(a[a.length - 1]);
      s += '<polyline points="' + a.join(" ") + '" fill="none" stroke="#6EE7B7" stroke-width="2"/><polyline points="' + b.join(" ") + '" fill="none" stroke="#FF6B6B" stroke-width="2.2"/>';
      s += '<line x1="214" y1="26" x2="214" y2="' + (h - 24) + '" stroke="#FF6B6B" stroke-width="1.4" stroke-dasharray="4 3"/>';
      s += '<rect x="30" y="30" width="170" height="24" rx="12" fill="#FF6B6B"/><text x="115" y="46" text-anchor="middle" font-size="11.5" font-weight="800" fill="#2A0B0B" ' + FONT + '>alert: DoS Hulk, risk 0.97</text>';
      s += '<text x="30" y="' + (h - 24) + '" font-size="10.5" font-weight="600" fill="#B79AA3" ' + FONT + '>traffic windows, CICIDS2017 replay</text>';
      return wrapSvg(h, "#170F12", s, "Generated artwork: network traffic timeline with a forecast alert before an attack spike");
    },
    canvas: function (h) {
      function frm(x, y, w, hh, l) { return '<text x="' + x + '" y="' + (y - 5) + '" font-size="9.5" font-weight="700" fill="#0A84E6" ' + FONT + '>' + l + '</text><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" fill="#fff" stroke="#D5D9E4"/>'; }
      var s = "";
      s += frm(24, 40, 150, 120, "Hero") + frm(190, 40, 90, 70, "Projects") + frm(190, 130, 90, 60, "Toolkit") + frm(296, 40, 80, 150, "Contact");
      s += '<rect x="34" y="52" width="70" height="8" rx="2" fill="#15171E"/><rect x="34" y="68" width="110" height="6" rx="2" fill="#C2C6D3"/><rect x="34" y="80" width="90" height="6" rx="2" fill="#C2C6D3"/>';
      s += '<rect x="199" y="50" width="34" height="22" fill="#FFD966"/><rect x="238" y="50" width="34" height="22" fill="#A8F0C6"/><rect x="199" y="78" width="34" height="22" fill="#FFB3C7"/>';
      s += '<rect x="188" y="38" width="94" height="74" fill="none" stroke="#0A84E6" stroke-width="1.5"/>';
      [[188, 38], [282, 38], [188, 112], [282, 112]].forEach(function (p) { s += '<rect x="' + (p[0] - 3.5) + '" y="' + (p[1] - 3.5) + '" width="7" height="7" fill="#fff" stroke="#0A84E6" stroke-width="1.4"/>'; });
      s += '<path d="M250 108 L250 128 L256 123 L260 132 L264 130 L260 121 L268 120 Z" fill="#8E4EC6"/><rect x="262" y="128" width="30" height="15" rx="3" fill="#8E4EC6"/><text x="277" y="138.5" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fff" ' + FONT + '>you</text>';
      return wrapSvg(h, "#E7E9EF", s, "Generated artwork: design frames with a selection box and a cursor");
    }
  };
  function cover(p) { return (ART[p.art] || ART.canvas)(p.h); }

  /* ---------- state + projects ---------- */
  var state = { filter: "All", tool: null }, visible = P.slice(), current = -1, lastFocus = null;
  var tagList = ["All"]; P.forEach(function (p) { p.tags.forEach(function (t) { if (tagList.indexOf(t) < 0) tagList.push(t); }); });

  function renderFilters() {
    var el = $("#filters"); el.innerHTML = "";
    tagList.forEach(function (t) {
      var b = document.createElement("button"); b.type = "button"; b.className = "chip-btn"; b.textContent = t;
      b.setAttribute("aria-pressed", String(state.filter === t));
      b.addEventListener("click", function () { state.filter = t; state.tool = null; render(); });
      el.appendChild(b);
    });
  }
  function render() {
    visible = P.filter(function (p) {
      var okTag = state.filter === "All" || p.tags.indexOf(state.filter) >= 0;
      var okTool = !state.tool || p.stack.indexOf(state.tool) >= 0;
      return okTag && okTool;
    });
    renderFilters();
    $("#toolFilter").classList.toggle("on", !!state.tool);
    if (state.tool) $("#toolName").textContent = state.tool;
    $("#projCount").textContent = visible.length + (visible.length === 1 ? " frame" : " frames");
    $("#empty").classList.toggle("on", visible.length === 0);
    var m = $("#masonry"); m.innerHTML = "";
    visible.forEach(function (p) {
      var c = document.createElement("button");
      c.type = "button"; c.className = "card"; c.dataset.id = p.id;
      c.setAttribute("aria-label", "Open " + p.name);
      var chips = p.stack.slice(0, 5).map(function (t) { return '<span class="chip' + (state.tool === t ? " hit" : "") + '">' + esc(t) + "</span>"; }).join("");
      c.innerHTML =
        '<span class="handle tl"></span><span class="handle tr"></span><span class="handle bl"></span><span class="handle br"></span><span class="dim"></span>' +
        '<span class="cover" style="aspect-ratio:400/' + p.h + '">' + cover(p) + "</span>" +
        '<span class="body"><span class="meta"><span data-upd="' + p.id + '">Updated ' + fmtDate(p.updated) + "</span>" + (p.live ? '<span class="live">Live</span>' : "") + "</span>" +
        "<h3>" + esc(p.name) + "</h3><p>" + esc(p.summary) + '</p><span class="chips">' + chips + "</span></span>";
      c.addEventListener("click", function () { openInspector(p.id, c); });
      c.addEventListener("mouseenter", function () { var r = c.getBoundingClientRect(); $(".dim", c).textContent = Math.round(r.width) + " × " + Math.round(r.height); });
      c.addEventListener("focus", function () { var r = c.getBoundingClientRect(); $(".dim", c).textContent = Math.round(r.width) + " × " + Math.round(r.height); });
      m.appendChild(c);
    });
    applyLiveDates();
  }
  $("#toolClear").addEventListener("click", function () { state.tool = null; render(); });

  /* ---------- inspector ---------- */
  var insp = $("#inspector"), scrim = $("#scrim");
  function inspectorHtml(p) {
    var i = visible.indexOf(p);
    var stats = p.stats.map(function (s) { return '<div class="stat"><b>' + esc(s.v) + "</b><span>" + esc(s.l) + "</span></div>"; }).join("");
    var links = (p.live ? '<a class="btn primary" href="' + p.live + '" target="_blank" rel="noopener">Open live app' + icon("ext") + "</a>" : "") +
      (p.repo ? '<a class="btn" href="' + p.repo + '" target="_blank" rel="noopener">' + icon("gh") + "Source on GitHub</a>" : "");
    return '<div class="insp-bar"><span>Inspect · ' + esc(p.name) + '</span><span class="grp">' +
      '<button class="icon-btn" data-nav="-1" aria-label="Previous project"' + (visible.length < 2 ? " disabled" : "") + ">" + icon("prev") + "</button>" +
      '<button class="icon-btn" data-nav="1" aria-label="Next project"' + (visible.length < 2 ? " disabled" : "") + ">" + icon("next") + "</button>" +
      '<button class="icon-btn" id="inspClose" aria-label="Close panel">' + icon("x") + "</button></span></div>" +
      '<div class="insp-cover" style="aspect-ratio:400/' + p.h + '">' + cover(p) + "</div>" +
      '<div class="insp-sec"><h2>' + esc(p.name) + "</h2><p>" + esc(p.kicker) + "</p><p>" + esc(p.summary) + "</p></div>" +
      '<div class="insp-sec"><h4>Highlights</h4><ul>' + p.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="insp-sec"><h4>In numbers</h4><div class="stats">' + stats + "</div></div>" +
      '<div class="insp-sec"><h4>Stack</h4><div class="chips">' + p.stack.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div></div>" +
      '<div class="insp-sec"><h4>Links</h4><div class="links">' + links + "</div></div>";
  }
  function openInspector(id, from) {
    var p = P.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    if (visible.indexOf(p) < 0) visible = P.slice();
    lastFocus = from || document.activeElement;
    current = visible.indexOf(p);
    insp.innerHTML = inspectorHtml(p);
    insp.scrollTop = 0;
    insp.classList.add("on"); scrim.classList.add("on"); insp.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(function () { var c = $("#inspClose"); if (c) c.focus(); }, 30);
  }
  function closeInspector() {
    insp.classList.remove("on"); scrim.classList.remove("on"); insp.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }
  insp.addEventListener("click", function (e) {
    var t = e.target.closest("button"); if (!t) return;
    if (t.id === "inspClose") return closeInspector();
    if (t.dataset.nav) {
      var n = (current + parseInt(t.dataset.nav, 10) + visible.length) % visible.length;
      current = n; insp.innerHTML = inspectorHtml(visible[n]); insp.scrollTop = 0;
      var b = $('[data-nav="' + t.dataset.nav + '"]', insp); if (b) b.focus();
    }
  });
  scrim.addEventListener("click", closeInspector);

  /* ---------- toolkit ---------- */
  var colors = ["#0A84E6", "#E5484D", "#12A474", "#F76B15", "#8E4EC6", "#E93D82", "#978365"];
  (function () {
    var g = $("#toolGrid");
    T.forEach(function (grp, gi) {
      var d = document.createElement("div"); d.className = "tool-card";
      d.innerHTML = '<h3><i style="--c:' + colors[gi % colors.length] + '"></i>' + esc(grp.group) + '</h3><div class="chips"></div>';
      var box = $(".chips", d);
      grp.items.forEach(function (it) {
        var n = P.filter(function (p) { return p.stack.indexOf(it) >= 0; }).length;
        var el = document.createElement(n ? "button" : "span");
        el.className = "tool" + (n ? " used" : ""); el.innerHTML = esc(it) + (n ? "<b>" + n + "</b>" : "");
        if (n) {
          el.type = "button"; el.title = "Show the " + n + " project" + (n > 1 ? "s" : "") + " using " + it;
          el.addEventListener("click", function () { state.tool = it; state.filter = "All"; render(); $("#projects").scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); });
        }
        box.appendChild(el);
      });
      g.appendChild(d);
    });
  })();

  /* ---------- layers panel ---------- */
  (function () {
    var L = $("#layers");
    PATH.forEach(function (grp, gi) {
      var wrap = document.createElement("div"), id = "lg" + gi;
      wrap.innerHTML = '<button class="lg-head" type="button" aria-expanded="true" aria-controls="' + id + '"><svg class="car"><use href="#i-car"/></svg><svg class="ic"><use href="#i-' + grp.icon + '"/></svg>' + esc(grp.group) + '</button><div class="lg-rows" id="' + id + '"></div>';
      var rows = $(".lg-rows", wrap), head = $(".lg-head", wrap);
      grp.rows.forEach(function (r) {
        var el = document.createElement(r.open ? "button" : "div");
        el.className = "row" + (r.open ? " link" : "");
        el.innerHTML = '<span class="t">' + esc(r.t) + '</span><span class="m">' + esc(r.m) + "</span>";
        if (r.open) { el.type = "button"; el.addEventListener("click", function () { openInspector(r.open, el); }); }
        rows.appendChild(el);
      });
      head.addEventListener("click", function () {
        var open = head.getAttribute("aria-expanded") === "true";
        head.setAttribute("aria-expanded", String(!open)); rows.hidden = open;
      });
      L.appendChild(wrap);
    });
  })();

  /* ---------- about ---------- */
  (function () {
    $("#aboutName").textContent = S.short;
    $("#mono").textContent = S.short.charAt(0) + S.name.split(" ").pop().charAt(0);
    if (S.photo) { $("#photoIn").innerHTML = '<img src="' + esc(S.photo) + '" alt="Portrait of ' + esc(S.name) + '">'; }
    $("#bio").innerHTML = (S.bio || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    var f = "";
    f += "<div><dt>Based in</dt><dd>" + esc(S.location) + "</dd></div>";
    f += "<div><dt>Studying</dt><dd>BTech Computer Engineering, " + esc(S.college.split(",")[0]) + "</dd></div>";
    if (S.speaks) f += "<div><dt>Speaks</dt><dd>" + esc(S.speaks) + "</dd></div>";
    if (S.focus && S.focus.length) f += "<div><dt>Focus, in order</dt><dd><ol>" + S.focus.map(function (x, i) { return "<li><b>" + (i + 1) + "</b>" + esc(x) + "</li>"; }).join("") + "</ol></dd></div>";
    $("#facts").innerHTML = f;
    var l = "";
    if (S.resume) l += '<a class="btn primary" href="' + esc(S.resume) + '" target="_blank" rel="noopener">View resume' + icon("ext") + "</a>";
    if (S.linkedin) l += '<a class="btn" href="' + esc(S.linkedin) + '" target="_blank" rel="noopener">' + icon("in") + "LinkedIn</a>";
    l += '<a class="btn" href="https://github.com/' + S.github + '" target="_blank" rel="noopener">' + icon("gh") + "GitHub</a>";
    $("#aboutLinks").innerHTML = l;
    $("#photoDim").textContent = "Profile";
    if (S.avatar) $$(".avatar").forEach(function (el) { el.textContent = ""; el.style.backgroundImage = "url(" + S.avatar + ")"; el.style.backgroundSize = "cover"; el.style.backgroundPosition = "center"; });
  })();

  /* ---------- contact ---------- */
  (function () {
    var l = $("#contactLinks"), html = "";
    if (S.linkedin) html += '<a class="btn primary" href="' + esc(S.linkedin) + '" target="_blank" rel="noopener">' + icon("in") + "LinkedIn</a>";
    html += '<a class="btn' + (S.linkedin ? "" : " primary") + '" href="https://github.com/' + S.github + '" target="_blank" rel="noopener">' + icon("gh") + "GitHub</a>";
    if (S.resume) html += '<a class="btn" href="' + esc(S.resume) + '" target="_blank" rel="noopener">Resume' + icon("ext") + "</a>";
    l.innerHTML = html;
    if (S.email) {
      var line = $("#emailLine"); line.hidden = false;
      line.innerHTML = "<code>" + esc(S.email) + '</code><button class="btn" type="button" id="copyMail">Copy email</button>';
      $("#copyMail").addEventListener("click", function (e) { copyText(S.email, e.target); });
    }
    $("#threadText").textContent = "Hiring for a cybersecurity internship, or got a project idea? Message me on LinkedIn or by email.";
  })();
  function copyText(txt, btn) {
    var done = function () { if (btn) { var o = btn.textContent; btn.textContent = "Copied"; setTimeout(function () { btn.textContent = o; }, 1400); } };
    try { navigator.clipboard.writeText(txt).then(done, function () { fallback(); }); } catch (e) { fallback(); }
    function fallback() { var c = $("#emailLine code"); if (c) { var r = document.createRange(); r.selectNodeContents(c); var s = getSelection(); s.removeAllRanges(); s.addRange(r); } }
  }

  /* ---------- hero: comment pin, sticky notes, cursors ---------- */
  $("#pinBtn").addEventListener("click", function () {
    var t = $("#thread"), open = t.hidden;
    t.hidden = !open; this.setAttribute("aria-expanded", String(open));
  });

  (function notes() {
    var board = $("#board"), z = 10;
    $$(".note", board).forEach(function (n) {
      var sx, sy, ox, oy, drag = false;
      n.addEventListener("pointerdown", function (e) {
        drag = true; z++; n.style.zIndex = z;
        ox = n.offsetLeft; oy = n.offsetTop; sx = e.clientX; sy = e.clientY;
        n.style.left = ox + "px"; n.style.top = oy + "px";
        n.setPointerCapture(e.pointerId); e.preventDefault();
      });
      n.addEventListener("pointermove", function (e) {
        if (!drag) return;
        var x = Math.max(0, Math.min(board.clientWidth - n.offsetWidth, ox + e.clientX - sx));
        var y = Math.max(0, Math.min(board.clientHeight - n.offsetHeight, oy + e.clientY - sy));
        n.style.left = x + "px"; n.style.top = y + "px";
      });
      var end = function () { drag = false; };
      n.addEventListener("pointerup", end); n.addEventListener("pointercancel", end);
    });
  })();

  (function cursors() {
    var body = $("#heroBody");
    var defs = [
      { n: "Gemini", c: "#8E4EC6", s: ["tool call: get_weak_topics", "needs a better prompt", "agent says hi"] },
      { n: "FastAPI", c: "#12A474", s: ["200 OK", "docs live at /docs", "rate limit hit"] },
      { n: "YOLOv8", c: "#F76B15", s: ["14 items found", "slot 7 is empty", "confidence 0.94"] },
      { n: "XGBoost", c: "#E5484D", s: ["risk score 0.97", "forecast ready", "no data leakage"] }
    ];
    var arrow = '<svg viewBox="0 0 20 22"><path d="M2 2v16l4.2-3.6L9 20.5l3-1.4-2.8-5.7H15z" fill="COLOR" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>';
    var list = defs.map(function (d, i) {
      var el = document.createElement("div"); el.className = "cursor"; el.setAttribute("aria-hidden", "true");
      el.innerHTML = arrow.replace("COLOR", d.c) + '<span class="tag" style="background:' + d.c + '">' + d.n + '</span><span class="say"></span>';
      body.appendChild(el);
      var w = body.clientWidth, h = body.clientHeight;
      return { el: el, say: $(".say", el), d: d, x: w * (0.15 + 0.22 * i), y: h * (0.2 + 0.18 * i), tx: 0, ty: 0, wait: 0.6 + i * 0.5, talk: 0 };
    });
    function pick(c) {
      var w = body.clientWidth, h = body.clientHeight, top = 24, bottom = h - 100;
      if (innerWidth <= 980) { var bd = $("#board"); top = bd.offsetTop + 10; bottom = bd.offsetTop + bd.offsetHeight - 70; }
      c.tx = 24 + Math.random() * (w - 160); c.ty = top + Math.random() * Math.max(10, bottom - top);
      c.wait = 1.4 + Math.random() * 2.6;
    }
    list.forEach(function (c) { pick(c); c.el.style.transform = "translate(" + c.x + "px," + c.y + "px)"; });
    if (reduced) return;
    var last = performance.now();
    function tick(now) {
      var dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!document.hidden) list.forEach(function (c) {
        var dx = c.tx - c.x, dy = c.ty - c.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 3) { var k = 1 - Math.pow(0.04, dt); c.x += dx * k * 0.9; c.y += dy * k * 0.9; }
        else {
          c.wait -= dt;
          if (c.wait <= 0) {
            if (Math.random() < 0.45) { c.say.textContent = c.d.s[Math.floor(Math.random() * c.d.s.length)]; c.say.classList.add("on"); c.talk = 2.1; }
            pick(c);
          }
        }
        if (c.talk > 0) { c.talk -= dt; if (c.talk <= 0) c.say.classList.remove("on"); }
        c.el.style.transform = "translate(" + c.x.toFixed(1) + "px," + c.y.toFixed(1) + "px)";
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* ---------- dock, progress ---------- */
  (function () {
    var bar = $("#progress");
    function onScroll() {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, scrollY / h) : 0) + ")";
    }
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) $$(".dock a").forEach(function (a) { a.classList.toggle("on", a.dataset.s === e.target.id); });
        });
      }, { rootMargin: "-40% 0px -50% 0px" });
      ["home", "about", "projects", "toolkit", "path", "contact"].forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
    }
  })();

  /* ---------- command palette ---------- */
  var pal = $("#pal"), palInput = $("#palInput"), palList = $("#palList"), cmds = [], sel = 0, shown = [];
  function buildCmds() {
    cmds = [
      { t: "Go to Home", m: "Section", f: function () { location.hash = "#home"; } },
      { t: "Go to About", m: "Section", f: function () { location.hash = "#about"; } },
      { t: "Go to Projects", m: "Section", f: function () { location.hash = "#projects"; } },
      { t: "Go to Toolkit", m: "Section", f: function () { location.hash = "#toolkit"; } },
      { t: "Go to Path", m: "Section", f: function () { location.hash = "#path"; } },
      { t: "Go to Contact", m: "Section", f: function () { location.hash = "#contact"; } }
    ];
    P.forEach(function (p) { cmds.push({ t: "Open " + p.name, m: "Project", f: function () { state.filter = "All"; state.tool = null; render(); openInspector(p.id); } }); });
    tagList.slice(1).forEach(function (t) { cmds.push({ t: "Show " + t + " projects", m: "Filter", f: function () { state.filter = t; state.tool = null; render(); $("#projects").scrollIntoView(); } }); });
    cmds.push({ t: "Toggle light and dark", m: "Theme", f: toggleTheme });
    cmds.push({ t: "Open GitHub profile", m: "Link", f: function () { window.open("https://github.com/" + S.github, "_blank", "noopener"); } });
    if (S.linkedin) cmds.push({ t: "Open LinkedIn", m: "Link", f: function () { window.open(S.linkedin, "_blank", "noopener"); } });
  }
  function drawPal() {
    var q = palInput.value.toLowerCase().split(/\s+/).filter(Boolean);
    shown = cmds.filter(function (c) { var s = (c.t + " " + c.m).toLowerCase(); return q.every(function (w) { return s.indexOf(w) >= 0; }); });
    if (sel >= shown.length) sel = 0;
    palList.innerHTML = shown.map(function (c, i) { return '<li role="option" data-i="' + i + '" aria-selected="' + (i === sel) + '">' + esc(c.t) + "<small>" + esc(c.m) + "</small></li>"; }).join("") || '<li aria-selected="false">Nothing matches. Try a project name.</li>';
  }
  function openPal() { buildCmds(); sel = 0; palInput.value = ""; pal.classList.add("on"); drawPal(); palInput.focus(); }
  function closePal() { pal.classList.remove("on"); }
  function runPal(i) { var c = shown[i]; if (!c) return; closePal(); setTimeout(c.f, 20); }
  palInput.addEventListener("input", function () { sel = 0; drawPal(); });
  palList.addEventListener("click", function (e) { var li = e.target.closest("li[data-i]"); if (li) runPal(+li.dataset.i); });
  pal.addEventListener("click", function (e) { if (e.target === pal) closePal(); });
  palInput.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { sel = Math.min(shown.length - 1, sel + 1); drawPal(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { sel = Math.max(0, sel - 1); drawPal(); e.preventDefault(); }
    else if (e.key === "Enter") { runPal(sel); }
  });
  $("#palBtn").addEventListener("click", openPal); $("#dockPal").addEventListener("click", openPal);
  addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.classList.contains("on") ? closePal() : openPal(); }
    else if (e.key === "Escape") { if (pal.classList.contains("on")) closePal(); else if (insp.classList.contains("on")) closeInspector(); }
  });

  /* ---------- live GitHub feed ---------- */
  var live = null;
  function ago(iso) {
    var d = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);
    if (d < 1) return "today"; if (d < 2) return "yesterday"; if (d < 30) return d + " days ago";
    var m = Math.floor(d / 30); return m < 12 ? m + (m === 1 ? " month ago" : " months ago") : Math.floor(m / 12) + " yr ago";
  }
  function applyLiveDates() {
    if (!live) return;
    P.forEach(function (p) {
      var name = (p.repo || "").split("/").pop().toLowerCase(), r = live[name];
      var el = $('[data-upd="' + p.id + '"]'); if (r && el) el.textContent = "Pushed " + ago(r.pushed_at);
    });
  }
  (function github() {
    if (!window.fetch) return;
    fetch("https://api.github.com/users/" + S.github + "/repos?per_page=100&sort=pushed")
      .then(function (r) { if (!r.ok) throw new Error("gh"); return r.json(); })
      .then(function (repos) {
        live = {}; repos.forEach(function (r) { live[r.name.toLowerCase()] = r; });
        applyLiveDates();
        var known = P.map(function (p) { return (p.repo || "").split("/").pop().toLowerCase(); });
        var extra = repos.filter(function (r) { return !r.fork && known.indexOf(r.name.toLowerCase()) < 0 && r.name.toLowerCase() !== S.github.toLowerCase(); }).slice(0, 6);
        if (!extra.length) return;
        $("#freshGrid").innerHTML = extra.map(function (r) {
          return '<a href="' + esc(r.html_url) + '" target="_blank" rel="noopener"><b>' + esc(r.name) + "</b><small>" + esc(r.description || r.language || "New repository") + " · pushed " + ago(r.pushed_at) + "</small></a>";
        }).join("");
        $("#fresh").classList.add("on");
      })
      .catch(function () { /* offline, rate limited or blocked: the page works without it */ });
  })();

  /* ---------- go ---------- */
  render();
})();
