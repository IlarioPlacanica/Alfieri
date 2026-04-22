var APP_DATA = {
  "scenes": [
    {
      "id": "0-ingresso",
      "name": "Ingresso",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 1.0504122082582565,
          "pitch": 0.0945026650491485,
          "rotation": 0,
          "target": "1-disimpegno"
        },
        {
          "yaw": 0.021430653457594318,
          "pitch": 0.012954104842641812,
          "rotation": 0,
          "target": "2-soggiorno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-disimpegno",
      "name": "Disimpegno",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.6670777518271827,
          "pitch": 0.05879639189793551,
          "rotation": 0,
          "target": "3-bagno"
        },
        {
          "yaw": 0.06872954521579544,
          "pitch": 0.14735161703967137,
          "rotation": 0,
          "target": "4-camera-da-letto"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-soggiorno",
      "name": "Soggiorno",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.2789843963365186,
          "pitch": 0.08730100979499866,
          "rotation": 0,
          "target": "0-ingresso"
        },
        {
          "yaw": -0.6675694102598211,
          "pitch": 0.05922270487364223,
          "rotation": 0,
          "target": "1-disimpegno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-bagno",
      "name": "Bagno",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.31351217850545154,
          "pitch": 0.06538913958675963,
          "rotation": 0,
          "target": "1-disimpegno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-camera-da-letto",
      "name": "Camera da letto",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.9179851790943658,
          "pitch": 0.07336283079725625,
          "rotation": 0,
          "target": "1-disimpegno"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "B26",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
