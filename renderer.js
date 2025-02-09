import * as THREE from 'https://unpkg.com/three@0.137.5/build/three.module.js';

export default class Renderer {
  constructor(container) {
    // Create a WebGL renderer with antialiasing enabled
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Ensure renderer is correctly appended
    container.appendChild(this.renderer.domElement);
    
    // Expose the domElement for external usage
    this.domElement = this.renderer.domElement;

    // Update size on window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }
}
