/* ---------------------------------------------------------------------------- */
/*                                CUSTOM CURSOR                                 */
/* ---------------------------------------------------------------------------- */

const cursorConfig = {
  tilt: { fX: 1, fY: -2, max: 75 },
  smoothing: { pos: 0.1, rot: 1.5, elastic: 1.1, delay: 50 },
  selectors: {
    cursor: ".c-cursor",
    tag: ".cursor-tag",
    scene: ".screen__landscape",
    triggers: ".screen__landscape, [pitch-draggable]",
  },
};

function initCustomCursor(conf) {
  const el = {
    cursor: document.querySelector(conf.selectors.cursor),
    tag: document.querySelector(conf.selectors.tag),
    triggers: document.querySelectorAll(conf.selectors.triggers),
  };

  if (!el.cursor) return;

  // Initial state: hidden for smooth fade-in
  gsap.set(el.cursor, { opacity: 0 });

  const xTo = gsap.quickTo(el.cursor, "x", { duration: conf.smoothing.pos, ease: "power2.out" });
  const yTo = gsap.quickTo(el.cursor, "y", { duration: conf.smoothing.pos, ease: "power2.out" });
  const rotTo = gsap.quickTo(el.tag, "rotation", {
    duration: conf.smoothing.rot,
    ease: `elastic.out(${conf.smoothing.elastic})`,
  });

  const icons = {
    pointer: document.querySelector('[cursor-icon="pointer"]'),
    grab: document.querySelector('[cursor-icon="grab"]'),
    grabbing: document.querySelector('[cursor-icon="grabbing"]'),
  };

  let lastX = 0,
    lastY = 0,
    timer, timeoutId, isDown = false,
    hasMoved = false;

  const updateUI = (state, isOverScene) => {
    Object.keys(icons).forEach((key) => {
      if (icons[key]) icons[key].style.opacity = key === state ? 1 : 0;
    });

    gsap.to(el.tag, {
      opacity: isOverScene ? 1 : 0,
      duration: 0.3,
      overwrite: "auto",
    });
  };

  // Fade in on first movement
  const revealCursor = () => {
    if (!hasMoved) {
      gsap.to(el.cursor, { opacity: 1, duration: 0.4 });
      hasMoved = true;
    }
  };

  window.addEventListener("pointermove", (e) => {
    revealCursor();
    const { clientX: x, clientY: y } = e;
    const tilt = Math.max(-conf.tilt.max, Math.min(conf.tilt.max, (x - lastX) * conf.tilt.fX + (
      y - lastY) * conf.tilt.fY));

    xTo(x);
    yTo(y);
    rotTo(tilt);

    lastX = x;
    lastY = y;

    cancelAnimationFrame(timer);
    if (timeoutId) clearTimeout(timeoutId);

    timer = requestAnimationFrame(() => {
      timeoutId = setTimeout(() => rotTo(0), conf.smoothing.delay);
    });
  }, { passive: true });

  // Handle window focus/visibility
  document.addEventListener("mouseleave", () => {
    gsap.to(el.cursor, { opacity: 0, duration: 0.3 });
  });

  document.addEventListener("mouseenter", () => {
    if (hasMoved) gsap.to(el.cursor, { opacity: 1, duration: 0.3 });
  });

  window.addEventListener("pointerdown", (e) => {
    const trigger = e.target.closest(conf.selectors.triggers);
    if (trigger) {
      isDown = true;
      updateUI("grabbing", trigger.matches(conf.selectors.scene));
    }
  }, { capture: true });

  window.addEventListener("pointerup", () => {
    isDown = false;
    const overTrigger = Array.from(el.triggers).find((t) => t.matches(":hover"));
    if (overTrigger) {
      updateUI("grab", overTrigger.matches(conf.selectors.scene));
    } else {
      updateUI("pointer", false);
    }
  });

  el.triggers.forEach((trig) => {
    const isScene = trig.matches(conf.selectors.scene);
    trig.addEventListener("pointerenter", () => { if (!isDown) updateUI("grab", isScene); });
    trig.addEventListener("pointerleave", () => { if (!isDown) updateUI("pointer", false); });
  });

  // Check initial hover state on load
  const initialHover = Array.from(el.triggers).find(trig => trig.matches(':hover'));
  if (initialHover) {
    updateUI("grab", initialHover.matches(conf.selectors.scene));
    revealCursor();
  }
}

initCustomCursor(cursorConfig);
