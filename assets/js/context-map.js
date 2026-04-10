document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("contextMap");
  if (!el || !window.maplibregl) return;

  const center = [7.67810, 45.06835];

  const map = new maplibregl.Map({
    container: "contextMap",
    style: "https://tiles.openfreemap.org/styles/liberty",
    center,
    zoom: 17.2,
    pitch: 0,
    bearing: 0,
    attributionControl: false
  });

  map.addControl(
    new maplibregl.NavigationControl({
      showCompass: false,
      visualizePitch: false
    }),
    "top-right"
  );

  function setPaintIfExists(layerId, property, value) {
    if (map.getLayer(layerId)) {
      map.setPaintProperty(layerId, property, value);
    }
  }

  function setLayoutIfExists(layerId, property, value) {
    if (map.getLayer(layerId)) {
      map.setLayoutProperty(layerId, property, value);
    }
  }

  map.on("load", () => {
    const style = map.getStyle();
    console.log("Map layers:", style.layers.map((l) => l.id));

    // Background / base
    setPaintIfExists("background", "background-color", "#f5f1ea");

    // Buildings - vicino al tuo landscape.man_made
    [
      "building",
      "building-top",
      "building-3d",
      "buildings"
    ].forEach((id) => {
      setPaintIfExists(id, "fill-color", "#4b4e53");
      setPaintIfExists(id, "fill-outline-color", "#ddd6cb");
    });

    // Parks / greens
    [
      "park",
      "landuse_park",
      "landcover",
      "landuse",
      "greenspace"
    ].forEach((id) => {
      setPaintIfExists(id, "fill-color", "#aea393");
    });

    // Water più neutra / poco invasiva
    [
      "water",
      "waterway",
      "water-fill"
    ].forEach((id) => {
      setPaintIfExists(id, "fill-color", "#e8e1d7");
      setPaintIfExists(id, "line-color", "#e8e1d7");
    });

    // Roads - vicino al tuo road.geometry.fill
    [
      "road",
      "road-primary",
      "road-secondary",
      "road-tertiary",
      "road-street",
      "road-path",
      "transportation",
      "transportation_name"
    ].forEach((id) => {
      setPaintIfExists(id, "line-color", "#ddd6cb");
      setPaintIfExists(id, "fill-color", "#ddd6cb");
    });

    // Bridge / tunnel coerenti
    [
      "bridge",
      "tunnel"
    ].forEach((id) => {
      setPaintIfExists(id, "line-color", "#ddd6cb");
    });

    // Nascondi o riduci POI / quartieri / icone come nel tuo JSON
    [
      "poi",
      "poi-label",
      "poi_label",
      "poi-icon",
      "landmark",
      "housenumber"
    ].forEach((id) => {
      setLayoutIfExists(id, "visibility", "none");
    });

    [
      "settlement-subdivision-label",
      "suburb-label",
      "neighbourhood-label",
      "neighborhood-label",
      "place-label-suburb"
    ].forEach((id) => {
      setLayoutIfExists(id, "visibility", "none");
    });

    // Testi strade in colore coerente
    [
      "road-label",
      "road_name",
      "transportation_name"
    ].forEach((id) => {
      setPaintIfExists(id, "text-color", "#4b4e53");
      setPaintIfExists(id, "text-halo-color", "#f5f1ea");
    });

    // Testi place/admin più morbidi
    [
      "place-label",
      "place_label",
      "settlement-label",
      "country-label",
      "state-label"
    ].forEach((id) => {
      setPaintIfExists(id, "text-color", "#4b4e53");
      setPaintIfExists(id, "text-halo-color", "#f5f1ea");
    });

    // Lotto evidenziato
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
        "fill-opacity": 0.30
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