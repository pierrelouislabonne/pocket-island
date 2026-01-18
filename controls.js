/**
 * CONTROLS HANDLER
 * Centralise tous les contrôleurs physiques (Pitches & Toggle)
 */

const Controls = {
  // Configuration des sélecteurs
  speed: {
    fader: '[pitch-fader="speed"]',
    trigger: '[pitch-draggable="speed"]',
    min: -120,
    max: 120,
    default: 0
  },
  dayNight: {
    fader: '[pitch-fader="day-night"]',
    trigger: '[pitch-draggable="day-night"]',
    toggle: '.toggl',
    min: 0,
    max: 120,
    default: 0
  },

  init() {
    this.initSpeedPitch();
    this.initDayNightPitch();
    this.initResponsive();
  },

  // --- LOGIQUE PITCH VITESSE ---
  initSpeedPitch() {
    const el = document.querySelector(this.speed.fader);
    if (!el) return;

    Draggable.create(el, {
      type: "rotation",
      trigger: this.speed.trigger,
      bounds: { minRotation: this.speed.min, maxRotation: this.speed.max },
      inertia: true,
      liveSnap: true,
      snap: gsap.utils.snap(30),
      onDrag: () => this.updateSpeed(el),
      onThrowUpdate: () => this.updateSpeed(el),
    });
  },

  updateSpeed(el) {
    const angle = gsap.getProperty(el, "rotation");
    let multiplier = angle <= 0 ?
      gsap.utils.mapRange(-120, 0, 0.1, 1, angle) :
      gsap.utils.mapRange(0, 120, 1, 4, angle);

    // On met à jour la config dans l'autre fichier via une variable globale
    if (window.SceneConfig) window.SceneConfig.baseSpeed = 30 * multiplier;
  },

  // --- LOGIQUE PITCH JOUR/NUIT + TOGGLE ---
  initDayNightPitch() {
    const fader = document.querySelector(this.dayNight.fader);
    const toggle = document.querySelector(this.dayNight.toggle);
    if (!fader) return;

    const dnDraggable = Draggable.create(fader, {
      type: "rotation",
      trigger: this.dayNight.trigger,
      bounds: { minRotation: 0, maxRotation: 120 },
      inertia: true,
      onDrag: () => this.syncDayNight(fader),
      onThrowUpdate: () => this.syncDayNight(fader),
    })[0];

    toggle?.addEventListener("click", () => {
      const isNight = gsap.getProperty(fader, "rotation") > 60;
      gsap.to(fader, {
        rotation: isNight ? 0 : 120,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: () => this.syncDayNight(fader)
      });
    });
  },

  syncDayNight(fader) {
    const rot = gsap.getProperty(fader, "rotation");
    const cssVal = (rot / 120) * 180;
    document.documentElement.style.setProperty("--day-night-rotation", `${cssVal}deg`);

    // Animation du dot du toggle
    const toggle = document.querySelector(this.dayNight.toggle);
    if (toggle) {
      gsap.to(toggle, {
        justifyContent: rot > 60 ? "flex-end" : "flex-start",
        duration: 0.2,
        overwrite: "auto"
      });
    }
  },

  // --- RESPONSIVE 991px ---
  initResponsive() {
    ScrollTrigger.matchMedia({
      "(max-width: 991px)": () => {
        // Reset à 0 lors du passage sous 991px
        this.resetPitches();
      }
    });
  },

  resetPitches() {
    const speedF = document.querySelector(this.speed.fader);
    const dnF = document.querySelector(this.dayNight.fader);
    if (speedF) gsap.to(speedF, { rotation: 0, onUpdate: () => this.updateSpeed(speedF) });
    if (dnF) gsap.to(dnF, { rotation: 0, onUpdate: () => this.syncDayNight(dnF) });
  }
};

// Lancement
Controls.init();
