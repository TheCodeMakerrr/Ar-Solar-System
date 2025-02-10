import * as THREE from 'https://unpkg.com/three@0.137.5/build/three.module.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

export default class SolarSystem {
  constructor() {
    
    this.group = new THREE.Group();
    this.planets = {}; // Store planet objects
    this.planetSpeeds = { // Speed values for self-rotation & orbits
      // Sun: { rotation: 0.0005, orbit: 0 }, // Sun doesn't orbit
      "mercury_BezierCircle_4": { rotation: 0.005, orbit: 0, distance: 3 },
      "venus_BezierCircle_7": { rotation: 0.002, orbit: 0, distance: 5 },
      "erath_BezierCircle_11": { rotation: 0.01, orbit: 0, distance: 7 },
      "mars_BezierCircle_14": { rotation: 0.008, orbit: 0, distance: 9 },
      "jupiter_BezierCircle_17": { rotation: 0.02, orbit: 0, distance: 12 },
      "saturn_BezierCircle_21": { rotation: 0.018, orbit: 0, distance: 16 },
      "uranus_BezierCircle_24": { rotation: 0.015, orbit: 0., distance: 19 },
      "neptune_BezierCircle_27": { rotation: 0.012, orbit: 0, distance: 22 }
    };
    this.planetData = [
      { name: "Mercury", file: "solar.glb", position: [2, 0, 0] },
      { name: "Venus", file: "solar.glb", position: [4, 0, 0] },
      { name: "Earth", file: "solar.glb", position: [6, 0, 0] },
      { name: "Mars", file: "solar_system_animation.glb", position: [8, 0, 0] },
      { name: "Jupiter", file: "solar_system_animation.glb", position: [12, 0, 0] },
      { name: "Saturn", file: "solar_system_animation.glb", position: [16, 0, 0] },
      { name: "Uranus", file: "solar", position: [20, 0, 0] },
      { name: "Neptune", file: "solar.glb", position: [24, 0, 0] }
    ];
    
    const loader = new GLTFLoader();
    loader.load(
      '../../assets/models/solar_system_animation.glb',
      (gltf) => {
        console.log('Solar system model loaded.');
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        gltf.scene.position.set(0, 1, 0);
        this.group.add(gltf.scene);

        this.extractPlanets(gltf.scene);
      },
      (xhr) => {
        console.log(`Loading: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`);
      },
      (error) => {
        console.error('Error loading the solar system model:', error);
      }
    );
  }

  /**
   * Extracts individual planets from the GLTF model and stores them in `this.planets`
   */
  extractPlanets(solarSystemScene) {
    Object.keys(this.planetSpeeds).forEach((planetName) => {
      const planet = solarSystemScene.getObjectByName(planetName);
      if (planet) {
        this.planets[planetName] = planet;
        console.log(`Planet found: ${planetName}`);
      } else {
        console.warn(`Planet ${planetName} not found in the GLTF file!`);
      }
    });
  }

  /**
   * Returns the object of a specific planet by name.
   * @param {string} planetName The name of the planet to retrieve.
   */
  getPlanet(planetName) {
    return this.planets[planetName];
  }

  setupClickEvents(camera, renderer) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('click', (event) => {
        // Convert mouse click position to normalized device coordinates (-1 to 1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        
        // Create an array of planet objects to test for intersection
        const planetObjects = Object.values(this.planets); 
        
        const intersects = raycaster.intersectObjects(planetObjects, true); // True -> check child objects

        if (intersects.length > 0) {
            const clickedPlanet = intersects[0].object; // Get the first object clicked
            const planetName = clickedPlanet.name;

            if (planetName) {
                console.log(`You clicked on: ${planetName}`);
                // alert(`You clicked on: ${planetName}`); // Show popup
            }
        //     if (planetName === 'Object_8') {  
        //       this.loadPlanetModel('solar.glb'); // Load Mercury
        //   }
        //   if (planetName === 'Object_11') {  
        //     this.loadPlanetModel('earth.glb'); // Load Mercury
        // }
        }
    });
}
loadPlanetModel(modelFile) {
  const loader = new GLTFLoader();
  loader.load(`../../assets/models/${modelFile}`, (gltf) => {
      const newPlanet = gltf.scene;
      newPlanet.position.set(0, 0, 0); // Adjust position if needed
      this.group.add(newPlanet);

      console.log(`${modelFile} is loaded`);
  });
}

replacePlanetModel(planetData) {
  this.loader.load(`../../assets/models/${planetData.file}`, (gltf) => {
      const newPlanet = gltf.scene;
      newPlanet.position.set(...planetData.position);
      this.scene.add(newPlanet);
  });
}
  createLabel(number, position) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(number, 20, 40);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(...position);
    sprite.position.y += 1.5; // Raise label above planet

    return sprite;
}
  /**
   * Updates planet rotation and orbit in the animation loop.
   */
  update() {
    const time = Date.now() * 0.0001; // Time factor to keep animation smooth

    Object.keys(this.planets).forEach((planetName) => {
      const planet = this.planets[planetName];
      const speed = this.planetSpeeds[planetName];

      if (planet) {
        // Self-Rotation
        planet.rotation.y += speed.rotation;

        // Orbit Movement (excluding the Sun)
        if (speed.orbit > 0) {
          planet.position.x = speed.distance * Math.cos(time * speed.orbit);
          planet.position.z = speed.distance * Math.sin(time * speed.orbit);
        }
      }
    });
  }
}
