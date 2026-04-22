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
          "yaw": 0.5803399925906554,
          "pitch": 0.020187343899138455,
          "rotation": 0,
          "target": "1-soggiorno"
        },
        {
          "yaw": -0.611868170995086,
          "pitch": 0.05447740567631065,
          "rotation": 0,
          "target": "2-disimpegno"
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
          "yaw": -0.03329652355391488,
          "pitch": 0.04878688645099594,
          "rotation": 0,
          "target": "0-ingresso"
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
          "yaw": 0.5482202044902174,
          "pitch": 0.0756616401628527,
          "rotation": 0,
          "target": "3-camera-da-letto"
        },
        {
          "yaw": -0.5953123524367321,
          "pitch": 0.08254800332958823,
          "rotation": 0,
          "target": "4-bagno"
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
          "yaw": 0.25002324601010883,
          "pitch": 0.040856363034000864,
          "rotation": 0,
          "target": "2-disimpegno"
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
          "yaw": 0.024421516480577665,
          "pitch": 0.10615539479295855,
          "rotation": 0,
          "target": "2-disimpegno"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "B22",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
