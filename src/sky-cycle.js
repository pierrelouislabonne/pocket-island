/* ---------------------------------------------------------------------------- */
/*                             SKY CYCLE (DAY/NIGHT)                            */
/* ---------------------------------------------------------------------------- */

const initDayNightRender = () => {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  let lastValue = window.islandState.dayNightValue;

  // --- 1. CSS :ROOT SCANNER ---
  const getAllWebflowColorSlugs = () => {
    const slugs = new Set();
    for (let sheet of document.styleSheets) {
      try {
        for (let rule of sheet.cssRules) {
          if (rule.selectorText === ":root" || rule.selectorText === "body") {
            const cssText = rule.style.cssText;
            const matches = cssText.matchAll(/--day-colors--([\w-]+):/g);
            for (const match of matches) {
              slugs.add(match[1]);
            }
          }
        }
      } catch (e) {}
    }
    return Array.from(slugs);
  };

  const colorSlugs = getAllWebflowColorSlugs();

  // --- 2. INTERPOLATOR ---
  const interpolators = colorSlugs.map(slug => {
    const dayHex = styles.getPropertyValue(`--day-colors--${slug}`).trim();
    const nightHex = styles.getPropertyValue(`--night-colors--${slug}`).trim();

    return {
      activeVar: `--active-colors--${slug}`,
      lerp: gsap.utils.interpolate(dayHex, nightHex || dayHex)
    };
  });

  const getMidpoint = (val) => 1 - Math.abs(val * 2 - 1);

  // --- 3. RENDER ---
  gsap.ticker.add(() => {
    const currentValue = window.islandState.dayNightValue;
    if (currentValue === lastValue) return;

    const updates = {
      "--dn-rotation": `${currentValue * 180}deg`,
      "--dn-progress": currentValue,
      "--dn-midpoint": getMidpoint(currentValue),
      "--dn-opacity": currentValue
    };

    interpolators.forEach(item => {
      updates[item.activeVar] = item.lerp(currentValue);
    });

    gsap.set(root, updates);
    lastValue = currentValue;
  });
};

initDayNightRender();
