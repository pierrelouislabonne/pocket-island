/* ---------------------------------------------------------------------------- */
/*                               ISLAND CYCLE                                   */
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
    onPress: () => gsap.to(config, { currentSpeedFactor: 0, duration: 0, overwrite: true }),
    onDrag: function () {
      const clamped = gsap.utils.clamp(-config.maxDelta, config.maxDelta, this.deltaX);
      config.rotation = looper(config.rotation + clamped * config.sensitivity);
      render();
    },
    onThrowUpdate: function () {
      const clamped = gsap.utils.clamp(-config.maxDelta, config.maxDelta, this.deltaX);
      config.rotation = looper(config.rotation + clamped * config.sensitivity);
      render();
    },
    onRelease: () =>
      gsap.to(config, {
        currentSpeedFactor: 1,
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: true,
      }),
  })[0];

  gsap.ticker.add((time, deltaTime) => {
    const progress = window.islandState.speedValue;

    // Mapping asymétrique : 0 -> 0.1 | 0.5 -> 1 | 1 -> 4
    const multiplier = progress <= 0.5 ?
      gsap.utils.mapRange(0, 0.5, 0.1, 1, progress) :
      gsap.utils.mapRange(0.5, 1, 1, 4, progress);

    const motorDelta =
      config.baseSpeed *
      multiplier *
      config.currentSpeedFactor *
      (deltaTime / 1000);

    config.rotation = looper(config.rotation + motorDelta);
    render();

    if (!sceneDrag.isDragging && !sceneDrag.isThrowing) {
      gsap.set(sceneProxy, { x: config.rotation / config.sensitivity });
    }
  });

  function render() {
    const coreProgress = config.rotation / 360;
    scene.style.setProperty("--scene-rotation", `${config.rotation}deg`);
    scene.style.setProperty("--scene-move", `${coreProgress * 100}%`);
  }
};

initSceneRotation();
