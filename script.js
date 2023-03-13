import * as THREE from "./node_modules/three/build/three.module.js";

function main() {
  const canvas = document.querySelector("#c");
  const div = document.querySelector("div");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  // Настройка камеры
  const fov = 90; // поле зрения в градусах
  const aspect = window.innerWidth / window.innerHeight; // соотношение сторон
  const near = 0.1; // пространство перед камерой
  const far = 5; // пространство перед камерой
  const camera = new THREE.PerspectiveCamera(fov, 2, near, far);
  camera.position.z = 2;

  // Настройка сцены
  const scene = new THREE.Scene();
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth); // Создание геометрии обьекта(Куб)
  const material = new THREE.MeshPhongMaterial({ color: 0xaa5544 }); // Добавление материала
  const cube = new THREE.Mesh(geometry, material); //  Создание самого объекта
  scene.add(cube);
  renderer.setSize(div.clientWidth, div.clientHeight);
  //   renderer.render(scene, camera);

  // добавить вертикальную плоскость
  var surf = new THREE.BufferGeometry();
  var vertices = new Float32Array([
    -2.0, -2.0, 2.0, 2.0, -2.0, 2.0, 2.0, 2.0, 2.0,

    -2.0, 2.0, 2.0, -2.0, 2.0, 2.0, -2.0, -2.0, 2.0,
  ]);
  const normals = [0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0];

  const indices = [0, 1, 2, 0, 2, 3];
  surf.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  surf.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  surf.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
  surf.computeVertexNormals();
  var materialSurf = new THREE.MeshStandardMaterial({ color: 0xffffff });
  var plane = new THREE.Mesh(surf, materialSurf);

  plane.position.z = -2.4;
  plane.receiveShadow = false;
  scene.add(plane);
  //   renderer.shadowMap.enabled = true;
  //   renderer.shadowMap.type = THREE.PCFShadowMap;
  // Добавление света
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
    const light2 = new THREE.DirectionalLight(color, intensity);
    light2.position.set(1, 2, 4);
    scene.add(light2);
  }

  // Создание Анимации
  function render(time) {
    time *= 0.0001; // конвертировать время в секунды

    cube.rotation.x = time;
    cube.rotation.y = time;
    cube.rotation.z = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
main();
