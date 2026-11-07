(function () {
  "use strict";
  var C = window.CONFIG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SVGNS = "http://www.w3.org/2000/svg";

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function copyText(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { window.prompt("Copy this:", text); });
    } else { window.prompt("Copy this:", text); }
  }

  // ---------- Personalise (URL params > saved in browser > config.js) ----------
  var PKEY = "himalaya-profile-v1";
  function validDate(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(s).getTime()); }
  function sanitise(p) {
    var out = {};
    if (p.name && String(p.name).trim()) out.name = String(p.name).trim().slice(0, 30);
    var a = parseInt(p.age, 10);
    if (a >= 1 && a <= 120) out.age = a;
    if (p.date && validDate(p.date)) out.birthday = p.date;
    return out;
  }
  function readProfile() {
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(PKEY)) || {}; } catch (e) { /* ignore */ }
    var q = new URLSearchParams(window.location.search);
    var fromUrl = { name: q.get("name"), age: q.get("age"), date: q.get("date") };
    return Object.assign({}, sanitise({ name: saved.name, age: saved.age, date: saved.birthday }), sanitise(fromUrl));
  }
  Object.assign(C, readProfile());

  function personalise() {
    document.title = "Happy Birthday, " + C.name + "!";
    $$(".js-name").forEach(function (e) { e.textContent = C.name; });
    $(".js-name-big").textContent = C.name;
    $(".js-role").textContent = C.role;
    $("#age").textContent = C.age;
    renderWish();
    countdown();
  }

  // ---------- Birthday countdown ----------
  function pad(n) { return String(n).padStart(2, "0"); }
  function countdown() {
    var parts = C.birthday.split("-").map(Number);
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var target = new Date(now.getFullYear(), parts[1] - 1, parts[2]);
    var cd = $("#countdown");
    if (target.getTime() === today.getTime()) {
      cd.textContent = "Today is the day! \uD83C\uDF89";
      return;
    }
    if (target < today) target.setFullYear(target.getFullYear() + 1);
    var diff = target - now;
    var d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
    cd.textContent = "Summit day in " + d + "d " + pad(h) + "h " + pad(m) + "m " + pad(s) + "s";
  }
  setInterval(countdown, 1000);

  // ---------- Hero: pines + bunting ----------
  (function buildPines() {
    var base = 560, d = "M0 600 V" + base;
    for (var x = 10, i = 0; x < 1480; x += 34, i++) {
      var h = 110 + Math.abs(Math.sin(i * 1.7) * 70) + (i % 3) * 14;
      d += " L" + (x - 26) + " " + base +
        " L" + (x - 10) + " " + (base - h * .4) + " L" + (x - 18) + " " + (base - h * .4) +
        " L" + (x - 6) + " " + (base - h * .7) + " L" + (x - 12) + " " + (base - h * .7) +
        " L" + x + " " + (base - h) +
        " L" + (x + 12) + " " + (base - h * .7) + " L" + (x + 6) + " " + (base - h * .7) +
        " L" + (x + 18) + " " + (base - h * .4) + " L" + (x + 10) + " " + (base - h * .4) +
        " L" + (x + 26) + " " + base;
    }
    d += " L1480 " + base + " V600 Z";
    $("#pines").setAttribute("d", d);
  })();

  var flagsSvg = $("#flags");
  function buildFlags() {
    var w = window.innerWidth, sag = Math.min(46, w * .05), n = Math.max(10, Math.round(w / 52));
    var colors = ["#ffb703", "#ff7a59", "#e8587f", "#9b6bd1", "#7fd3f0", "#ffffff"];
    flagsSvg.setAttribute("viewBox", "0 0 " + w + " 96");
    flagsSvg.innerHTML = "";
    function yAt(t) { return 6 + sag * 4 * t * (1 - t); }
    var path = document.createElementNS(SVGNS, "path"), dd = "M0 " + yAt(0);
    for (var k = 1; k <= 40; k++) dd += " L" + (w * k / 40) + " " + yAt(k / 40);
    path.setAttribute("d", dd); path.setAttribute("fill", "none");
    path.setAttribute("stroke", "rgba(255,255,255,.7)"); path.setAttribute("stroke-width", "1.5");
    flagsSvg.appendChild(path);
    for (var i = 0; i < n; i++) {
      var t = (i + .5) / n, x = w * t, y = yAt(t), fw = Math.min(26, w / n * .55);
      var tri = document.createElementNS(SVGNS, "path");
      tri.setAttribute("d", "M" + (x - fw) + " " + y + " L" + (x + fw) + " " + y + " L" + x + " " + (y + fw * 2) + " Z");
      tri.setAttribute("fill", colors[i % colors.length]);
      tri.setAttribute("opacity", ".95");
      tri.setAttribute("class", "fl");
      tri.style.animationDelay = (-(i * .37) % 2.8).toFixed(2) + "s";
      flagsSvg.appendChild(tri);
    }
  }

  // ---------- Canvases: hero stars + full-screen confetti ----------
  var fx = $("#fx"), fctx = fx.getContext("2d");
  var hc = $("#hero-canvas"), hctx = hc.getContext("2d");
  var hero = $("#top");
  var FW, FH, HW, HH, stars = [], bits = [], shoot = null;
  function resize() {
    FW = fx.width = window.innerWidth; FH = fx.height = window.innerHeight;
    HW = hc.width = hero.clientWidth; HH = hc.height = hero.clientHeight;
    stars = [];
    var n = reduceMotion ? 60 : Math.min(180, Math.floor(HW * HH / 7000));
    for (var i = 0; i < n; i++) {
      stars.push({ x: Math.random() * HW, y: Math.random() * HH * .62, r: Math.random() * 1.4 + .3, p: Math.random() * 6.28, s: Math.random() * .03 + .008 });
    }
    buildFlags();
  }
  window.addEventListener("resize", resize);

  var COLORS = ["#ffb703", "#ff7a59", "#e8587f", "#b58cf0", "#7fd3f0", "#ffffff"];
  function confetti(x, y, count) {
    for (var i = 0; i < count; i++) {
      var a = Math.random() * 6.283, v = Math.random() * 9 + 3;
      bits.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 5, w: Math.random() * 9 + 4, h: Math.random() * 5 + 3, rot: Math.random() * 6.28, vr: Math.random() * .4 - .2, c: COLORS[i % COLORS.length], life: 1 });
    }
  }
  function confettiRain(count) {
    for (var i = 0; i < count; i++) {
      bits.push({ x: Math.random() * FW, y: -20 - Math.random() * 200, vx: Math.random() * 2 - 1, vy: Math.random() * 3 + 2, w: Math.random() * 9 + 4, h: Math.random() * 5 + 3, rot: Math.random() * 6.28, vr: Math.random() * .3 - .15, c: COLORS[i % COLORS.length], life: 1.6 });
    }
  }
  function frame(now) {
    if (!reduceMotion && window.scrollY < hero.clientHeight) {
      hctx.clearRect(0, 0, HW, HH);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i]; s.p += s.s;
        hctx.globalAlpha = .35 + .65 * Math.abs(Math.sin(s.p));
        hctx.fillStyle = "#fff";
        hctx.beginPath(); hctx.arc(s.x, s.y, s.r, 0, 6.283); hctx.fill();
      }
      hctx.globalAlpha = 1;
      if (!shoot && Math.random() < .004) shoot = { x: Math.random() * HW * .8, y: Math.random() * HH * .25, l: 0 };
      if (shoot) {
        shoot.l += 14;
        var g = hctx.createLinearGradient(shoot.x + shoot.l, shoot.y + shoot.l * .5, shoot.x + shoot.l - 70, shoot.y + (shoot.l - 70) * .5);
        g.addColorStop(0, "rgba(255,255,255,.95)"); g.addColorStop(1, "rgba(255,255,255,0)");
        hctx.strokeStyle = g; hctx.lineWidth = 2;
        hctx.beginPath(); hctx.moveTo(shoot.x + shoot.l, shoot.y + shoot.l * .5); hctx.lineTo(shoot.x + shoot.l - 70, shoot.y + (shoot.l - 70) * .5); hctx.stroke();
        if (shoot.l > 500) shoot = null;
      }
    }
    fctx.clearRect(0, 0, FW, FH);
    for (var j = bits.length - 1; j >= 0; j--) {
      var b = bits[j];
      b.x += b.vx; b.y += b.vy; b.vy += .22; b.vx *= .99; b.rot += b.vr; b.life -= .008;
      if (b.life <= 0 || b.y > FH + 20) { bits.splice(j, 1); continue; }
      fctx.save(); fctx.globalAlpha = Math.min(1, b.life * 2);
      fctx.translate(b.x, b.y); fctx.rotate(b.rot); fctx.fillStyle = b.c;
      fctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); fctx.restore();
    }
    requestAnimationFrame(frame);
  }
  resize();
  requestAnimationFrame(frame);

  // ---------- Lanterns ----------
  var lanternBox = $("#lanterns");
  function lanterns(n) {
    for (var i = 0; i < n; i++) {
      var l = el("div", "lantern");
      l.style.left = (4 + Math.random() * 92) + "%";
      l.style.setProperty("--d", (11 + Math.random() * 7).toFixed(1) + "s");
      l.style.setProperty("--delay", (Math.random() * 2.2).toFixed(2) + "s");
      l.style.setProperty("--sway", (Math.random() * 70 - 35).toFixed(0) + "px");
      l.style.transform = "scale(" + (.7 + Math.random() * .7).toFixed(2) + ")";
      l.addEventListener("animationend", function () { this.remove(); });
      lanternBox.appendChild(l);
    }
  }

  // ---------- Nav, progress, parallax ----------
  var nav = $("#nav"), prog = $("#progress");
  var rFar = $("#r-far"), rMid = $("#r-mid"), heroText = $("#hero-text");
  function onScroll() {
    var y = window.scrollY || 0;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    nav.classList.toggle("solid", y > 60);
    if (!reduceMotion && y < window.innerHeight * 1.2) {
      rFar.style.transform = "translateY(" + (y * .14) + "px)";
      rMid.style.transform = "translateY(" + (y * .07) + "px)";
      heroText.style.transform = "translateY(" + (y * .25) + "px)";
      heroText.style.opacity = Math.max(0, 1 - y / (window.innerHeight * .75));
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Typewriter ----------
  var tw = $("#typewriter"), ti = 0, ci = 0, del = false;
  function type() {
    var text = C.taglines[ti];
    if (!del) {
      ci++; tw.textContent = text.slice(0, ci);
      if (ci >= text.length) { del = true; return setTimeout(type, 2400); }
      setTimeout(type, 36);
    } else {
      ci = Math.max(0, ci - 2); tw.textContent = text.slice(0, ci);
      if (ci === 0) { del = false; ti = (ti + 1) % C.taglines.length; return setTimeout(type, 400); }
      setTimeout(type, 14);
    }
  }
  type();

  // ---------- Hero buttons ----------
  $("#lantern-btn").addEventListener("click", function () { lanterns(14); });
  $("#confetti-btn").addEventListener("click", function () {
    var r = this.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top, 120);
    confetti(FW * .2, FH * .6, 60);
    confetti(FW * .8, FH * .6, 60);
    confettiRain(80);
  });

  // ---------- Birthday wishes ----------
  var tone = "all", wi = 0, wishPool = [];
  function pool() {
    wishPool = C.wishes.filter(function (w) { return tone === "all" || w[0] === tone; });
    if (wi >= wishPool.length) wi = 0;
  }
  function wishText(w) { return w[1].replace(/\{name\}/g, C.name); }
  function renderWish() {
    pool();
    var w = wishPool[wi]; if (!w) return;
    var card = $("#wish-card");
    $("#wish-quote").textContent = wishText(w);
    $("#wish-by").textContent = "\u2014 " + w[2];
    $("#wish-count").textContent = (wi + 1) + " / " + wishPool.length;
    card.classList.remove("flip-in-card"); void card.offsetWidth; card.classList.add("flip-in-card");
  }
  function go(d) { pool(); wi = (wi + d + wishPool.length) % wishPool.length; renderWish(); }
  $("#wish-next").addEventListener("click", function () { go(1); });
  $("#wish-prev").addEventListener("click", function () { go(-1); });
  $("#wish-random").addEventListener("click", function () {
    pool(); wi = Math.floor(Math.random() * wishPool.length); renderWish();
    var r = this.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top, 50);
  });
  $$(".tab").forEach(function (t) {
    t.addEventListener("click", function () {
      $$(".tab").forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-selected", "false"); });
      t.classList.add("active"); t.setAttribute("aria-selected", "true");
      tone = t.dataset.tone; wi = 0; renderWish();
    });
  });
  $("#wish-copy").addEventListener("click", function () {
    var b = this, old = b.textContent, w = wishPool[wi];
    if (!w) return;
    copyText(wishText(w) + " \u2014 " + w[2], function () {
      b.textContent = "Copied!"; setTimeout(function () { b.textContent = old; }, 1500);
    });
  });
  setInterval(function () {
    var sec = $("#wishes");
    if (!document.hidden && !sec.matches(":hover") && !sec.contains(document.activeElement)) go(1);
  }, 9000);

  // ---------- Birthday candle ----------
  var cake = $("#cake"), cakeMsg = $("#cake-msg");
  var wishLines = [
    "Wish made. Now keep it a secret!",
    "Poof! That one is definitely coming true.",
    "The mountains heard you.",
    "Candle out, wish in. Happy Birthday!"
  ];
  function blow() {
    if (cake.classList.contains("out")) return;
    cake.classList.add("out");
    cakeMsg.textContent = wishLines[Math.floor(Math.random() * wishLines.length)];
    var r = cake.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top, 130);
    confettiRain(70);
    lanterns(8);
  }
  function relight() {
    cake.classList.remove("out");
    cakeMsg.textContent = "Relit! Make another wish.";
  }
  cake.addEventListener("click", function () { cake.classList.contains("out") ? relight() : blow(); });
  $("#blow").addEventListener("click", blow);
  $("#relight").addEventListener("click", relight);

  // ---------- About + stats ----------
  var aboutEl = $("#about-text");
  C.about.forEach(function (t) { aboutEl.appendChild(el("p", "", t)); });
  var statsEl = $("#stats");
  C.stats.forEach(function (s) {
    var d = el("div", "stat"), b = el("b", "", "0"), sm = el("small", "", s[0]);
    b.dataset.to = s[1];
    d.appendChild(b); d.appendChild(sm); statsEl.appendChild(d);
  });
  function countUp() {
    $$(".stat b").forEach(function (b) {
      var to = +b.dataset.to, t0 = performance.now(), dur = reduceMotion ? 1 : 1400;
      (function step(now) {
        var k = Math.min(1, (now - t0) / dur);
        b.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString();
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    });
  }

  // ---------- Gallery (3 photo slots) ----------
  var lb = $("#lightbox"), lbImg = $("#lb-img"), lbCap = $("#lb-cap");
  function openLb(src, cap) { lbImg.src = src; lbImg.alt = cap; lbCap.textContent = cap; lb.hidden = false; }
  function closeLb() { lb.hidden = true; lbImg.removeAttribute("src"); }
  $("#lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  window.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  var grid = $("#gallery-grid");
  C.photos.forEach(function (p, i) {
    var fig = el("figure", "photo");
    fig.tabIndex = 0;
    var frameEl = el("div", "frame");
    var img = el("img"); img.alt = p.caption; img.hidden = true;
    var ph = el("div", "photo-ph");
    ph.appendChild(el("span", "ico", "\uD83D\uDCF7"));
    ph.appendChild(el("div", "", "Photo " + (i + 1)));
    ph.appendChild(el("small", "", "Add " + p.src + " or click to choose a photo"));
    var cap = el("figcaption", "", p.caption);
    var inp = el("input"); inp.type = "file"; inp.accept = "image/*";

    function show(src) {
      img.src = src; img.hidden = false; ph.hidden = true; fig.classList.add("has-img");
    }
    img.addEventListener("load", function () { fig.classList.add("has-img"); img.hidden = false; ph.hidden = true; });
    img.src = p.src;

    function activate() {
      if (fig.classList.contains("has-img")) openLb(img.src, p.caption);
      else inp.click();
    }
    fig.addEventListener("click", function (e) { if (e.target !== inp) activate(); });
    fig.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); } });
    inp.addEventListener("change", function () {
      var f = inp.files && inp.files[0];
      if (f) show(URL.createObjectURL(f));
    });
    frameEl.appendChild(img); frameEl.appendChild(ph);
    fig.appendChild(frameEl); fig.appendChild(cap); fig.appendChild(inp);
    grid.appendChild(fig);
  });

  // ---------- Altitude ladder ----------
  var MAXM = Math.max.apply(null, C.peaks.map(function (p) { return p[1]; }));
  var listEl = $("#ladder-list"), peakBtns = [];
  function lerp(a, b, t) { return a + (b - a) * t; }
  function drawPeak(m) {
    var base = 230, h = 30 + (m / MAXM) * 180, py = base - h;
    var mtn = "M10 " + base + " L85 " + (base - h * .42) + " L128 " + (base - h * .3) + " L170 " + py +
      " L228 " + (base - h * .38) + " L290 " + base + " Z";
    var f = .42;
    var lx = lerp(170, 128, f), ly = lerp(py, base - h * .3, f);
    var rx = lerp(170, 228, f), ry = lerp(py, base - h * .38, f);
    var snow = "M170 " + py + " L" + lx + " " + ly + " L" + lerp(lx, 170, .35) + " " + (ly + 8) + " L" + (170 + 4) + " " + (ly - 2) +
      " L" + lerp(rx, 170, .3) + " " + (ry + 9) + " L" + rx + " " + ry + " Z";
    $("#svg-mtn").setAttribute("d", mtn);
    $("#svg-snow").setAttribute("d", snow);
  }
  function selectPeak(i) {
    var p = C.peaks[i];
    peakBtns.forEach(function (b, k) { b.classList.toggle("active", k === i); b.setAttribute("aria-selected", String(k === i)); });
    $("#peak-name").textContent = p[0];
    $("#peak-m").textContent = p[1].toLocaleString();
    $("#peak-meta").textContent = p[2] + " \u00B7 " + p[3];
    $("#peak-note").textContent = p[4];
    drawPeak(p[1]);
  }
  C.peaks.forEach(function (p, i) {
    var b = el("button", "peak-btn"); b.type = "button"; b.setAttribute("role", "option");
    b.style.setProperty("--w", (p[1] / MAXM * 100).toFixed(1) + "%");
    b.appendChild(el("span", "", p[0]));
    b.appendChild(el("span", "m", p[1].toLocaleString() + " m"));
    b.addEventListener("click", function () { selectPeak(i); });
    listEl.appendChild(b); peakBtns.push(b);
  });
  selectPeak(1);

  // ---------- Flip cards ----------
  var cardsEl = $("#tip-cards");
  C.tips.forEach(function (t) {
    var b = el("button", "flip"); b.type = "button"; b.setAttribute("aria-pressed", "false");
    var inner = el("div", "flip-in");
    var fr = el("div", "face front");
    fr.appendChild(el("h3", "", t[0])); fr.appendChild(el("p", "", t[1])); fr.appendChild(el("small", "", "Tap to flip"));
    var bk = el("div", "face back", t[2]);
    inner.appendChild(fr); inner.appendChild(bk); b.appendChild(inner);
    b.addEventListener("click", function () {
      var on = b.classList.toggle("on"); b.setAttribute("aria-pressed", String(on));
    });
    cardsEl.appendChild(b);
  });

  // ---------- Quiz ----------
  var ROUND = Math.min(10, C.quiz.length), SECS = 20;
  var quizEl = $("#quiz"), deck, qi, score, streak, bestStreak, timerId;

  function startQuiz() {
    deck = shuffle(C.quiz).slice(0, ROUND);
    qi = 0; score = 0; streak = 0; bestStreak = 0;
    renderQ();
  }
  function renderIntro() {
    quizEl.innerHTML = "";
    var box = el("div", "result");
    box.appendChild(el("div", "big", "\u26F0"));
    box.appendChild(el("h3", "", "Ready for the climb?"));
    box.appendChild(el("p", "", ROUND + " questions \u00B7 " + SECS + " seconds each \u00B7 questions and answers are shuffled every round."));
    var b = el("button", "btn primary", "Start the quiz"); b.type = "button";
    b.addEventListener("click", startQuiz);
    box.appendChild(b); quizEl.appendChild(box);
  }
  function renderQ() {
    clearTimeout(timerId);
    if (qi >= deck.length) return renderResult();
    var q = deck[qi];
    var opts = shuffle(q.a.map(function (t, i) { return { t: t, ok: i === 0 }; }));
    quizEl.innerHTML = "";

    var top = el("div", "q-top");
    top.appendChild(el("span", "", "Question " + (qi + 1) + " / " + deck.length));
    top.appendChild(el("span", "q-lvl", q.lvl));
    top.appendChild(el("span", "streak", streak > 1 ? "Streak x" + streak : "Score " + score));
    var bar = el("div", "q-bar"), bi = el("i"); bar.appendChild(bi);
    bi.style.width = (qi / deck.length * 100) + "%";
    var tm = el("div", "q-timer"), ti2 = el("i"); tm.appendChild(ti2);
    var txt = el("p", "q-text", q.q);
    var wrap = el("div", "q-opts");
    var fact = el("p", "q-fact"); fact.setAttribute("aria-live", "polite");
    fact.textContent = "Pick an answer before the timer runs out.";
    var next = el("button", "btn primary q-next", qi + 1 === deck.length ? "See my result" : "Next question");
    next.type = "button"; next.hidden = true;
    next.addEventListener("click", function () { qi++; renderQ(); });

    var btns = [];
    function answer(choice, auto) {
      clearTimeout(timerId);
      ti2.style.transition = "none";
      btns.forEach(function (b, k) {
        b.disabled = true;
        if (opts[k].ok) b.classList.add("right");
        else if (k === choice) b.classList.add("wrong");
      });
      var ok = choice >= 0 && opts[choice].ok;
      if (ok) {
        score++; streak++; bestStreak = Math.max(bestStreak, streak);
        var r = btns[choice].getBoundingClientRect();
        confetti(r.left + r.width / 2, r.top + r.height / 2, 30);
      } else streak = 0;
      fact.textContent = (ok ? "Correct! " : auto ? "Time's up. " : "Not quite. ") + q.fact;
      next.hidden = false; next.focus({ preventScroll: true });
    }
    opts.forEach(function (o, k) {
      var b = el("button", "", o.t); b.type = "button";
      b.addEventListener("click", function () { answer(k, false); });
      wrap.appendChild(b); btns.push(b);
    });

    [top, bar, tm, txt, wrap, fact, next].forEach(function (n) { quizEl.appendChild(n); });
    if (!reduceMotion) {
      void ti2.offsetWidth;
      ti2.style.transition = "transform " + SECS + "s linear";
      ti2.style.transform = "scaleX(0)";
    }
    timerId = setTimeout(function () { answer(-1, true); }, SECS * 1000);
  }
  function renderResult() {
    clearTimeout(timerId);
    var pct = score / deck.length;
    var title, msg;
    if (pct >= .9) { title = "Summit Sage"; msg = "You know these mountains like a local guide. Tenzing would be proud."; }
    else if (pct >= .7) { title = "Ridge Runner"; msg = "Strong effort. Only a few passes between you and the summit."; }
    else if (pct >= .4) { title = "Base Camp Explorer"; msg = "A solid start. Brew some chai, check the map and try again."; }
    else { title = "Valley Wanderer"; msg = "Every great trek begins in the valley. Read the facts and climb again."; }

    quizEl.innerHTML = "";
    var box = el("div", "result");
    box.appendChild(el("div", "big", score + " / " + deck.length));
    box.appendChild(el("h3", "", title));
    box.appendChild(el("p", "", msg + " Best streak: " + bestStreak + "."));
    var row = el("div", "row");
    var again = el("button", "btn primary", "Play again (new questions)"); again.type = "button";
    again.addEventListener("click", startQuiz);
    var share = el("button", "btn glass", "Copy my score"); share.type = "button";
    share.addEventListener("click", function () {
      var t = "I scored " + score + "/" + deck.length + " (" + title + ") on the Himalaya ranges quiz!";
      copyText(t, function () { share.textContent = "Copied!"; setTimeout(function () { share.textContent = "Copy my score"; }, 1500); });
    });
    row.appendChild(again); row.appendChild(share); box.appendChild(row);
    quizEl.appendChild(box);
    try {
      var best = +localStorage.getItem("himalaya-best") || 0;
      if (score > best) localStorage.setItem("himalaya-best", String(score));
      else if (best) box.insertBefore(el("p", "muted", "Your best so far: " + best + " / " + deck.length), row);
    } catch (e) { /* private mode */ }
    if (pct >= .7) { confetti(window.innerWidth / 2, window.innerHeight / 2, 120); confettiRain(60); }
  }
  renderIntro();

  // ---------- Notes (localStorage) ----------
  var KEY = "himalaya-notes-v1", noteList = $("#note-list");
  function loadNotes() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function addNote(n, animate) {
    var d = el("div", "note");
    d.style.setProperty("--r", (Math.random() * 4 - 2).toFixed(1) + "deg");
    if (!animate) d.style.animation = "none";
    d.appendChild(el("p", "", n[1])); d.appendChild(el("b", "", "\u2014 " + n[0]));
    noteList.insertBefore(d, noteList.firstChild);
  }
  C.notesSeed.slice().reverse().forEach(function (n) { addNote(n, false); });
  loadNotes().forEach(function (n) { addNote(n, false); });
  $("#note-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var n = [$("#note-from").value.trim(), $("#note-text").value.trim()];
    if (!n[0] || !n[1]) return;
    var all = loadNotes(); all.push(n);
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch (err) { /* private mode */ }
    addNote(n, true); this.reset();
    var r = this.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top, 40);
  });

  // ---------- Customise panel ----------
  var panel = $("#cfg-panel"), tog = $("#cfg-toggle"), cs = $("#cfg-status");
  function readCfg() {
    return sanitise({ name: $("#cfg-name").value, age: $("#cfg-age").value, date: $("#cfg-date").value });
  }
  tog.addEventListener("click", function () {
    var open = panel.hidden;
    panel.hidden = !open; tog.setAttribute("aria-expanded", String(open));
    if (open) {
      $("#cfg-name").value = C.name; $("#cfg-age").value = C.age; $("#cfg-date").value = C.birthday;
      cs.textContent = ""; $("#cfg-name").focus();
    }
  });
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) { panel.hidden = true; tog.setAttribute("aria-expanded", "false"); tog.focus(); }
  });
  $("#cfg-apply").addEventListener("click", function () {
    var p = readCfg();
    if (!p.name) { cs.textContent = "Please enter a name."; return; }
    Object.assign(C, p);
    try { localStorage.setItem(PKEY, JSON.stringify(p)); } catch (e) { /* private mode */ }
    personalise();
    cs.textContent = "Done! Name updated everywhere.";
    confetti(window.innerWidth / 2, window.innerHeight / 2, 120);
  });
  $("#cfg-copy").addEventListener("click", function () {
    var p = readCfg();
    if (!p.name) { cs.textContent = "Please enter a name."; return; }
    var u = new URL(window.location.href);
    u.search = ""; u.hash = "";
    u.searchParams.set("name", p.name);
    if (p.age) u.searchParams.set("age", p.age);
    if (p.birthday) u.searchParams.set("date", p.birthday);
    copyText(u.toString(), function () { cs.textContent = "Share link copied! Send it to her friends."; });
  });

  personalise();

  // ---------- Scroll reveal ----------
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add("visible");
      if (en.target.id === "about") countUp();
      io.unobserve(en.target);
    });
  }, { threshold: .12 });
  $$(".reveal").forEach(function (p) { io.observe(p); });

  // Welcome burst
  if (!reduceMotion) setTimeout(function () { confetti(window.innerWidth / 2, window.innerHeight * .35, 90); lanterns(6); }, 700);
})();
