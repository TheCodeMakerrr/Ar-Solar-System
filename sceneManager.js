import * as THREE from 'https://unpkg.com/three@0.137.5/build/three.module.js';
import SolarSystem from './models/solarSystem.js';

export default class SceneManager {
  constructor() {
    // Create a new scene
    this.currentScene = new THREE.Scene();
    this.currentScene.background = new THREE.Color(0x000000);

    // Add basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.currentScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    this.currentScene.add(directionalLight);

    // Load the solar system model
    this.solarSystem = new SolarSystem();
    this.currentScene.add(this.solarSystem.group);
  }

  update() {
    if (this.solarSystem) {
      this.solarSystem.update(); // Update planetary rotation & orbits
    }
  }
}
