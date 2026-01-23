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

/// --- IMPORTS ---

slater_import('/project/18238/page/53445.js'); // CUSTOM CURSOR
slater_import('/project/18238/page/53943.js'); // CONTROLS (PITCHS)
slater_import('/project/18238/page/53526.js'); // ISLAND CYCLE
slater_import('/project/18238/page/53944.js'); // SKY CYCLE
slater_import('/project/18238/page/53945.js'); // BREAKPOINT WATCHER
slater_import('/project/18238/page/54044.js'); // FOOTER DATE

// --- CLEANUP ---

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    gsap.ticker.sleep();
  } else {
    gsap.ticker.wake();
  }
});
