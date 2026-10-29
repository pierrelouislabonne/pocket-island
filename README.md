# 🏝️ Pocket Island

**Pocket Island** is an experimental Webflow project featuring a dynamic 3D island built entirely with **CSS 3D transforms**. The experience is powered by **GSAP** for high-performance interactions, state management, and smooth animations.

✨ **You can clone this project on Webflow [here](https://webflow.com/made-in-webflow/website/pocket-island).**

---

## 🚀 Key Features

* **Pure CSS 3D Engine**: The island and its components (grid, waves, trees) use `rotateX`, `rotateY`, and `rotateZ` transforms to create depth and perspective without WebGL.
* **Interactive Rotation**: Users can manually spin the island using GSAP `Draggable` with momentum and inertia.
* **Dynamic Speed Control**: A custom speed fader allows users to adjust the rotation velocity, mapping values from 0.1x to 4x.
* **Day/Night Cycle**: A toggle and dedicated fader transition the environment between day and night, updating CSS variables in real-time.
* **Responsive State Management**: A breakpoint watcher automatically resets the island's speed and time of day for mobile viewports to ensure optimal performance.
* **Elastic Custom Cursor**: A physics-based cursor that tilts based on movement and reacts to interactive elements with "grab" and "grabbing" states.

---

## 🛠️ Technical Stack

* **Platform**: Webflow
* **Animation Engine**: GSAP (GreenSock Animation Platform)
    * `gsap.ticker` drives the continuous rotation motor.
    * `Draggable` powers the UI faders and island interaction.
    * `gsap.quickTo()` provides high-performance cursor tracking.
* **Styling**: CSS 3D Transforms and CSS Custom Properties (Variables) for real-time rendering.

---

## 📂 Project Structure

The project logic is modularized into specialized scripts in `src/`, bundled by `src/main.js` (entry point) into a single file:

### Core Logic
* **`island-cycle.js`**: Manages the continuous motor and manual drag logic.
* **`controls.js`**: Initializes the global `window.islandState` and handles UI faders.
* **`sky-cycle.js`**: Specifically handles the celestial rotation values based on the state.

### Utilities
* **`custom-cursor.js`**: Contains the logic for the tilting UI cursor and its interaction states.
* **`breakpoint-watcher.js`**: Monitors screen size to adjust performance and state for mobile devices.

---

## 🚢 Build & Deploy

Scripts are bundled with **esbuild** and hosted on **Netlify** (config in `netlify.toml`). Every push to `main` triggers a deploy.

```bash
npm install
npm run build   # outputs dist/pocket-island.js and dist/style.css
npm run dev     # watch mode, serves dist/ locally
```

In Webflow, load GSAP, `Draggable` and `InertiaPlugin` first, then:

```html
<!-- Head -->
<link rel="stylesheet" href="https://pocket-island-code.netlify.app/style.css">

<!-- Before </body> -->
<script src="https://pocket-island-code.netlify.app/pocket-island.js" defer></script>
```

---

> [!TIP]
> **Performance Note**: To minimize layout thrashing, this project utilizes a centralized `gsap.ticker` to update CSS variables, ensuring the 3D transforms are recalculated only when necessary.
