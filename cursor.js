/**
 * CORE CONFIGURATION
 * Centralized settings to tweak the cursor behavior and feel.
 */
const CURSOR_CONFIG = {
  // Movement-based rotation settings
  tilt: {
    fX: 1, // Horizontal movement intensity factor
    fY: -2, // Vertical movement intensity factor
    max: 75 // Maximum allowed rotation angle (in degrees)
  },
  // GSAP Animation and smoothing settings
  smoothing: {
    pos: 0.1, // Position follow speed (seconds). Lower = snappier.
    rot: 1.5, // Duration of the tilt/rotation animation.
    elastic: 1.1, // "Bounce" strength (GSAP elastic ease parameter).
    delay: 50 // Delay (ms) before the tag resets to 0° rotation when idle.
  },
  // DOM Selectors
  selectors: {
    cursor: ".c-cursor",
    tag: ".cursor-tag",
    canvas: ".canvas"
  }
};

function initCustomCursor(conf) {
  const el = {
    cursor: document.querySelector(conf.selectors.cursor),
    tag: document.querySelector(conf.selectors.tag),
    canvas: document.querySelector(conf.selectors.canvas)
  };

  if (!el.cursor || !el.tag) return;

  // Optimized QuickTo setters for high-performance updates
  const xTo = gsap.quickTo(el.cursor, "x", { duration: conf.smoothing.pos, ease: "power2.out" });
  const yTo = gsap.quickTo(el.cursor, "y", { duration: conf.smoothing.pos, ease: "power2.out" });
  const rotTo = gsap.quickTo(el.tag, "rotation", {
    duration: conf.smoothing.rot,
    ease: `elastic.out(${conf.smoothing.elastic})`
  });

  const icons = {
    pointer: document.querySelector('[cursor-icon="pointer"]'),
    grab: document.querySelector('[cursor-icon="grab"]'),
    grabbing: document.querySelector('[cursor-icon="grabbing"]')
  };

  let currentState = null;
  let lastX = 0,
    lastY = 0,
    timer;

  /**
   * Updates cursor icons and tag visibility
   * Optimization: Only runs if the state has changed.
   */
  const updateUI = (state, showTag) => {
    if (state === currentState) return;
    currentState = state;

    // Fast native style update for icons
    Object.keys(icons).forEach(key => {
      if (icons[key]) icons[key].style.opacity = (key === state) ? 1 : 0;
    });

    // GSAP animation for smooth tag opacity
    gsap.to(el.tag, { opacity: showTag ? 1 : 0, duration: 0.3, overwrite: 'auto' });
  };

  // Mouse Movement Listener
  window.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;

    // Calculate tilt based on distance from last frame and config factors
    const tilt = Math.max(
      -conf.tilt.max,
      Math.min(conf.tilt.max, (x - lastX) * conf.tilt.fX + (y - lastY) * conf.tilt.fY)
    );

    xTo(x);
    yTo(y);
    rotTo(tilt);

    lastX = x;
    lastY = y;

    // Reset rotation when movement stops
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(() => {
      setTimeout(() => rotTo(0), conf.smoothing.delay);
    });
  }, { passive: true });

  // Interaction Events
  el.canvas.addEventListener('mouseenter', () => updateUI('grab', true));
  el.canvas.addEventListener('mouseleave', () => updateUI('pointer', false));
  el.canvas.addEventListener('mousedown', () => updateUI('grabbing', true));

  window.addEventListener('mouseup', () => {
    const isOver = el.canvas.matches(':hover');
    updateUI(isOver ? 'grab' : 'pointer', isOver);
  });
}

initCustomCursor(CURSOR_CONFIG);
