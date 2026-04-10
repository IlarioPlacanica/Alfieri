CesiumBootstrap();

function CesiumBootstrap() {
  const container = document.getElementById("urbanViewer");
  

  if (!container) return;

  const CESIUM_JS =
    "https://cesium.com/downloads/cesiumjs/releases/1.118/Build/Cesium/Cesium.js";
  const CESIUM_CSS =
    "https://cesium.com/downloads/cesiumjs/releases/1.118/Build/Cesium/Widgets/widgets.css";

  const INITIAL_STATE = {
    heading: degToRad(55),
    pitch: degToRad(-35),
    range: 150
  };

  const LIMITS = {
    minPitch: degToRad(-80),
    maxPitch: degToRad(-10),
    minRange: 120,
    maxRange: 900
  };

  const state = {
    cesiumReady: false,
    viewerReady: false,
    viewer: null,
    tileset: null,
    polygonEntity: null,
    orbitTarget: null,
    boundingSphere: null,
    observer: null,
    resizeTimer: null,
    destroyedForMobile: false,

    orbitHeading: INITIAL_STATE.heading,
    orbitPitch: INITIAL_STATE.pitch,
    orbitRange: INITIAL_STATE.range,

    activePointers: new Map(),
    isPointerDown: false,
    isPinching: false,
    startX: 0,
    startY: 0,
    lastPinchDistance: 0
  };

  setup();

  function setup() {
    showMessage("Caricamento vista urbana…");
    initVisibilityObserver();
    bindGlobalEvents();
  }

  function initVisibilityObserver() {
    if (!("IntersectionObserver" in window)) {
      loadAndInitViewer();
      return;
    }

    state.observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting || state.viewerReady) return;

        state.observer.disconnect();
        await loadAndInitViewer();
      },
      {
        root: null,
        rootMargin: "250px 0px"
      }
    );

    state.observer.observe(container);
  }

  async function loadAndInitViewer() {
    try {
      if (isSmallScreen()) {
        showMessage("Vista urbana disattivata su schermi piccoli per migliorare le prestazioni.");
        return;
      }

      showMessage("Sto caricando il viewer 3D…");

      await ensureCesiumLoaded();
      await initViewer();
    } catch (error) {
      console.error("Errore viewer urbano:", error);
      showMessage("Impossibile caricare il viewer urbano.");
    }
  }

  async function ensureCesiumLoaded() {
    if (state.cesiumReady && window.Cesium) return;

    await Promise.all([loadCssOnce(CESIUM_CSS), loadScriptOnce(CESIUM_JS)]);

    if (!window.Cesium) {
      throw new Error("Cesium non disponibile dopo il caricamento.");
    }

    window.Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMDMzYWFiYy03NmQ2LTQ1Y2ItOTIxMC00YTlhNWJiOTczYTEiLCJpZCI6MjI5OTIwLCJpYXQiOjE3MzUxNDI5ODN9.5JsxkFNj9aTyDXASAq5If6K6oQmBRtw4-xzKA0-ksec";

    state.cesiumReady = true;
  }

  async function initViewer() {
    if (state.viewerReady) return;

    const Cesium = window.Cesium;

    resetOrbitState();

    const viewer = new Cesium.Viewer(container, {
      timeline: false,
      animation: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      fullscreenButton: false,
      infoBox: false,
      selectionIndicator: false,
      globe: false,
      requestRenderMode: true,
      maximumRenderTimeChange: Infinity,
      msaaSamples: 1,
      shadows: false
    });

    state.viewer = viewer;

    viewer.resolutionScale = window.devicePixelRatio > 1 ? 0.5 : 0.65;
    viewer.scene.requestRenderMode = true;
    viewer.scene.fog.enabled = false;
    viewer.scene.postProcessStages.fxaa.enabled = false;
    viewer.scene.skyBox.show = false;
    viewer.scene.sun.show = false;
    viewer.scene.moon.show = false;
    viewer.scene.backgroundColor = Cesium.Color.fromCssColorString("#d9d3c8");

    if (viewer.cesiumWidget && viewer.cesiumWidget.creditContainer) {
      viewer.cesiumWidget.creditContainer.style.display = "";
    }

    viewer.clock.currentTime = Cesium.JulianDate.fromDate(
      new Date("2025-06-21T12:00:00Z")
    );

    const googleTileset = await Cesium.createGooglePhotorealistic3DTileset();
    googleTileset.maximumScreenSpaceError = 48;
    googleTileset.cacheBytes = 256 * 1024 * 1024;
    googleTileset.maximumCacheOverflowBytes = 64 * 1024 * 1024;

    state.tileset = googleTileset;
    viewer.scene.primitives.add(googleTileset);

    setupSceneController();
    buildLotPolygon();
    bindPointerControls();

    focusSelectedPolygon(0);

    state.viewerReady = true;
    hideMessage();
    requestRender();
  }

  function setupSceneController() {
    const viewer = state.viewer;
    const controller = viewer.scene.screenSpaceCameraController;
    const canvas = viewer.scene.canvas;

    canvas.style.touchAction = "none";

    controller.enableInputs = false;
    controller.enableTranslate = false;
    controller.enableZoom = false;
    controller.enableTilt = false;
    controller.enableRotate = false;
    controller.enableLook = false;
  }

  function buildLotPolygon() {
    const Cesium = window.Cesium;
    const viewer = state.viewer;

    const lotPositions = Cesium.Cartesian3.fromDegreesArrayHeights([
      7.677751532298875, 45.068316182918814, 300,
      7.6783465742329575, 45.068115905344634, 300,
      7.678580187544821, 45.06842887263733, 300,
      7.67797094993596, 45.06864785502038, 300
    ]);

    const polygonEntity = viewer.entities.add({
      id: "selectedPolygon",
      name: "Alfieri",
      polygon: {
        hierarchy: lotPositions,
        material: new Cesium.ColorMaterialProperty(
          Cesium.Color.fromCssColorString("#d6a14d").withAlpha(0.38)
        ),
        perPositionHeight: true,
        extrudedHeight: 285,
        outline: false
      }
    });

    const hierarchy = polygonEntity.polygon.hierarchy.getValue(Cesium.JulianDate.now());
    const boundingSphere = Cesium.BoundingSphere.fromPoints(hierarchy.positions);

    state.polygonEntity = polygonEntity;
    state.boundingSphere = boundingSphere;
    state.orbitTarget = boundingSphere.center;
  }

  function bindPointerControls() {
    const canvas = state.viewer.scene.canvas;

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);
    canvas.addEventListener("lostpointercapture", onLostPointerCapture);
    canvas.addEventListener("wheel", onWheel, { passive: false });
  }

  function onPointerDown(event) {
    const isPrimaryMouseButton =
      event.pointerType !== "touch" ? event.button === 0 : true;

    if (!isPrimaryMouseButton || !state.viewer) return;

    state.activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });

    if (state.activePointers.size === 2) {
      state.isPinching = true;
      state.isPointerDown = false;
      state.lastPinchDistance = getPointerDistance();
    } else if (state.activePointers.size === 1) {
      beginOrbitDrag(event.clientX, event.clientY);
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function onPointerMove(event) {
    if (!state.viewer) return;

    if (state.activePointers.has(event.pointerId)) {
      state.activePointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY
      });
    }

    if (state.isPinching && state.activePointers.size >= 2) {
      const currentDistance = getPointerDistance();
      const pinchDelta = currentDistance - state.lastPinchDistance;

      if (Math.abs(pinchDelta) > 2) {
        const pinchSensitivity = 1.5;
        state.orbitRange -= pinchDelta * pinchSensitivity;
        state.orbitRange = clamp(state.orbitRange, LIMITS.minRange, LIMITS.maxRange);
        updateOrbitCamera();
        state.lastPinchDistance = currentDistance;
      }

      event.preventDefault();
      return;
    }

    if (!state.isPointerDown || state.activePointers.size !== 1) return;

    const deltaX = event.clientX - state.startX;
    const deltaY = event.clientY - state.startY;

    state.startX = event.clientX;
    state.startY = event.clientY;

    const sensitivity = 0.003;

    state.orbitHeading += deltaX * sensitivity;
    state.orbitPitch -= deltaY * sensitivity;
    state.orbitPitch = clamp(state.orbitPitch, LIMITS.minPitch, LIMITS.maxPitch);

    updateOrbitCamera();
    event.preventDefault();
  }

  function onPointerUp(event) {
    state.activePointers.delete(event.pointerId);

    if (state.activePointers.size < 2) {
      state.isPinching = false;
      state.lastPinchDistance = 0;
    }

    syncSinglePointerAfterGesture();
    event.preventDefault();
  }

  function onPointerCancel(event) {
    state.activePointers.delete(event.pointerId);

    if (state.activePointers.size < 2) {
      state.isPinching = false;
      state.lastPinchDistance = 0;
    }

    syncSinglePointerAfterGesture();
  }

  function onLostPointerCapture(event) {
    state.activePointers.delete(event.pointerId);

    if (state.activePointers.size < 2) {
      state.isPinching = false;
      state.lastPinchDistance = 0;
    }

    syncSinglePointerAfterGesture();
  }

  function onWheel(event) {
    if (!state.viewer) return;

    event.preventDefault();

    const zoomStep = 25;

    if (event.deltaY > 0) {
      state.orbitRange += zoomStep;
    } else {
      state.orbitRange -= zoomStep;
    }

    state.orbitRange = clamp(state.orbitRange, LIMITS.minRange, LIMITS.maxRange);
    updateOrbitCamera();
  }

  function beginOrbitDrag(x, y) {
    state.isPointerDown = true;
    state.startX = x;
    state.startY = y;
  }

  function syncSinglePointerAfterGesture() {
    if (state.activePointers.size === 1 && !state.isPinching) {
      const remainingPointer = Array.from(state.activePointers.values())[0];
      beginOrbitDrag(remainingPointer.x, remainingPointer.y);
      return;
    }

    state.isPointerDown = false;
  }

  function getPointerDistance() {
    if (state.activePointers.size < 2) return 0;

    const points = Array.from(state.activePointers.values());
    const dx = points[0].x - points[1].x;
    const dy = points[0].y - points[1].y;

    return Math.hypot(dx, dy);
  }

  function updateOrbitCamera() {
    if (!state.viewer || !state.orbitTarget) return;

    const Cesium = window.Cesium;

    state.viewer.camera.lookAt(
      state.orbitTarget,
      new Cesium.HeadingPitchRange(
        state.orbitHeading,
        state.orbitPitch,
        state.orbitRange
      )
    );

    requestRender();
  }

  function focusSelectedPolygon(duration = 0) {
    if (!state.viewer || !state.boundingSphere) return;

    const Cesium = window.Cesium;

    state.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

    state.viewer.camera.flyToBoundingSphere(state.boundingSphere, {
      duration,
      offset: new Cesium.HeadingPitchRange(
        state.orbitHeading,
        state.orbitPitch,
        state.orbitRange
      ),
      complete: () => {
        updateOrbitCamera();
      },
      cancel: () => {
        updateOrbitCamera();
      }
    });
  }

  function requestRender() {
    if (!state.viewer) return;
    state.viewer.scene.requestRender();
  }

  function resetOrbitState() {
    state.orbitHeading = INITIAL_STATE.heading;
    state.orbitPitch = INITIAL_STATE.pitch;
    state.orbitRange = INITIAL_STATE.range;
  }

  function bindGlobalEvents() {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize, { passive: true });
  }

  function handleVisibilityChange() {
    if (!state.viewer) return;

    if (document.hidden) {
      state.viewer.useDefaultRenderLoop = false;
    } else {
      state.viewer.useDefaultRenderLoop = true;
      requestRender();
    }
  }

  function handleResize() {
    clearTimeout(state.resizeTimer);

    state.resizeTimer = setTimeout(() => {
      if (!state.viewer) return;

      if (isSmallScreen()) {
        destroyViewer();
        showMessage("Vista urbana disattivata su schermi piccoli per migliorare le prestazioni.");
        state.destroyedForMobile = true;
        return;
      }

      if (state.destroyedForMobile && !isSmallScreen()) {
        state.destroyedForMobile = false;
        loadAndInitViewer();
        return;
      }

      requestRender();
    }, 180);
  }

  function destroyViewer() {
    if (!state.viewer) return;

    try {
      state.viewer.destroy();
    } catch (error) {
      console.warn("Errore durante destroy viewer:", error);
    }

    state.viewer = null;
    state.viewerReady = false;
    state.tileset = null;
    state.polygonEntity = null;
    state.orbitTarget = null;
    state.boundingSphere = null;
    state.activePointers.clear();
    state.isPointerDown = false;
    state.isPinching = false;
  }

  function showMessage(text) {
    let message = container.querySelector(".urban-viewer-message");

    if (!message) {
      message = document.createElement("div");
      message.className = "urban-viewer-message";
      message.style.position = "absolute";
      message.style.inset = "0";
      message.style.display = "flex";
      message.style.alignItems = "center";
      message.style.justifyContent = "center";
      message.style.textAlign = "center";
      message.style.padding = "24px";
      message.style.fontSize = "14px";
      message.style.fontWeight = "600";
      message.style.lineHeight = "1.5";
      message.style.color = "#333";
      message.style.background = "#d8d2c8";
      message.style.zIndex = "5";
      container.appendChild(message);
    }

    message.textContent = text;
  }

  function hideMessage() {
    const message = container.querySelector(".urban-viewer-message");
    if (message) {
      message.remove();
    }
  }

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-src="${src}"]`);

      if (existing) {
        if (existing.dataset.loaded === "true") {
          resolve();
          return;
        }

        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error(`Errore caricamento script: ${src}`)), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.dataset.src = src;

      script.addEventListener("load", () => {
        script.dataset.loaded = "true";
        resolve();
      });

      script.addEventListener("error", () => {
        reject(new Error(`Errore caricamento script: ${src}`));
      });

      document.head.appendChild(script);
    });
  }

  function loadCssOnce(href) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`link[data-href="${href}"]`);

      if (existing) {
        resolve();
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.href = href;

      link.addEventListener("load", () => resolve(), { once: true });
      link.addEventListener("error", () => reject(new Error(`Errore caricamento CSS: ${href}`)), { once: true });

      document.head.appendChild(link);
    });
  }

  function isSmallScreen() {
    return window.matchMedia("(max-width: 900px)").matches;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
  }
}