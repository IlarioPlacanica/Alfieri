Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMDMzYWFiYy03NmQ2LTQ1Y2ItOTIxMC00YTlhNWJiOTczYTEiLCJpZCI6MjI5OTIwLCJpYXQiOjE3MzUxNDI5ODN9.5JsxkFNj9aTyDXASAq5If6K6oQmBRtw4-xzKA0-ksec";

const container = document.getElementById("urbanViewer");

if (container && window.Cesium) {
  initUrbanViewer().catch((error) => {
    console.error("Errore viewer urbano:", error);
  });
}

async function initUrbanViewer() {
  const viewer = new Cesium.Viewer("urbanViewer", {
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
    msaaSamples: 4
  });

  viewer.resolutionScale = 1;
  viewer.scene.fog.enabled = false;
  viewer.scene.postProcessStages.fxaa.enabled = true;
  viewer.scene.requestRenderMode = true;
  viewer.scene.skyBox.show = false;
  viewer.scene.sun.show = false;
  viewer.scene.moon.show = false;
  viewer.scene.backgroundColor = Cesium.Color.fromCssColorString("#d9d3c8");

  viewer.clock.currentTime = Cesium.JulianDate.fromDate(
    new Date("2025-06-21T12:00:00Z")
  );

  const googleTileset = await Cesium.createGooglePhotorealistic3DTileset();

  googleTileset.maximumScreenSpaceError = 6;

  /*
  googleTileset.customShader = new Cesium.CustomShader({
    mode: Cesium.CustomShaderMode.MODIFY_MATERIAL,
    lightingModel: Cesium.LightingModel.UNLIT,
    fragmentShaderText: `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        material.diffuse = clamp(material.diffuse * 1.5, 0.0, 1.0);
      }
    `
  }); */

  viewer.scene.primitives.add(googleTileset);

  const controller = viewer.scene.screenSpaceCameraController;
  const canvas = viewer.scene.canvas;
  canvas.style.touchAction = "none";

  const lotPositions = Cesium.Cartesian3.fromDegreesArrayHeights([
    7.677751532298875, 45.068316182918814, 300,
    7.6783465742329575, 45.068115905344634, 300,
    7.678580187544821, 45.06842887263733, 300,
    7.67797094993596, 45.06864785502038, 300
  ]);

  const selectedPolygon = viewer.entities.add({
    id: "selectedPolygon",
    name: "Alfieri",
    polygon: {
      hierarchy: lotPositions,
      material: new Cesium.ColorMaterialProperty(
        Cesium.Color.fromCssColorString("#d6a14d").withAlpha(0.15)
      ),
      perPositionHeight: true,
      extrudedHeight: 285,
      outline: false
    }
  });

  const hierarchy = selectedPolygon.polygon.hierarchy.getValue(Cesium.JulianDate.now());
  const boundingSphere = Cesium.BoundingSphere.fromPoints(hierarchy.positions);
  const orbitTarget = boundingSphere.center;

  // ===== Diamond marker flottante =====
  const orbitCartographic = Cesium.Cartographic.fromCartesian(orbitTarget);
  const lotLongitude = orbitCartographic.longitude;
  const lotLatitude = orbitCartographic.latitude;

  const baseHeight = 285;
  const markerHeight = 314;

  const markerBasePosition = Cesium.Cartesian3.fromRadians(
    lotLongitude,
    lotLatitude,
    baseHeight
  );

  const markerPosition = Cesium.Cartesian3.fromRadians(
    lotLongitude,
    lotLatitude,
    markerHeight
  );

  const diamondSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <defs>
        <filter id="g" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#g)">
        <polygon
          points="48,16 76,44 48,72 20,44"
          fill="#d6a14d"
          fill-opacity="0.95"
          stroke="rgba(255,255,255,0.95)"
          stroke-width="3"
          stroke-linejoin="round"
        />
        <polygon
          points="48,26 66,44 48,62 30,44"
          fill="rgba(255,255,255,0.22)"
        />
      </g>
    </svg>
  `;

  viewer.entities.add({
    id: "lotMarkerBaseGlow",
    position: markerBasePosition,
    ellipse: {
      semiMajorAxis: 7,
      semiMinorAxis: 7,
      height: baseHeight + 0.05,
      material: Cesium.Color.fromCssColorString("#d6a14d").withAlpha(0.14),
      outline: false
    }
  });

  viewer.entities.add({
    id: "lotMarkerBaseRing",
    position: markerBasePosition,
    ellipse: {
      semiMajorAxis: 10,
      semiMinorAxis: 10,
      height: baseHeight + 0.1,
      material: Cesium.Color.WHITE.withAlpha(0.01),
      outline: true,
      outlineColor: Cesium.Color.fromCssColorString("#d6a14d").withAlpha(0.42),
      outlineWidth: 1
    }
  });

  viewer.entities.add({
    id: "lotDiamondMarker",
    position: markerPosition,
    billboard: {
      image: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(diamondSvg)}`,
      scale: 0.58,
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    }
  });
  // ===== fine marker =====

  let orbitHeading = Cesium.Math.toRadians(365);
  let orbitPitch = Cesium.Math.toRadians(-35);
  let orbitRange = 175;

  const minPitch = Cesium.Math.toRadians(-80);
  const maxPitch = Cesium.Math.toRadians(-10);
  const minRange = 50;
  const maxRange = 900;

  controller.enableInputs = false;
  controller.enableTranslate = false;
  controller.enableZoom = false;
  controller.enableTilt = false;
  controller.enableRotate = false;
  controller.enableLook = false;

  function updateOrbitCamera() {
    viewer.camera.lookAt(
      orbitTarget,
      new Cesium.HeadingPitchRange(orbitHeading, orbitPitch, orbitRange)
    );
  }

  function focusSelectedPolygon(duration = 2.2) {
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

    viewer.camera.flyToBoundingSphere(boundingSphere, {
      duration,
      offset: new Cesium.HeadingPitchRange(
        orbitHeading,
        orbitPitch,
        orbitRange
      ),
      complete: () => {
        updateOrbitCamera();
      },
      cancel: () => {
        updateOrbitCamera();
      }
    });
  }

  focusSelectedPolygon(0);

  let isPointerDown = false;
  let startX = 0;
  let startY = 0;
  const activePointers = new Map();
  let isPinching = false;
  let lastPinchDistance = 0;

  function getPointerDistance() {
    if (activePointers.size < 2) return 0;
    const points = Array.from(activePointers.values());
    const dx = points[0].x - points[1].x;
    const dy = points[0].y - points[1].y;
    return Math.hypot(dx, dy);
  }

  function beginOrbitDrag(x, y) {
    isPointerDown = true;
    startX = x;
    startY = y;
  }

  function syncSinglePointerAfterGesture() {
    if (activePointers.size === 1 && !isPinching) {
      const remainingPointer = Array.from(activePointers.values())[0];
      beginOrbitDrag(remainingPointer.x, remainingPointer.y);
      return;
    }
    isPointerDown = false;
  }

  canvas.addEventListener("pointerdown", (event) => {
    const isPrimaryMouseButton =
      event.pointerType !== "touch" ? event.button === 0 : true;
    if (!isPrimaryMouseButton) return;

    activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });

    if (activePointers.size === 2) {
      isPinching = true;
      isPointerDown = false;
      lastPinchDistance = getPointerDistance();
    } else if (activePointers.size === 1) {
      beginOrbitDrag(event.clientX, event.clientY);
    }

    canvas.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  canvas.addEventListener("pointermove", (event) => {
    if (activePointers.has(event.pointerId)) {
      activePointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY
      });
    }

    if (isPinching && activePointers.size >= 2) {
      const currentDistance = getPointerDistance();
      const pinchDelta = currentDistance - lastPinchDistance;

      if (Math.abs(pinchDelta) > 2) {
        const pinchSensitivity = 1.5;
        orbitRange -= pinchDelta * pinchSensitivity;
        orbitRange = Cesium.Math.clamp(orbitRange, minRange, maxRange);
        updateOrbitCamera();
        lastPinchDistance = currentDistance;
      }

      event.preventDefault();
      return;
    }

    if (!isPointerDown || activePointers.size !== 1) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    startX = event.clientX;
    startY = event.clientY;

    const sensitivity = 0.003;

    orbitHeading += deltaX * sensitivity;
    orbitPitch -= deltaY * sensitivity;
    orbitPitch = Cesium.Math.clamp(orbitPitch, minPitch, maxPitch);

    updateOrbitCamera();
    event.preventDefault();
  });

  canvas.addEventListener("pointerup", (event) => {
    activePointers.delete(event.pointerId);

    if (activePointers.size < 2) {
      isPinching = false;
      lastPinchDistance = 0;
    }

    syncSinglePointerAfterGesture();
    event.preventDefault();
  });

  canvas.addEventListener("pointercancel", (event) => {
    activePointers.delete(event.pointerId);

    if (activePointers.size < 2) {
      isPinching = false;
      lastPinchDistance = 0;
    }

    syncSinglePointerAfterGesture();
  });

  canvas.addEventListener("lostpointercapture", (event) => {
    activePointers.delete(event.pointerId);

    if (activePointers.size < 2) {
      isPinching = false;
      lastPinchDistance = 0;
    }

    syncSinglePointerAfterGesture();
  });

  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();

    const zoomStep = 25;

    if (event.deltaY > 0) {
      orbitRange += zoomStep;
    } else {
      orbitRange -= zoomStep;
    }

    orbitRange = Cesium.Math.clamp(orbitRange, minRange, maxRange);
    updateOrbitCamera();
  }, { passive: false });
}