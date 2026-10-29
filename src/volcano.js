/* ---------------------------------------------------------------------------- */
/*                              VOLCANO ERUPTION                                */
/* ---------------------------------------------------------------------------- */

const initVolcano = () => {
  const btn = document.querySelector('.volcano-btn');
  const island = document.querySelector('.screen__landscape');
  const lava = document.querySelector('.lava-container');
  const volcanoLava = document.querySelector('.volcano-lava');
  const smoke = document.querySelector('.smoke-lottie');
  const cloudsBack = document.querySelector('.sky-volcano-cloud-svg.is--back');
  const cloudsFront = document.querySelector('.sky-volcano-cloud-svg.is--front');

  if (!btn || !island || !lava || !smoke || !cloudsBack || !cloudsFront) return;

  let isPressed = false;
  const maxX = 6;
  const maxY = 4;
  const maxRot = 0.8;

  gsap.set([cloudsBack, cloudsFront], { yPercent: -100 });

  const volcanoTL = gsap.timeline({
    paused: true,
    defaults: { duration: 0.4, ease: "power2.inOut" }
  });

  volcanoTL
    .to(island, { scale: 1.1 }, 0)
    .to(lava, { opacity: 1 }, 0)
    .to(volcanoLava, { opacity: 1 }, 0)
    .to(smoke, { opacity: 0 }, 0)
    .to(cloudsBack, { yPercent: 0 }, 0)
    .to(cloudsFront, { yPercent: 0 }, 0.1);

  let shakeTween;

  const startEruption = () => {
    if (isPressed) return;
    isPressed = true;

    volcanoTL.timeScale(1).play();

    gsap.killTweensOf(island, "x,y,rotationZ");

    shakeTween = gsap.fromTo(island, { x: -maxX, y: -maxY, rotationZ: -maxRot },
    {
      x: maxX,
      y: maxY,
      rotationZ: maxRot,
      duration: 0.04,
      repeat: -1,
      yoyo: true,
      ease: "none"
    });
  };

  const stopEruption = () => {
    if (!isPressed) return;
    isPressed = false;

    btn.classList.remove('space-bar-pressed');

    volcanoTL.timeScale(1.5).reverse();

    if (shakeTween) shakeTween.kill();

    gsap.fromTo(island, { x: maxX, y: maxY, rotationZ: maxRot },
    {
      x: 0,
      y: 0,
      rotationZ: 0,
      duration: 2.5,
      ease: "elastic.out(1.5, 0.08)",
      overwrite: "auto"
    });
  };

  // --- EVENTS ---

  btn.addEventListener('pointerdown', startEruption);
  window.addEventListener('pointerup', stopEruption);

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      if (document.activeElement !== btn) e.preventDefault();
      btn.classList.add('space-bar-pressed');
      startEruption();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
      btn.classList.remove('space-bar-pressed');
      stopEruption();
    }
  });
};

initVolcano();
