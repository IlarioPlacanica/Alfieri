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
            [7.67831208706022, 45.06817846748751],
            [7.678171272367791, 45.068232714193215],
            [7.678220507772949, 45.068307055470285],
            [7.6780762229061, 45.068359241497745],
            [7.678022681055808, 45.068288020553325],
            [7.6778953414633975, 45.068325612525825],
            [7.677958340924903, 45.06841464305518],
            [7.677916568163113, 45.0684293943097],
            [7.677995300185842, 45.06853740174293],
            [7.6784520970641665, 45.06836712600054],
            [7.67831208706022, 45.06817846748751]
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