/* ---------------------------------------------------------------------------- */
/*                                SCENE ROTATION                                */
/* ---------------------------------------------------------------------------- */

const initSceneRotation = () => {
  const scene = document.querySelector(".screen__landscape");
  const sceneProxy = document.createElement("div");

  let config = {
    rotation: 0,
    baseSpeed: 30,
    currentSpeedFactor: 1,
    sensitivity: -0.1,
    maxDelta: 40,
  };

  const looper = gsap.utils.wrap(0, 360);

  const sceneDrag = Draggable.create(sceneProxy, {
    trigger: scene,
    type: "x",
    inertia: true,
    cursor: false,
    onPress: () => gsap.to(config, { currentSpeedFactor: 0, duration: 0 }),
    onDrag: function () {
      applyManualMove(this.deltaX);
    },
    onThrowUpdate: function () {
      applyManualMove(this.deltaX);
    },
    onRelease: () =>
      gsap.to(config, {
        currentSpeedFactor: 1,
        duration: 0.8,
        ease: "power2.inOut",
      }),
  })[0];

  function applyManualMove(deltaX) {
    const clamped = gsap.utils.clamp(-config.maxDelta, config.maxDelta, deltaX);
    config.rotation = looper(config.rotation + clamped * config.sensitivity);
    render();
  }

  gsap.ticker.add((time, deltaTime) => {
    const motorDelta =
      config.baseSpeed *
      window.islandState.speedMultiplier *
      config.currentSpeedFactor *
      (deltaTime / 1000);
    config.rotation = looper(config.rotation + motorDelta);
    render();

    if (!sceneDrag.isDragging && !sceneDrag.isThrowing) {
      gsap.set(sceneProxy, { x: config.rotation / config.sensitivity });
    }
  });

  function render() {
    const progress = (config.rotation / 360) * 100;
    scene.style.setProperty("--scene-rotation", `${config.rotation}deg`);
    scene.style.setProperty("--linear-move", `${progress}%`);
  }
};

initSceneRotation();
