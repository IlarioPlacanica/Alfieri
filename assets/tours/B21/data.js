var APP_DATA = {
  "scenes": [
    {
      "id": "0-soggiorno",
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
          "yaw": 1.7352480772503291,
          "pitch": 0.07233257579313879,
          "rotation": 0,
          "target": "2-disimpegno"
        },
        {
          "yaw": -1.012619888413182,
          "pitch": 0.05588650314397725,
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
          "yaw": 3.1328879385524795,
          "pitch": 0.03368868634846578,
          "rotation": 0,
          "target": "2-disimpegno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-disimpegno",
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
          "yaw": -0.27331690122315955,
          "pitch": 0.09906867466599323,
          "rotation": 0,
          "target": "3-camera-da-letto"
        },
        {
          "yaw": 0.2768499547078189,
          "pitch": 0.1067202371713094,
          "rotation": 0,
          "target": "4-bagno"
        },
        {
          "yaw": 2.3439487082490196,
          "pitch": 0.06721446896868777,
          "rotation": 0,
          "target": "0-soggiorno"
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
      "linkHotspots": [],
      "infoHotspots": []
    },
    {
      "id": "4-bagno",
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
          "yaw": 1.4258303752217092,
          "pitch": -0.005699715990616028,
          "rotation": 0,
          "target": "2-disimpegno"
        },
        {
          "yaw": 2.2805993378113545,
          "pitch": -0.01778276962991754,
          "rotation": 0,
          "target": "3-camera-da-letto"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "B21",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": false,
    "viewControlButtons": true
  }
};
