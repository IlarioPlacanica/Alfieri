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
          "yaw": 0.5968330734786811,
          "pitch": 0.08246330990199802,
          "rotation": 0,
          "target": "3-bagno"
        },
        {
          "yaw": -0.5891985054436599,
          "pitch": 0.09204694368890642,
          "rotation": 0,
          "target": "1-soggiorno"
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
          "yaw": 2.9517472317849887,
          "pitch": 0.07741024142361042,
          "rotation": 0,
          "target": "0-ingresso"
        },
        {
          "yaw": 0.07222811393588024,
          "pitch": 0.10422295799638448,
          "rotation": 0,
          "target": "2-camera-da-letto"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-camera-da-letto",
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
          "yaw": 0.07535673999830728,
          "pitch": 0.02877764276977146,
          "rotation": 0,
          "target": "1-soggiorno"
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
          "yaw": -0.43634387686251763,
          "pitch": 0.08632308001161526,
          "rotation": 0,
          "target": "0-ingresso"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "A23",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
