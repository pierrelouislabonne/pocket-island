/* ---------------------------------------------------------------------------- */
/*                            CONTROLS (PITCHS)                                 */
/* ---------------------------------------------------------------------------- */

window.islandState = { speedMultiplier: 1, dayNightValue: 0, isNight: false };

const initControls = () => {
  const stepAngle = 30;
  const snapValues = gsap.utils.snap(stepAngle);

  // --- 1. SPEED PITCH ---
  const speedFader = document.querySelector('[pitch-fader="speed"]');
  const speedTrigger = document.querySelector('[pitch-draggable="speed"]');

  Draggable.create(speedFader, {
    type: "rotation",
    trigger: speedTrigger,
    bounds: { minRotation: -120, maxRotation: 120 },
    liveSnap: true,
    snap: snapValues,
    cursor: false,
    onDrag: updateSpeed,
  });

  function updateSpeed() {
    const angle = gsap.getProperty(this.target, "rotation");
    window.islandState.speedMultiplier =
      angle <= 0 ?
      gsap.utils.mapRange(-120, 0, 0.1, 1, angle) :
      gsap.utils.mapRange(0, 120, 1, 4, angle);
  }

  // --- 2. DAY/NIGHT PITCH ---
  const dnFader = document.querySelector('[pitch-fader="day-night"]');
  const dnTrigger = document.querySelector('[pitch-draggable="day-night"]');

  gsap.set(dnFader, { rotation: -120 });

  Draggable.create(dnFader, {
    type: "rotation",
    trigger: dnTrigger,
    inertia: false, // Désactivé ici
    bounds: { minRotation: -120, maxRotation: 120 },
    liveSnap: true,
    snap: snapValues,
    cursor: false,
    onDrag: function () {
      updateDayNight(this.rotation);
    },
  });

  function updateDayNight(rotation) {
    const val = gsap.utils.mapRange(-120, 120, 0, 180, rotation);
    window.islandState.dayNightValue = val;
    window.islandState.isNight = val > 90;
    updateToggleVisuals(false);
  }

  // --- 3. DAY/NIGHT TOGGLE ---
  const toggle = document.querySelector(".toggl");
  toggle.addEventListener("click", () => {
    window.islandState.isNight = !window.islandState.isNight;
    const targetVal = window.islandState.isNight ? 180 : 0;
    const targetRot = window.islandState.isNight ? 120 : -120;
    gsap.to(window.islandState, {
      dayNightValue: targetVal,
      duration: 0.8,
      ease: "power2.inOut",
    });
    gsap.to(dnFader, {
      rotation: targetRot,
      duration: 0.8,
      ease: "power2.inOut",
    });
    updateToggleVisuals();
  });

  function updateToggleVisuals() {
    gsap.to(toggle, {
      justifyContent: window.islandState.isNight ? "flex-end" : "flex-start",
      duration: 0.3,
    });
  }
};

initControls();
