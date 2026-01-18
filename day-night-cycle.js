/**
 * RENDU VISUEL JOUR/NUIT
 */
const initDayNightRender = () => {
  const root = document.documentElement;

  gsap.ticker.add(() => {
    root.style.setProperty("--day-night-rotation", `${window.islandState.dayNightValue}deg`);
  });
};

initDayNightRender();
