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
          "yaw": 0.4271852433490686,
          "pitch": 0.032325164465056844,
          "rotation": 0,
          "target": "1-salotto"
        },
        {
          "yaw": -0.979705174382488,
          "pitch": 0.03463489416562382,
          "rotation": 0,
          "target": "2-bagno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-salotto",
      "name": "Salotto",
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
          "yaw": 0.013601746289113592,
          "pitch": 0.09014796232562006,
          "rotation": 0,
          "target": "0-ingresso"
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
          "yaw": 0.6197495679042042,
          "pitch": -0.001314100342057145,
          "rotation": 0,
          "target": "0-ingresso"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "A21",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};
