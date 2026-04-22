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
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.41980373673772675,
          "pitch": 0.09099729963150338,
          "rotation": 0,
          "target": "1-cucina"
        },
        {
          "yaw": -0.5861219755493874,
          "pitch": 0.06281535956052409,
          "rotation": 0,
          "target": "4-bagno"
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
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.04216597616564677,
          "pitch": 0.02883385312562048,
          "rotation": 0,
          "target": "2-soggiorno"
        },
        {
          "yaw": -0.3859822759698499,
          "pitch": 0.026737326897990243,
          "rotation": 0,
          "target": "3-camera-da-letto"
        },
        {
          "yaw": -1.608766023174784,
          "pitch": 0.06494583949110044,
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
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.10179353997463458,
          "pitch": 0.03533062374752305,
          "rotation": 0,
          "target": "1-cucina"
        },
        {
          "yaw": 0.3135123403121174,
          "pitch": 0.040112883077982886,
          "rotation": 0,
          "target": "0-ingresso"
        },
        {
          "yaw": 1.4035079478938055,
          "pitch": 0.038213820487836614,
          "rotation": 0,
          "target": "3-camera-da-letto"
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
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.3730236522949717,
          "pitch": 0.11247803170014592,
          "rotation": 0,
          "target": "2-soggiorno"
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
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.6395817511688655,
          "pitch": 0.09061633333874042,
          "rotation": 0,
          "target": "0-ingresso"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "A18",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
