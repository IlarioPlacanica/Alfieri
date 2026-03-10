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
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf3f3f3);

  const camera = new THREE.PerspectiveCamera(
    40,
    wrapper.clientWidth / wrapper.clientHeight,
    0.01,
    1000
  );
  camera.position.set(0, 2.5, 8);

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

  // Luce base: schiarisce ma non fa ombre
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe9e9e9, 0.55);
  hemiLight.position.set(0, 10, 0);
  scene.add(hemiLight);

  // Luce principale con ombre per interni
  const spotLight = new THREE.SpotLight(0xffffff, 18);
  spotLight.position.set(2.8, 5.8, 3.8);
  spotLight.angle = Math.PI / 5.2;
  spotLight.penumbra = 0.45;
  spotLight.decay = 1.6;
  spotLight.distance = 0;
  spotLight.castShadow = true;

  const shadowMapSize = isMobile ? 1024 : 2048;
  spotLight.shadow.mapSize.set(shadowMapSize, shadowMapSize);
  spotLight.shadow.bias = -0.00008;
  spotLight.shadow.normalBias = 0.02;
  spotLight.shadow.camera.near = 0.2;
  spotLight.shadow.camera.far = 40;
  spotLight.shadow.focus = 1;

  spotLight.target.position.set(0, 1.0, 0);
  scene.add(spotLight);
  scene.add(spotLight.target);

  // Fill frontale leggero per non chiudere troppo i neri
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.65);
  fillLight.position.set(-3, 2.5, 3);
  scene.add(fillLight);

  // Pavimento chiaro sotto al modello
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({
      color: 0xf3f3f3,
      roughness: 1
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.002;
  floor.receiveShadow = true;
  scene.add(floor);

  // Piano ombra
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.ShadowMaterial({ opacity: 0.16 })
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
        obj.receiveShadow = true;

        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach((material) => {
          if (!material) return;

          if (material.map) {
            material.map.colorSpace = THREE.SRGBColorSpace;
          }

          if (material.emissiveMap) {
            material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
          }

          // Piccolo aiuto per schiarire materiali troppo spenti
          if ('envMapIntensity' in material && material.envMapIntensity !== undefined) {
            material.envMapIntensity = 0.9;
          }

          material.needsUpdate = true;
        });
      });

      scene.add(modelRoot);
      centerAndFitModel(modelRoot, camera, controls, spotLight);
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

    const targetY = Math.max(fittedSize.y * 0.38, 0.7);
    controlsRef.target.set(0, targetY, 0);

    const fov = THREE.MathUtils.degToRad(cameraRef.fov);
    let distance = maxDim / (2 * Math.tan(fov / 2));
    distance *= isMobile ? 2.0 : 1.8;

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

    // punta la spot verso il modello
    mainLight.target.position.copy(controlsRef.target);

    // adatta il cono e la shadow camera alla scala del modello
    mainLight.shadow.camera.near = 0.2;
    mainLight.shadow.camera.far = Math.max(maxDim * 6, 25);
    mainLight.shadow.camera.updateProjectionMatrix();

    // sposta la spot in modo coerente con la dimensione del modello
    mainLight.position.set(
      maxDim * 0.55,
      maxDim * 1.15,
      maxDim * 0.75
    );

    shadowPlane.position.y = 0;
    floor.position.y = -0.002;
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