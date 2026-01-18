# pocket-island

# 🏝️ Pocket Island
Pocket Island is an experimental Webflow project featuring a dynamic 3D island built entirely with CSS 3D transforms, powered by GSAP for high-performance interactions and state management.

🚀 Overview
This project explores the limits of the browser's rendering engine by creating a 3D environment without using WebGL or Three.js. Every element—from the island's rotation to the day/night cycle—is controlled through CSS variables updated in real-time by GSAP.

✨ Key Features
Pure CSS 3D Engine: The island and its components (grid, waves, trees) use rotateX, rotateY, and rotateZ transforms to create depth.

Interactive Rotation: Users can manually spin the island using GSAP Draggable with momentum and inertia.

Dynamic Speed Control: A custom "Engine Room" fader allows users to adjust the island's rotation speed multiplier from 0.1x up to 4x.

Day/Night Cycle: A toggle and dedicated fader transition the environment between day and night states, updating visual properties via CSS variables.

Responsive State Management: A built-in breakpoint watcher automatically resets the island's speed and time of day for mobile users to ensure optimal performance.

Elastic Custom Cursor: A physics-based cursor that tilts and reacts to movement speed, with specific "grab" states for interactive elements.

🛠️ Technical Stack
Platform: Webflow

Animation Engine: GSAP (GreenSock Animation Platform)

gsap.ticker for the rotation motor.

Draggable for the physical controls and island interaction.

gsap.quickTo() for high-performance cursor tracking.

Styling: CSS 3D Transforms and CSS Custom Properties (Variables).

📦 Project Structure
The project logic is modularized into specialized scripts:

scene-rotation.js: Manages the continuous rotation and manual drag logic.

controls.js: Handles the "Engine Room" UI and islandState object.

day-night-cycle.js: Specifically manages the celestial rotation values.

custom-cursor.js: Logic for the tilting UI cursor.

breakpoint-watcher.js: Ensures the experience is tailored for mobile viewports.
