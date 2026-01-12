// --- 1. SÉLECTEURS ET CONFIGURATION ---
const canvas = document.querySelector('.canvas');
const canvasProxy = document.createElement('div');

const needle = document.querySelector('[pitch-fader="speed"]');
const speedTrigger = document.querySelector('[pitch-draggable="speed"]');

const config = {
  rotation: 0,
  baseSpeed: 30,
  defaultSpeed: 30,
  currentSpeedFactor: 1,
  sensitivity: -0.1,
  maxDelta: 40, // Maximum de pixels pris en compte par frame (bride le drag rapide)
};

const looper = gsap.utils.wrap(0, 360);

// --- 2. LE PITCH (CONTRÔLEUR DE VITESSE) ---
const stepAngle = 30;
const snapSpeed = gsap.utils.snap(stepAngle);

Draggable.create(needle, {
  type: "rotation",
  trigger: speedTrigger,
  inertia: true,
  bounds: { minRotation: -120, maxRotation: 120 },
  liveSnap: true,
  snap: snapSpeed,
  cursor: false,
  onDrag: updateSpeedFromPitch,
  onThrowUpdate: updateSpeedFromPitch,
  onThrowComplete: updateSpeedFromPitch
});

function updateSpeedFromPitch() {
  const angle = gsap.getProperty(needle, "rotation");
  let multiplier;
  if (angle <= 0) {
    multiplier = gsap.utils.mapRange(-120, 0, 0.1, 1, angle);
  } else {
    multiplier = gsap.utils.mapRange(0, 120, 1, 4, angle);
  }
  config.baseSpeed = config.defaultSpeed * multiplier;
}

gsap.set(needle, { rotation: 0 });
updateSpeedFromPitch();

// --- 3. LE CANVAS (DRAG & LIMITATEUR) ---

const canvasDrag = Draggable.create(canvasProxy, {
  trigger: canvas,
  type: "x",
  inertia: true,
  cursor: false,
  throwProps: true,
  maxDuration: 1.5, // Le lancer ne durera pas plus de 1.5s
  minDuration: 0.2,
  onPress() {
    gsap.to(config, {
      currentSpeedFactor: 0,
      duration: 0,
      overwrite: true
    });
  },
  onDrag() {
    applyManualMove(this.deltaX);
  },
  onThrowUpdate() {
    applyManualMove(this.deltaX);
  },
  onRelease() {
    gsap.to(config, {
      currentSpeedFactor: 1,
      duration: 0.8,
      ease: "power2.inOut",
      overwrite: true
    });
  }
})[0];

function applyManualMove(deltaX) {
  // On bride le deltaX entre -maxDelta et +maxDelta
  const clampedDelta = gsap.utils.clamp(-config.maxDelta, config.maxDelta, deltaX);

  config.rotation = looper(config.rotation + (clampedDelta * config.sensitivity));
  render();
}

// --- 4. BOUCLE D'ANIMATION (TICKER) ---

gsap.ticker.add((time, deltaTime) => {
  const motorDelta = (config.baseSpeed * config.currentSpeedFactor) * (deltaTime / 1000);

  if (motorDelta !== 0) {
    config.rotation = looper(config.rotation + motorDelta);
    render();
  }

  if (!canvasDrag.isDragging && !canvasDrag.isThrowing) {
    gsap.set(canvasProxy, { x: config.rotation / config.sensitivity });
  }
});

function render() {
  // On calcule le ratio 0-100
  const progress = (config.rotation / 360) * 100;

  // On injecte les deux valeurs
  canvas.style.setProperty('--canvas-rotation', `${config.rotation}deg`);
  canvas.style.setProperty('--linear-move', `${progress}%`);
}
