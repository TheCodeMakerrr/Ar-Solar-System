import * as THREE from 'https://unpkg.com/three@0.137.5/build/three.module.js';

export default class MainCamera extends THREE.PerspectiveCamera {
    constructor() {
        super(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.position.set(2, 5, 20); // Initial position of the camera
        this.lookAt(0, 2, 1); // Make sure it points to the center of the scene
    }
}
