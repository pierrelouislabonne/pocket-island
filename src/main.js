/**
 * ██████╗  ██████╗  ██████╗██╗  ██╗███████╗████████╗
 * ██╔══██╗██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
 * ██████╔╝██║   ██║██║     █████╔╝ █████╗     ██║   
 * ██╔═══╝ ██║   ██║██║     ██╔═██╗ ██╔══╝     ██║   
 * ██║     ╚██████╔╝╚██████╗██║  ██╗███████╗   ██║   
 * ╚═╝      ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝   
 *
 * ██╗███████╗██╗      █████╗ ███╗   ██╗██████╗      
 * ██║██╔════╝██║     ██╔══██╗████╗  ██║██╔══██╗     
 * ██║███████╗██║     ███████║██╔██╗ ██║██║  ██║     
 * ██║╚════██║██║     ██╔══██║██║╚██╗██║██║  ██║     
 * ██║███████║███████╗██║  ██║██║ ╚████║██████╔╝     
 * ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝      
 */

/* Code for https://pocket-island.webflow.io/ */
/* Designed by Pierre-Louis Design https://pierrelouis.design */

/* ---------------------------------------------------------------------------- */
/*                                    INIT                                      */
/* ---------------------------------------------------------------------------- */

// --- IMPORTS ---

import './custom-cursor.js'; // CUSTOM CURSOR
import './controls.js'; // CONTROLS (PITCHS)
import './island-cycle.js'; // ISLAND CYCLE
import './sky-cycle.js'; // SKY CYCLE
import './volcano.js'; // VOLCANO
import './breakpoint-watcher.js'; // BREAKPOINT WATCHER
import './footer-date.js'; // FOOTER DATE

// --- CLEANUP ---

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    gsap.ticker.sleep();
  } else {
    gsap.ticker.wake();
  }
});
