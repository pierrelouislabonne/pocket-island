/* ---------------------------------------------------------------------------- */
/*                                SKY CYCLE                                     */
/* ---------------------------------------------------------------------------- */

const initDayNightRender = () => {
  const root = document.documentElement;

  gsap.ticker.add(() => {
    const progress = window.islandState.dayNightValue;

    // 1. Rotation (0-180deg)
    root.style.setProperty("--sky-rotation", `${progress * 180}deg`);

    // 2. Opacité (0-1)
    root.style.setProperty("--sky-opacity", progress);

  });
};

initDayNightRender();
