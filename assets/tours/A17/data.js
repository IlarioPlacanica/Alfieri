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
          "yaw": 0.6824565607747228,
          "pitch": 0.08423814915923344,
          "rotation": 0,
          "target": "1-corridoio"
        },
        {
          "yaw": -0.3255209831175758,
          "pitch": 0.07559821997056027,
          "rotation": 0,
          "target": "2-soggiorno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-corridoio",
      "name": "Corridoio",
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
          "yaw": 0.0643079878876911,
          "pitch": 0.1125378293085646,
          "rotation": 0,
          "target": "4-camera-da-letto"
        },
        {
          "yaw": 0.6265928745301093,
          "pitch": 0.11283891418464798,
          "rotation": 0,
          "target": "5-bagno"
        },
        {
          "yaw": -0.21215491952896848,
          "pitch": 0.15292281675679398,
          "rotation": 0,
          "target": "3-camera-da-letto"
        },
        {
          "yaw": 2.8362378626313767,
          "pitch": 0.11836367848824025,
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
          "yaw": -0.004441126853475197,
          "pitch": 0.08858974163624289,
          "rotation": 0,
          "target": "1-corridoio"
        },
        {
          "yaw": 0.6424352706860041,
          "pitch": 0.08336672166268144,
          "rotation": 0,
          "target": "0-ingresso"
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
          "yaw": 0.16502876336088868,
          "pitch": 0.069978617053442,
          "rotation": 0,
          "target": "1-corridoio"
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
          "yaw": 0.007275946844382375,
          "pitch": 0.054741488275414696,
          "rotation": 0,
          "target": "1-corridoio"
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
          "yaw": -0.13463593493242954,
          "pitch": 0.061535701072173765,
          "rotation": 0,
          "target": "1-corridoio"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "A17",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
