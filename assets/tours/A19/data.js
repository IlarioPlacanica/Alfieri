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
          "yaw": 1.5920842949845548,
          "pitch": 0.11853346873196813,
          "rotation": 0,
          "target": "2-bagno"
        },
        {
          "yaw": 0.08461960264653001,
          "pitch": 0.09519445089319234,
          "rotation": 0,
          "target": "1-camera-da-letto"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-camera-da-letto",
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
          "yaw": 0.23232594464042222,
          "pitch": 0.08239966251278474,
          "rotation": 0,
          "target": "0-ingresso"
        },
        {
          "yaw": -0.1930173955093366,
          "pitch": 0.08059179384907011,
          "rotation": 0,
          "target": "2-bagno"
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
          "yaw": -0.5454963026715856,
          "pitch": 0.04832897465594499,
          "rotation": 0,
          "target": "0-ingresso"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "A19",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
