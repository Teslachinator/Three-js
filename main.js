import * as THREE from "./node_modules/three/build/three.module.js";
const canvas = document.querySelector("#c");
//
const windowSize = () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
};
window.addEventListener("resize", windowSize);
//Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");
scene.fog = new THREE.Fog("black", 1, 5);
//vetical surface

var surf = new THREE.BufferGeometry();
const vertices1 = new Float32Array([
  -2.0, -2.0, 2.0, 2.0, -2.0, 2.0, 2.0, 2.0, 2.0,

  2.0, 2.0, 2.0, -2.0, 2.0, 2.0, -2.0, -2.0, 2.0,
]);
surf.setAttribute("position", new THREE.Float32BufferAttribute(vertices1, 3));
surf.computeVertexNormals();

const materialSurf = new THREE.MeshPhongMaterial({
  color: "grey",
  side: THREE.DoubleSide,
});
const meshSurf = new THREE.Mesh(surf, materialSurf);
meshSurf.receiveShadow = true;
meshSurf.position.z = -2.4;
scene.add(meshSurf);

//piramida
var geomPyram = new THREE.BufferGeometry();
const materialPyram = new Float32Array([
  0,
  0,
  0.5,
  0.5,
  0,
  0,
  -0.25,
  -Math.sqrt(0.5 * 0.5 - 0.25 * 0.25),
  0,

  0,
  0,
  0.5,
  0.5,
  0,
  0,
  -0.25,
  Math.sqrt(0.5 * 0.5 - 0.25 * 0.25),
  0,

  0,
  0,
  0.5,
  -0.25,
  -Math.sqrt(0.5 * 0.5 - 0.25 * 0.25),
  0,
  -0.25,
  Math.sqrt(0.5 * 0.5 - 0.25 * 0.25),
  0,

  0.5,
  0,
  0,
  -0.25,
  -Math.sqrt(0.5 * 0.5 - 0.25 * 0.25),
  0,
  -0.25,
  Math.sqrt(0.5 * 0.5 - 0.25 * 0.25),
  0,
]);
geomPyram.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(materialPyram, 3)
);
geomPyram.computeVertexNormals();
const material2 = new THREE.MeshPhongMaterial({
  color: "grey",
  side: THREE.DoubleSide,
});
const pyramid = new THREE.Mesh(geomPyram, material2);
pyramid.castShadow = true;
pyramid.position.x = 0.5;
pyramid.position.y = 0.5;

scene.add(pyramid);

//Cube
const boxWidth = 0.5;
const boxHeight = 0.5;
const boxDepth = 0.5;
const geomCube = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const materialCube = new THREE.MeshPhongMaterial({ color: "grey" }); // greenish blue

const cube = new THREE.Mesh(geomCube, materialCube);
cube.castShadow = true;
scene.add(cube);
cube.position.y = 0.5;
cube.position.x = -0.5;
// cube.position.z = 2;

//Камера
const camera = new THREE.PerspectiveCamera(
  70,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  100
);
camera.position.set(0, 0.7, 3);

//LIGHT
let hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(25, 25, 10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2000; // default
directionalLight.shadow.mapSize.height = 2000; // default

scene.add(directionalLight);
let directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight1);

// Пол
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(4000, 4000),
  new THREE.MeshPhongMaterial({ color: 0x808080, dithering: true })
);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);
//RENDER
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// canvas.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
function render(time) {
  time *= 0.001; // конвертировать время в секунды

  cube.rotation.x = time;
  cube.rotation.y = time;

  pyramid.rotation.x = time;
  pyramid.rotation.z = time;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);

document.forms[0].addEventListener("change", (e) => {
  cube.material.color.set(e.target.value);
});
document.forms[1].addEventListener("change", (e) => {
  meshSurf.material.color.set(e.target.value);
});
document.forms[2].addEventListener("change", (e) => {
  pyramid.material.color.set(e.target.value);
});

document.forms[3].addEventListener("change", (e) => {
  directionalLight.intensity = e.target.value;
});
document.forms[4].addEventListener("change", (e) => {
  directionalLight1.intensity = e.target.value;
});
document.forms[5].addEventListener("change", (e) => {
  hemiLight.intensity = e.target.value;
});
document.forms[6].addEventListener("click", (e) => {
  if (Math.abs(e.target.value) == 1) {
    scene.rotation.y += e.target.value * 0.1;
  }
});
document.forms[7].addEventListener("click", (e) => {
  if (Math.abs(e.target.value) == 1) {
    camera.position.z += e.target.value * -0.1;
  }
});
