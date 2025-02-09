import Renderer from './renderer.js';
import SceneManager from './sceneManager.js';
import MainCamera from './cameras/mainCamera.js';
import CursorControls from './controls/cursorControls.js';
import SolarSystem from './models/solarSystem.js';
import * as THREE from 'https://unpkg.com/three@0.137.5/build/three.module.js';

const container = document.getElementById('canvas-container');

const renderer = new Renderer(container);
const camera = new MainCamera();
const sceneManager = new SceneManager();
const scene = sceneManager.currentScene;
const solarSystem = new SolarSystem(scene); // Create solar system
solarSystem.setupClickEvents(camera, renderer); // Enable click detection

// const solarSystem = new SolarSystem();
scene.add(solarSystem.group);
// SolarSystem.setupClickEvents(camera, renderer);

const controls = new CursorControls(camera, renderer);

function animate() {
  requestAnimationFrame(animate);
  solarSystem.update(); // Update planetary rotations & orbits
  sceneManager.update();
  controls.update();
  renderer.render(scene, camera);
}

animate();
