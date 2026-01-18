/* ---------------------------------------------------------------------------- */
/*                                CUSTOM CURSOR                                 */
/* ---------------------------------------------------------------------------- */

const cursorConfig = {
  tilt: { fX: 1, fY: -2, max: 75 },
  smoothing: { pos: 0.1, rot: 1.5, elastic: 1.1, delay: 50 },
  selectors: {
    cursor: ".c-cursor",
    tag: ".cursor-tag",
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

  const xTo = gsap.quickTo(el.cursor, "x", {
    duration: conf.smoothing.pos,
    ease: "power2.out",
  });
  const yTo = gsap.quickTo(el.cursor, "y", {
    duration: conf.smoothing.pos,
    ease: "power2.out",
  });
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
    timer,
    isDown = false;
  const updateUI = (state, showTag) => {
    Object.keys(icons).forEach((key) => {
      if (icons[key]) icons[key].style.opacity = key === state ? 1 : 0;
    });
    gsap.to(el.tag, {
      opacity: showTag ? 1 : 0,
      duration: 0.3,
      overwrite: "auto",
    });
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      const { clientX: x, clientY: y } = e;
      const tilt = Math.max(
        -conf.tilt.max,
        Math.min(
          conf.tilt.max,
          (x - lastX) * conf.tilt.fX + (y - lastY) * conf.tilt.fY
        )
      );
      xTo(x);
      yTo(y);
      rotTo(tilt);
      lastX = x;
      lastY = y;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(() =>
        setTimeout(() => rotTo(0), conf.smoothing.delay)
      );
    }, { passive: true }
  );

  window.addEventListener(
    "pointerdown",
    (e) => {
      if (e.target.closest(conf.selectors.triggers)) {
        isDown = true;
        updateUI("grabbing", true);
      }
    }, { capture: true }
  );

  window.addEventListener("pointerup", () => {
    isDown = false;
    const over = Array.from(el.triggers).some((t) => t.matches(":hover"));
    updateUI(over ? "grab" : "pointer", over);
  });

  el.triggers.forEach((trig) => {
    trig.addEventListener("pointerenter", () => {
      if (!isDown) updateUI("grab", true);
    });
    trig.addEventListener("pointerleave", () => {
      if (!isDown) updateUI("pointer", false);
    });
  });
}
initCustomCursor(cursorConfig);
