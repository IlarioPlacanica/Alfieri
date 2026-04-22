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
          "yaw": -0.03107810433685998,
          "pitch": 0.05543073928666864,
          "rotation": 0,
          "target": "2-soggiorno"
        },
        {
          "yaw": 0.3275132923357589,
          "pitch": 0.0755474761258057,
          "rotation": 0,
          "target": "1-cucina"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-cucina",
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
          "yaw": 0.39547464163853974,
          "pitch": 0.13040318404506124,
          "rotation": 0,
          "target": "2-soggiorno"
        },
        {
          "yaw": 0.8952608602796026,
          "pitch": 0.11474424960590568,
          "rotation": 0,
          "target": "3-disimpegno"
        },
        {
          "yaw": -1.4570698414712204,
          "pitch": 0.08625667749537236,
          "rotation": 0,
          "target": "0-ingresso"
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
          "yaw": 0.5285810850930979,
          "pitch": 0.06128382011996614,
          "rotation": 0,
          "target": "0-ingresso"
        },
        {
          "yaw": 0.08197731705763012,
          "pitch": 0.06409259476463447,
          "rotation": 0,
          "target": "1-cucina"
        },
        {
          "yaw": -0.7073455009138279,
          "pitch": 0.10092614088797802,
          "rotation": 0,
          "target": "3-disimpegno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-disimpegno",
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
          "yaw": -0.038958377323957905,
          "pitch": 0.09205973074800156,
          "rotation": 0,
          "target": "5-bagno"
        },
        {
          "yaw": 0.8662772447168905,
          "pitch": 0.06952915875339905,
          "rotation": 0,
          "target": "4-camera-da-letto"
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
          "yaw": -0.5696973228386923,
          "pitch": 0.07629659922750243,
          "rotation": 0,
          "target": "3-disimpegno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-bagno",
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
          "yaw": 0.5530583244653045,
          "pitch": 0.10542182352094187,
          "rotation": 0,
          "target": "3-disimpegno"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "A15",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
