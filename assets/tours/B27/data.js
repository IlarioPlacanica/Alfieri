var APP_DATA = {
  "scenes": [
    {
      "id": "0-cucina",
      "name": "Cucina",
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
          "yaw": 0.4037229461260168,
          "pitch": 0.002113870633991155,
          "rotation": 0,
          "target": "1-soggiorno"
        },
        {
          "yaw": 2.139901143080671,
          "pitch": 0.05022824342370846,
          "rotation": 0,
          "target": "4-ingresso"
        },
        {
          "yaw": -2.0117625588915278,
          "pitch": 0.12885509732069522,
          "rotation": 0,
          "target": "3-camera-da-letto"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-soggiorno",
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
          "yaw": 0.011102482819097759,
          "pitch": 0.05766741279929377,
          "rotation": 0,
          "target": "0-cucina"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-bagno",
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
          "yaw": 0.11080929676996476,
          "pitch": 0.09855515159584449,
          "rotation": 0,
          "target": "4-ingresso"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-camera-da-letto",
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
          "yaw": -1.161987250328572,
          "pitch": 0.1280064667191798,
          "rotation": 0,
          "target": "0-cucina"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-ingresso",
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
          "yaw": 0.06872952296946977,
          "pitch": 0.11031703634458268,
          "rotation": 0,
          "target": "0-cucina"
        },
        {
          "yaw": 0.8636833824997474,
          "pitch": 0.14044201515189236,
          "rotation": 0,
          "target": "2-bagno"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "B27",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
