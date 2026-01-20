/* ---------------------------------------------------------------------------- */
/*                                 CONTROLS                                     */
/* ---------------------------------------------------------------------------- */

window.islandState = {
  speedValue: 0.5,
  dayNightValue: 0,
  isNight: false
};

const initControls = () => {
  const stepAngle = 30;
  const snapValues = gsap.utils.snap(stepAngle);

  const rotationToProgress = gsap.utils.mapRange(-120, 120, 0, 1);

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
    onDrag: function () {
      window.islandState.speedValue = rotationToProgress(this.rotation);
    },
  });

  // --- 2. DAY/NIGHT PITCH ---
  const dnFader = document.querySelector('[pitch-fader="day-night"]');
  const dnTrigger = document.querySelector('[pitch-draggable="day-night"]');

  gsap.set(dnFader, { rotation: -120 });

  Draggable.create(dnFader, {
    type: "rotation",
    trigger: dnTrigger,
    bounds: { minRotation: -120, maxRotation: 120 },
    liveSnap: true,
    snap: snapValues,
    cursor: false,
    onDrag: function () {
      const progress = rotationToProgress(this.rotation);
      window.islandState.dayNightValue = progress;
      window.islandState.isNight = progress > 0.5;
      updateToggleVisuals();
    },
  });

  // --- 3. DAY/NIGHT TOGGLE ---
  const toggle = document.querySelector(".screen-ui__c-toggl");

  toggle.addEventListener("click", () => {
    window.islandState.isNight = !window.islandState.isNight;

    const targetVal = window.islandState.isNight ? 1 : 0;
    const targetRot = window.islandState.isNight ? 120 : -120;

    window.islandState.dayNightValue = targetVal;
    gsap.set(dnFader, { rotation: targetRot });

    updateToggleVisuals();
  });

  function updateToggleVisuals() {
    gsap.to(".toggl-dot", {
      xPercent: window.islandState.isNight ? 100 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }
};

initControls();
