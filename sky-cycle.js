/* ---------------------------------------------------------------------------- */
/*                             SKY CYCLE (DAY/NIGHT)                            */
/* ---------------------------------------------------------------------------- */

const initDayNightRender = () => {
  const root = document.documentElement;
  let lastValue = window.islandState.dayNightValue;
  const getMidpoint = (val) => 1 - Math.abs(val * 2 - 1);

  gsap.ticker.add(() => {
    const currentValue = window.islandState.dayNightValue;

    if (currentValue !== lastValue) {
      gsap.set(root, {
        "--dn-rotation": `${currentValue * 180}deg`,
        "--dn-opacity": currentValue,
        "--dn-progress": currentValue,
        "--dn-midpoint": getMidpoint(currentValue),
        /* Force to repaint clouds even they are outside the viewport */
        "--ios-repaint": (currentValue * 0.01) + "px"
      });
      lastValue = currentValue;
    }
  });
};

initDayNightRender();
