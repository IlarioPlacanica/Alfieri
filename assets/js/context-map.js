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

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

  map.on("load", () => {
    map.addSource("lotto", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[
            [7.677751532298875, 45.068316182918814],
            [7.6783465742329575, 45.068115905344634],
            [7.678580187544821, 45.06842887263733],
            [7.67797094993596, 45.06864785502038],
            [7.677751532298875, 45.068316182918814]
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
});