import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animation (base on the frame rate)
// let time = Date.now();
// const tick = () => {
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime;

//   mesh.rotation.x += 0.001 * deltaTime;
//   mesh.rotation.y += 0.001 * deltaTime;

//   // Update objects
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// Animation (base on the clock)
// const clock = new THREE.Clock();
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   camera.position.x = Math.sin(elapsedTime * 0.7);
//   camera.position.y = Math.cos(elapsedTime * 0.7);
//   camera.lookAt(mesh.position);

//   renderer.render(scene, camera);

//   window.requestAnimationFrame(tick);
// };
// tick();

// Animation (base on the gsap)
gsap.to(mesh.position, { duration: 3, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 2, delay: 5, x: 0 });
const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();

