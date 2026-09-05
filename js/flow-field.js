/* Particle flow field for the page/post header band.
 *
 * Adapted from the standalone sandbox with three changes that matter for a
 * site background rather than a demo:
 *
 *   1. Trails are drawn as batched polylines — one stroke per alpha band for
 *      the whole swarm, instead of one stroke per segment per particle. Cost
 *      is ~14 draw calls a frame regardless of particle count.
 *   2. The field is confined to the header and stops animating once the
 *      header scrolls out of view.
 *   3. Small screens and reduced-motion get a single rendered frame — same
 *      image, no ongoing cost.
 *
 * Retune by editing PARAMS below; the names match the sandbox sliders.
 */
(() => {
  "use strict";

  const canvas = document.querySelector(".flow-field");
  if (!canvas) {
    return;
  }

  const PARAMS = {
    // Particles
    density: 0.00077,   // particles per px² of header area
    minParticles: 120,
    maxParticles: 620,
    trailLength: 92,
    speed: 0.5,
    opacity: 0.18,
    tailFade: 2.05,
    accent: 0.03,

    // Flow field
    scale: 0.006,
    evolution: 0.5,
    flowSpread: 25,
    flowVariation: 0.1,
    lifetime: 1000,

    // Mouse
    mouseMode: "repel",
    mouseForce: 0.95,
    mouseRadius: 150
  };

  // Ground colour is painted by the canvas itself. It matches the page
  // background so the band has no visible seam; switch to a warm tint
  // (e.g. "#F6F4EF") if you want the header to read as its own surface.
  const GROUND = "#FFFFFF";
  const CHARCOAL = [41, 41, 41];
  const ACCENT = [239, 45, 86];

  // Number of alpha bands a trail is split into. Higher is a smoother
  // taper and more draw calls; 6 is indistinguishable from per-segment.
  const BANDS = 6;

  const ctx = canvas.getContext("2d", { alpha: false });

  let width = 0;
  let height = 0;
  let particles = [];
  let time = 0;
  let seed = Math.random() * 1000;
  let frameHandle = null;

  const pointer = { x: 0, y: 0, active: false };

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Phones and tablets get a static frame: a live canvas behind a scrolling
  // article is the single worst case for battery and scroll smoothness.
  const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
  const isStatic = prefersReducedMotion || isSmallScreen;

  /* ---------------------------------------------------------------- */
  /* Particles                                                         */
  /* ---------------------------------------------------------------- */

  class Particle {
    constructor(randomAge) {
      this.trailX = new Float32Array(PARAMS.trailLength);
      this.trailY = new Float32Array(PARAMS.trailLength);
      this.reset(randomAge);
    }

    reset(randomAge) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.age = randomAge ? Math.random() * PARAMS.lifetime : 0;
      this.maxAge = PARAMS.lifetime * (0.65 + Math.random() * 0.7);
      this.accent = Math.random() < PARAMS.accent;

      // Sample the field from a slightly offset point so neighbouring
      // particles don't collapse onto identical paths.
      const spreadAngle = Math.random() * Math.PI * 2;
      const spreadDistance = Math.sqrt(Math.random()) * PARAMS.flowSpread;
      this.offsetX = Math.cos(spreadAngle) * spreadDistance;
      this.offsetY = Math.sin(spreadAngle) * spreadDistance;

      this.angleBias = (Math.random() - 0.5) * 2 * PARAMS.flowVariation;

      // Ring buffer: `head` is the next write slot, `count` how much is live.
      this.head = 0;
      this.count = 0;
      this.push(this.x, this.y);
    }

    push(x, y) {
      this.trailX[this.head] = x;
      this.trailY[this.head] = y;
      this.head = (this.head + 1) % PARAMS.trailLength;
      if (this.count < PARAMS.trailLength) {
        this.count++;
      }
    }

    // Oldest-to-newest index into the ring buffer.
    at(i) {
      return (this.head - this.count + i + PARAMS.trailLength) % PARAMS.trailLength;
    }
  }

  function buildParticles() {
    const target = Math.round(width * height * PARAMS.density);
    const count = Math.max(
      PARAMS.minParticles,
      Math.min(PARAMS.maxParticles, target)
    );

    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(true));
    }
  }

  /* ---------------------------------------------------------------- */
  /* Field                                                             */
  /* ---------------------------------------------------------------- */

  function fieldAngle(x, y, t) {
    const nx = x * PARAMS.scale;
    const ny = y * PARAMS.scale;
    const temporal = t * PARAMS.evolution;

    const a = Math.sin(ny * 1.4 + temporal * 0.55 + seed);
    const b = Math.cos(nx * 1.15 - temporal * 0.38 + seed * 0.7);
    const c = Math.sin((nx + ny) * 0.72 + temporal * 0.22);
    const d = Math.cos(
      Math.sqrt((nx - 1.5) ** 2 + (ny - 1.0) ** 2) * 2.2 - temporal * 0.18
    );

    return (a * 1.15 + b * 1.05 + c * 0.7 + d * 0.35) * Math.PI;
  }

  function applyPointer(p, vx, vy) {
    if (!pointer.active || PARAMS.mouseMode === "none" || PARAMS.mouseForce <= 0) {
      return [vx, vy];
    }

    const dx = pointer.x - p.x;
    const dy = pointer.y - p.y;
    const distanceSq = dx * dx + dy * dy;
    const radius = PARAMS.mouseRadius;

    if (distanceSq <= 0.0001 || distanceSq >= radius * radius) {
      return [vx, vy];
    }

    const distance = Math.sqrt(distanceSq);
    const falloff = 1 - distance / radius;
    const influence = falloff * falloff * PARAMS.mouseForce;
    const ux = dx / distance;
    const uy = dy / distance;

    if (PARAMS.mouseMode === "attract") {
      return [vx + ux * influence, vy + uy * influence];
    }
    if (PARAMS.mouseMode === "repel") {
      return [vx - ux * influence, vy - uy * influence];
    }
    return [vx - uy * influence, vy + ux * influence]; // swirl
  }

  function updateParticle(p) {
    const angle =
      fieldAngle(p.x + p.offsetX, p.y + p.offsetY, time) + p.angleBias;

    let vx = Math.cos(angle);
    let vy = Math.sin(angle);
    [vx, vy] = applyPointer(p, vx, vy);

    const magnitude = Math.hypot(vx, vy) || 1;
    const velocity = PARAMS.speed * 1.55;

    p.x += (vx / magnitude) * velocity;
    p.y += (vy / magnitude) * velocity;
    p.age++;
    p.push(p.x, p.y);

    const margin = 40;
    if (
      p.x < -margin ||
      p.x > width + margin ||
      p.y < -margin ||
      p.y > height + margin ||
      p.age > p.maxAge
    ) {
      p.reset(false);
    }
  }

  /* ---------------------------------------------------------------- */
  /* Drawing                                                           */
  /* ---------------------------------------------------------------- */

  function rgba(rgb, alpha) {
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
  }

  // One stroke per alpha band per colour, with every particle's slice of
  // that band batched into a single path.
  function drawBand(band, useAccent) {
    const from = Math.floor((band / BANDS) * PARAMS.trailLength);
    const to = Math.floor(((band + 1) / BANDS) * PARAMS.trailLength);
    const progress = (band + 0.5) / BANDS;
    const fade = Math.pow(progress, PARAMS.tailFade);

    const base = useAccent
      ? Math.min(PARAMS.opacity * 1.65, 1)
      : PARAMS.opacity;

    ctx.beginPath();
    let drew = false;

    for (const p of particles) {
      if (p.accent !== useAccent || p.count < 2) {
        continue;
      }

      // Start one sample early so consecutive bands join up. A particle
      // younger than this band simply has nothing to contribute yet.
      const start = Math.max(0, from - 1);
      const end = Math.min(to, p.count);
      if (start >= p.count - 1 || end - start < 2) {
        continue;
      }

      for (let i = start; i < end; i++) {
        const index = p.at(i);
        if (i === start) {
          ctx.moveTo(p.trailX[index], p.trailY[index]);
        } else {
          ctx.lineTo(p.trailX[index], p.trailY[index]);
        }
      }
      drew = true;
    }

    if (!drew) {
      return;
    }

    ctx.lineWidth = useAccent ? 0.85 : 0.55;
    ctx.strokeStyle = rgba(useAccent ? ACCENT : CHARCOAL, base * fade);
    ctx.stroke();
  }

  function drawHeads(useAccent) {
    ctx.beginPath();
    let drew = false;

    for (const p of particles) {
      if (p.accent !== useAccent) {
        continue;
      }
      ctx.moveTo(p.x + (useAccent ? 1.05 : 0.7), p.y);
      ctx.arc(p.x, p.y, useAccent ? 1.05 : 0.7, 0, Math.PI * 2);
      drew = true;
    }

    if (!drew) {
      return;
    }

    ctx.fillStyle = rgba(
      useAccent ? ACCENT : CHARCOAL,
      useAccent
        ? Math.min(PARAMS.opacity * 2.1, 0.9)
        : Math.min(PARAMS.opacity * 1.45, 0.55)
    );
    ctx.fill();
  }

  function render() {
    ctx.fillStyle = GROUND;
    ctx.fillRect(0, 0, width, height);

    for (let band = 0; band < BANDS; band++) {
      drawBand(band, false);
      drawBand(band, true);
    }

    drawHeads(false);
    drawHeads(true);
  }

  function step() {
    for (const p of particles) {
      updateParticle(p);
    }
    time += 0.003;
  }

  /* ---------------------------------------------------------------- */
  /* Loop                                                              */
  /* ---------------------------------------------------------------- */

  function animate() {
    step();
    render();
    frameHandle = window.requestAnimationFrame(animate);
  }

  function start() {
    if (frameHandle === null && !isStatic) {
      frameHandle = window.requestAnimationFrame(animate);
    }
  }

  function stop() {
    if (frameHandle !== null) {
      window.cancelAnimationFrame(frameHandle);
      frameHandle = null;
    }
  }

  // Settle the field into a developed state, then draw it once.
  function renderStaticFrame() {
    for (let i = 0; i < 130; i++) {
      step();
    }
    render();
  }

  /* ---------------------------------------------------------------- */
  /* Sizing                                                            */
  /* ---------------------------------------------------------------- */

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = Math.round(rect.width);
    height = Math.round(rect.height);

    if (width < 1 || height < 1) {
      return false;
    }

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    buildParticles();
    return true;
  }

  let resizeTimer = null;
  let lastWidth = 0;

  window.addEventListener("resize", () => {
    // Mobile browsers fire resize whenever the address bar slides, which
    // would otherwise reset the field mid-scroll. Width is the real signal.
    if (Math.abs(window.innerWidth - lastWidth) < 2) {
      return;
    }
    lastWidth = window.innerWidth;

    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      stop();
      if (resize()) {
        if (isStatic) {
          renderStaticFrame();
        } else {
          start();
        }
      }
    }, 200);
  });

  /* ---------------------------------------------------------------- */
  /* Pointer                                                           */
  /* ---------------------------------------------------------------- */

  if (!isStatic) {
    window.addEventListener("pointermove", (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    });

    document.addEventListener("mouseleave", () => {
      pointer.active = false;
    });

    window.addEventListener("blur", () => {
      pointer.active = false;
    });
  }

  /* ---------------------------------------------------------------- */
  /* Start                                                             */
  /* ---------------------------------------------------------------- */

  lastWidth = window.innerWidth;

  if (!resize()) {
    return;
  }

  if (isStatic) {
    renderStaticFrame();
  } else if ("IntersectionObserver" in window) {
    // Nothing to animate once the reader has scrolled past the header.
    new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          start();
        } else {
          stop();
        }
      },
      { rootMargin: "80px" }
    ).observe(canvas);
  } else {
    start();
  }
})();
