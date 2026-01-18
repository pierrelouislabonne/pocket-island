/* ---------------------------------------------------------------------------- */
/*                           BREAKPOINT WATCHER                                 */
/* ---------------------------------------------------------------------------- */

const mm = window.matchMedia("(max-width: 991px)");

function handleResponsive(e) {
  if (e.matches && window.islandState) {
    window.islandState.speedMultiplier = 1;
    window.islandState.dayNightValue = 0;
    window.islandState.isNight = false;

    gsap.to('[pitch-fader="speed"]', { rotation: 0 });
    gsap.to('[pitch-fader="day-night"]', { rotation: -120 });
    gsap.to(".toggl", { justifyContent: "flex-start" });
  }
}

mm.addEventListener("change", handleResponsive);
handleResponsive(mm);
