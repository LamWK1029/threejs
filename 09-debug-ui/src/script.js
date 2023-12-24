import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

// GUI
const debugGUI = new GUI({
  name: "Debug",
  title: "Debug",
  width: 300,
});
const debugObj = {
  width: 1,
  height: 1,
  depth: 1,
  color: "#b93737",
};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// ask user pomission to get location

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
  });
}

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: debugObj.color });
debugGUI.add(material, "wireframe").name("wireframe");
debugGUI.addColor(debugObj, "color").onChange(() => {
  material.color.set(debugObj.color);
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// debug mesh
const meshFolder = debugGUI.addFolder("Size");
meshFolder
  .add(debugObj, "width")
  .min(0)
  .max(3)
  .step(0.01)
  .name("width")
  .onFinishChange(() => {
    // geometry will be disposed and recreated since it's a new instance
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      debugObj.width,
      debugObj.height,
      debugObj.depth
    );
  });
meshFolder
  .add(debugObj, "height")
  .min(0)
  .max(3)
  .step(0.01)
  .name("height")
  .onFinishChange(() => {
    // geometry will be disposed and recreated since it's a new instance
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      debugObj.width,
      debugObj.height,
      debugObj.depth
    );
  });
meshFolder
  .add(debugObj, "depth")
  .min(0)
  .max(3)
  .step(0.01)
  .name("depth")
  .onFinishChange(() => {
    // geometry will be disposed and recreated since it's a new instance
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      debugObj.width,
      debugObj.height,
      debugObj.depth
    );
  });

// check url params include debug
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("debug")) {
  debugGUI.show();
} else {
  debugGUI.hide();
}

// function to toggle debug
const exitDebug = () => {
  console.log("exit debug");
  // remove all params from url
  const url = window.location.href;
  const urlWithoutDebug = url.replace("?debug", "");
  window.location.href = urlWithoutDebug;
};
debugGUI.add({ exitDebug }, "exitDebug").name("exit debug");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// camera.position.x = 1;
// camera.position.y = 1;
camera.position.z = 2;

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
tick();
