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
          "yaw": 0.0860076084174235,
          "pitch": 0.0815660727720644,
          "rotation": 0,
          "target": "1-soggiorno"
        },
        {
          "yaw": 0.6855335572585979,
          "pitch": 0.11842297866509632,
          "rotation": 0,
          "target": "3-camera-da-letto"
        },
        {
          "yaw": 0.9089014858036375,
          "pitch": 0.13449419438629207,
          "rotation": 0,
          "target": "2-bagno"
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
          "yaw": -0.3505035122737823,
          "pitch": 0.09031944972178074,
          "rotation": 0,
          "target": "0-ingresso"
        },
        {
          "yaw": -0.8290597395630268,
          "pitch": 0.1013874803692758,
          "rotation": 0,
          "target": "3-camera-da-letto"
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
          "yaw": 0.06872954521579544,
          "pitch": 0.11687763237733506,
          "rotation": 0,
          "target": "1-soggiorno"
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
          "yaw": -0.8234723897888081,
          "pitch": 0.11420597595703796,
          "rotation": 0,
          "target": "1-soggiorno"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "A13",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
