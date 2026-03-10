import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const wrapper = document.querySelector('.three-viewer');
const canvas = document.getElementById('three-canvas');

if (!wrapper || !canvas) {
  console.log('Three viewer non presente in questa pagina');
} else {
  initThreeViewer(wrapper, canvas);
}

function initThreeViewer(wrapper, canvas) {
  const modelUrl = wrapper.dataset.model;

  if (!modelUrl) {
    showViewerMessage(wrapper, 'Modello 3D non trovato');
    return;
  }

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile,
    alpha: false,
    powerPreference: 'high-performance'
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf3f3f3);

  const camera = new THREE.PerspectiveCamera(
    40,
    wrapper.clientWidth / wrapper.clientHeight,
    0.01,
    1000
  );
  camera.position.set(0, 2.4, 8);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = true;
  controls.screenSpacePanning = true;
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.zoomSpeed = 0.9;
  controls.rotateSpeed = 0.8;
  controls.panSpeed = 0.8;
  controls.minDistance = 1;
  controls.maxDistance = 80;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI / 2.02;
  controls.target.set(0, 1.2, 0);
  controls.update();

  // Luci
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe7e7e7, 0.7);
  hemiLight.position.set(0, 10, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
  dirLight.position.set(4.5, 7, 5.5);
  dirLight.castShadow = true;

  const shadowMapSize = isMobile ? 1024 : 2048;
  dirLight.shadow.mapSize.set(shadowMapSize, shadowMapSize);
  dirLight.shadow.bias = -0.00008;
  dirLight.shadow.normalBias = 0.025;

  dirLight.shadow.camera.left = -12;
  dirLight.shadow.camera.right = 12;
  dirLight.shadow.camera.top = 12;
  dirLight.shadow.camera.bottom = -12;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 40;

  dirLight.target.position.set(0, 0.8, 0);
  scene.add(dirLight);
  scene.add(dirLight.target);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
  fillLight.position.set(-4, 3, -3);
  scene.add(fillLight);

  // Pavimento chiaro + ombra
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xf3f3f3,
    roughness: 1
  });

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    floorMaterial
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.002;
  floor.receiveShadow = true;
  scene.add(floor);

  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.ShadowMaterial({ opacity: 0.18 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  const loader = new GLTFLoader();
  let modelRoot = null;

  loader.load(
    modelUrl,
    (gltf) => {
      modelRoot = gltf.scene;

      modelRoot.traverse((obj) => {
        if (!obj.isMesh) return;

        obj.castShadow = true;
        obj.receiveShadow = false;

        if (obj.material) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];

          materials.forEach((material) => {
            if (material.map) {
              material.map.colorSpace = THREE.SRGBColorSpace;
            }
            if (material.emissiveMap) {
              material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
            }
            material.needsUpdate = true;
          });
        }
      });

      scene.add(modelRoot);
      centerAndFitModel(modelRoot, camera, controls, dirLight);
      resizeViewer();

      hideViewerMessage(wrapper);
      animate();
    },
    undefined,
    (error) => {
      console.error('Errore caricamento GLB:', error);
      showViewerMessage(wrapper, 'Errore nel caricamento del modello 3D');
    }
  );

  function centerAndFitModel(model, cameraRef, controlsRef, mainLight) {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    model.position.x -= center.x;
    model.position.y -= box.min.y;
    model.position.z -= center.z;

    const fittedBox = new THREE.Box3().setFromObject(model);
    const fittedSize = fittedBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(fittedSize.x, fittedSize.y, fittedSize.z);

    const targetY = Math.max(fittedSize.y * 0.35, 0.7);
    controlsRef.target.set(0, targetY, 0);

    const fov = THREE.MathUtils.degToRad(cameraRef.fov);
    let distance = maxDim / (2 * Math.tan(fov / 2));
    distance *= isMobile ? 1.95 : 1.75;

    cameraRef.near = Math.max(distance / 100, 0.01);
    cameraRef.far = Math.max(distance * 30, 100);
    cameraRef.updateProjectionMatrix();

    cameraRef.position.set(
      distance * 0.72,
      distance * 0.95,
      distance * 1.18
    );
    cameraRef.lookAt(controlsRef.target);

    controlsRef.minDistance = Math.max(maxDim * 0.35, 0.8);
    controlsRef.maxDistance = Math.max(maxDim * 6, 30);
    controlsRef.update();

    mainLight.target.position.copy(controlsRef.target);

    // Ombre: adatta area shadow camera al modello
    const shadowHalfSize = Math.max(maxDim * 1.2, 8);
    mainLight.shadow.camera.left = -shadowHalfSize;
    mainLight.shadow.camera.right = shadowHalfSize;
    mainLight.shadow.camera.top = shadowHalfSize;
    mainLight.shadow.camera.bottom = -shadowHalfSize;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = Math.max(maxDim * 6, 30);
    mainLight.shadow.camera.updateProjectionMatrix();
  }

  function resizeViewer() {
    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;

    if (!width || !height) return;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
  }

  let animationFrameId = null;

  function animate() {
    if (animationFrameId) return;

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);
      controls.update();
      renderer.render(scene, camera);
    };

    tick();
  }

  function stopAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  const resizeObserver = new ResizeObserver(() => {
    resizeViewer();
  });
  resizeObserver.observe(wrapper);

  window.addEventListener('resize', resizeViewer);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAnimation();
    } else {
      resizeViewer();
      animate();
    }
  });

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    stopAnimation();
    showViewerMessage(wrapper, 'Il contesto WebGL è stato perso');
  });

  canvas.addEventListener('webglcontextrestored', () => {
    hideViewerMessage(wrapper);
    resizeViewer();
    animate();
  });
}

function showViewerMessage(wrapper, text) {
  let message = wrapper.querySelector('.three-viewer-message');

  if (!message) {
    message = document.createElement('div');
    message.className = 'three-viewer-message';
    message.style.position = 'absolute';
    message.style.inset = '0';
    message.style.display = 'flex';
    message.style.alignItems = 'center';
    message.style.justifyContent = 'center';
    message.style.textAlign = 'center';
    message.style.padding = '24px';
    message.style.fontSize = '14px';
    message.style.fontWeight = '600';
    message.style.color = '#333';
    message.style.background = '#f3f3f3';
    message.style.zIndex = '5';
    wrapper.appendChild(message);
  }

  message.textContent = text;
}

function hideViewerMessage(wrapper) {
  const message = wrapper.querySelector('.three-viewer-message');
  if (message) {
    message.remove();
  }
}