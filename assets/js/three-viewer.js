import * as THREE from 'https://unpkg.com/three@0.182.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.182.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.182.0/examples/jsm/loaders/GLTFLoader.js';

const wrapper = document.querySelector('.three-viewer');
const canvas = document.getElementById('three-canvas');

if (!wrapper || !canvas) {
  throw new Error('Viewer container non trovato');
}

const modelUrl = wrapper.dataset.model;
if (!modelUrl) {
  throw new Error('Path GLB mancante');
}

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(wrapper.clientWidth, wrapper.clientHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf3f3f3);

const camera = new THREE.PerspectiveCamera(
  35,
  wrapper.clientWidth / wrapper.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 2.2, 6);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 14;
controls.target.set(0, 1.2, 0);

// luce ambiente morbida
const ambient = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambient);

// luce direzionale controllabile
const dirLight = new THREE.DirectionalLight(0xffffff, 2.6);
dirLight.position.set(3.5, 6.5, 4.5);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.shadow.bias = -0.00015;

// area ombre
dirLight.shadow.camera.left = -8;
dirLight.shadow.camera.right = 8;
dirLight.shadow.camera.top = 8;
dirLight.shadow.camera.bottom = -8;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 30;

// direzione luce
dirLight.target.position.set(0, 0.8, 0);
scene.add(dirLight);
scene.add(dirLight.target);

// luce secondaria più debole per non chiudere troppo i neri
const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
fillLight.position.set(-4, 3, -2);
scene.add(fillLight);

// piano ombre bianco
const shadowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.ShadowMaterial({
    opacity: 0.22
  })
);
shadowPlane.rotation.x = -Math.PI / 2;
shadowPlane.position.y = -0.01;
shadowPlane.receiveShadow = true;
scene.add(shadowPlane);

// base bianca sotto al piano ombre
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({
    color: 0xf3f3f3
  })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.012;
floor.receiveShadow = true;
scene.add(floor);

const loader = new GLTFLoader();

loader.load(
  modelUrl,
  (gltf) => {
    const model = gltf.scene;

    model.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;

        if (obj.material && 'map' in obj.material && obj.material.map) {
          obj.material.map.colorSpace = THREE.SRGBColorSpace;
        }
      }
    });

    scene.add(model);

    // centra e inquadra il modello
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    model.position.x -= center.x;
    model.position.y -= box.min.y;
    model.position.z -= center.z;

    controls.target.set(0, size.y * 0.45, 0);

    const maxDim = Math.max(size.x, size.y, size.z);
    camera.position.set(maxDim * 0.55, maxDim * 0.9, maxDim * 1.5);
    camera.lookAt(controls.target);

    shadowPlane.position.y = 0;
    floor.position.y = -0.002;

    animate();
  },
  undefined,
  (error) => {
    console.error('Errore caricamento GLB:', error);
  }
);

function resizeRenderer() {
  const width = wrapper.clientWidth;
  const height = wrapper.clientHeight;

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', resizeRenderer);