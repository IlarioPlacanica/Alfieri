var APP_DATA = {
  "scenes": [
    {
      "id": "0-360cucina",
      "name": "360.Cucina",
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
          "yaw": -0.10563099306519064,
          "pitch": 0.06292265173919986,
          "rotation": 0,
          "target": "1-360salotto"
        },
        {
          "yaw": -0.7052882077704385,
          "pitch": 0.07942680396632618,
          "rotation": 0,
          "target": "2-360camletto"
        },
        {
          "yaw": -1.068343017275712,
          "pitch": 0.15252534437062693,
          "rotation": 0,
          "target": "3-360bagno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-360salotto",
      "name": "360.Salotto",
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
          "yaw": 1.09773029572818,
          "pitch": 0.03752311426454824,
          "rotation": 0,
          "target": "2-360camletto"
        },
        {
          "yaw": 0.5657049472455355,
          "pitch": 0.060786372307134684,
          "rotation": 0,
          "target": "3-360bagno"
        },
        {
          "yaw": -0.1693310021097041,
          "pitch": 0.06993505988362614,
          "rotation": 0,
          "target": "0-360cucina"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-360camletto",
      "name": "360.camLetto",
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
          "yaw": 2.1355340599106256,
          "pitch": 0.11510031515725672,
          "rotation": 0,
          "target": "0-360cucina"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-360bagno",
      "name": "360Bagno",
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
          "yaw": -0.6768184814682829,
          "pitch": 0.02432734141057935,
          "rotation": 0,
          "target": "0-360cucina"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "A22.Alfieri",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};
