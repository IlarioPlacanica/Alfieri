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
          "yaw": -0.09540877514903734,
          "pitch": 0.08118037509037634,
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
          "yaw": 0.00666163553433563,
          "pitch": 0.07535501499396169,
          "rotation": 0,
          "target": "0-ingresso"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-cucina",
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
          "yaw": -0.754111148822691,
          "pitch": 0.05820146527964809,
          "rotation": 0,
          "target": "0-ingresso"
        },
        {
          "yaw": 0.4827072127139438,
          "pitch": 0.02556357543005383,
          "rotation": 0,
          "target": "1-soggiorno"
        },
        {
          "yaw": -0.32751307858970513,
          "pitch": 0.05880334033331991,
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
          "yaw": -0.30630348804417373,
          "pitch": 0.13268539940700563,
          "rotation": 0,
          "target": "5-camera-da-letto"
        },
        {
          "yaw": 0.3744941329809137,
          "pitch": 0.20181560246944663,
          "rotation": 0,
          "target": "4-bagno"
        },
        {
          "yaw": 3.0594745463707103,
          "pitch": 0.059634355427244046,
          "rotation": 0,
          "target": "2-cucina"
        },
        {
          "yaw": 2.4679356639337717,
          "pitch": 0.08016251036512756,
          "rotation": 0,
          "target": "1-soggiorno"
        },
        {
          "yaw": -2.252524707480916,
          "pitch": 0.10946826479319505,
          "rotation": 0,
          "target": "0-ingresso"
        }
      ],
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
          "yaw": 0.08859073640250159,
          "pitch": 0.06625894390970544,
          "rotation": 0,
          "target": "3-disimpegno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-camera-da-letto",
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
          "yaw": 0.40113439677423024,
          "pitch": 0.08970798127704072,
          "rotation": 0,
          "target": "3-disimpegno"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "B23",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
