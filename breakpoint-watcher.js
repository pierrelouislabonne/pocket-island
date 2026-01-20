/* ---------------------------------------------------------------------------- */
/*                             BREAKPOINT WATCHER                               */
/* ---------------------------------------------------------------------------- */

const mm = window.matchMedia("(max-width: 991px)");

function handleResponsive(e) {
  if (window.islandState) {

    window.islandState.speedValue = 0.5;
    window.islandState.dayNightValue = 0;
    window.islandState.isNight = false;

    gsap.set('[pitch-fader="speed"]', { rotation: 0 });
    gsap.set('[pitch-fader="day-night"]', { rotation: -120 });
    gsap.set(".toggl-dot", { xPercent: 0 });
  }
}

mm.addEventListener("change", handleResponsive);
handleResponsive(mm);
