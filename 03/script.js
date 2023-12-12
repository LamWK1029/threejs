import * as THREE from "three";

// scene ( the world where we can put objects, lights and cameras )
const scene = new THREE.Scene();

// mesh = combination of geometry (nodes and vertices) and material (color, texture, etc)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material); // mesh = ( geometry + material )
scene.add(mesh);

// camera ( what we can see in the scene )
const sizes = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

// renderer ( render the scene and camera to the canvas )
const canvas = document.querySelector("canvas.webgl"); // get the canvas from html
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
