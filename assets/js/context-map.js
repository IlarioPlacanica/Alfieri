document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("contextMap");
  if (!el || !window.maplibregl) return;

  const map = new maplibregl.Map({
    container: "contextMap",
    style: "https://tiles.openfreemap.org/styles/liberty",
    center: [7.67810, 45.06835],
    zoom: 17,
    pitch: 0,
    bearing: 0,
    attributionControl: false
  });

  map.addControl(
    new maplibregl.NavigationControl({ showCompass: false }),
    "top-right"
  );

  map.on("load", () => {
    map.addSource("lotto", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[
            [7.678320275255368, 45.06819921851688],
            [7.678175664277602, 45.06825063035882],
            [7.6782216000649886, 45.068324895597],
            [7.678083938469373, 45.06837653398736],
            [7.678003575403017, 45.06824469287679],
            [7.677864396426539, 45.06828974986691],
            [7.677958410745485, 45.068429671255025],
            [7.677926765555606, 45.068448090324274],
            [7.678007446724227, 45.06855564543883],
            [7.678458997044977, 45.06838350680859],
            [7.678320275255368, 45.06819921851688]
          ]]
        }
      }
    });

    map.addLayer({
      id: "lotto-fill",
      type: "fill",
      source: "lotto",
      paint: {
        "fill-color": "#d6a14d",
        "fill-opacity": 0.32
      }
    });

    map.addLayer({
      id: "lotto-line",
      type: "line",
      source: "lotto",
      paint: {
        "line-color": "#d6a14d",
        "line-width": 2
      }
    });
  });

  // =========================
  // CLICK DESTRO DEBUG PUNTI
  // =========================

  map.on("contextmenu", (e) => {
    const lon = e.lngLat.lng;
    const lat = e.lngLat.lat;

    console.log("Punto aggiunto:");
    console.log("Lon:", lon);
    console.log("Lat:", lat);
  });
});