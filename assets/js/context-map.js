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
            [7.678315542552184, 45.068168150639735],
            [7.678130240789244, 45.068235639570446],
            [7.67820478434615, 45.06830633388881],
            [7.67808853089403, 45.06835482639025],
            [7.678023531413487, 45.06828474737475],
            [7.677872735606343, 45.06832734878887],
            [7.677944360270999, 45.06841288773188],
            [7.677890586426031, 45.06843264677232],
            [7.677983244666422, 45.06854511206379],
            [7.6784613124763155, 45.06836830964386],
            [7.678315542552184, 45.068168150639735]
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