import { OrbitControls } from 'https://unpkg.com/three@0.137.5/examples/jsm/controls/OrbitControls.js';

export default class CursorControls {
    constructor(camera, renderer) {
        this.controls = new OrbitControls(camera, renderer.renderer.domElement);
        this.controls.enableDamping = true; // Smooth camera movement
    }

    update() {
        this.controls.update();
    }
}
